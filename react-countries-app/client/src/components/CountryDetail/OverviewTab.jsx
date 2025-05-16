import React from 'react';
import {
    Box,
    Stack,
    Typography,
    Tooltip,
    IconButton,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import TimelineIcon from '@mui/icons-material/Timeline';
import LanguageIcon from '@mui/icons-material/Language';
import DomainIcon from '@mui/icons-material/Domain';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet';

export default function OverviewTab({ country }) {
    const {
        name,
        flags,
        population,
        region,
        subregion,
        capital,
        tld,
        languages,
        currencies,
        area,
        timezones,
        latlng,
    } = country;

    const nativeNames =
        Object.values(name.nativeName || {}).map((n) => n.common).join(', ');
    const languageNames = languages ? Object.values(languages).join(', ') : '—';
    const currencyNames = currencies
        ? Object.values(currencies).map(c => c.name).join(', ')
        : '—';
    const density = area ? (population / area).toFixed(2) : 'N/A';

    return (
        <>
            {/* Full-width Map with Popup */}
            <Box sx={{ borderRadius: 2, overflow: 'hidden', mb: 4, height: 400 }}>
                <MapContainer center={latlng} zoom={4} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={latlng}>
                        <Popup>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {name.common}
                            </Typography>
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>

            {/* Second Row: Flag and Details */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                {/* Flag */}
                <Box flex="1" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <img
                        src={flags.svg}
                        alt={`Flag of ${name.common}`}
                        style={{ width: '100%' }}
                    />
                </Box>

                {/* Details */}
                <Stack flex="1" spacing={1}>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        {name.common}
                        <Tooltip title={`Native Names: ${nativeNames}`}>
                            <IconButton size="small" sx={{ ml: 1 }}>
                                <InfoOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    {[
                        { icon: <PeopleIcon />, label: 'Population', value: population.toLocaleString() },
                        { icon: <SquareFootIcon />, label: 'Area', value: area.toLocaleString() },
                        { icon: <TimelineIcon />, label: 'Density', value: `${density} /km²` },
                        { icon: <PublicIcon />, label: 'Region', value: region },
                        { icon: <PlaceIcon />, label: 'Subregion', value: subregion },
                        { icon: <LocationCityIcon />, label: 'Capital', value: capital?.[0] || '—' },
                        { icon: <DomainIcon />, label: 'TLDs', value: tld.join(', ') },
                        { icon: <LanguageIcon />, label: 'Languages', value: languageNames },
                        { icon: <AttachMoneyIcon />, label: 'Currencies', value: currencyNames },
                        { icon: <LocationCityIcon />, label: 'Timezones', value: timezones.length },
                    ].map(({ icon, label, value }) => (
                        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Tooltip title={label}>{icon}</Tooltip>
                            <Typography>{`${label}: ${value}`}</Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </>
    );
}
