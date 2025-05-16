// src/components/CountryDetail/GalleryTab.jsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    ImageList,
    ImageListItem,
    CircularProgress,
    Dialog,
    DialogContent,
    IconButton,
    Link,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Vite env var for your Unsplash Access Key
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function GalleryTab({ countryName }) {
    const [photos, setPhotos]     = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        async function loadPhotos() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://api.unsplash.com/search/photos` +
                    `?query=${encodeURIComponent(countryName + ' landmarks')}` +
                    `&per_page=8&client_id=${ACCESS_KEY}`
                );
                const json = await res.json();
                if (json.errors) throw new Error(json.errors.join(', '));
                setPhotos(json.results || []);
            } catch {
                setError('Failed to load photos.');
            } finally {
                setLoading(false);
            }
        }
        loadPhotos();
    }, [countryName]);

    if (loading) return <CircularProgress />;
    if (error)   return <Typography color="error">{error}</Typography>;
    if (!photos.length) return <Typography>No photos found.</Typography>;

    return (
        <>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Famous Places in {countryName}
                </Typography>
                <ImageList cols={4} gap={8} rowHeight={160}>
                    {photos.map(photo => (
                        <ImageListItem
                            key={photo.id}
                            onClick={() => setSelected(photo)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <img
                                src={photo.urls.small}
                                alt={photo.alt_description || countryName}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>

            {/* Lightbox with details */}
            <Dialog
                open={Boolean(selected)}
                onClose={() => setSelected(null)}
                maxWidth="md"
                fullWidth
            >
                <DialogContent sx={{ position: 'relative', p: 0 }}>
                    <IconButton
                        onClick={() => setSelected(null)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'grey.100',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                            zIndex: 1
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {selected && (
                        <Box>
                            <img
                                src={selected.urls.regular}
                                alt={selected.alt_description || countryName}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                            />
                            <Box p={2}>
                                <Stack spacing={1}>
                                    {selected.description && (
                                        <Typography variant="subtitle1">
                                            {selected.description}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" color="text.secondary">
                                        Photo by{' '}
                                        <Link
                                            href={selected.user.links.html}
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            {selected.user.name}
                                        </Link>{' '}
                                        on{' '}
                                        <Link
                                            href="https://unsplash.com"
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            Unsplash
                                        </Link>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {selected.alt_description || ''}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
