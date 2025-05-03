import PropTypes from 'prop-types';

export default function CountryCard({ country }) {
    const { name, flags, population, region, capital } = country;

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <img
                src={flags.svg}
                alt={`${name.common} flag`}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold mb-2">{name.common}</h3>
                <p><span className="font-medium">Capital:</span> {capital?.[0] || 'N/A'}</p>
                <p><span className="font-medium">Region:</span> {region}</p>
                <p><span className="font-medium">Population:</span> {population.toLocaleString()}</p>
            </div>
        </div>
    );
}

CountryCard.propTypes = {
    country: PropTypes.shape({
        name: PropTypes.shape({ common: PropTypes.string.isRequired }).isRequired,
        flags: PropTypes.shape({ svg: PropTypes.string.isRequired }).isRequired,
        population: PropTypes.number.isRequired,
        region: PropTypes.string.isRequired,
        capital: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};
