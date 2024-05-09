import { createContext, useContext, useState } from "react";


const AuthContext = createContext();


const AuthProvider = ({children})=>{
    const [userDetails,setUserDetails ] =useState(null);


    return <AuthContext.Provider  value={{userDetails,setUserDetails}}>
            {children}
    </AuthContext.Provider>
}

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}
export default AuthProvider