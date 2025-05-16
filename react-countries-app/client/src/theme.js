import { createTheme } from '@mui/material/styles';

export default function getTheme(mode) {
    // 1) Base theme with palette & component overrides
    const base = createTheme({
        palette: {
            mode,              // 'light' or 'dark'
            primary: { main: '#1976d2' },
            secondary: { main: '#f50057' },
        },
        components: {
            MuiAppBar: { styleOverrides: { root: { boxShadow: 'none' } } },
            MuiCard:   { styleOverrides: { root: { borderRadius: 12 } } },
            MuiButton: {
                defaultProps:  { variant: 'contained', size: 'small' },
                styleOverrides:{ root: { textTransform: 'none' } },
            },
        },
    });

    // 2) Merge in typography overrides based on the base theme
    return createTheme(base, {
        typography: {
            h5:   { ...base.typography.h5,   fontWeight: 600 },
            body1:{ ...base.typography.body1, fontSize: '0.9rem' },
        },
    });
}
