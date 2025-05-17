import { createTheme } from '@mui/material/styles';

export default function getTheme(mode) {
    const base = createTheme({
        palette: {
            mode,
            primary: { main: '#4caf50', contrastText: '#fff' }, // green
            success: { main: '#4caf50', contrastText: '#fff' }, // header/footer
        },
        components: {
            MuiAppBar: { styleOverrides: { root: { boxShadow: 'none' } } },
            MuiCard:   { styleOverrides: { root: { borderRadius: 12 } } },
            MuiButton: {
                defaultProps: { variant: 'contained', size: 'small' },
                styleOverrides: { root: { textTransform: 'none' } },
            },
        },
    });

    return createTheme(base, {
        typography: {
            h5:   { ...base.typography.h5,   fontWeight: 600 },
            body1:{ ...base.typography.body1, fontSize: '0.9rem' },
        },
    });
}
