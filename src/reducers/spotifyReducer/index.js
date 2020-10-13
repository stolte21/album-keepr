import { combineReducers } from 'redux';
import albumsReducer from './albumsReducer';
import artistReducer from './artistReducer';
import artistsReducer from './artistsReducer';
import savedAlbumsReducer from './savedAlbumsReducer';

export default combineReducers({
    albums: albumsReducer,
    artist: artistReducer,
    artists: artistsReducer,
    savedAlbums: savedAlbumsReducer
});