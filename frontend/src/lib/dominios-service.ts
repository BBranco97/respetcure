import { api } from "./api"
import type { DomainValue } from "./anuncios-service"

export async function listarEspecies() {
  const response = await api.get<DomainValue[]>("/dominios/especies")

  return response.data
}

export async function listarPortes() {
  const response = await api.get<DomainValue[]>("/dominios/portes")

  return response.data
}

export async function listarSexos() {
  const response = await api.get<DomainValue[]>("/dominios/sexos")

  return response.data
}

export async function listarTemperamentos() {
  const response = await api.get<DomainValue[]>("/dominios/temperamentos")

  return response.data
}

export async function listarTipos() {
  const response = await api.get<DomainValue[]>("/dominios/tipos")

  return response.data
}

export async function listarSituacoes() {
  const response = await api.get<DomainValue[]>("/dominios/situacoes")

  return response.data
}
