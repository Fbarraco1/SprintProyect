import { useParams } from "react-router-dom";
import { useSprint } from "../../../hooks/useSprint";
import { Sprint } from "../../ui/Sprint/Sprint";

export const SprintScreen = () => {
  const { id } = useParams();
  const { sprints } = useSprint();
  const sprint = sprints.find((s) => s.id === id);

  return sprint ? <Sprint sprint={sprint} /> : <p>Cargando sprint...</p>;
};
