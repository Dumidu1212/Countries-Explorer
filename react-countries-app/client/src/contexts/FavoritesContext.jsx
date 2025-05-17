import React, {
    createContext, useState, useEffect, useContext,
} from 'react';
import { AuthContext } from './AuthContext';

// helper
const keyFor = (username) => `favs_${username || 'guest'}`;

export const FavoritesContext = createContext({
    list: [],
    toggle: () => {},
});

export function FavoritesProvider({ children }) {
    const { user } = useContext(AuthContext);          // ← current user
    const [list, setList] = useState([]);

    // load whenever the user changes
    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem(keyFor(user?.name))) || [];
        setList(favs);
    }, [user]);

    const toggle = (cca3) => {
        setList((prev) => {
            const next = prev.includes(cca3)
                ? prev.filter((c) => c !== cca3)
                : [...prev, cca3];
            localStorage.setItem(keyFor(user?.name), JSON.stringify(next));
            return next;
        });
    };

    return (
        <FavoritesContext.Provider value={{ list, toggle }}>
            {children}
        </FavoritesContext.Provider>
    );
}
