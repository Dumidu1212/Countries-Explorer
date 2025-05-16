// src/pages/Home.jsx
import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import SearchBar from '../components/SearchBar/SearchBar';
import CountryCard from '../components/CountryCard/CountryCard';
import useDebounce from '../hooks/useDebounce';
import {
    fetchAllCountries,
    fetchCountriesByName,
    fetchCountriesByRegion,
    fetchCountriesByLanguage,
} from '../api/countriesApi';

export default function Home() {
    const [searchTerm, setSearchTerm]             = useState('');
    const [selectedRegion, setSelectedRegion]     = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [sortOption, setSortOption]             = useState('');           // default = no sort
    const [countries, setCountries]               = useState([]);
    const [regions, setRegions]                   = useState([]);
    const [languages, setLanguages]               = useState([]);
    const [loading, setLoading]                   = useState(true);
    const [error, setError]                       = useState('');

    const debouncedSearch = useDebounce(searchTerm, 300);

    // derive region & language lists on mount
    useEffect(() => {
        fetchAllCountries().then(all => {
            const uniqueRegions = Array.from(
                new Set(all.map(c => c.region).filter(Boolean))
            ).sort();
            const langMap = {};
            all.forEach(c => {
                if (c.languages) {
                    Object.entries(c.languages).forEach(([code, name]) => {
                        langMap[code] = name;
                    });
                }
            });
            const uniqueLangs = Object.entries(langMap)
                .map(([code, name]) => ({ code, name }))
                .sort((a, b) => a.name.localeCompare(b.name));

            setRegions(uniqueRegions);
            setLanguages(uniqueLangs);
        });
    }, []);

    // fetch whenever filters/search change
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
            .then(data => setCountries(data))
            .catch(() => setError('Failed to load countries.'))
            .finally(() => setLoading(false));
    }, [debouncedSearch, selectedRegion, selectedLanguage]);

    // apply sort only if sortOption is non-empty
    const sortedCountries = useMemo(() => {
        if (!sortOption) return countries;
        const arr = [...countries];
        switch (sortOption) {
            case 'name-asc':
                return arr.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
            case 'name-desc':
                return arr.sort((a, b) =>
                    b.name.common.localeCompare(a.name.common)
                );
            case 'pop-asc':
                return arr.sort((a, b) => a.population - b.population);
            case 'pop-desc':
                return arr.sort((a, b) => b.population - a.population);
            default:
                return arr;
        }
    }, [countries, sortOption]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Top controls: Search on left, filters+sort on right */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    gap: 2,
                }}
            >
                {/* Search */}
                <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                    <SearchBar value={searchTerm} onSearch={setSearchTerm} />
                </Box>

                {/* Filters & Sort grouped on right */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {/* Region */}
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel>Region</InputLabel>
                        <Select
                            value={selectedRegion}
                            label="Region"
                            onChange={e => setSelectedRegion(e.target.value)}
                        >
                            <MenuItem value=""><em>All Regions</em></MenuItem>
                            {regions.map(r => (
                                <MenuItem key={r} value={r}>{r}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Language */}
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel>Language</InputLabel>
                        <Select
                            value={selectedLanguage}
                            label="Language"
                            onChange={e => setSelectedLanguage(e.target.value)}
                        >
                            <MenuItem value=""><em>All Languages</em></MenuItem>
                            {languages.map(({ code, name }) => (
                                <MenuItem key={code} value={code}>{name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Sort */}
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            label="Sort By"
                            onChange={e => setSortOption(e.target.value)}
                        >
                            <MenuItem value=""><em>Sort By</em></MenuItem>
                            <MenuItem value="name-asc">Name A → Z</MenuItem>
                            <MenuItem value="name-desc">Name Z → A</MenuItem>
                            <MenuItem value="pop-asc">Population ↑</MenuItem>
                            <MenuItem value="pop-desc">Population ↓</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* Loading & error */}
            {loading && <Typography align="center">Loading…</Typography>}
            {error   && <Typography align="center" color="error">{error}</Typography>}

            {/* Country grid */}
            {!loading && !error && (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2,1fr)',
                            md: 'repeat(3,1fr)',
                            lg: 'repeat(5,1fr)',
                        },
                        gap: 3,
                    }}
                >
                    {sortedCountries.map(c => (
                        <CountryCard key={c.cca3} country={c} />
                    ))}
                </Box>
            )}
        </Container>
    );
}
