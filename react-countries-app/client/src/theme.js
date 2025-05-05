// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#f50057' },
    },
    typography: {
        h5: { fontWeight: 600 },
        body1: { fontSize: '0.9rem' },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: { boxShadow: 'none' }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: { borderRadius: 12 }
            }
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                size: 'small'
            },
            styleOverrides: {
                root: { textTransform: 'none' }
            }
        }
    }
});

export default theme;
