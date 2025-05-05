import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip as ReTooltip } from 'recharts';

export default function StatsTab({ country, neighbors }) {
    const { population, area, languages = {}, currencies = {}, timezones = [] } = country;
    const chartData = [
        { name: country.name.common, Pop: population },
        ...neighbors.map(n => ({ name: n.name.common, Pop: n.population })),
    ];

    const stats = [
        { label: 'Population', value: population.toLocaleString() },
        { label: 'Area', value: area.toLocaleString() },
        { label: 'Density', value: `${(population / area).toFixed(2)} /km²` },
        { label: 'Languages', value: Object.values(languages).length },
        { label: 'Currencies', value: Object.keys(currencies).length },
        { label: 'Timezones', value: timezones.length },
    ];

    return (
        <>
            <Grid container spacing={2} mb={4}>
                {stats.map(({ label, value }) => (
                    <Grid item xs={12} sm={6} md={3} key={label}>
                        <Card elevation={1} sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="subtitle2">{label}</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h6" gutterBottom>Population Comparison</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ReTooltip cursor={false} />
                        <Bar dataKey="Pop" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}
