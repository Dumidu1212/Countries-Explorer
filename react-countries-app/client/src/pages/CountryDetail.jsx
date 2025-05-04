import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { fetchCountryByCode } from '../api/countriesApi';

export default function CountryDetail() {
    const { code } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetchCountryByCode(code)
            .then(([data]) => setCountry(data))
            .catch(() => setError('Failed to load country.'))
            .finally(() => setLoading(false));
    }, [code]);

    if (loading) return <p className="text-center mt-10">Loading…</p>;
    if (error)   return <p className="text-center mt-10 text-red-600">{error}</p>;

    // Normalize nested data
    const languages = country.languages
        ? Object.values(country.languages)
        : [];
    const currencies = country.currencies
        ? Object.entries(country.currencies).map(
            ([, { name, symbol }]) => `${name} (${symbol})`
        )
        : [];
    const nativeNames = country.name.nativeName
        ? Object.values(country.name.nativeName).map((n) => n.common)
        : [];

    return (
        <main className="container mx-auto px-6 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center px-6 py-2 mb-8 bg-white dark:bg-gray-700 shadow rounded"
            >
                <FiArrowLeft className="mr-2" /> Back
            </button>

            <div className="grid gap-16 lg:grid-cols-2">
                <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="w-full h-auto rounded shadow"
                />
                <div className="text-gray-900 dark:text-gray-100">
                    <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>

                    <div className="space-y-2 mb-6">
                        <p>
                            <span className="font-semibold">Native Name:</span>{' '}
                            {nativeNames.join(', ')}
                        </p>
                        <p>
                            <span className="font-semibold">Population:</span>{' '}
                            {country.population.toLocaleString()}
                        </p>
                        <p>
                            <span className="font-semibold">Region:</span>{' '}
                            {country.region}
                        </p>
                        <p>
                            <span className="font-semibold">Subregion:</span>{' '}
                            {country.subregion}
                        </p>
                        <p>
                            <span className="font-semibold">Capital:</span>{' '}
                            {country.capital?.[0] || 'N/A'}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Top Level Domain:</span>{' '}
                            {country.tld?.join(', ')}
                        </p>
                        <p>
                            <span className="font-semibold">Currencies:</span>{' '}
                            {currencies.join(', ')}
                        </p>
                        <p>
                            <span className="font-semibold">Languages:</span>{' '}
                            {languages.join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
