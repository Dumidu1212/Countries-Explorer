import React, { useState, useEffect } from 'react';
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
import {
    useParams, useNavigate, useLocation,
} from 'react-router-dom';

import { fetchCountryByCode } from '../api/countriesApi';
import OverviewTab   from '../components/CountryDetail/OverviewTab';
import StatsTab      from '../components/CountryDetail/StatsTab';
import NeighborsTab  from '../components/CountryDetail/NeighborsTab';
import GalleryTab    from '../components/CountryDetail/GalleryTab';

export default function CountryDetail() {
    const { code }  = useParams();
    const navigate   = useNavigate();
    const location   = useLocation();   // to inspect state

    const [country,   setCountry]   = useState(null);
    const [neighbors, setNeighbors] = useState([]);
    const [tab,       setTab]       = useState('1');
    const [loading,   setLoading]   = useState(true);

    /* ─── fetch current country + borders ──────────────────── */
    useEffect(() => {
        let active = true;
        setLoading(true);

        fetchCountryByCode(code).then(([c]) => {
            if (!active) return;
            setCountry(c);

            if (c.borders?.length) {
                Promise.all(
                    c.borders.map((b) => fetchCountryByCode(b).then((r) => r[0])),
                ).then((nb) => active && setNeighbors(nb));
            }
            setLoading(false);
        });

        return () => { active = false; };
    }, [code]);

    /* reset to Overview when the country changes */
    useEffect(() => { setTab('1'); }, [code]);

    if (loading || !country) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Skeleton height={40} width={120} />
                <Skeleton height={350} sx={{ my: 2 }} />
                <Skeleton height={200} />
            </Container>
        );
    }

    /* ─── UI ────────────────────────────────────────────────── */
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3 }}
                onClick={() => {
                    /** behaviour:
                     *  ① if we came from a search / favourites page, use native history:
                     *     navigate(-1)
                     *  ② otherwise (e.g. user opened /country/XYZ in new tab)
                     *     go home.
                     */
                    if (location.state?.from || window.history.length > 2) {
                        navigate(-1);
                    } else {
                        navigate('/');
                    }
                }}
            >
                Go Back
            </Button>

            <Grow in>
                <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <Tab label="Overview"  value="1" />
                                <Tab label="Stats"      value="2" />
                                <Tab label="Neighbors"  value="3" />
                                <Tab label="Gallery"    value="4" />
                            </Tabs>
                        </Box>

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
