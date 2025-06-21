import React from "react";
import LOCALSTORAGE_KEYS from "../../constants/localstorage";
import { Navigate, Outlet } from "react-router-dom";


// para poder crear una ruta de seguiridad que nadie que no este loguedo salte el login
const AuthProtectRoute =()=>{
    const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
    if(auth_token){
        //voy a la siguiente ruta
        return <Outlet/>
    }
    else{
        return <Navigate to={"/login"}/>
    }
   
}

export default AuthProtectRoute;