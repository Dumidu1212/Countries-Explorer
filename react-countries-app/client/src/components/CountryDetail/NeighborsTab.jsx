import React from 'react';
import { Stack, Chip, Typography, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NeighborsTab({ neighbors }) {
    if (!neighbors?.length) return <Typography>No bordering countries</Typography>;
    return (
        <Stack direction="row" spacing={1} rowGap={1} flexWrap="wrap">
            {neighbors.map(n => (
                <Chip
                    key={n.cca3}
                    avatar={<Avatar src={n.flags.svg} alt={`Flag of ${n.name.common}`} />}
                    label={n.name.common}
                    component={RouterLink}
                    to={`/country/${n.cca3}`}
                    clickable
                />
            ))}
        </Stack>
    );
}
