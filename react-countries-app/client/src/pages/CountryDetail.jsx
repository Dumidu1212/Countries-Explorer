// src/pages/CountryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Button,
    Box,
    Tabs,
    Tab,
    Grow,
    Skeleton,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { fetchCountryByCode } from '../api/countriesApi';
import OverviewTab  from '../components/CountryDetail/OverviewTab';
import StatsTab     from '../components/CountryDetail/StatsTab';
import NeighborsTab from '../components/CountryDetail/NeighborsTab';
import GalleryTab   from '../components/CountryDetail/GalleryTab';

export default function CountryDetail() {
    const { code } = useParams();
    const navigate   = useNavigate();
    const [country,  setCountry]   = useState(null);
    const [neighbors,setNeighbors] = useState([]);
    const [tab,      setTab]       = useState('1');
    const [loading,  setLoading]   = useState(true);

    // load country + neighbors
    useEffect(() => {
        setLoading(true);
        fetchCountryByCode(code).then(([data]) => {
            setCountry(data);
            if (data.borders?.length) {
                Promise.all(data.borders.map(c => fetchCountryByCode(c).then(r => r[0])))
                    .then(setNeighbors);
            }
            setLoading(false);
        });
    }, [code]);

    // reset to Overview whenever country changes
    useEffect(() => setTab('1'), [code]);

    if (loading || !country) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Skeleton height={40} width={120} />
                <Skeleton height={350} sx={{ my: 2 }} />
                <Skeleton height={200} />
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Back Button */}
            <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3 }}
            >
                Go Back
            </Button>

            <Grow in timeout={400}>
                <Paper
                    elevation={2}
                    sx={{
                        p: { xs: 2, md: 4 },
                        borderRadius: 2,
                        bgcolor: 'background.paper'
                    }}
                >
                    <TabContext value={tab}>
                        {/* Tabs */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                variant="scrollable"
                                scrollButtons="auto"
                                textColor="primary"
                                indicatorColor="primary"
                            >
                                <Tab label="Overview"  value="1" />
                                <Tab label="Stats"      value="2" />
                                <Tab label="Neighbors"  value="3" />
                                <Tab label="Gallery"    value="4" />
                            </Tabs>
                        </Box>

                        {/* Panels */}
                        <TabPanel value="1" sx={{ p: 0 }}>
                            <OverviewTab country={country} />
                        </TabPanel>
                        <TabPanel value="2" sx={{ p: 0 }}>
                            <StatsTab country={country} neighbors={neighbors} />
                        </TabPanel>
                        <TabPanel value="3" sx={{ p: 0 }}>
                            <NeighborsTab neighbors={neighbors} />
                        </TabPanel>
                        <TabPanel value="4" sx={{ p: 0 }}>
                            <GalleryTab countryName={country.name.common} />
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Grow>
        </Container>
    );
}
