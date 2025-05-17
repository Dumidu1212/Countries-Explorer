import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import CountryCard from '../CountryCard';
export default function CountriesGrid({ countries }) {
    if (!countries.length) return <Typography>No countries found.</Typography>;
    return (
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', sm:'repeat(2,1fr)', md:'repeat(3,1fr)', lg:'repeat(5,1fr)' }, gap:3 }}>
            {countries.map(c=><CountryCard key={c.cca3} country={c}/>) }
        </Box>
    );
}
CountriesGrid.propTypes = { countries:PropTypes.array.isRequired };
