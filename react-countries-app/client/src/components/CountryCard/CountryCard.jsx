// src/components/CountryCard/CountryCard.jsx
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CountryCard({ country }) {
    const { name, flags, population, region, capital, cca3 } = country;

    return (
        <Card
            component={RouterLink}
            to={`/country/${cca3}`}
            elevation={3}
            sx={{
                height: '100%',              // <-- fill the parent box
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
            }}
        >
            <CardActionArea
                sx={{
                    flex: 1,                   // <-- stretch to fill
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={flags.svg}
                    alt={`${name.common} flag`}
                    sx={{ flexShrink: 0 }}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <Typography variant="h6" gutterBottom noWrap>
                            {name.common}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Population:</strong> {population.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Region:</strong> {region}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Capital:</strong> {capital?.[0] || '–'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

CountryCard.propTypes = {
    country: PropTypes.shape({
        name:     PropTypes.shape({ common: PropTypes.string.isRequired }).isRequired,
        flags:    PropTypes.shape({ svg: PropTypes.string.isRequired }).isRequired,
        population: PropTypes.number.isRequired,
        region:   PropTypes.string.isRequired,
        capital:  PropTypes.array,
        cca3:     PropTypes.string.isRequired,
    }).isRequired,
};
