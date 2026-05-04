import { PaginaInicial }
    from "./pages/PaginaInicial"

import { Login }
    from "./pages/Login"

import { Register }
    from "./pages/Register"

import { RecoverPass }
    from "./pages/RecoverPass"

import { ResetPass }
    from "./pages/ResetPass"

import {

    BrowserRouter as Router,

    Routes,

    Route

} from "react-router-dom"


export function App() {

    return (

        <Router>

            <Routes>

                <Route

                    path="/"

                    element={<PaginaInicial />}
                />

                <Route

                    path="/login"

                    element={<Login />}
                />

                <Route

                    path="/register"

                    element={<Register />}
                />

                <Route

                    path="/recoverpass"

                    element={<RecoverPass />}
                />

                <Route

                    path="/redefinir-senha"

                    element={<ResetPass />}
                />

            </Routes>

        </Router>
    )
}

export default App