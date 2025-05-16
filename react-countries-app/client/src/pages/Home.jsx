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

export default function Home() {
    const [searchTerm, setSearchTerm]         = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [countries, setCountries]           = useState([]);
    const [regions, setRegions]               = useState([]);
    const [languages, setLanguages]           = useState([]);  // <-- new
    const [loading, setLoading]               = useState(true);
    const [error, setError]                   = useState('');

    const debouncedSearch = useDebounce(searchTerm, 300);

    // On mount: fetch all countries once to derive region & language lists
    useEffect(() => {
        fetchAllCountries()
            .then((all) => {
                // Unique, sorted regions
                const uniqueRegions = Array.from(
                    new Set(all.map(c => c.region).filter(r => r))
                ).sort();

                // Unique languages: code → name
                const langMap = {};
                all.forEach(c => {
                    if (c.languages) {
                        Object.entries(c.languages).forEach(([code, name]) => {
                            langMap[code] = name;
                        });
                    }
                });
                const uniqueLanguages = Object.entries(langMap)
                    .map(([code, name]) => ({ code, name }))
                    .sort((a, b) => a.name.localeCompare(b.name));

                setRegions(uniqueRegions);
                setLanguages(uniqueLanguages);
            })
            .catch(() => {
                // if this fails, leave the dropdowns empty
                setRegions([]);
                setLanguages([]);
            });
    }, []);

    // Whenever search/filters change, fetch the appropriate country list
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
            .then(setCountries)
            .catch(() => setError('Failed to load countries.'))
            .finally(() => setLoading(false));
    }, [debouncedSearch, selectedRegion, selectedLanguage]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Search + dynamic filter menus */}
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
                    regionOptions={regions}
                    languageOptions={languages}
                    selectedRegion={selectedRegion}
                    selectedLanguage={selectedLanguage}
                    onSelectRegion={setSelectedRegion}
                    onSelectLanguage={setSelectedLanguage}
                />
            </Box>

            {/* Feedback */}
            {loading && <Typography align="center">Loading…</Typography>}
            {error   && <Typography color="error" align="center">{error}</Typography>}

            {/* Countries grid */}
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
                    {countries.map(c => (
                        <CountryCard key={c.cca3} country={c} />
                    ))}
                </Box>
            )}
        </Container>
    );
}
