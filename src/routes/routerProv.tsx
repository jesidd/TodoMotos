import { Routes,Route } from "react-router";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Auth/LoginPage";



function RouterProv(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default RouterProv;