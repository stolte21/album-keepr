import {   
    GET_RATED_ALBUMS,
    SAVE_ALBUM,
    EDIT_ALBUM_RATING,
} from './types';
import { getAlbums, postAlbum, patchAlbum } from '../api/albumKeeprApi';
import { saveSpotifyAlbum } from './spotifyActions';
import {
    generateRequestAction,
    generateSuccessAction,
    generateFailureAction
} from '../utils/actionUtil';

export const getRatedAlbums = () => (dispatch) => {

    dispatch({ type: generateRequestAction(GET_RATED_ALBUMS) });

    return getAlbums()
    .then(({ data }) => {
        dispatch({
            type: generateSuccessAction(GET_RATED_ALBUMS),
            payload: data
        });
    })
    .catch(error => {
        dispatch({
            type: generateFailureAction(GET_RATED_ALBUMS),
            payload: error.message
        });
    });
};

export const saveAlbum = (id, rating, notes, saveOnSpotify, album) => (dispatch) => {

    dispatch({ type: generateRequestAction(SAVE_ALBUM) });

    const saveKeeprAlbum = () => {
        return postAlbum(id, rating, notes)
        .then(({ data }) => {
            dispatch({
                type: generateSuccessAction(SAVE_ALBUM),
                payload: data
            });
        })
        .catch(error => {
            dispatch({
                type: generateFailureAction(SAVE_ALBUM),
                payload: error.message
            });
        });
    };

    if (saveOnSpotify) {
        return saveSpotifyAlbum(id, album)
        .then(() => {
            return saveKeeprAlbum();
        });
    } else {
        return saveKeeprAlbum();
    }
};

export const editAlbumRating = (id, rating, notes) => (dispatch) => {

    dispatch({ type: generateRequestAction(EDIT_ALBUM_RATING) });

    return patchAlbum(id, rating, notes)
    .then(({ data }) => {
        dispatch({
            type: generateSuccessAction(EDIT_ALBUM_RATING),
            payload: data
        });
    })
    .catch(error => {
        dispatch({ 
            type: generateFailureAction(EDIT_ALBUM_RATING),
            payload: error.message
        });
    });
};