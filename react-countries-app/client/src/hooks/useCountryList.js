import { useState, useEffect } from 'react';
import {
    fetchAllCountries,
    fetchCountriesByName,
    fetchCountriesByRegion,
    fetchCountriesByLanguage,
} from '../api/countriesApi';

/** Fetch countries by search, region, or language */
export function useCountryList(searchTerm, region, language) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError('');
        const fetcher =
            searchTerm
                ? () => fetchCountriesByName(searchTerm)
                : region
                    ? () => fetchCountriesByRegion(region)
                    : language
                        ? () => fetchCountriesByLanguage(language)
                        : () => fetchAllCountries();
        fetcher()
            .then(data => active && setCountries(data))
            .catch(err => active && setError(err.response?.status === 404
                ? 'No countries found.'
                : 'Unable to load countries.'))
            .finally(() => active && setLoading(false));
        return () => { active = false; };
    }, [searchTerm, region, language]);

    return { countries, loading, error };
}