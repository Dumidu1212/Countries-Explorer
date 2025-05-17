// src/components/CountryGrid.jsx
import React from 'react';
import { Grid } from '@mui/material';
import CountryCard from '../CountryCard/CountryCard.jsx';

export default function CountryGrid({ countries }) {
    return (
        <Grid container spacing={3}>
            {countries.map((c) => (
                <Grid key={c.cca3} item xs={12} sm={6} md={4} lg={3}>
                    <CountryCard country={c} />
                </Grid>
            ))}
        </Grid>
    );
}
