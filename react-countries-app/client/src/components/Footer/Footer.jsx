// components/Footer/Footer.jsx
import React from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';

export default function Footer() {
    const theme = useTheme();
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                mt: 4,
                textAlign: 'center',
                bgcolor: theme.palette.success.main,
                color: theme.palette.success.contrastText,
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} Countries Explorer — Built with&nbsp;
                <Link
                    href="https://github.com/your-repo"
                    target="_blank"
                    rel="noopener"
                    sx={{ color: 'inherit', textDecoration: 'underline' }}
                >
                    React & MUI
                </Link>
            </Typography>
        </Box>
    );
}
