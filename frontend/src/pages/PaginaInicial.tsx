import { Button } from "@/components/ui/button"
import background from "../assets/background.svg"
import { Link } from "react-router-dom"

export function PaginaInicial() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <div>
        
          <nav className="absolute right-0 bottom-0 m-3">
            <ul>
              <li>
                <Link to="/login">
                  <Button
                    className={"m-1 w-32 border-2 border-gray-900 p-4 text-lg"}
                  >
                    Login
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <Button
                    className={"m-1 w-32 border-2 border-gray-900 p-4 text-lg"}
                  >
                    <h1>Cadastre-se</h1>
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>

        
      </div>
    </div>
  )
}
