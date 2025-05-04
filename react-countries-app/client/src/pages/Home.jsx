import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterMenu from '../components/FilterMenu/FilterMenu';
import CountryCard from '../components/CountryCard/CountryCard';
import useDebounce from '../hooks/useDebounce';
import {
    fetchAllCountries,
    fetchCountriesByName,
    fetchCountriesByRegion,
    fetchCountriesByLanguage,
} from '../api/countriesApi';
import Typography from "@mui/material/Typography";

const REGION_OPTIONS = ['Africa','Americas','Asia','Europe','Oceania'];
const LANGUAGE_OPTIONS = [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'ara', name: 'Arabic' },
    { code: 'por', name: 'Portuguese' },
    { code: 'sin', name: 'Sinhala' },
];

export default function Home() {
    const [searchTerm, setSearchTerm]           = useState('');
    const [selectedRegion, setSelectedRegion]   = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [countries, setCountries]             = useState([]);
    const [loading, setLoading]                 = useState(true);
    const [error, setError]                     = useState('');

    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        setLoading(true);
        setError('');

        const fetcher = debouncedSearch
            ? () => fetchCountriesByName(debouncedSearch)
            : selectedRegion
                ? () => fetchCountriesByRegion(selectedRegion)
                : selectedLanguage
                    ? () => fetchCountriesByLanguage(selectedLanguage)
                    : fetchAllCountries;

        fetcher()
            .then(setCountries)
            .catch(() => setError('Failed to load countries.'))
            .finally(() => setLoading(false));
    }, [debouncedSearch, selectedRegion, selectedLanguage]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setSelectedRegion('');
        setSelectedLanguage('');
    };
    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        setSearchTerm('');
        setSelectedLanguage('');
    };
    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);
        setSearchTerm('');
        setSelectedRegion('');
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Controls */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4,
                    gap: 2
                }}
            >
                <SearchBar value={searchTerm} onSearch={handleSearch} />
                <FilterMenu
                    regionOptions={REGION_OPTIONS}
                    languageOptions={LANGUAGE_OPTIONS}
                    selectedRegion={selectedRegion}
                    selectedLanguage={selectedLanguage}
                    onSelectRegion={handleRegionChange}
                    onSelectLanguage={handleLanguageChange}
                />
            </Box>

            {/* Feedback */}
            {loading && <Typography align="center">Loading…</Typography>}
            {error   && <Typography color="error" align="center">{error}</Typography>}

            {/* 4-per-row grid */}
            {!loading && !error && (
                <Grid container spacing={4}>
                    {countries.map((c) => (
                        <Grid key={c.cca3} item xs={12} sm={6} md={3}>
                            <CountryCard country={c} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
