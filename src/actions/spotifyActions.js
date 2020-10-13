import { 
    SEARCH_ARTISTS,
    FETCH_ARTIST,
    FETCH_ARTIST_ALBUMS,
    FETCH_SAVED_ALBUMS,
    SAVE_SPOTIFY_ALBUM
} from './types';
import {
    searchArtists,
    fetchArtist,
    fetchArtistAlbums,
    fetchSavedAlbums,
    saveAlbumsForUser
} from '../api/spotifyApi';
import {
    generateRequestAction,
    generateSuccessAction,
    generateFailureAction
} from '../utils/actionUtil';

export const searchSpotifyArtists = (term) => (dispatch) => {

    dispatch({ type: generateRequestAction(SEARCH_ARTISTS) });

    return searchArtists(term)
    .then(({ data: { artists } }) => {
        if (artists.items.length === 0) {
            dispatch({
                type: generateFailureAction(SEARCH_ARTISTS),
                payload: 'No results found.'
            });
        } else {
            dispatch({
                type: generateSuccessAction(SEARCH_ARTISTS),
                payload: artists
            });
        }
    })
    .catch(error => {
        dispatch({
            type: generateFailureAction(SEARCH_ARTISTS),
            payload: error.message
        });
    });
};

export const getSpotifyArtist = (id) => (dispatch) => {

    dispatch({ type: generateRequestAction(FETCH_ARTIST) });

    return fetchArtist(id)
    .then(({ data }) => {
        dispatch({
            type: generateSuccessAction(FETCH_ARTIST),
            payload: data
        });
    })
    .catch(error => {

        const message = error.status === 400 ? (
            'No artist was found for that ID.'
        ) : (
            'There was a problem loading that artist.'
        );

        dispatch({
            type: generateFailureAction(FETCH_ARTIST),
            payload: message
        });
    });
};

export const getSpotifyArtistAlbums = (id) => (dispatch) => {

    dispatch({ type: generateRequestAction(FETCH_ARTIST_ALBUMS) });

    return fetchArtistAlbums(id)
    .then(({ data }) => {
        dispatch({
            type: generateSuccessAction(FETCH_ARTIST_ALBUMS),
            payload: data
        });
    })
    .catch(error => {

        const message = error.status === 400 ? (
            'No artist was found for that ID.'
        ) : (
            'There was a problem loading that artist.'
        );

        dispatch({
            type: generateFailureAction(FETCH_ARTIST_ALBUMS),
            payload: message
        });
    });
};

export const getSavedSpotifyAlbums = () => (dispatch) => {

    dispatch({ type: generateRequestAction(FETCH_SAVED_ALBUMS) });

    return fetchSavedAlbums()
    .then(({ data }) => {
        dispatch({
            type: generateSuccessAction(FETCH_SAVED_ALBUMS),
            payload: data
        });
    })
    .catch(error => {
        dispatch({
            type: generateFailureAction(FETCH_SAVED_ALBUMS),
            payload: error.message
        });
    });
};

export const saveSpotifyAlbum = (id, album) => (dispatch) => {

    dispatch({ type: generateRequestAction(SAVE_SPOTIFY_ALBUM) });

    return new Promise((resolve, reject) => {
        return saveAlbumsForUser(id)
        .then(({ data }) => {

            dispatch({
                type: generateSuccessAction(SAVE_SPOTIFY_ALBUM),
                payload: album
            });

            resolve(true);
        })
        .catch(error => {

            dispatch({
                type: generateFailureAction(SAVE_SPOTIFY_ALBUM),
                payload: error
            });

            reject(false);
        });
    });
};