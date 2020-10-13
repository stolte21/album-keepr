import { useReducer } from 'react';

const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD';
const SET_FORM = 'SET_FORM';

const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_FORM_FIELD:
            return {
                ...state,
                [action.key]: action.value
            };
        case SET_FORM:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default (initialState) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInputChange = (key, value) => {
        dispatch({ type: UPDATE_FORM_FIELD, key, value });
    };

    const setForm = (values) => {
        dispatch({ type: SET_FORM, payload: values });
    };

    return [state, handleInputChange, setForm];
};