import axios from 'axios';
import { getAccessToken } from '../utils/accessTokenUtil';
import { store } from '../providers/ReduxProvider';
import { refreshAccessToken } from './albumKeeprApi';
import { updateAccessToken } from '../actions/authActions';

const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1'
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

// token refresh helpers
let isRefreshing = false;
let requests = [];

const onReceivedRefreshToken = (token) => {
    requests.forEach(request => request(token));
};

const addRequest = (requestCallback) => {
    requests.push(requestCallback);
};

instance.interceptors.response.use(
    null,
    (error) => {
        const { 
            config, response: { status }
        } = error;

        const ogRequest = config;

        if (status === 401) {
            if (!isRefreshing) {

                isRefreshing = true;

                refreshAccessToken().then(({ data }) => {
                    isRefreshing = false;
                    store.dispatch(updateAccessToken(data.access_token));
                    onReceivedRefreshToken(data.access_token);
                    requests = [];
                });
            }

            return new Promise(resolve => {
                addRequest(token => {
                    ogRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(instance(ogRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

// API

export const searchArtists = (term) => {
    const params = { q: term, type: 'artist' };
    return instance.get('/search', { params });
};

export const fetchArtist = (id) => {
    return instance.get(`/artists/${id}`);
};

export const fetchArtistAlbums = (artistId) => {
    const params = { 
        market: 'US',
        include_groups: 'album'
    };

    return instance.get(`/artists/${artistId}/albums`, {
        params
    });
};

/**
 * The Spotify API accepts a list of albums to save at once,
 * but for my purposes we just need the one album ID to save.
 * 
 * @param {string} albumId 
 */
export const saveAlbumsForUser = (albumId) => {
    return instance.put(`/me/albums?ids=${albumId}`);
};

export const deleteAlbumsForUser = (albumId) => {
    return instance.delete(`/me/albums?ids=${albumId}`);
};

export const fetchSavedAlbums = () => {
    return new Promise(async (resolve, reject) => {

        let results = [];
        let next;
        const limit = 50;

        for (let offset = 0; next !== null; offset += limit) {
            const params = {
                limit,
                offset
            };
    
            try {
                const { data } = await instance.get('/me/albums', {
                    params
                });

                next = data.next;
                results = results.concat(data.items);
            } catch (error) {
                reject(error);
                break;
            }
        }

        resolve({ data: results });
    });
};

/**  
 * The Spotify API accepts a list of comma separated album IDs
 * but only has a max of 20 allowed in the request. This method iterates
 * over a list of any length and makes multiple requests as needed.
 * 
 * @param {Array} ids 
 */
export const fetchSeveralAlbums = (ids) => {
     return new Promise(async (resolve, reject) => {

        let results = [];
        const max = 20;

        while (ids.length !== 0) {
            const grabbedIds = ids.splice(0, max);

            const params = {
                market: 'US',
                ids: grabbedIds.toString()
            };

            try {
                const { data } = await instance.get('/albums', {
                    params
                });

                results = results.concat(data.albums);
            } catch (error) {
                reject(error);
            }
        }

        resolve({ data: results });
     });
};