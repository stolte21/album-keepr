import { Map } from 'immutable';
import { keyBy } from 'lodash';
import {
    GET_RATED_ALBUMS,
    SAVE_ALBUM,
    EDIT_ALBUM_RATING
} from '../../actions/types';
import { generateSuccessAction } from '../../utils/actionUtil';

export default (state = Map(), action) => {
    switch (action.type) {
        case generateSuccessAction(GET_RATED_ALBUMS):
            return Map(keyBy(action.payload, 'id'));
        case generateSuccessAction(SAVE_ALBUM):
        case generateSuccessAction(EDIT_ALBUM_RATING):
            return state.set(action.payload.id, action.payload);
        default:
            return state;
    }
};