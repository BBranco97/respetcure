import BackgroundLayout from "@/layouts/BackgroundLayout"
import { toApiUrl } from "@/lib/api"
import { getLoggedUser, type LoggedUser } from "@/lib/session"
import { useEffect, useState } from "react"
import { Outlet, Link, NavLink } from "react-router-dom"

export default function AppLayout() {
  const [user, setUser] = useState<LoggedUser | null>(() => getLoggedUser())
  const userImage =
    toApiUrl(user?.fotoUrl) ||
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"

  useEffect(() => {
    const handleUserUpdate = () => setUser(getLoggedUser())

    window.addEventListener("respetcure:user-updated", handleUserUpdate)

    return () => {
      window.removeEventListener("respetcure:user-updated", handleUserUpdate)
    }
  }, [])

  return (
    <BackgroundLayout>
      <div className="flex min-h-screen flex-col">
        {/* Navbar */}
        <nav className="fixed top-4 right-0 left-0 z-50 mx-auto flex w-[calc(100%-3rem)] max-w-7xl items-center justify-between rounded-full border-2 border-gray-900 bg-card px-6 py-3 text-white shadow-xl backdrop-blur-md">
          <Link
            to="/app"
            className="logo font-bold tracking-tight transition-colors"
          >
            RespetCure
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                `text-md font-medium transition-colors hover:text-orange-800 ${isActive ? "text-orange-800" : "text-white/80"}`
              }
            >
              Início
            </NavLink>
            <NavLink
              to="/app/profile"
              className={({ isActive }) =>
                `text-md font-medium transition-colors hover:text-orange-800 ${isActive ? "text-orange-800" : "text-white/80"}`
              }
            >
              Perfil
            </NavLink>
            <NavLink
              to="/app/lostfound"
              className={({ isActive }) =>
                `text-md font-medium transition-colors hover:text-orange-800 ${isActive ? "text-orange-800" : "text-white/80"}`
              }
            >
              Achados e Perdidos
            </NavLink>
            <NavLink
              to="/app/adoption"
              className={({ isActive }) =>
                `text-md font-medium transition-colors hover:text-orange-800 ${isActive ? "text-orange-800" : "text-white/80"}`
              }
            >
              Adoção
            </NavLink>
            <NavLink
              to="/app/adoption-profile"
              className={({ isActive }) =>
                `text-md font-medium transition-colors hover:text-orange-800 ${isActive ? "text-orange-800" : "text-white/80"}`
              }
            >
              Perfil de Adoção
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-full border border-white/30">
              <img src={userImage} alt="User profile" />
            </div>
          </div>
        </nav>

        {/* Conteúdo renderizado abaixo */}
        <div className="p-4 pt-32">
          <Outlet />
        </div>
      </div>
    </BackgroundLayout>
  )
}
