import React, { useState } from "react";
import PropTypes from 'prop-types';
import * as Constants from '../constants';
import { Row } from 'react-flexa';
import FormButton from './FormButton';
import FormInput from './FormInput';

const login = async (credentials) => {
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
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            setProcessing(true);
            const token = await login({
                email: username,
                password: password
            })
            if (token) {
                setToken(token);
                window.location.href = "/dashboard"
            }
        } catch (ex) {
            setProcessing(false);
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
                <Form handleSubmit={handleSubmit} username={username} password={password} setUserName={setUserName} setPassword={setPassword} processing={processing} />
            </div>
        </Row>
    )
}

const Form = ({ setUserName, setPassword, handleSubmit, username, password, processing }) => (
    <form onSubmit={handleSubmit} encType="application/x-www-form-urlencoded">
        <Row>
            <FormInput placeholder="email" value={username} type="text" onChange={e => setUserName(e.target.value)} />
        </Row>
        <Row>
            <FormInput placeholder="password" value={password} type="password" onChange={e => setPassword(e.target.value)} />
        </Row>
        <Row>
            <FormButton title={"Login"} processing={processing} />
        </Row>
    </form>
);


export default LoginForm;

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};