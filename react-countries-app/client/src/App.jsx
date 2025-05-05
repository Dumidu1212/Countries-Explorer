// src/App.jsx
import React, { useState, useMemo, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import themeDefinition from './theme';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Header from './components/Header/Header';

// Create a context for toggling
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
    const [mode, setMode] = useState('light');

    // Memoize the theme so it updates when `mode` changes
    const theme = useMemo(
        () => ({
            ...themeDefinition,
            palette: { ...themeDefinition.palette, mode },
        }),
        [mode]
    );

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
        }),
        []
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Header />
                    <Box component="main">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/country/:code" element={<CountryDetail />} />
                        </Routes>
                    </Box>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
