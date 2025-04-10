import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TareasScreen } from "./components/screens/BackLogScreen/BackLogScreen";
import { SprintScreen } from "./components/screens/SprintScreen/SprintScreen";
import { sprintStore } from "./store/sprintStore";

const App = () => {
    const sprintActivo = sprintStore((state) => state.sprintActivo); // Obtener sprint activo desde Zustand
  
    return (
      <Router>
        <Routes>
          {/* Página inicial redirige al backlog */}
          <Route path="/" element={<Navigate to="/backlog" />} />
  
          {/* Página del Backlog */}
          <Route path="/backlog" element={<TareasScreen />} />
  
          {/* Página de Sprint dinámico */}
          <Route path="/sprint/:id" element={<SprintScreen />} />
        </Routes>
      </Router>
    );
  };
  
  export default App;
  