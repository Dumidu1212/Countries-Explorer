import { useEffect, useState } from 'react';
import { fetchAllCountries } from './api/countriesApi';
import CountryCard from './components/CountryCard';

export default function App() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllCountries()
            .then((data) => setCountries(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="text-center mt-20">Loading countries…</p>;
    }
    if (error) {
        return <p className="text-center mt-20 text-red-600">Failed to load data.</p>;
    }

    return (
        <div className="container mx-auto p-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {countries.map((c) => (
                <CountryCard key={c.cca3} country={c} />
            ))}
        </div>
    );
}
