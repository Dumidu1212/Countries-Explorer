// src/components/Controls.jsx
import React from 'react';
import {
    TextField, FormControl, InputLabel, Select, MenuItem, Box
} from '@mui/material';
import { debounce } from 'lodash';

export default function Controls({
                                     search, onSearch,
                                     region, onRegion,
                                     language, onLanguage,
                                     regions, languages
                                 }) {
    // Debounce input so we fire onSearch 300ms after typing stops
    const debounced = React.useMemo(() => debounce(onSearch, 300), [onSearch]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                mb: 4,
                justifyContent: { xs: 'center', md: 'flex-start' }
            }}
        >
            <TextField
                label="Search Country"
                variant="outlined"
                size="small"
                onChange={(e) => debounced(e.target.value)}
                sx={{ width: { xs: '100%', sm: 300 } }}
            />

            <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Region</InputLabel>
                <Select
                    value={region}
                    label="Region"
                    onChange={(e) => onRegion(e.target.value)}
                >
                    <MenuItem value=""><em>All</em></MenuItem>
                    {regions.map((r) => (
                        <MenuItem key={r} value={r}>{r}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Language</InputLabel>
                <Select
                    value={language}
                    label="Language"
                    onChange={(e) => onLanguage(e.target.value)}
                >
                    <MenuItem value=""><em>All</em></MenuItem>
                    {languages.map(({ code, name }) => (
                        <MenuItem key={code} value={code}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
