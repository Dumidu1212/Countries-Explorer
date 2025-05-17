import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@mui/material';
export class ErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError) {
            return (
                <Box textAlign="center" py={10}>
                    <Typography variant="h5" gutterBottom>Something went wrong.</Typography>
                    <Button variant="contained" onClick={()=>window.location.reload()}>Reload</Button>
                </Box>
            );
        }
        return this.props.children;
    }
}
ErrorBoundary.propTypes = { children: PropTypes.node.isRequired };