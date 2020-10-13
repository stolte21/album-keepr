import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    error: errorReducer,
    loading: loadingReducer
});