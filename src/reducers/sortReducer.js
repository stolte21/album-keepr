import { UPDATE_SORT } from '../actions/types';
import { SortDirection } from 'react-virtualized';

const defaultState = {
    sortBy: 'releaseDate',
    sortDirection: SortDirection.DESC
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_SORT:
            const { sortBy, sortDirection } = action.payload;

            return {
                sortBy,
                sortDirection
            };
        default:
            return state;
    }
};