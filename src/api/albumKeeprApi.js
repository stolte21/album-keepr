import axios from 'axios';
import { getAccessToken } from '../utils/accessTokenUtil';

const authURL = process.env.NODE_ENV === 'production' ? (
    'https://album-keepr.herokuapp.com'
) : (
    'http://localhost:3001'
);

const instance = axios.create({
    baseURL: authURL
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const signIn = () => {
    window.location.href = `${authURL}/login`;
};

export const refreshAccessToken = () => {
    return instance.get('/refresh_token');
};

export const getAlbums = () => {
    return instance.get('/albums');
};

export const postAlbum = (albumId, rating, notes) => {
    return instance.post('/albums', {
        albumId,
        rating,
        notes
    });
};

export const patchAlbum = (albumId, rating, notes) => {
    return instance.patch(`/albums/${albumId}`, {
        rating,
        notes
    });
};