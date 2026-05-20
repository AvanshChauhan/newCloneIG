import { createElement } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginForm from "./features/auth/LoginForm";
import RegisterForm from "./features/auth/RegisterForm";

export const routes = createBrowserRouter([
    // {
    //     path:'/',
    //     element:createElement(Navigate, { to: '/login', replace: true })
    // },
    {
        path:'/login',
        element:createElement(LoginForm)
    },
    {
        path:'/register',
        element:createElement(RegisterForm)
    },
    // {
    //     path:'*',
    //     element:createElement(Navigate, { to: '/login', replace: true })
    // },
])
