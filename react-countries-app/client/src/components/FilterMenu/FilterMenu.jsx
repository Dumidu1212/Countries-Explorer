// src/components/FilterMenu/FilterMenu.jsx
import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';

function Dropdown({ id, label, options, value, onChange }) {
    return (
        <div className="relative w-40">
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={label}
                className="
          w-full px-4 py-2
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          border border-gray-200 dark:border-gray-600
          rounded-lg shadow-sm
          appearance-none
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
            >
                <option value="">{label}</option>
                {options.map((opt) =>
                    typeof opt === 'string' ? (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ) : (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    )
                )}
            </select>
        </div>
    );
}

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function FilterMenu({
                                       regionOptions,
                                       languageOptions,
                                       selectedRegion,
                                       selectedLanguage,
                                       onSelectRegion,
                                       onSelectLanguage,
                                   }) {
    return (
        <div className="flex flex-wrap gap-4">
            <Dropdown
                id="region-filter"
                label="Filter by Region"
                options={regionOptions}
                value={selectedRegion}
                onChange={onSelectRegion}
            />
            <Dropdown
                id="language-filter"
                label="Filter by Language"
                options={languageOptions}
                value={selectedLanguage}
                onChange={onSelectLanguage}
            />
        </div>
    );
}

FilterMenu.propTypes = {
    regionOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    languageOptions: PropTypes.array.isRequired,
    selectedRegion: PropTypes.string.isRequired,
    selectedLanguage: PropTypes.string.isRequired,
    onSelectRegion: PropTypes.func.isRequired,
    onSelectLanguage: PropTypes.func.isRequired,
};
