// src/components/CountryCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardMedia, CardContent, Typography, Stack, Chip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function CountryCard({ country }) {
    const { name, flags, population, region, capital, cca3 } = country;

    return (
        <Card
            component={RouterLink}
            to={`/country/${cca3}`}
            sx={{
                height: '100%',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CardMedia
                component="img"
                height="160"
                image={flags.svg}
                alt={`${name.common} flag`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>
                    {name.common}
                </Typography>
                <Stack spacing={0.5}>
                    <Typography variant="body2"><strong>Population:</strong> {population.toLocaleString()}</Typography>
                    <Typography variant="body2"><strong>Region:</strong> {region}</Typography>
                    <Typography variant="body2"><strong>Capital:</strong> {capital?.[0] || '—'}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

CountryCard.propTypes = {
    country: PropTypes.object.isRequired
};
