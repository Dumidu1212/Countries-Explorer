import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Header() {
    const { dark, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    Where in the world?
                </h1>
                <button
                    onClick={toggleTheme}
                    className="flex items-center text-gray-900 dark:text-white hover:opacity-75 focus:outline-none"
                    aria-label="Toggle dark mode"
                >
                    {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
                    <span className="ml-2 text-sm">
            {dark ? 'Light Mode' : 'Dark Mode'}
          </span>
                </button>
            </div>
        </header>
    );
}
