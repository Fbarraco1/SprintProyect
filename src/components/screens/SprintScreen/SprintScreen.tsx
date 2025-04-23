import { useParams } from "react-router-dom";
import { useSprint } from "../../../hooks/useSprint";
import { Sprint } from "../../ui/Sprint/Sprint";
import styles from "./SprintScreen.module.css";
import { Header } from "../../ui/header/Header";
import SideBar from "../../ui/sideBar/SideBar";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";

export const SprintScreen = () => {
  const { id } = useParams();
  const { sprints } = useSprint();
  const [sprint, setSprint] = useState<ISprint| null>(null);
  useEffect(() => {
    const data =sprints.find((s) => s.id === id)
    console.log(id)
    if (data)setSprint(data);
    console.log(data)
  },[id]);

  return (
    <div>
      <Header/>
      <div className={styles.mainContainer}>
        <SideBar />
        <div className={styles.contentContainer}>
          {sprint ? <Sprint sprint={sprint} /> : <p>Cargando sprint...</p>}
        </div>
      </div>
    </div>
  );
};
