import { useState, useEffect } from 'react';
import {
    fetchAllCountries,
    fetchCountriesByName,
    fetchCountriesByRegion,
    fetchCountriesByLanguage,
} from '../api/countriesApi';
import useDebounce from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterMenu from '../components/FilterMenu/FilterMenu';
import CountryCard from '../components/CountryCard/CountryCard';

const REGION_OPTIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const LANGUAGE_OPTIONS = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ar', name: 'Arabic' },
    { code: 'pt', name: 'Portuguese' },
];

export default function Home() {
    const [countries, setCountries]         = useState([]);
    const [loading, setLoading]             = useState(true);
    const [error, setError]                 = useState('');
    const [searchTerm, setSearchTerm]       = useState('');
    const [selectedRegion, setSelectedRegion]     = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    // Debounce the search term
    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        setLoading(true);
        setError('');

        // Choose the correct fetch function based on filters
        const fetcher = debouncedSearch
            ? () => fetchCountriesByName(debouncedSearch)
            : selectedRegion
                ? () => fetchCountriesByRegion(selectedRegion)
                : selectedLanguage
                    ? () => fetchCountriesByLanguage(selectedLanguage)
                    : fetchAllCountries;

        fetcher()
            .then((data) => setCountries(data))
            .catch((err) => {
                console.error('Country load error:', err.response?.status, err.message);
                setError('Failed to load countries.');
            })
            .finally(() => setLoading(false));
    }, [debouncedSearch, selectedRegion, selectedLanguage]);

    // Handlers clear other filters when one is used
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
        <main className="container mx-auto p-4">
            <SearchBar value={searchTerm} onSearch={handleSearch} />
            <FilterMenu
                regionOptions={REGION_OPTIONS}
                languageOptions={LANGUAGE_OPTIONS}
                selectedRegion={selectedRegion}
                selectedLanguage={selectedLanguage}
                onSelectRegion={handleRegionChange}
                onSelectLanguage={handleLanguageChange}
            />

            {loading && (
                <p className="text-center text-lg">Loading countries…</p>
            )}
            {error && (
                <p className="text-center text-lg text-red-600">{error}</p>
            )}

            {!loading && !error && (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {countries.map((country) => (
                        <CountryCard key={country.cca3} country={country} />
                    ))}
                </div>
            )}
        </main>
    );
}
