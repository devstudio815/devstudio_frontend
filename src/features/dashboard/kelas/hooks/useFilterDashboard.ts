import { useState } from "react";

export function useFilterDashboard(){
    const [limit,setLimit]  = useState<number>(10)
    const [page,setPage]  = useState<number>(1)
    const [search,setSearch]  = useState<string | undefined>(undefined)

 
    return {
        search :search,
        limit : limit,
        page : page,
        onChangePage : setPage,
        onChangeLimit :  setLimit,
        onChangeSearch :  setSearch,
    }

}