import React, { useState, useContext } from 'react';
import {
    Container, Paper, TextField, Button, Stack, Typography,
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [name, setName]       = useState('');
    const [pass, setPass]       = useState('');
    const [err,  setErr]        = useState('');
    const { login }             = useContext(AuthContext);
    const navigate              = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !pass.trim()) return setErr('Both fields are required');

        // 📝 in a real app validate against a backend …
        login({ name });              // store “user” object
        navigate('/');                // back to home
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                        {err && <Typography color="error">{err}</Typography>}
                        <Button type="submit" variant="contained">Log in</Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}
