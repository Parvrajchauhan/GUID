import { createContext,useState, useEffect } from "react";
import { getProfile } from "./service/auth.api";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [User,setUser]=useState(null);
    const [Loader,setLoader]=useState(true);

    useEffect(() => {

    const checkAuth = async () => {
      try {

        const data = await getProfile();

        setUser(data.user);

      } catch (err) {

        setUser(null);

      } finally {

        setLoader(false);

      }
    };
    checkAuth();

  }, []);


    return (
        <AuthContext.Provider value={{User,setUser,Loader,setLoader}}>
            {children}
        </AuthContext.Provider>
    )
}