// src/components/Header/Header.jsx
import React, { useContext } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    useMediaQuery,
} from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { ColorModeContext } from '../../contexts/ColorModeContext';
import { AuthButton }       from '../AuthButton/AuthButton.jsx';
import logoSrc              from '../../assets/logo.png';

export default function Header() {
    const theme   = useTheme();
    const downSm  = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggle } = useContext(ColorModeContext);
    const navigate = useNavigate();

    const bgColour = theme.palette.mode === 'light'
        ? theme.palette.success.main
        : theme.palette.success.dark;

    /* Click-handler ensures **replace** nav to “/” so history isn’t polluted */
    const goHome = (evt) => {
        evt.preventDefault();           // stop default <a> behaviour
        navigate('/', { replace: true });
    };

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{ bgcolor: bgColour, py: downSm ? 0 : 1 }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>

                {/* ── Logo + Title ─────────────────────────────────────────────── */}
                <Box
                    component={RouterLink}
                    to="/"
                    onClick={goHome}                     /* ← always go to / */
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        color: 'inherit',
                    }}
                >
                    <Box
                        component="img"
                        src={logoSrc}
                        alt="Logo"
                        sx={{ height: 40, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ fontWeight: 700 }}
                    >
                        Countries&nbsp;Explorer
                    </Typography>
                </Box>

                {/* ── Auth button + Light/Dark toggle ─────────────────────────── */}
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <AuthButton />
                    <IconButton
                        onClick={toggle}
                        sx={{
                            bgcolor: alpha(theme.palette.common.white, 0.2),
                            '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.3) },
                        }}
                        color="inherit"
                        aria-label="toggle light/dark mode"
                    >
                        {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
