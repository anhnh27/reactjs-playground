import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import useToken from './utils/useToken';
import * as Constants from './constants';
import { TopNavigation } from './components';
import './App.css';

export default function App() {
    const { token, user, setToken, removeToken } = useToken();
    const loginHandler = async (credentials) => {
        const data = await fetch(Constants.LOGIN_URL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        return await data.json();
    }

    const logoutHandler = async () => {
        let res = await fetch(Constants.LOGOUT_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            },
            credentials: 'include'
        });
        await res.json();
        removeToken();
        window.location.href = "/login"
    }

    return (
        <BrowserRouter>
            {token && <TopNavigation user={user} logoutHandler={logoutHandler} />}
            <Switch>
                <Route path="/login" render={() => (!token ? <Login setToken={setToken} loginHandler={loginHandler} /> : <Redirect to="/dashboard" />)} />
                <Route path="/dashboard" render={() => (token ? <Dashboard /> : <Redirect to="/login" />)} />
                <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            </Switch>
        </BrowserRouter>
    );
}


