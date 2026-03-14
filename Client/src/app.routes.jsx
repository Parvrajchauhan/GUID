import {createBrowserRouter } from 'react-router';
import Signup from './features/auth/pages/signup';  
import Login from './features/auth/pages/login';
import Protected from './features/auth/components/protected';
import LogoutButton from './features/auth/components/logout';
import Input from './features/Report/pages/Input';
import Report from './features/Report/pages/report';

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
    },
    {
        path:"/report",
        element:<Protected><Input/></Protected>
    },
    {
        path:"/data/:reportId",
        element:<Protected><Report/></Protected>
    }
])