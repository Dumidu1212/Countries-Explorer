import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, alpha } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeContext } from '../../App';

export default function Header() {
    const theme = useTheme();
    const { toggle } = useContext(ColorModeContext);

    return (
        <AppBar position="sticky" color="inherit" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography
                    component={RouterLink}
                    to="/"
                    variant="h5"
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { opacity: 0.8 },
                    }}
                >
                    Countries Explorer
                </Typography>

                <IconButton
                    onClick={toggle}
                    sx={{
                        bgcolor: alpha(theme.palette.grey[300], 0.3),
                        '&:hover': { bgcolor: alpha(theme.palette.grey[300], 0.5) },
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
