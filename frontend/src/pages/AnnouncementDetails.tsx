import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  buscarAchadoPerdidoPorId,
  buscarAdocaoPorId,
  formatAge,
  formatPhone,
  getDomainText,
  type AdoptionAnnouncement,
  type LostFoundAnnouncement,
} from "@/lib/anuncios-service"

type AnnouncementDetailsProps = {
  type: "adoption" | "lostfound"
}

type DetailData = AdoptionAnnouncement | LostFoundAnnouncement

function isAdoption(data: DetailData): data is AdoptionAnnouncement {
  return "descricao" in data
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) {
    return null
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase text-gray-500">{label}</p>
      <p className="text-lg text-gray-900">{value}</p>
    </div>
  )
}

export default function AnnouncementDetails({ type }: AnnouncementDetailsProps) {
  const { id } = useParams()
  const [announcement, setAnnouncement] = useState<DetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadAnnouncement() {
      if (!id) {
        setError("Anuncio nao encontrado.")
        setIsLoading(false)
        return
      }

      try {
        const data =
          type === "adoption"
            ? await buscarAdocaoPorId(id)
            : await buscarAchadoPerdidoPorId(id)

        if (isMounted) {
          setAnnouncement(data)
        }
      } catch {
        if (isMounted) {
          setError("Nao foi possivel carregar este anuncio.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadAnnouncement()

    return () => {
      isMounted = false
    }
  }, [id, type])

  const pet = announcement?.pet
  const contato = announcement?.contato ?? announcement?.usuario?.contato
  const title =
    type === "adoption" ? "Pet para adocao" : "Achados e perdidos"
  const backTo = type === "adoption" ? "/app/adoption" : "/app/lostfound"
  const imageUrl =
    type === "adoption"
      ? `https://placedog.net/800/600?id=${announcement?.id ?? 30}`
      : `https://placedog.net/800/600?id=${(announcement?.id ?? 30) + 20}`

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">
          <span className="subtitle">{title}</span>
        </h1>
        <Link to={backTo}>
          <Button className="border-2 border-gray-900 bg-primary">
            Voltar
          </Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
          {error}
        </div>
      )}

      <Card className="border-2 border-gray-900 shadow-2xl backdrop-blur-md">
        <CardContent className="grid gap-6 p-6 md:grid-cols-[320px_1fr]">
          {isLoading ? (
            <>
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
            </>
          ) : announcement && pet ? (
            <>
              <div className="overflow-hidden rounded-md border border-gray-900 bg-white">
                <img
                  src={imageUrl}
                  alt={pet.nome ?? "Pet"}
                  className="h-80 w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-5 rounded-md bg-white p-6">
                <div>
                  <p className="text-sm font-semibold uppercase text-orange-700">
                    Anuncio #{announcement.id}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {pet.nome ?? "Pet sem nome"}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {pet.raca ?? getDomainText(pet.especie) ?? "Raca nao informada"}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <DetailRow label="Idade" value={formatAge(pet.idade)} />
                  <DetailRow label="Cor" value={pet.cor} />
                  <DetailRow label="Especie" value={getDomainText(pet.especie)} />
                  <DetailRow label="Porte" value={getDomainText(pet.porte)} />
                  <DetailRow label="Sexo" value={getDomainText(pet.sexo)} />
                  {!isAdoption(announcement) && (
                    <>
                      <DetailRow
                        label="Tipo"
                        value={getDomainText(announcement.tipo)}
                      />
                      <DetailRow
                        label="Situacao"
                        value={getDomainText(announcement.situacao)}
                      />
                    </>
                  )}
                  {isAdoption(announcement) && (
                    <>
                      <DetailRow
                        label="Temperamento"
                        value={getDomainText(announcement.temperamento)}
                      />
                      <DetailRow
                        label="Vacinas"
                        value={announcement.vacinas}
                      />
                    </>
                  )}
                </div>

                {isAdoption(announcement) && announcement.descricao && (
                  <div>
                    <p className="text-sm font-semibold uppercase text-gray-500">
                      Descricao
                    </p>
                    <p className="text-lg text-gray-900">
                      {announcement.descricao}
                    </p>
                  </div>
                )}

                <div className="rounded-md border border-orange-300 bg-orange-50 p-4">
                  <p className="text-sm font-semibold uppercase text-orange-700">
                    Contato
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {contato?.nome ?? announcement.usuario?.nome ?? "Nao informado"}
                  </p>
                  <p className="text-gray-700">
                    {formatPhone(contato?.numeroCelular) ?? "Telefone nao informado"}
                  </p>
                  <p className="text-gray-700">{contato?.email}</p>
                  <p className="text-gray-700">
                    {[contato?.cidade, contato?.uf].filter(Boolean).join(" - ")}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-lg font-semibold text-white">
              Anuncio nao encontrado.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
