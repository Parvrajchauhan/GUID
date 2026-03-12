import { useAuth } from "../hooks/useAuth";
import React,{useEffect} from "react";
import { Navigate } from "react-router";
import { getProfile } from "../servies/auth.api";

const Protected= ({children})=>{
    const {Loader,User}=useAuth();

    
    if (Loader) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-gray-900">
          <h1 className="text-2xl font-semibold text-white animate-pulse">
            Loading...
          </h1>
        </main>
    )}

    if(!User){
        return <Navigate to={"/login"}/>
    }

    return children
}

export default Protected