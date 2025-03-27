import styles from'./TareasScreen.module.css';
import { Header } from "../ui/header/Header";
import { ListTareas } from "../ui/ListTareas/ListTareas";
import SideBar from "../ui/sideBar/SideBar";


export const TareasScreen = () => {

  return (
    <div>
      <Header/>
      <div className={styles.mainContainer}>
      <SideBar />
      <ListTareas />
    </div>

    </div>
  )
}
