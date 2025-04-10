import styles from'./BackLogScreen.module.css';
import { Header } from "../../ui/header/Header";
import { ListTareas } from "../../ui/ListTareas/ListTareas";
import SideBar from "../../ui/sideBar/SideBar";

export const BackLogScreen = () => {
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
 