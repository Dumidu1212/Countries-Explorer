// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
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
    // --- State ---
    const [searchTerm, setSearchTerm]           = useState('');
    const [selectedRegion, setSelectedRegion]   = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [countries, setCountries]             = useState([]);
    const [loading, setLoading]                 = useState(true);
    const [error, setError]                     = useState('');

    // Debounce the searchTerm so we only hit the API 300ms after typing stops
    const debouncedSearch = useDebounce(searchTerm, 300);

    // --- Fetching logic ---
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
            .then((data) => setCountries(data))
            .catch((err) => {
                console.error('Fetch error:', err);
                setError('Failed to load countries.');
            })
            .finally(() => setLoading(false));
    }, [debouncedSearch, selectedRegion, selectedLanguage]);

    // --- Handlers ---
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

    // --- Render ---
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

            <main className="container mx-auto px-6 py-8">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-8">
                    <SearchBar value={searchTerm} onSearch={handleSearch} />
                    <FilterMenu
                        regionOptions={REGION_OPTIONS}
                        languageOptions={LANGUAGE_OPTIONS}
                        selectedRegion={selectedRegion}
                        selectedLanguage={selectedLanguage}
                        onSelectRegion={handleRegionChange}
                        onSelectLanguage={handleLanguageChange}
                    />
                </div>

                {/* Feedback */}
                {loading && (
                    <p className="text-center text-lg text-gray-700 dark:text-gray-300">
                        Loading countries…
                    </p>
                )}
                {error && (
                    <p className="text-center text-lg text-red-600 dark:text-red-400">
                        {error}
                    </p>
                )}

                {/* Grid */}
                {!loading && !error && (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {countries.map((country) => (
                            <CountryCard key={country.cca3} country={country} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
