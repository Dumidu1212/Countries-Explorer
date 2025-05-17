import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Fade,
} from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FavoritesContext } from '../../contexts/FavoritesContext.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';

export default function CountryCard({ country }) {
    const {
        name, flags, population, region, capital, cca3,
    } = country;

    const location               = useLocation();
    const { user }               = useContext(AuthContext);
    const { list, toggle }       = useContext(FavoritesContext);
    const isFav                  = list.includes(cca3);

    return (
        <Card
            sx={{
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
            }}
        >
            {/* whole card navigates – we keep current search params in history */}
            <RouterLink
                to={`/country/${cca3}`}
                state={{ from: location }}
                style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            >
                <CardMedia
                    component="img"
                    height="160"
                    image={flags.svg}
                    alt={`${name.common} flag`}
                />
                <CardContent>
                    <Typography variant="h6" gutterBottom noWrap>
                        {name.common}
                    </Typography>
                    <Typography variant="body2"><strong>Population:</strong> {population.toLocaleString()}</Typography>
                    <Typography variant="body2"><strong>Region:</strong> {region}</Typography>
                    <Typography variant="body2"><strong>Capital:</strong> {capital?.[0] || '—'}</Typography>
                </CardContent>
            </RouterLink>

            {/* favourite star (only visible when a user is signed in) */}
            {user && (
                <Fade in>
                    <IconButton
                        size="small"
                        onClick={() => toggle(cca3)}
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'background.paper' },
                        }}
                    >
                        {isFav ? <Star color="warning" /> : <StarOutline />}
                    </IconButton>
                </Fade>
            )}
        </Card>
    );
}

CountryCard.propTypes = {
    country: PropTypes.object.isRequired,
};
