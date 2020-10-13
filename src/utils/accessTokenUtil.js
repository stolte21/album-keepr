import { store } from '../providers/ReduxProvider';
import { ACCESS_TOKEN_KEY } from '../constants/storageKeys';

export const getAccessToken = () => {
    const sessionToken = store.getState().auth.accessToken;
    const storageToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);

    return sessionToken || storageToken;
};