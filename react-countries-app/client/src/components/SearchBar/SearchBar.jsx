// src/components/SearchBar/SearchBar.jsx
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onSearch }) {
    return (
        <div className="relative w-full max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
                type="search"
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search country..."
                aria-label="Search countries"
                className="
          w-full pl-10 pr-4 py-2
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          border border-gray-200 dark:border-gray-600
          rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
            />
        </div>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};
