// src/components/Header/Header.jsx
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Header() {
    const { dark, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Where in the world?
                </h1>
                <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 text-gray-900 dark:text-white hover:opacity-75"
                >
                    {dark ? <FiSun /> : <FiMoon />}
                    <span className="text-sm">{dark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </header>
    );
}
