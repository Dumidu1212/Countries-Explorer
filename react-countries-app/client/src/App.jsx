import React, { useState, useMemo, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import getTheme from './theme';
import Header from './components/Header/Header';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Footer from './components/Footer/Footer.jsx';

// Create a context so Header (or any child) can flip the mode:
export const ColorModeContext = createContext({ toggle: () => {} });

export default function App() {
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggle: () => setMode(prev => (prev === 'light' ? 'dark' : 'light')),
        }),
        []
    );

    // Re-create the theme object only when `mode` changes:
    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline applies the mode’s global styles */}
                <CssBaseline />
                <BrowserRouter>
                    <Header />
                    <Box component="main">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/country/:code" element={<CountryDetail />} />
                        </Routes>
                    </Box>
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
