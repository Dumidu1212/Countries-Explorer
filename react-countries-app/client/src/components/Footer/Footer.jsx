import React from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';

export default function Footer() {
    const theme = useTheme();
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                mt: 4,
                textAlign: 'center',
                bgcolor: theme.palette.mode === 'light' ? theme.palette.success.main : theme.palette.success.dark,
                color: theme.palette.success.contrastText,
            }}
        >
            <Typography variant="body2" sx={{ color: 'inherit' }}>
                © {year} Countries Explorer. Built with ❤️ using React & Material-UI.{' '}
                <Link
                    href="https://github.com/your-repo"
                    target="_blank"
                    rel="noopener"
                    sx={{ color: 'inherit', textDecoration: 'underline' }}
                >
                    GitHub
                </Link>
            </Typography>
        </Box>
    );
}