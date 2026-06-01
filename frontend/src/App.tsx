import { PaginaInicial } from "./pages/PaginaInicial"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { RecoverPass } from "./pages/RecoverPass"
import { ChangingPass } from "./pages/ChangingPass"
import AppLayout from "./components/AppLayout"
import LostFound from "./pages/LostFound"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import Adoption from "./pages/Adoption"
import AnnouncementDetails from "./pages/AnnouncementDetails"
import AdoptionProfile from "./pages/AdoptionProfile"
import MapaAchadosPerdidos from "./pages/MapaAchadosPerdidos.tsx";
import NewAdoption from "./pages/NewAdoption"
import NewLostFound from "./pages/NewLostFound"

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recoverpass" element={<RecoverPass />} />
        <Route path="/changingpass" element={<ChangingPass />} />
        <Route path="/redefinir-senha" element={<ChangingPass />} />
        <Route path="/app" element={<AppLayout />}>
          <Route path="" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="lostfound" element={<LostFound />} />
          <Route path="lostfound/new" element={<NewLostFound />} />
          <Route path="lostfound/:id" element={<AnnouncementDetails type="lostfound" />} />
          <Route path="adoption" element={<Adoption />} />
          <Route path="adoption/new" element={<NewAdoption />} />
          <Route path="adoption/:id" element={<AnnouncementDetails type="adoption" />} />
          <Route path="adoption-profile" element={<AdoptionProfile />} />
          <Route path="mapa" element={<MapaAchadosPerdidos />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
