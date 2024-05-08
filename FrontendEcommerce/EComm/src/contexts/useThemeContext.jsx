import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();


const ThemeProvider = ({children})=>{

    const [theme,setTheme]=useState("light");
    const toggleTheme =()=>{
        const newTheme = theme=="light"?"dark":"light";
        setTheme(newTheme);
    }

    return <ThemeContext.Provider value={{toggleTheme,theme}}>
             {children}
           </ThemeContext.Provider>

}

export const useThemeContext = ()=> { 

   return useContext(ThemeContext);
    
} 
export default ThemeProvider;