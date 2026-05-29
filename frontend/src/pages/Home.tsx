import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  listarAchadosPerdidos,
  listarAdocoes,
  mapAchadoPerdidoToPet,
  mapAdocaoToPet,
  type PetCardData,
} from "@/lib/anuncios-service"
import { getLoggedUser } from "@/lib/session"

function PetCard({ pet }: { pet: PetCardData }) {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const detailPath =
    pet.status === "adoption"
      ? `/app/adoption/${pet.id}`
      : `/app/lostfound/${pet.id}`

  return (
    <Dialog>
      <DialogTrigger>
        <Card className="w-full cursor-pointer overflow-auto border border-gray-900 bg-transparent shadow-2xl backdrop-blur-xs transition-transform hover:scale-105">
          <CardContent className="p-0">
            <div className="relative aspect-square w-full overflow-hidden">
              {isLoading && (
                <Skeleton className="absolute inset-0 z-10 m-2 h-40 w-40" />
              )}
              <img
                src={pet.image}
                alt={pet.name}
                className={`m-2 h-40 w-40 rounded-md object-cover transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-xl font-bold text-gray-900">{pet.name}</p>
              <p className="text-sm text-gray-300">{pet.breed}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{pet.name}</DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            {pet.breed} - {pet.age}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            {isLoading && (
              <Skeleton className="border-md absolute inset-0 z-10 h-60 w-60" />
            )}
            <img
              src={pet.image}
              alt={pet.name}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <p className="text-lg text-gray-700">{pet.description}</p>
          <div className="rounded-lg bg-gray-100 p-4">
            <p className="font-semibold text-gray-900">Contato:</p>
            <p className="text-orange-600">{pet.contact || "Nao informado"}</p>
          </div>
        </div>
        <Button
          className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
          onClick={() => navigate(detailPath)}
        >
          Ver anuncio completo
        </Button>
      </DialogContent>
    </Dialog>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-6 py-10 text-center text-lg font-semibold text-white">
      {message}
    </div>
  )
}

export default function Home() {
  const [adoptionPets, setAdoptionPets] = useState<PetCardData[]>([])
  const [lostFoundPets, setLostFoundPets] = useState<PetCardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const loggedUser = getLoggedUser()

  useEffect(() => {
    let isMounted = true

    async function loadAnnouncements() {
      try {
        const [adocoes, achadosPerdidos] = await Promise.all([
          listarAdocoes(),
          listarAchadosPerdidos(),
        ])

        if (!isMounted) {
          return
        }

        setAdoptionPets(adocoes.map(mapAdocaoToPet))
        setLostFoundPets(achadosPerdidos.map(mapAchadoPerdidoToPet))
      } catch {
        if (isMounted) {
          setError("Nao foi possivel carregar os anuncios agora.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadAnnouncements()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="flex flex-col gap-12 p-6">
      <p className="text-3xl text-white">
        <span className="subtitle">Ola, {loggedUser?.nome ?? "visitante"}!</span>
      </p>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
          {error}
        </div>
      )}

      <section>
        <Card className="relative border-2 border-gray-900 px-12 shadow-2xl backdrop-blur-md">
          <CardContent className="p-0">
            <h2 className="mb-6 text-3xl font-bold text-white">
              <span className="subtitle">Pets para Adocao</span>
            </h2>
            <div className="relative px-12">
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : adoptionPets.length === 0 ? (
                <EmptyState message="Nenhum pet para adocao cadastrado." />
              ) : (
                <Carousel className="mx-auto w-full max-w-5xl">
                  <CarouselContent className="mx-8 my-2">
                    {adoptionPets.map((pet) => (
                      <CarouselItem key={pet.id} className="basis-1/4">
                        <PetCard pet={pet} />
                      </CarouselItem>
                    ))}
                    <CarouselItem className="my-auto basis-1/6">
                      <Link to="/app/adoption" className="block h-fit w-fit">
                        <Card className="h-fit w-fit cursor-pointer overflow-auto border border-gray-900 bg-transparent shadow-2xl backdrop-blur-xs transition-transform hover:scale-105">
                          <CardContent className="p-0">
                            <div className="flex h-fit items-center justify-center gap-4 p-4">
                              <p className="text-center text-xl font-bold text-gray-900">
                                Ver mais pets para adocao
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="border-card text-orange-800 hover:bg-white/20" />
                  <CarouselNext className="border-card text-orange-800 hover:bg-white/20" />
                </Carousel>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="relative border-2 border-gray-900 px-12 shadow-2xl backdrop-blur-md">
          <CardContent className="p-0">
            <h2 className="mb-6 text-3xl font-bold text-white">
              <span className="subtitle">Achados e Perdidos</span>
            </h2>

            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : lostFoundPets.length === 0 ? (
              <EmptyState message="Nenhum anuncio de achados e perdidos cadastrado." />
            ) : (
              <Carousel className="mx-auto w-full max-w-5xl">
                <CarouselContent className="mx-8 my-2">
                  {lostFoundPets.map((pet) => (
                    <CarouselItem key={pet.id} className="basis-1/4">
                      <PetCard pet={pet} />
                    </CarouselItem>
                  ))}
                  <CarouselItem className="my-auto basis-1/6">
                    <Link to="/app/lostfound" className="block h-fit w-fit">
                      <Card className="h-fit w-fit cursor-pointer overflow-auto border border-gray-900 bg-transparent shadow-2xl backdrop-blur-xs transition-transform hover:scale-105">
                        <CardContent className="p-0">
                          <div className="flex h-fit items-center justify-center gap-4 p-4">
                            <p className="text-center text-xl font-bold text-gray-900">
                              Ver mais pets achados e perdidos
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="border-card text-orange-800 hover:bg-white/20" />
                <CarouselNext className="border-card text-orange-800 hover:bg-white/20" />
              </Carousel>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
