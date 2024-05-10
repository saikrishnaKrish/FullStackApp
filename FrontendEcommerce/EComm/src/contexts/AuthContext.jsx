import { createContext, useContext, useState } from "react";


const AuthContext = createContext();


const AuthProvider = ({children})=>{
    const [userDetails,setUserDetails ] =useState({});

    const handleLogout = ()=>{
        let allCookies = document.cookie;
        console.log(allCookies)
        setUserDetails({})
    }

    return <AuthContext.Provider  value={{userDetails,setUserDetails,handleLogout}}>
            {children}
    </AuthContext.Provider>
}

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}
export default AuthProvider