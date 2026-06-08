import axios from "axios"

const apiHost = window.location.hostname || "localhost"
const apiBaseUrl = `http://${apiHost}:8080`

export const api = axios.create({
  baseURL: apiBaseUrl,
})

export function toApiUrl(url?: string | null) {
  if (!url) {
    return ""
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url
  }

  return `${apiBaseUrl}${url.startsWith("/") ? url : `/${url}`}`
}
