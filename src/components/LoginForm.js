import React, { useState } from "react";
import { Row } from 'react-flexa';
import Button from './Button';
import Input from './Input';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = {
    container: {
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
    },
    title: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBlockStart: 0,
        marginBlockEnd: 0,
        color: '#485460'
    }
}

const LoginForm = ({ setToken, loginHandler }) => {
    const [email, setEmail] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async () => {
        try {
            setProcessing(true);
            const token = await loginHandler({
                email,
                password
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
        (
            <Row justifyContent="center" alignItems="center">
                <div style={styles.container}>
                    <p style={styles.title}>{"Login"}</p>
                    <Row>
                        <Input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Row>
                    <Row>
                        <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Row>
                    <Row>
                        <Button title={"Login"} processing={processing} onClick={handleSubmit} />
                    </Row>
                </div>
            </Row>
        )
    )
};

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default injectSheet(styles)(LoginForm);