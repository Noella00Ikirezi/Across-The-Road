import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';


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

    const logout = useCallback(() => {
        setAuthToken(null);
        setUserId(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
    }, [setAuthToken, setUserId]);

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (authToken) {
                const decodedToken = jwtDecode(authToken);
                const currentTime = Date.now() / 12000;

                if (decodedToken.exp < currentTime) {
                    logout();
                }
            }
        };

        checkTokenExpiration();
    }, [authToken, logout]);

    return (
        <AuthContext.Provider value={{ authToken, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
