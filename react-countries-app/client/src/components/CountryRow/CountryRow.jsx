// src/components/CountryRow/CountryRow.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CountryRow({ country }) {
    const { name, flags, population, region, capital, cca3 } = country;

    return (
        <Link to={`/country/${cca3}`}>
            <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition p-4">
                <img
                    src={flags.svg}
                    alt={`${name.common} flag`}
                    className="w-16 h-12 object-cover rounded-md mr-4 flex-shrink-0"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {name.common}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Region:</span> {region}
                    </p>
                </div>
                <div className="ml-4 text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Population:</span>{' '}
                        {population.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Capital:</span> {capital?.[0] || '–'}
                    </p>
                </div>
            </div>
        </Link>
    );
}

CountryRow.propTypes = {
    country: PropTypes.shape({
        name: PropTypes.object.isRequired,
        flags: PropTypes.object.isRequired,
        population: PropTypes.number.isRequired,
        region: PropTypes.string.isRequired,
        capital: PropTypes.array,
        cca3: PropTypes.string.isRequired,
    }).isRequired,
};
