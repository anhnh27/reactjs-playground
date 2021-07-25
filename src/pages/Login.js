import React from "react";
import LoginForm from '../components/LoginForm';

const Login = ({ setToken, loginHandler }) => {
    return (
        <LoginForm setToken={setToken} loginHandler={loginHandler} />
    )
}

export default Login;