import { 
    UPDATE_FILTER,
    UPDATE_SORT,
    OPEN_FORM_DIALOG,
    CLOSE_FORM_DIALOG
} from './types';

export const updateTableFilter = (key, value) => {
    return {
        type: UPDATE_FILTER,
        payload: { key, value }
    };
};

export const updateTableSort = (sortBy, sortDirection) => {
    return {
        type: UPDATE_SORT,
        payload: { sortBy, sortDirection }
    };
};

export const openFormDialog = (album, initialValues = null) => {
    return {
        type: OPEN_FORM_DIALOG,
        payload: { album, initialValues }
    };
};

export const closeFormDialog = () => {
    return {
        type: CLOSE_FORM_DIALOG
    };
};