import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  getAnnouncementLocation,
  listarAdocoes,
  mapAdocaoToPet,
  type PetCardData,
} from "@/lib/anuncios-service"

type AdoptionCard = PetCardData & {
  location: string
}

export default function Adoption() {
  const [pets, setPets] = useState<AdoptionCard[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadAdoptions() {
      try {
        const adocoes = await listarAdocoes(100)

        if (isMounted) {
          setPets(
            adocoes.map((adocao) => ({
              ...mapAdocaoToPet(adocao),
              location: getAnnouncementLocation(adocao),
            }))
          )
        }
      } catch {
        if (isMounted) {
          setError("Nao foi possivel carregar os pets para adocao.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadAdoptions()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredPets = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return pets
    }

    return pets.filter((pet) =>
      [pet.name, pet.breed, pet.age, pet.location, pet.description]
        .join(" ")
        .toLowerCase()
        .includes(query)
    )
  }, [pets, search])

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            <span className="subtitle">Adocao</span>
          </h1>
          <p className="text-white/80">
            Pets cadastrados no backend procurando um novo lar.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:w-96">
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
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
        <SlidersHorizontal className="size-4" />
        {filteredPets.length} anuncio(s) encontrado(s)
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-80 w-full" />
          ))}
        </div>
      ) : filteredPets.length === 0 ? (
        <Card className="border-2 border-gray-900 shadow-xl backdrop-blur-md">
          <CardContent className="p-8 text-center text-lg font-semibold text-white">
            Nenhum pet para adocao encontrado.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredPets.map((pet) => (
            <Card
              key={pet.id}
              className="border-2 border-gray-900 shadow-xl backdrop-blur-md"
            >
              <CardContent className="flex h-full flex-col gap-4 p-4">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="aspect-square w-full rounded-md object-cover"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {pet.name}
                  </h2>
                  <p className="font-semibold text-gray-700">{pet.breed}</p>
                  <p className="text-gray-700">{pet.age}</p>
                  <p className="text-gray-700">{pet.location}</p>
                </div>
                <Link to={`/app/adoption/${pet.id}`}>
                  <Button className="w-full border-2 border-gray-900 bg-primary hover:bg-orange-600">
                    Ver anuncio completo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
