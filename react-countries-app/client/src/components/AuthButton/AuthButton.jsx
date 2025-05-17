import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

export function AuthButton() {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        return (
            <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                size="small"
                sx={{ color: 'common.white', borderColor: 'common.white' }}
            >
                Login
            </Button>
        );
    }

    return (
        <Typography
            variant="body2"
            sx={{ cursor: 'pointer', color: 'common.white' }}
            onClick={logout}
        >
            Logout&nbsp;({user.name})
        </Typography>
    );
}
