import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dialogReducer from './dialogReducer';
import filterReducer from './filterReducer';
import sortReducer from './sortReducer';
import apiReducer from './apiReducer';
import keeprReducer from './keeprReducer';
import spotifyReducer from './spotifyReducer';

export default combineReducers({
    auth: authReducer,
    dialog: dialogReducer,
    filter: filterReducer,
    sort: sortReducer,
    api: apiReducer,
    keepr: keeprReducer,
    spotify: spotifyReducer
});