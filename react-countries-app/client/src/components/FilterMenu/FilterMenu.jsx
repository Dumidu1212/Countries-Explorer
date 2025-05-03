import PropTypes from 'prop-types';

/**
 * Dropdown selectors for region and language filters.
 */
export default function FilterMenu({
                                       regionOptions,
                                       languageOptions,
                                       selectedRegion,
                                       selectedLanguage,
                                       onSelectRegion,
                                       onSelectLanguage,
                                   }) {
    return (
        <div className="flex flex-wrap gap-4 mb-6">
            {/* Region */}
            <div>
                <label htmlFor="region-filter" className="sr-only">Filter by region</label>
                <select
                    id="region-filter"
                    value={selectedRegion}
                    onChange={(e) => onSelectRegion(e.target.value)}
                    className="
            px-3 py-2 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
                >
                    <option value="">All Regions</option>
                    {regionOptions.map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </div>

            {/* Language */}
            <div>
                <label htmlFor="language-filter" className="sr-only">Filter by language</label>
                <select
                    id="language-filter"
                    value={selectedLanguage}
                    onChange={(e) => onSelectLanguage(e.target.value)}
                    className="
            px-3 py-2 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
                >
                    <option value="">All Languages</option>
                    {languageOptions.map(({ code, name }) => (
                        <option key={code} value={code}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

FilterMenu.propTypes = {
    regionOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    languageOptions: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedRegion: PropTypes.string.isRequired,
    selectedLanguage: PropTypes.string.isRequired,
    onSelectRegion: PropTypes.func.isRequired,
    onSelectLanguage: PropTypes.func.isRequired,
};
