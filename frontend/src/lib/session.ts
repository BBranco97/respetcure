export interface LoggedUser {
  id: number
  nome: string
  email?: string | null
  ufUsuario?: string | null
  fotoUrl?: string | null
  status?: string | null
}

const STORAGE_KEY = "respetcure:user"

export function saveLoggedUser(user: LoggedUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function getLoggedUser(): LoggedUser | null {
  const storedUser = localStorage.getItem(STORAGE_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as LoggedUser
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function updateLoggedUser(user: LoggedUser) {
  saveLoggedUser(user)
  window.dispatchEvent(new Event("respetcure:user-updated"))
}
