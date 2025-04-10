import { Navigate, Route, Routes } from "react-router"
import { BackLogScreen } from "../components/screens/BackLogScreen/BackLogScreen"
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen"

export const AppRouter = () => {
  return (
        <Routes>
          {/* Página inicial redirige al backlog */}
          <Route path="/" element={<Navigate to="/backlog" />} />
  
          {/* Página del Backlog */}
          <Route path="/backlog" element={<BackLogScreen />} />
  
          {/* Página de Sprint dinámico */}
          <Route path="/sprint/:id" element={<SprintScreen />} />
        </Routes>
 )
}
