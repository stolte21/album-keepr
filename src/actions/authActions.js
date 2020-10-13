import { ACCESS_TOKEN_KEY } from '../constants/storageKeys';
import { getRatedAlbums } from '../actions/albumKeeprActions';
import { getSavedSpotifyAlbums } from '../actions/spotifyActions';
import { SIGN_IN, SIGN_IN_ERROR } from './types';

export const signIn = (accessToken) => (dispatch) => {
    dispatch(getRatedAlbums());
    dispatch(getSavedSpotifyAlbums());
    dispatch(updateAccessToken(accessToken));
};

export const updateAccessToken = (accessToken) => {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    return {
        type: SIGN_IN,
        payload: { accessToken }
    };
};

export const signInError = (errorMessage) => {
    return {
        type: SIGN_IN_ERROR,
        payload: { errorMessage }
    };
};