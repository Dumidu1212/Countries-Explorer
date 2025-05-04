// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';

export default function App() {
    return (
        <BrowserRouter>
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/country/:code" element={<CountryDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
