import { OPEN_FORM_DIALOG, CLOSE_FORM_DIALOG } from '../actions/types';

const defaultState = {
    open: false,
    album: null,
    initialValues: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case OPEN_FORM_DIALOG:
            return {
                open: true,
                album: action.payload.album,
                initialValues: action.payload.initialValues
            };
        case CLOSE_FORM_DIALOG:
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
};