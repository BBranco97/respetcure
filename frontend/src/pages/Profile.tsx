import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { PhoneInput, LocationSelect } from "./Register"
import { api } from "@/lib/api"
import {
  listarAchadosPerdidosPorUsuario,
  listarAdocoesPorUsuario,
  mapAchadoPerdidoToPet,
  mapAdocaoToPet,
  type BackendUsuario,
  type PetCardData,
} from "@/lib/anuncios-service"
import { getLoggedUser, updateLoggedUser } from "@/lib/session"

function splitPhone(phone?: string | null) {
  const digits = phone?.replace(/\D/g, "") ?? ""

  return {
    ddd: digits.slice(0, 2),
    phone:
      digits.length > 7
        ? `${digits.slice(2, 7)}-${digits.slice(7)}`
        : digits.slice(2),
  }
}

function PetItem({ pet, detailPath }: { pet: PetCardData; detailPath: string }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Dialog>
      <DialogTrigger>
        <Card className="ww-full cursor-pointer overflow-auto border border-gray-900 bg-transparent shadow-2xl backdrop-blur-xs transition-transform hover:scale-105">
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
          <img
            src={pet.image}
            alt={pet.name}
            className="h-64 w-full rounded-lg object-cover"
          />
          <p className="text-lg text-gray-700">{pet.description}</p>
          <Link to={detailPath}>
            <Button className="w-full border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600">
              Ver anuncio
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EmptyPets({ message }: { message: string }) {
  return (
    <p className="w-full py-6 text-center text-lg font-semibold text-white">
      {message}
    </p>
  )
}

export default function Profile() {
  const loggedUser = getLoggedUser()
  const [currentUser, setCurrentUser] = useState<BackendUsuario | null>(null)
  const [userImage, setUserImage] = useState<string | null>(
    loggedUser?.fotoUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  )
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(loggedUser?.nome ?? "")
  const [email, setEmail] = useState(loggedUser?.email ?? "")
  const [ddd, setDdd] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedUf, setSelectedUf] = useState(loggedUser?.ufUsuario ?? "")
  const [selectedCidade, setSelectedCidade] = useState("")
  const [userAdoptionPets, setUserAdoptionPets] = useState<PetCardData[]>([])
  const [userLostFoundPets, setUserLostFoundPets] = useState<PetCardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  function fillUserFields(user: BackendUsuario) {
    const phoneParts = splitPhone(user.contato?.numeroCelular)

    setCurrentUser(user)
    setName(user.nome ?? "")
    setEmail(user.contato?.email ?? loggedUser?.email ?? "")
    setDdd(phoneParts.ddd)
    setPhone(phoneParts.phone)
    setSelectedUf(user.contato?.uf ?? user.ufUsuario ?? "")
    setSelectedCidade(user.contato?.cidade ?? "")
    setUserImage(user.fotoUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix")
  }

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      if (!loggedUser?.id) {
        setError("Faca login para visualizar seu perfil.")
        setIsLoading(false)
        return
      }

      try {
        const [userResponse, adocoes, achadosPerdidos] = await Promise.all([
          api.get<BackendUsuario>(`/usuarios/${loggedUser.id}`),
          listarAdocoesPorUsuario(loggedUser.id),
          listarAchadosPerdidosPorUsuario(loggedUser.id),
        ])

        if (!isMounted) {
          return
        }

        fillUserFields(userResponse.data)
        setUserAdoptionPets(adocoes.map(mapAdocaoToPet))
        setUserLostFoundPets(achadosPerdidos.map(mapAchadoPerdidoToPet))
      } catch {
        if (isMounted) {
          setError("Nao foi possivel carregar os dados do perfil.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      isMounted = false
    }
  }, [loggedUser?.id])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUserImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!loggedUser?.id) {
      return
    }

    try {
      const response = await api.put<BackendUsuario>(`/usuarios/${loggedUser.id}`, {
        nome: name,
        ufUsuario: selectedUf,
        fotoUrl: userImage,
        contato: {
          nome: name,
          cidade: selectedCidade,
          uf: selectedUf,
          numeroCelular: ddd + phone.replace(/\D/g, ""),
          email,
        },
      })

      fillUserFields(response.data)
      updateLoggedUser({
        id: response.data.id,
        nome: response.data.nome ?? name,
        email: response.data.contato?.email ?? email,
        ufUsuario: response.data.ufUsuario ?? selectedUf,
        fotoUrl: response.data.fotoUrl ?? userImage,
      })
      setIsEditing(false)
      alert("Perfil salvo com sucesso!")
    } catch {
      alert("Erro ao salvar perfil.")
    }
  }

  const handleCancel = () => {
    if (currentUser) {
      fillUserFields(currentUser)
    }

    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-12 p-6">
      {error && (
        <div className="rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
          {error}
        </div>
      )}

      <section className="flex items-center justify-center gap-8">
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-900 bg-gray-200">
            {userImage && (
              <img
                src={userImage}
                alt="User"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <label className="mt-2 cursor-pointer text-sm font-semibold text-white hover:underline">
            Alterar Imagem
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <Card className="w-2xl border-2 border-gray-900 p-6 shadow-xl backdrop-blur-md">
          {isLoading ? (
            <Skeleton className="h-56 w-full" />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4">
                  <Label className="w-24 text-xl font-semibold text-white">
                    Nome
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly={!isEditing}
                    className={`border-gray-900 bg-white ${
                      isEditing ? "opacity-100" : "opacity-50"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label className="w-24 text-xl font-semibold text-white">
                    E-mail
                  </Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={!isEditing}
                    className={`border-gray-900 bg-white ${
                      isEditing ? "opacity-100" : "opacity-50"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Label className="w-24 text-xl font-semibold text-white">
                    Celular
                  </Label>
                  <PhoneInput
                    ddd={ddd}
                    setDdd={setDdd}
                    phone={phone}
                    setPhone={setPhone}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <LocationSelect
                    selectedUf={selectedUf}
                    setSelectedUf={setSelectedUf}
                    selectedCidade={selectedCidade}
                    setSelectedCidade={setSelectedCidade}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              {!isEditing ? (
                <Button
                  className="mt-4 border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Perfil
                </Button>
              ) : (
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
                    onClick={handleSave}
                  >
                    Salvar
                  </Button>
                  <Button
                    className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-400"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </>
          )}
        </Card>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            <span className="subtitle">Meus Pets para Adocao</span>
          </h2>
          <Link to="/app/adoption/new">
            <Button className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600">
              + Adicionar Pet
            </Button>
          </Link>
        </div>
        <Card className="relative border-2 border-gray-900 p-6 shadow-2xl backdrop-blur-md">
          <CardContent className="flex flex-wrap justify-center gap-4">
            {isLoading ? (
              <Skeleton className="h-44 w-full" />
            ) : userAdoptionPets.length === 0 ? (
              <EmptyPets message="Voce ainda nao cadastrou pets para adocao." />
            ) : (
              userAdoptionPets.map((pet) => (
                <div key={pet.id} className="w-fit">
                  <PetItem pet={pet} detailPath={`/app/adoption/${pet.id}`} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            <span className="subtitle">Meus Pets Achados e Perdidos</span>
          </h2>
          <Link to="/app/lostfound/new">
            <Button className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600">
              + Adicionar Pet
            </Button>
          </Link>
        </div>
        <Card className="relative max-w-4xl border-2 border-gray-900 p-6 shadow-2xl backdrop-blur-md">
          <CardContent className="flex w-full flex-wrap justify-center gap-4">
            {isLoading ? (
              <Skeleton className="h-44 w-full" />
            ) : userLostFoundPets.length === 0 ? (
              <EmptyPets message="Voce ainda nao cadastrou pets achados ou perdidos." />
            ) : (
              userLostFoundPets.map((pet) => (
                <div key={pet.id} className="w-fit">
                  <PetItem pet={pet} detailPath={`/app/lostfound/${pet.id}`} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
