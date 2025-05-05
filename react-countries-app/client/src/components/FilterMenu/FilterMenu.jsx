// src/components/FilterMenu/FilterMenu.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme,
} from '@mui/material';

export default function FilterMenu({
                                       regionOptions,
                                       languageOptions,
                                       selectedRegion,
                                       selectedLanguage,
                                       onSelectRegion,
                                       onSelectLanguage,
                                   }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: theme.spacing(2),
                my: theme.spacing(2),
                flexWrap: 'wrap',
            }}
        >
            <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 160 }}
            >
                <InputLabel id="region-select-label">Region</InputLabel>
                <Select
                    labelId="region-select-label"
                    value={selectedRegion}
                    onChange={(e) => onSelectRegion(e.target.value)}
                    label="Region"
                >
                    <MenuItem value=""><em>All Regions</em></MenuItem>
                    {regionOptions.map((region) => (
                        <MenuItem key={region} value={region}>
                            {region}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 160 }}
            >
                <InputLabel id="language-select-label">Language</InputLabel>
                <Select
                    labelId="language-select-label"
                    value={selectedLanguage}
                    onChange={(e) => onSelectLanguage(e.target.value)}
                    label="Language"
                >
                    <MenuItem value=""><em>All Languages</em></MenuItem>
                    {languageOptions.map(({ code, name }) => (
                        <MenuItem key={code} value={code}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
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
