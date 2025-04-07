// import { ISprint } from "../../../types/ISprint";
import { Header } from "../../ui/header/Header";
import SideBar from "../../ui/sideBar/SideBar";
import { Sprint } from "../../ui/Sprint/Sprint";
import styles from'./SprintScreen.module.css';

// interface SprintScreenProps {
//     sprint: ISprint;
// }

export const SprintScreen = () => {
    return (
        <div>
            <Header />
            <div className={styles.mainContainer}>
                <SideBar />
                <Sprint />
            </div>
        </div>
    );
};