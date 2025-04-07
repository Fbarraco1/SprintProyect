import { Route, Routes } from "react-router-dom"
import { BackLogScreen } from "../components/screens/BackLogScreen/BackLogScreen"
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen"



export const AppRouter = () => {

  return (
    <>
    <Routes>

        <Route path="/" element={<BackLogScreen/>}></Route>
        <Route path="/sprint" element={<SprintScreen/>} />
    </Routes>
  
    </>
  )
}
