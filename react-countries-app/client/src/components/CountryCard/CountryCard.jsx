import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CountryCard({ country }) {
    const { name, flags, population, region, capital, cca3 } = country;

    return (
        <Link to={`/country/${cca3}`}>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition overflow-hidden">
                <img
                    src={flags.svg}
                    alt={`${name.common} flag`}
                    className="w-full h-40 object-cover"
                />
                <div className="p-6">
                    <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                        {name.common}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Population:</span>{' '}
                        {population.toLocaleString()}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Region:</span> {region}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Capital:</span> {capital?.[0] || 'N/A'}
                    </p>
                </div>
            </div>
        </Link>
    );
}

CountryCard.propTypes = {
    country: PropTypes.shape({
        name: PropTypes.object.isRequired,
        flags: PropTypes.object.isRequired,
        population: PropTypes.number.isRequired,
        region: PropTypes.string.isRequired,
        capital: PropTypes.array,
        cca3: PropTypes.string.isRequired,
    }).isRequired,
};
