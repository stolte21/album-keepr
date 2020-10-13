import { List } from 'immutable';
import { FETCH_ARTIST_ALBUMS } from '../../actions/types';
import { generateSuccessAction } from '../../utils/actionUtil';

export default (state = List(), action) => {
    switch (action.type) {
        case generateSuccessAction(FETCH_ARTIST_ALBUMS):
            return List(action.payload.items);
        default:
            return state;
    }
};