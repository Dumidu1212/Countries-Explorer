import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography } from '@mui/material';
export default function SummaryPanel({ data }) {
    // compute stats: largest, mostPop, worldPop, byRegion
    return (<Box mb={4}>/* ... implement summary here ... */</Box>);
}
SummaryPanel.propTypes = { data:PropTypes.array.isRequired };