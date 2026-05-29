import { api } from "./api"
import type { BackendUsuario, DomainValue } from "./anuncios-service"

export type AdoptionProfilePayload = {
  usuario: { id: number }
  especie: { id: number }
  porte: { id: number }
  idadeMin?: number | null
  idadeMax?: number | null
  temperamento?: { id: number } | null
  sexo?: { id: number } | null
  possuiCrianca?: boolean | null
  possuiPet?: boolean | null
}

export type AdoptionProfileData = {
  id: number
  usuario?: BackendUsuario | null
  especie?: DomainValue | null
  porte?: DomainValue | null
  idadeMin?: number | null
  idadeMax?: number | null
  temperamento?: DomainValue | null
  sexo?: DomainValue | null
  possuiCrianca?: boolean | null
  possuiPet?: boolean | null
}

export async function buscarPerfilAdocaoPorUsuario(usuarioId: number) {
  const response = await api.get<AdoptionProfileData>(
    `/perfis-adocao/usuario/${usuarioId}`
  )

  return response.data
}

export async function criarPerfilAdocao(payload: AdoptionProfilePayload) {
  const response = await api.post<AdoptionProfileData>("/perfis-adocao", payload)

  return response.data
}

export async function atualizarPerfilAdocao(
  id: number,
  payload: AdoptionProfilePayload
) {
  const response = await api.put<AdoptionProfileData>(
    `/perfis-adocao/${id}`,
    payload
  )

  return response.data
}
