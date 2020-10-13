import { Map } from 'immutable';
import { keyBy } from 'lodash';
import {
    FETCH_SAVED_ALBUMS,
    SAVE_SPOTIFY_ALBUM
} from '../../actions/types';
import { generateSuccessAction } from '../../utils/actionUtil';

export default (state = Map(), action) => {
    switch (action.type) {
        case generateSuccessAction(FETCH_SAVED_ALBUMS):
            const albums = action.payload.map(item => {
                const { album } = item;
                const { id, name, artists, images, release_date } = album;
                const artist = artists[0].name;

                return { id, name, artist, images, releaseDate: release_date };
            });

            return Map(keyBy(albums, 'id'));
        case generateSuccessAction(SAVE_SPOTIFY_ALBUM):
            const { id, name, artists, images, release_date } = action.payload;
            const artist = artists[0].name;

            return state.set(id, { id, name, artist, images, releaseDate: release_date });
        default:
            return state;
    }
};