import { TareasScreen } from "./components/screens/BackLogScreen/BackLogScreen";
import { SprintScreen } from "./components/screens/SprintScreen/SprintScreen";
import { sprintStore } from "./store/sprintStore";

const App = () => {
    const sprintActivo = sprintStore((state) => state.sprintActivo); // Simplificando Zustand

    return (
        <div>
            {sprintActivo ? <SprintScreen sprint={sprintActivo} /> : <TareasScreen />}
        </div>
    );
};

export default App;