import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

import getTheme from './theme';

// context providers
import { ColorModeContext } from './contexts/ColorModeContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// UI pieces
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.jsx';

// pages
import Home from './pages/Home.jsx';
import CountryDetail from './pages/CountryDetail.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';

/* ─────────── helper component for protected routes ─────────── */
function Protected({ children }) {
    const { user } = React.useContext(AuthContext);
    return user ? children : <Navigate to="/login" replace />;
}

/* ────────────────────────────────────────────────────────────── */
export default function App() {
    /* colour-mode logic ----------------------------------------------------- */
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
        () => ({ toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')) }),
        [],
    );
    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <AuthProvider>
            <FavoritesProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <BrowserRouter>
                            <Header />
                            <Box component="main">
                                <ErrorBoundary>
                                    <Routes>
                                        <Route index element={<Home />} />
                                        <Route path="/country/:code" element={<CountryDetail />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route
                                            path="/profile"
                                            element={(
                                                <Protected>
                                                    <Profile />
                                                </Protected>
                                            )}
                                        />
                                        {/* fallback */}
                                        <Route path="*" element={<Navigate to="/" replace />} />
                                    </Routes>
                                </ErrorBoundary>
                            </Box>
                            <Footer />
                        </BrowserRouter>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </FavoritesProvider>
        </AuthProvider>
    );
}
