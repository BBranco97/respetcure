import BackgroundLayout from "@/layouts/BackgroundLayout"
import { Outlet, Link } from "react-router-dom"

export default function AppLayout() {
    return (
      <BackgroundLayout>
        <div>
          {/* Navbar */}
          <nav className="flex fixed mx-6 top-0 left-0 right-0 gap-4 justify-center border-x-2 border-b-2 rounded-b-2xl border-gray-900 bg-card p-4 text-white">
            <Link to="/app">Home</Link>
            <Link to="/app/profile">Perfil</Link>
            <Link to="/app/lostfound">Achados e Perdidos</Link>
          </nav>

          {/* Conteúdo renderizado abaixo */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </BackgroundLayout>
    )
}
