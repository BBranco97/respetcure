import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  getAnnouncementLocation,
  getDomainText,
  listarAchadosPerdidos,
  mapAchadoPerdidoToPet,
  type PetCardData,
} from "@/lib/anuncios-service"

type LostFoundCard = PetCardData & {
  location: string
  typeLabel: string
  situationLabel: string
}

export default function LostFound() {
  const [pets, setPets] = useState<LostFoundCard[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "lost" | "found">(
    "all"
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadLostFound() {
      try {
        const anuncios = await listarAchadosPerdidos(100)

        if (isMounted) {
          setPets(
            anuncios.map((anuncio) => ({
              ...mapAchadoPerdidoToPet(anuncio),
              location: getAnnouncementLocation(anuncio),
              typeLabel: getDomainText(anuncio.tipo),
              situationLabel: getDomainText(anuncio.situacao),
            }))
          )
        }
      } catch {
        if (isMounted) {
          setError("Nao foi possivel carregar os anuncios.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadLostFound()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredPets = useMemo(() => {
    const query = search.trim().toLowerCase()

    return pets.filter((pet) => {
      const matchesStatus =
        statusFilter === "all" || pet.status === statusFilter
      const matchesSearch =
        !query ||
        [pet.name, pet.breed, pet.location, pet.typeLabel, pet.situationLabel]
          .join(" ")
          .toLowerCase()
          .includes(query)

      return matchesStatus && matchesSearch
    })
  }, [pets, search, statusFilter])

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            <span className="subtitle">Achados e Perdidos</span>
          </h1>
          <p className="text-white/80">
            Anuncios cadastrados no backend para ajudar pets a voltarem para casa.
          </p>
        </div>

        <div className="grid gap-3 md:w-[32rem] md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-2">
            <Label className="text-white">Buscar</Label>
            <div className="relative">
              <Search className="absolute left-3 top-2 size-4 text-gray-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nome, raca, cidade..."
                className="border-gray-900 bg-white pl-9"
              />
            </div>
          </div>
          <div className="flex items-end gap-2">
            {[
              ["all", "Todos"],
              ["lost", "Perdidos"],
              ["found", "Achados"],
            ].map(([value, label]) => (
              <Button
                key={value}
                className={`border-2 border-gray-900 ${
                  statusFilter === value ? "bg-primary" : "bg-white text-gray-900"
                }`}
                onClick={() =>
                  setStatusFilter(value as "all" | "lost" | "found")
                }
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-80 w-full" />
          ))}
        </div>
      ) : filteredPets.length === 0 ? (
        <Card className="border-2 border-gray-900 shadow-xl backdrop-blur-md">
          <CardContent className="p-8 text-center text-lg font-semibold text-white">
            Nenhum anuncio encontrado.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPets.map((pet) => (
            <Card
              key={pet.id}
              className="border-2 border-gray-900 shadow-xl backdrop-blur-md"
            >
              <CardContent className="grid gap-4 p-4 sm:grid-cols-[132px_1fr]">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="aspect-square w-full rounded-md object-cover"
                />
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-sm font-bold uppercase text-orange-800">
                      {pet.status === "found" ? "Achado" : "Perdido"}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {pet.name}
                    </h2>
                    <p className="font-semibold text-gray-700">{pet.breed}</p>
                  </div>
                  <p className="flex items-center gap-2 text-gray-700">
                    <MapPin className="size-4" />
                    {pet.location || "Localizacao nao informada"}
                  </p>
                  <p className="text-gray-700">{pet.situationLabel}</p>
                  <Link to={`/app/lostfound/${pet.id}`} className="mt-auto">
                    <Button className="w-full border-2 border-gray-900 bg-primary hover:bg-orange-600">
                      Ver anuncio completo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
