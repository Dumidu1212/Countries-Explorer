import React from 'react';
import Header from './components/Header/Header';
import Home from './pages/Home';

export default function App() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Header />
            <Home />
        </div>
    );
}
