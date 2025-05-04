// src/components/FilterMenu/FilterMenu.jsx
import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';

export default function FilterMenu({
                                       regionOptions,
                                       languageOptions,
                                       selectedRegion,
                                       selectedLanguage,
                                       onSelectRegion,
                                       onSelectLanguage,
                                   }) {
    return (
        <div className="flex space-x-4 mb-6">
            {/* Region */}
            <div className="relative w-48">
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
                <select
                    id="region-filter"
                    value={selectedRegion}
                    onChange={(e) => onSelectRegion(e.target.value)}
                    className="
            w-full
            px-4 py-3
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            rounded-md shadow
            appearance-none
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
                >
                    <option value="">Filter by Region</option>
                    {regionOptions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </div>

            {/* Language */}
            <div className="relative w-48">
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
                <select
                    id="language-filter"
                    value={selectedLanguage}
                    onChange={(e) => onSelectLanguage(e.target.value)}
                    className="
            w-full
            px-4 py-3
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            rounded-md shadow
            appearance-none
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
                >
                    <option value="">Filter by Language</option>
                    {languageOptions.map(({ code, name }) => (
                        <option key={code} value={code}>{name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

FilterMenu.propTypes = {
    regionOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    languageOptions: PropTypes.arrayOf(
        PropTypes.shape({ code: PropTypes.string, name: PropTypes.string })
    ).isRequired,
    selectedRegion: PropTypes.string.isRequired,
    selectedLanguage: PropTypes.string.isRequired,
    onSelectRegion: PropTypes.func.isRequired,
    onSelectLanguage: PropTypes.func.isRequired,
};
