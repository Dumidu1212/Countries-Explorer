import PropTypes from 'prop-types';

/**
 * Controlled search input for country name filtering.
 */
export default function SearchBar({ value, onSearch }) {
    return (
        <input
            type="search"
            value={value}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search for a country..."
            aria-label="Search countries by name"
            className="
        w-full max-w-md
        px-4 py-2
        border border-gray-300 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        mb-4
      "
        />
    );
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};
