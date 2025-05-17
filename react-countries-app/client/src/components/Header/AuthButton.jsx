import React, { useState, useContext } from 'react';
import {
    Button, Dialog, DialogContent, DialogActions, TextField, useTheme,
} from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthButton() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user, login, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const btnSx = {
        px: 2,
        fontWeight: 600,
        color: 'common.white',
        borderColor: 'common.white',
        '&:hover': {
            backgroundColor:
                theme.palette.mode === 'light'
                    ? 'rgba(255,255,255,0.15)'
                    : 'rgba(255,255,255,0.25)',
            borderColor: 'common.white',
        },
    };

    if (user) {
        return (
            <Button
                variant="outlined"
                onClick={() => {
                    logout();
                    navigate('/');
                }}
                sx={btnSx}
            >
                Logout&nbsp;({user.name})
            </Button>
        );
    }

    return (
        <>
            <Button variant="outlined" sx={btnSx} onClick={() => setOpen(true)}>
                Login
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Your name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        disabled={!name.trim()}
                        onClick={() => {
                            login({ name: name.trim() });
                            setOpen(false);
                            navigate('/profile');
                        }}
                    >
                        Sign In
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
