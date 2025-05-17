import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext({
    user: null,      // { name }
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    /* load once */
    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const login = useCallback((u) => {
        localStorage.setItem('user', JSON.stringify(u));
        setUser(u);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
