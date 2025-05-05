import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, useTheme, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ value, onSearch }) {
    const theme = useTheme();
    return (
        <Box display="flex" justifyContent="flex-start">
            <TextField
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search for a country"
                variant="outlined"
                size="small"
                sx={{
                    maxWidth: 360,
                    mr: 'auto',
                    my: 2,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius * 2,
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};