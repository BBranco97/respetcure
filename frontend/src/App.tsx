import { PaginaInicial } from "./pages/PaginaInicial";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoverPass } from "./pages/RecoverPass";
import { ChangingPass } from "./pages/ChangingPass";
import AppLayout from "./components/AppLayout";
import LostFound from "./pages/LostFound";
import Profile from "./pages/Profile";
import Home from "./pages/Home";


export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/recoverpass" element={<RecoverPass/>}/>
        <Route path="/app" element={<AppLayout />}>
          <Route path="" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="lostfound" element={<LostFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
