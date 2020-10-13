import React from 'react';
import { Container, Grid } from '@material-ui/core';
import AlbumCard from './AlbumCard';
import AlbumRecord from '../records/AlbumRecord';

const emptyAlbums = [1, 2, 3].map(album => AlbumRecord());

const AlbumList = ({
    loading,
    albums
}) => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                {loading ? (
                    emptyAlbums.map((album, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4}>
                            <AlbumCard 
                                loading={loading}
                                album={album}
                            />
                        </Grid>
                    ))
                ) : (
                    albums.map(album => (
                        <Grid key={album.id} item xs={12} sm={6} md={4}>
                            <AlbumCard
                                album={album}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default AlbumList;