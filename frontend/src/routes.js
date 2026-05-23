import { createElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "./features/auth/LoginForm";
import RegisterForm from "./features/auth/RegisterForm";
import Feed from "./features/post/Feed";
import CreatePost from "./features/post/CreatePost";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:createElement(Feed)
    },
    {
        path:'/login',
        element:createElement(LoginForm)
    },
    {
        path:'/register',
        element:createElement(RegisterForm)
    },
    {
        path:'*',
        element:createElement(Navigate, { to: '/login', replace: true })
    },
    {
        path:'/create-post',
        element:createElement(CreatePost)
    }
])
