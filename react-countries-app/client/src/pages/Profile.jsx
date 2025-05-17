import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { Typography, Box } from '@mui/material';
import CountryGrid from '../components/CountryGrid/CountryGrid';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const { list } = useContext(FavoritesContext);

    if (!user) return null;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Welcome, {user.name} 🎉</Typography>
            <Typography variant="h6" gutterBottom>Your Favorites ({list.length})</Typography>
            <CountryGrid countries={list} />
        </Box>
    );
}
