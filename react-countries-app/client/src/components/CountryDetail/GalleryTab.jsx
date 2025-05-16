import React, { useState, useEffect } from 'react';
import { Box, Typography, ImageList, ImageListItem, CircularProgress } from '@mui/material';

// You need to supply your own Unsplash Access Key in an .env file:
// REACT_APP_UNSPLASH_ACCESS_KEY=your_access_key_here
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function GalleryTab({ countryName }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadPhotos() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(countryName + ' landmarks')}&per_page=8&client_id=${ACCESS_KEY}`
                );
                const json = await res.json();
                if (json.errors) throw new Error(json.errors.join(', '));
                setPhotos(json.results || []);
            } catch (e) {
                setError('Failed to load photos.');
            } finally {
                setLoading(false);
            }
        }
        loadPhotos();
    }, [countryName]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!photos.length) return <Typography>No photos found.</Typography>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Famous Places in {countryName}
            </Typography>
            <ImageList cols={4} gap={8} rowHeight={160}>
                {photos.map((photo) => (
                    <ImageListItem key={photo.id}>
                        <img
                            src={photo.urls.small}
                            alt={photo.alt_description || countryName}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}
