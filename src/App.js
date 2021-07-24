import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import useToken from './utils/useToken';
import * as Constants from './constants';
import { Row, Col } from 'react-flexa';
import './App.css';

export default function App() {

    const { token, setToken, removeToken } = useToken();

    const logout = async () => {
        let res = await fetch(Constants.LOGOUT_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        await res.json();
        removeToken();
        window.location.href = "/login"
    }

    return (
        <BrowserRouter>
            {token && <TopNavigation token={token} logout={logout} />}
            <Switch>
                <Route path="/login" render={() => (!token ? <LoginForm setToken={setToken} /> : <Redirect to="/dashboard" />)} />
                <Route path="/dashboard" render={() => (token ? <Dashboard /> : <Redirect to="/login" />)} />
                <Route exact path="/" render={props => <Redirect to="/dashboard" />} />
            </Switch>
        </BrowserRouter>
    );
}

const TopNavigation = ({ token, logout }) => {

    const userNameStyle = {
        marginLeft: 16,
        color: '#485460'
    }

    const avatarStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        marginLeft: '24px'
    }

    const buttonStyle = {
        border: 'none',
        backgroundColor: 'white',
        marginRight: 16,
        color: '#485460',
        fontWeight: 'bold'
    }

    if (!token) return;

    return (
        <div style={{ maxWidth: 1400, margin: 'auto', boxShadow: '0px 0px 16px -2px gray', paddingBottom: '6px', paddingTop: '6px', backgroundColor: 'white', overflow: 'hidden' }}>
            <Row justifyContent="space-between">
                <Col xs={9}>
                    <Row>
                        <img alt="" style={avatarStyle} src={token?.image} />
                        <p style={userNameStyle}>Alex Nguyen</p>
                    </Row>
                </Col>
                <button style={buttonStyle} onClick={logout}>Logout</button>
            </Row>
        </div>
    )
}
