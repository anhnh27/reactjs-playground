import React, { useState } from "react";
import PropTypes from 'prop-types';
import * as Constants from '../constants';
import { Row } from 'react-flexa';
import FormButton from './FormButton';
import FormInput from './FormInput';

async function login(credentials) {
    const data = await fetch(Constants.LOGIN_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return await data.json();
}

const LoginForm = ({ setToken }) => {

    const [username, setUserName] = useState('admin');
    const [password, setPassword] = useState('admin');

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await login({
            email: username,
            password: username
        })
        if (token) {
            setToken(token);
            window.location.href = "/dashboard"
        }
    }

    return (
        <Row justifyContent="center" alignItems="center">
            <div style={{
                width: '100%',
                maxWidth: '300px',
                backgroundColor: 'whitesmoke',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px 1px silver',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <p style={{ fontSize: '22px', fontWeight: 'bold', marginBlockStart: 0, marginBlockEnd: 0, color: '#485460' }}>{"Login"}</p>
                <Form handleSubmit={handleSubmit} username={username} password={password} setUserName={setUserName} setPassword={setPassword} />
            </div>
        </Row>
    )
}

const Form = ({ setUserName, setPassword, handleSubmit, username, password }) => (
    <form onSubmit={handleSubmit} encType="application/x-www-form-urlencoded">
        <Row>
            <FormInput placeholder="email" value={username} type="text" onChange={e => setUserName(e.target.value)} />
        </Row>
        <Row>
            <FormInput placeholder="password" value={password} type="password" onChange={e => setPassword(e.target.value)} />
        </Row>
        <Row>
            <FormButton title="Login" />
        </Row>
    </form>
);


export default LoginForm;

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};