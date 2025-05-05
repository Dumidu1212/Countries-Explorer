import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { fetchCountryByCode } from '../api/countriesApi';
import OverviewTab from '../components/CountryDetail/OverviewTab';
import StatsTab from '../components/CountryDetail/StatsTab';
import NeighborsTab from '../components/CountryDetail/NeighborsTab';

const regionColors = {
    Africa: ['#fceabb', '#f8b500'],
    Americas: ['#a1c4fd', '#c2e9fb'],
    Asia: ['#ff9a9e', '#fad0c4'],
    Europe: ['#d4fc79', '#96e6a1'],
    Oceania: ['#84fab0', '#8fd3f4'],
};

export default function CountryDetail() {
    const { code } = useParams();
    const [country, setCountry] = useState(null);
    const [neighbors, setNeighbors] = useState([]);
    const [tab, setTab] = useState('1');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const [data] = await fetchCountryByCode(code);
            setCountry(data);
            if (data.borders?.length) {
                const nb = await Promise.all(data.borders.map(b => fetchCountryByCode(b).then(r => r[0])));
                setNeighbors(nb);
            }
            setLoading(false);
        }
        load();
    }, [code]);

    useEffect(() => { setTab('1'); }, [code]);

    if (loading || !country) return <Container maxWidth="lg" sx={{ py:4 }}><Skeleton height={40} width={100}/><Skeleton height={400} sx={{my:2}}/><Skeleton height={200}/></Container>;

    const accent = regionColors[country.region] || ['#fff','#fff'];

    return (
        <Container maxWidth="lg" sx={{ py:4 }}>
            <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mb:3 }}>Back</Button>
            <Grow in timeout={500}>
                <Paper elevation={3} sx={{ p: {xs:2,md:4},borderRadius:2,background:`linear-gradient(135deg,${accent[0]},${accent[1]})`,color:'#333' }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom:1,borderColor:'divider',mb:2 }}>
                            <Tabs value={tab} onChange={(_,v)=>setTab(v)} centered>
                                <Tab label="Overview" value="1" />
                                <Tab label="Stats" value="2" />
                                <Tab label="Neighbors" value="3" />
                            </Tabs>
                        </Box>
                        <TabPanel value="1" sx={{p:0}}><OverviewTab country={country} neighbors={neighbors}/></TabPanel>
                        <TabPanel value="2" sx={{p:0}}><StatsTab country={country} neighbors={neighbors}/></TabPanel>
                        <TabPanel value="3" sx={{p:0}}><NeighborsTab neighbors={neighbors}/></TabPanel>
                    </TabContext>
                </Paper>
            </Grow>
        </Container>
    );
}