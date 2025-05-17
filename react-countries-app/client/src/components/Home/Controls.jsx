import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchBar from '../SearchBar';
import { SORT_OPTIONS, REGION_OPTIONS } from '../../constants';
export default function Controls({ searchTerm,onSearch, region,onRegion, language,onLanguage, sortOption,onSort }) {
    return (
        <Box sx={{ display:'flex', flexWrap:'wrap', gap:2, mb:4, justifyContent:'space-between', alignItems:'center' }}>
            <Box sx={{ flexGrow:1, minWidth:200 }}><SearchBar value={searchTerm} onSearch={onSearch}/></Box>
            <Box sx={{ display:'flex', flexWrap:'wrap', gap:2 }}>
                <FormControl size="small" sx={{ minWidth:160 }}>
                    <InputLabel>Region</InputLabel>
                    <Select value={region} label="Region" onChange={e=>onRegion(e.target.value)}>
                        <MenuItem value=""><em>All Regions</em></MenuItem>
                        {REGION_OPTIONS.map(r=><MenuItem key={r} value={r}>{r}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth:160 }}>
                    <InputLabel>Language</InputLabel>
                    <Select value={language} label="Language" onChange={e=>onLanguage(e.target.value)}>
                        <MenuItem value=""><em>All Languages</em></MenuItem>
                        {/* populate via hook */}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth:180 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select value={sortOption} label="Sort By" onChange={e=>onSort(e.target.value)}>
                        {SORT_OPTIONS.map(o=><MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}
Controls.propTypes = { searchTerm:PropTypes.string, onSearch:PropTypes.func, region:PropTypes.string, onRegion:PropTypes.func, language:PropTypes.string, onLanguage:PropTypes.func, sortOption:PropTypes.string, onSort:PropTypes.func };