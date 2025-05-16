import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeContext } from '../../App';
import logoSrc from '../../assets/logo.png';

export default function Header() {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggle } = useContext(ColorModeContext);

    // Determine AppBar background based on light/dark mode
    const bgColor = theme.palette.mode === 'light'
        ? theme.palette.success.main
        : theme.palette.success.dark;

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{
                pb: isSm ? 0 : 1,
                pt: isSm ? 0 : 1,
                bgcolor: bgColor,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {/* Logo + Title */}
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                >
                    <Box
                        component="img"
                        src={logoSrc}
                        alt="Logo"
                        sx={{ height: 40, mr: 1 }}
                    />
                    <Typography variant="h6" noWrap sx={{ color: 'common.white', fontWeight: 700 }}>
                        Countries Explorer
                    </Typography>
                </Box>

                {/* Dark/Light Toggle */}
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
            </Toolbar>
        </AppBar>
    );
}
