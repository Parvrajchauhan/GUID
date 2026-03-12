import {createBrowserRouter } from 'react-router';
import Signup from './features/auth/pages/signup';  
import Login from './features/auth/pages/login';
import Protected from './features/auth/components/protected';
import LogoutButton from './features/auth/components/logout';

export const Router= createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/",
        element:(<Protected><h1>Home Page</h1><LogoutButton/></Protected>)
    }
])