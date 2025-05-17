import React, {
    useState, useEffect, useMemo, useContext,
} from 'react';
import {
    Container,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import CountryCard from '../components/CountryCard/CountryCard';
import useDebounce from '../hooks/useDebounce';
import {
    fetchAllCountries,
    fetchCountriesByName,
    fetchCountriesByRegion,
    fetchCountriesByLanguage,
} from '../api/countriesApi';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
    /* ──────────────  URL <--> component state  ────────────── */
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm]             = useState(searchParams.get('q')      || '');
    const [selectedRegion, setSelectedRegion]     = useState(searchParams.get('region') || '');
    const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get('lang')   || '');
    const [sortOption, setSortOption]             = useState(searchParams.get('sort')   || '');
    const [showFavs, setShowFavs]                 = useState(searchParams.get('favs')   === '1');

    /* ──────────────  data & ui state  ─────────────────────── */
    const [countries, setCountries]   = useState([]);
    const [regions, setRegions]       = useState([]);
    const [languages, setLanguages]   = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error,   setError]         = useState('');

    const { list: favList } = useContext(FavoritesContext);
    const { user }          = useContext(AuthContext);

    const debouncedSearch = useDebounce(searchTerm, 300);

    /* build region / language dropdowns once */
    useEffect(() => {
        fetchAllCountries().then((all) => {
            setRegions([...new Set(all.map((c) => c.region).filter(Boolean))].sort());

            const langMap = {};
            all.forEach((c) => {
                if (c.languages) {
                    Object.entries(c.languages).forEach(([code, name]) => { langMap[code] = name; });
                }
            });
            setLanguages(
                Object.entries(langMap)
                    .map(([code, name]) => ({ code, name }))
                    .sort((a, b) => a.name.localeCompare(b.name)),
            );
        });
    }, []);

    /* fetch countries whenever search / filter changes */
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

    /* sort + favourites filter */
    const displayedCountries = useMemo(() => {
        let list = [...countries];

        const sorters = {
            'name-asc' : (a, b) => a.name.common.localeCompare(b.name.common),
            'name-desc': (a, b) => b.name.common.localeCompare(a.name.common),
            'pop-asc'  : (a, b) => a.population - b.population,
            'pop-desc' : (a, b) => b.population - a.population,
        };
        if (sortOption) list.sort(sorters[sortOption]);

        if (showFavs) list = list.filter((c) => favList.includes(c.cca3));
        return list;
    }, [countries, sortOption, showFavs, favList]);

    /* keep URL query-string in sync with current UI state */
    useEffect(() => {
        const params = {};
        if (searchTerm)        params.q      = searchTerm;
        if (selectedRegion)    params.region = selectedRegion;
        if (selectedLanguage)  params.lang   = selectedLanguage;
        if (sortOption)        params.sort   = sortOption;
        if (showFavs)          params.favs   = '1';

        setSearchParams(params, { replace: true });
    }, [
        searchTerm,
        selectedRegion,
        selectedLanguage,
        sortOption,
        showFavs,
        setSearchParams,
    ]);

    /* auto-leave favourites view if list becomes empty */
    useEffect(() => { if (!favList.length) setShowFavs(false); }, [favList]);

    /* ──────────────────────────  UI  ──────────────────────── */
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* top row – search + dropdowns + favourites chip */}
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
                <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                    <SearchBar value={searchTerm} onSearch={setSearchTerm} />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {/* region */}
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel>Region</InputLabel>
                        <Select
                            value={selectedRegion}
                            label="Region"
                            onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                            <MenuItem value=""><em>All Regions</em></MenuItem>
                            {regions.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {/* language */}
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel>Language</InputLabel>
                        <Select
                            value={selectedLanguage}
                            label="Language"
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                            <MenuItem value=""><em>All Languages</em></MenuItem>
                            {languages.map(({ code, name }) => (
                                <MenuItem key={code} value={code}>{name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* sort */}
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            label="Sort By"
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <MenuItem value=""><em>Sort By</em></MenuItem>
                            <MenuItem value="name-asc">Name A → Z</MenuItem>
                            <MenuItem value="name-desc">Name Z → A</MenuItem>
                            <MenuItem value="pop-asc">Population ↑</MenuItem>
                            <MenuItem value="pop-desc">Population ↓</MenuItem>
                        </Select>
                    </FormControl>

                    {/* favourites toggle */}
                    {user && favList.length > 0 && (
                        showFavs
                            ? (
                                <Chip
                                    label="All Countries"
                                    color="primary"
                                    onClick={() => setShowFavs(false)}
                                />
                            )
                            : (
                                <Chip
                                    label={`My Favourites (${favList.length})`}
                                    color="warning"
                                    variant="outlined"
                                    onClick={() => setShowFavs(true)}
                                />
                            )
                    )}
                </Box>
            </Box>

            {/* feedback */}
            {loading && <Typography align="center">Loading…</Typography>}
            {error   && <Typography align="center" color="error">{error}</Typography>}

            {/* grid */}
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
                    {displayedCountries.map((c) => (
                        <CountryCard key={c.cca3} country={c} />
                    ))}
                </Box>
            )}
        </Container>
    );
}
