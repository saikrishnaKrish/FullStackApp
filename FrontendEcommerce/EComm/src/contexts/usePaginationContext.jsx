import { createContext, useContext, useState } from "react";


const PaginationContext = createContext();

const PaginationProvider = ({children})=>{
        // state var , methods -> are at the same place -> you do not have to pass the props
        const [pageSize, setPageSize] = useState(4);
        const [pageNum, setPageNum] = useState(1);

    const pageProgs={
        pageNum,pageSize,setPageSize,
        setPageNum
    }


    return <PaginationContext.Provider value={pageProgs}>
            {children}
           </PaginationContext.Provider>
}


// customHook
export const usePaginationContext=()=>{
    return useContext(PaginationContext)
}

export default PaginationProvider;

