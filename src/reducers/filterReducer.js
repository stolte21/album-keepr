import { UPDATE_FILTER } from '../actions/types';

const defaultState = {
    artist: '',
    year: '',
    yearOp: '',
    rating: 0,
    ratingOp: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_FILTER:
            const { key, value } = action.payload;

            return {
                ...state,
                [key]: value
            };
        default:
            return state;
    }
};