import { useState } from 'react';

const getUser = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
}

export const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
};

function useToken() {
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setUser(userToken)
        setToken(userToken.token);
    };

    const removeToken = () => {
        sessionStorage.removeItem('token');
        setToken();
    }

    return {
        token,
        user,
        setToken: saveToken,
        removeToken
    }
}

export default useToken;