import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ArtistCard from '../components/ArtistCard';
import AlbumList from '../components/AlbumList';
import { getSpotifyArtist, getSpotifyArtistAlbums } from '../actions/spotifyActions';
import { FETCH_ARTIST, FETCH_ARTIST_ALBUMS } from '../actions/types';
import { createLoadingSelector } from '../selectors';

const ArtistRoute = ({
    // props
    artistLoading,
    artistAlbumsLoading,
    artist,
    albums,
    
    // action creators
    getSpotifyArtist,
    getSpotifyArtistAlbums
}) => {

    const { id } = useParams();

    useEffect(() => {
        getSpotifyArtist(id);
        getSpotifyArtistAlbums(id);
    }, [id, getSpotifyArtist, getSpotifyArtistAlbums]);

    return (
        <div>
            <ArtistCard
                loading={artistLoading}
                artist={artist}
            />

            <AlbumList
                loading={artistAlbumsLoading}
                albums={albums}
            />
        </div>
    );
};

const artistLoadingSelector = createLoadingSelector([FETCH_ARTIST]);
const artistAlbumsLoadingSelector = createLoadingSelector([FETCH_ARTIST_ALBUMS]);

const mapStateToProps = (state) => {

    const { spotify: { artist, albums }} = state;

    return {
        artistLoading: artistLoadingSelector(state),
        artistAlbumsLoading: artistAlbumsLoadingSelector(state),
        artist,
        albums
    };
};

export default connect(
    mapStateToProps, { 
        getSpotifyArtist,
        getSpotifyArtistAlbums 
    }
)(ArtistRoute);