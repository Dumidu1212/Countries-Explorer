// src/components/Header/Header.jsx
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { ColorModeContext } from '../../App';

export default function Header() {
    const theme = useTheme();
    const { toggleColorMode } = useContext(ColorModeContext);

    return (
        <AppBar position="sticky" color="inherit" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h5">REST Countries Explorer</Typography>
                <IconButton
                    onClick={toggleColorMode}
                    sx={{
                        bgcolor: alpha(theme.palette.grey[300], 0.3),
                        '&:hover': { bgcolor: alpha(theme.palette.grey[300], 0.5) },
                    }}
                    aria-label="toggle light/dark mode"
                >
                    {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
