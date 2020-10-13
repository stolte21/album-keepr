import { FETCH_ARTIST } from '../../actions/types';
import { generateSuccessAction } from '../../utils/actionUtil';
import ArtistRecord from '../../records/ArtistRecord';

export default (state = ArtistRecord(), action) => {
    switch (action.type) {
        case generateSuccessAction(FETCH_ARTIST):
            return ArtistRecord(action.payload);
        default:
            return state;
    }
};