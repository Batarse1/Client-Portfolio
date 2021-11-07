import React, { useState, useEffect, useContext, createContext } from 'react';
import { useLocalStorage } from '../UseLocalStorage/useLocalStorage';

const API_URL = 'http://localhost:8080';

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [userLocalStorage, setUserLocalStorage] = useLocalStorage('user', null);

    const logIn = async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/users/logIn`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            
            const data = await response.json();

            setUser({token: data.token})
            setUserLocalStorage({token: data.token})

            return {
                error: false,
                message: 'Success'
            };
        }
        catch (error) {
            return {
                error: true,
                message: "Can't connect with server"
            };
        }
    };

    const signUp = async (username, password, confirmPassword) => {
        try {
            const response = await fetch(`${API_URL}/users/signUp`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ username, password, confirmPassword })
            });

            const data = await response.json();

            return data;
        }
        catch (error) {
            return {
                error: true,
                message: "Can't connect with server"
            };
        }
    };

    useEffect(() => {
        setUser(userLocalStorage);
    }, []);

    return {
        user,
        logIn,
        signUp
    };
}