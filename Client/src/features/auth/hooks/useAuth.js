import { useContext} from "react";
import { AuthContext } from "../auth.context";
import { loginUser,registerUser,logoutUser,getProfile} from "../service/auth.api";



export function useAuth() {
    const {User,setUser,Loader,setLoader } = useContext(AuthContext);

    const handleRegister = async ({username,email,password}) => {
        setLoader(true);
        try {
            const data = await registerUser({username,email,password});
            setUser(data.user);
            return data;
        }
        catch (error) {
            console.error('Registration error:', error);
        }
        finally {
            setLoader(false);
        }}

    const handleLogin = async ({email,password}) => {
        setLoader(true);
        try {
            const data = await loginUser({email,password});
            setUser(data.user);
            return data;
        }  
        catch (error) {
            console.error('Login error:', error);
        }
        finally {
            setLoader(false);
        }
    }

    const handleLogout = async () => {
        setLoader(true);
        try {
            await logoutUser();
            setUser(null);
        }
        catch (error) {
            console.error('Logout error:', error);
        }
        finally {
            setLoader(false);
        }
    }
    
    
    return { User,Loader,handleLogin,handleRegister,handleLogout };
}