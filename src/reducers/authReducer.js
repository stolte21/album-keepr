import { SIGN_IN, SIGN_IN_ERROR } from '../actions/types';

const defaultState = {
    accessToken: '',
    errorMessage: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SIGN_IN:
            const { accessToken } = action.payload;
            
            return {
                accessToken
            };
        case SIGN_IN_ERROR:
            const { errorMessage } = action.payload;

            return {
                ...state,
                errorMessage
            };
        default:
            return state;
    }
};