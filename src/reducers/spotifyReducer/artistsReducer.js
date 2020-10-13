import { List } from 'immutable';
import { SEARCH_ARTISTS } from '../../actions/types';
import { generateSuccessAction } from '../../utils/actionUtil';

export default (state = List(), action) => {
    switch (action.type) {
        case generateSuccessAction(SEARCH_ARTISTS):
            return List(action.payload.items);
        default:
            return state;
    }
};