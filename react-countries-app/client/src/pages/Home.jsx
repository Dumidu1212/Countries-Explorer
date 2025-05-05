// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

const REGION_OPTIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const LANGUAGE_OPTIONS = [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'ara', name: 'Arabic' },
    { code: 'por', name: 'Portuguese' },
    { code: 'sin', name: 'Sinhala' },
];

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Debounce search input
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
                    : () => fetchAllCountries();

        fetcher()
            .then((data) => setCountries(data))
            .catch(() => setError('Failed to load countries.'))
            .finally(() => setLoading(false));
    }, [debouncedSearch, selectedRegion, selectedLanguage]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Search + Filters */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4,
                    gap: 2,
                }}
            >
                <SearchBar value={searchTerm} onSearch={setSearchTerm} />
                <FilterMenu
                    regionOptions={REGION_OPTIONS}
                    languageOptions={LANGUAGE_OPTIONS}
                    selectedRegion={selectedRegion}
                    selectedLanguage={selectedLanguage}
                    onSelectRegion={setSelectedRegion}
                    onSelectLanguage={setSelectedLanguage}
                />
            </Box>

            {/* Loading & Error */}
            {loading && <Typography align="center">Loading…</Typography>}
            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}

            {/* Country Grid */}
            {!loading && !error && (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(5, 1fr)',
                        },
                        gap: 3,
                    }}
                >
                    {countries.map((c) => (
                        <CountryCard key={c.cca3} country={c} />
                    ))}
                </Box>
            )}
        </Container>
    );
}
