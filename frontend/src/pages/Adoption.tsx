import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  getAnnouncementLocation,
  getDomainText,
  listarAdocoes,
  mapAdocaoToPet,
  type AdoptionAnnouncement,
  type PetCardData,
} from "@/lib/anuncios-service"
import { buscarPerfilAdocaoPorUsuario } from "@/lib/perfil-adocao-service"
import { getLoggedUser } from "@/lib/session"
import type { AdoptionProfileData } from "@/lib/perfil-adocao-service"

type AdoptionCard = PetCardData & {
  location: string
  announcement: AdoptionAnnouncement
}

function matchesAdoptionProfile(
  anuncio: AdoptionAnnouncement,
  profile: AdoptionProfileData
) {
  const pet = anuncio.pet

  if (!pet) {
    return false
  }

  if (profile.especie?.id && pet.especie?.id !== profile.especie.id) {
    return false
  }

  if (profile.porte?.id && pet.porte?.id !== profile.porte.id) {
    return false
  }

  if (profile.sexo?.id && pet.sexo?.id !== profile.sexo.id) {
    return false
  }

  if (
    profile.temperamento?.id &&
    anuncio.temperamento?.id !== profile.temperamento.id
  ) {
    return false
  }

  if (profile.idadeMin != null && (pet.idade == null || pet.idade < profile.idadeMin)) {
    return false
  }

  if (profile.idadeMax != null && (pet.idade == null || pet.idade > profile.idadeMax)) {
    return false
  }

  if (profile.possuiCrianca && anuncio.conviveCriancas !== true) {
    return false
  }

  if (profile.possuiPet && anuncio.convivePets !== true) {
    return false
  }

  return true
}

function getProfileSummary(profile: AdoptionProfileData) {
  return [
    getDomainText(profile.especie),
    getDomainText(profile.porte),
    getDomainText(profile.sexo),
    getDomainText(profile.temperamento),
    profile.idadeMin != null ? `a partir de ${profile.idadeMin} ano(s)` : "",
    profile.idadeMax != null ? `ate ${profile.idadeMax} ano(s)` : "",
  ]
    .filter(Boolean)
    .join(" | ")
}

export default function Adoption() {
  const [pets, setPets] = useState<AdoptionCard[]>([])
  const [adoptionProfile, setAdoptionProfile] =
    useState<AdoptionProfileData | null>(null)
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const loggedUser = getLoggedUser()

  useEffect(() => {
    let isMounted = true

    async function loadAdoptions() {
      try {
        const adocoes = await listarAdocoes(100)
        let profile: AdoptionProfileData | null = null

        if (loggedUser?.id) {
          try {
            profile = await buscarPerfilAdocaoPorUsuario(loggedUser.id)
          } catch {
            profile = null
          }
        }

        const visibleAdocoes = profile
          ? adocoes.filter((adocao) => matchesAdoptionProfile(adocao, profile))
          : adocoes

        if (isMounted) {
          setAdoptionProfile(profile)
          setPets(
            visibleAdocoes.map((adocao) => ({
              ...mapAdocaoToPet(adocao),
              location: getAnnouncementLocation(adocao),
              announcement: adocao,
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
  }, [loggedUser?.id])

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

        <div className="flex flex-col gap-3 md:w-96">
          <Link to="/app/adoption/new" className="self-start md:self-end">
            <Button className="border-2 border-gray-900 bg-primary hover:bg-orange-600">
              <Plus className="size-4" />
              Cadastrar pet
            </Button>
          </Link>
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
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
          {error}
        </div>
      )}

      {adoptionProfile && (
        <div className="rounded-md border border-orange-900 bg-white/90 p-4 text-gray-900">
          <p className="font-bold">Filtros do seu perfil de adocao aplicados</p>
          <p>{getProfileSummary(adoptionProfile)}</p>
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
