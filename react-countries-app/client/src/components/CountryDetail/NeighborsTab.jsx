import React from 'react';
import {
    Stack, Chip, Avatar, Typography,
} from '@mui/material';
import {
    Link as RouterLink,
    useLocation,
} from 'react-router-dom';

/**
 * Border-country chips.  We forward the original `location.state`
 * (set by CountryCard) so the “Go Back” button in CountryDetail.jsx
 * can always navigate to the correct previous page.
 */
export default function NeighborsTab({ neighbors }) {
    const location = useLocation(); // includes .state.from when present

    if (!neighbors?.length) {
        return <Typography>No bordering countries</Typography>;
    }

    return (
        <Stack direction="row" spacing={1} rowGap={1} flexWrap="wrap">
            {neighbors.map((n) => (
                <Chip
                    key={n.cca3}
                    avatar={<Avatar src={n.flags.svg} alt={`Flag of ${n.name.common}`} />}
                    label={n.name.common}
                    component={RouterLink}
                    to={`/country/${n.cca3}`}
                    state={location.state}     /* ← keep the original “from” */
                    clickable
                />
            ))}
        </Stack>
    );
}
