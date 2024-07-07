import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    const login = (token, userId) => {
        setAuthToken(token);
        setUserId(userId);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
    };

    const logout = () => {
        setAuthToken(null);
        setUserId(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ authToken, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
