// src/components/SearchBar/SearchBar.jsx
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onSearch }) {
    return (
        <div className="relative w-full max-w-md mb-6">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
                type="search"
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search for a country..."
                aria-label="Search countries by name"
                className="
          w-full
          pl-12 pr-4 py-3
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          rounded-md shadow
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
            />
        </div>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};
