import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Initialize from localStorage (or default to light)
    const [dark, setDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // Whenever `dark` changes, add/remove the .dark class on <html>
    useEffect(() => {
        const root = window.document.documentElement;
        if (dark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    const toggleTheme = () => setDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
