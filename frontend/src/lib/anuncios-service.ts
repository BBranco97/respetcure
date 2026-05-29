import { api } from "./api"

type PageResponse<T> = {
  content?: T[]
}

export type DomainValue = {
  id?: number
  descricao?: string | null
  nome?: string | null
}

export type BackendContato = {
  nome?: string | null
  cidade?: string | null
  uf?: string | null
  numeroCelular?: string | null
  email?: string | null
}

export type BackendUsuario = {
  id: number
  nome?: string | null
  contato?: BackendContato | null
  ufUsuario?: string | null
  fotoUrl?: string | null
}

type BackendPet = {
  id?: number
  nome?: string | null
  raca?: string | null
  cor?: string | null
  idade?: number | null
  especie?: DomainValue | null
  porte?: DomainValue | null
  sexo?: DomainValue | null
}

type BaseAnuncio = {
  id: number
  usuario?: BackendUsuario | null
  contato?: BackendContato | null
  pet?: BackendPet | null
}

export type AdoptionAnnouncement = BaseAnuncio & {
  descricao?: string | null
  temperamento?: DomainValue | null
  vacinas?: string | null
}

export type LostFoundAnnouncement = BaseAnuncio & {
  situacao?: DomainValue | null
  tipo?: DomainValue | null
}

export type PetCardData = {
  id: string
  name: string
  age: string
  breed: string
  image: string
  description: string
  status: "adoption" | "lost" | "found"
  contact?: string
  usuarioId?: number
}

const fallbackImages = {
  adoption: "https://placedog.net/400/400?id=20",
  lost: "https://placedog.net/400/400?id=21",
  found: "https://placedog.net/400/400?id=22",
}

function getDomainText(value?: DomainValue | null) {
  return value?.descricao ?? value?.nome ?? ""
}

function formatPhone(phone?: string | null) {
  if (!phone) {
    return undefined
  }

  const digits = phone.replace(/\D/g, "")

  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return phone
}

function formatAge(age?: number | null) {
  if (age == null) {
    return "Idade nao informada"
  }

  return age === 1 ? "1 ano" : `${age} anos`
}

function pageContent<T>(data: PageResponse<T> | T[]) {
  return Array.isArray(data) ? data : data.content ?? []
}

export async function listarAdocoes(size = 12) {
  const response = await api.get<PageResponse<AdoptionAnnouncement>>(
    "/adocoes",
    { params: { size } }
  )

  return pageContent(response.data)
}

export async function listarAchadosPerdidos(size = 12) {
  const response = await api.get<PageResponse<LostFoundAnnouncement>>(
    "/achados-perdidos",
    { params: { size } }
  )

  return pageContent(response.data)
}

export async function buscarAdocaoPorId(id: string | number) {
  const response = await api.get<AdoptionAnnouncement>(`/adocoes/${id}`)

  return response.data
}

export async function buscarAchadoPerdidoPorId(id: string | number) {
  const response = await api.get<LostFoundAnnouncement>(
    `/achados-perdidos/${id}`
  )

  return response.data
}

export { getDomainText, formatPhone, formatAge }

export function mapAdocaoToPet(anuncio: AdoptionAnnouncement): PetCardData {
  const pet = anuncio.pet
  const contato = anuncio.contato ?? anuncio.usuario?.contato

  return {
    id: String(anuncio.id),
    name: pet?.nome ?? "Pet sem nome",
    age: formatAge(pet?.idade),
    breed: pet?.raca ?? getDomainText(pet?.especie) ?? "Raca nao informada",
    image: fallbackImages.adoption,
    description: anuncio.descricao ?? "Descricao nao informada.",
    status: "adoption",
    contact: formatPhone(contato?.numeroCelular),
    usuarioId: anuncio.usuario?.id,
  }
}

export function mapAchadoPerdidoToPet(
  anuncio: LostFoundAnnouncement
): PetCardData {
  const pet = anuncio.pet
  const contato = anuncio.contato ?? anuncio.usuario?.contato
  const tipo = getDomainText(anuncio.tipo).toLowerCase()
  const situacao = getDomainText(anuncio.situacao).toLowerCase()
  const isFound = tipo.includes("achad") || situacao.includes("achad")

  return {
    id: String(anuncio.id),
    name: pet?.nome ?? (isFound ? "Pet encontrado" : "Pet perdido"),
    age: formatAge(pet?.idade),
    breed: pet?.raca ?? getDomainText(pet?.especie) ?? "Raca nao informada",
    image: isFound ? fallbackImages.found : fallbackImages.lost,
    description: isFound
      ? "Pet encontrado. Entre em contato para mais informacoes."
      : "Pet perdido. Entre em contato para mais informacoes.",
    status: isFound ? "found" : "lost",
    contact: formatPhone(contato?.numeroCelular),
    usuarioId: anuncio.usuario?.id,
  }
}

export function getAnnouncementLocation(anuncio: BaseAnuncio) {
  const contato = anuncio.contato ?? anuncio.usuario?.contato

  return [contato?.cidade, contato?.uf].filter(Boolean).join(" - ")
}
