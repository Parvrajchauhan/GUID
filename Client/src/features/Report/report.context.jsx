import { createContext,useState} from "react";

export const ReportContext=createContext();

export const ReportProvider=({children})=>{
    const [Report,setReport]=useState(null);
    const [Loader,setLoader]=useState(false);
    const [Reports,setReports]=useState([]);


    return (
        <ReportContext.Provider value={{Report,setReport,Loader,setLoader,Reports,setReports}}>
            {children}
        </ReportContext.Provider>
    )
}