import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { SortDirection } from 'react-virtualized';

/* API Util */

export const createLoadingSelector = (actions) => (state) => {

    // special case where the app is first loading and for the first
    // render the loading reducer is empty
    if (state.api.loading.isEmpty()) { return true; }

    // returns true if one of the actions supplied is in the loading state
    return actions.some(action => state.api.loading.get(action));
};

/**
 * Filtering methods
 */

 const compare = (album, artist, year, rating, yearOp, ratingOp) => {
     return (
         compareArtist(album.artist, artist) &&
         compareYear(album.releaseDate, year, yearOp) &&
         compareRating(album.rating, rating, ratingOp)
     );
 };

const compareArtist = (artist, filterArtist) => {
    if (filterArtist === '') return true;
    return artist.toLowerCase().startsWith(filterArtist.toLowerCase());
};

const compareYear = (year, filterYear, yearOperation) => {
    if (filterYear === '' || yearOperation === '') return true;

    return compareOp(year.substring(0, 4), filterYear, yearOperation);
};

const compareRating = (rating, filterRating, ratingOperation) => {
    if (filterRating === '' || ratingOperation === '') return true;

    return compareOp(rating, filterRating, ratingOperation);
};

const compareOp = (left, right, op) => {
    switch (op) {
        case '<=': return left <= right;
        case '>=': return left >= right;
        case '=': return left === right;
        default: return false
    }
};

/**
 * Selectors
 */

const getSpotifyAlbums = (state) => state.spotify.savedAlbums;
const getRatedAlbums = (state) => state.keepr.albums;
const getTableSort = (state) => state.sort;
const getTableFilter = (state) => state.filter;

export const mergeSpotifyAndRatedAlbums = createSelector(
    [ getSpotifyAlbums, getRatedAlbums],
    (spotifyAlbums, ratedAlbums) => {

        let mergedAlbums = Map();

        if (spotifyAlbums) {

            /**
             * The spotifyAlbums list contains the album objects from Spotify.
             * It needs to be merged with the keepr data which has the ratings
             * and notes information for each album the user has rated.
             */

            spotifyAlbums.toList().forEach(album => {

                let rating = 0;
                let notes = '';

                const keeprAlbum = ratedAlbums.get(album.id);
                if (keeprAlbum) {
                    rating = keeprAlbum.rating;
                    notes = keeprAlbum.notes;
                }

                mergedAlbums = mergedAlbums.set(album.id, { ...album, rating, notes });
            });
        }

        return mergedAlbums;
    }
);

export const getFilteredSpotifyAlbums = createSelector(
    [ mergeSpotifyAndRatedAlbums, getTableFilter, getTableSort ],
    (mergedAlbums, tableFilter, tableSort) => {

        if (mergedAlbums) {
            const { artist, year, yearOp, rating, ratingOp } = tableFilter;
            const { sortBy, sortDirection } = tableSort;

            mergedAlbums = mergedAlbums.toList().filter(album => compare(album, artist, year, rating, yearOp, ratingOp));

            mergedAlbums = mergedAlbums.sort((lhs, rhs) => {
        
                let a = lhs[sortBy];
                let b = rhs[sortBy];
                
                if (typeof a === 'string') {
                    a = a.toUpperCase();
                    b = b.toUpperCase();
                }
        
                if (a > b) return 1;
                else if (a < b) return -1;
                else return 0;
            });
        
            return sortDirection === SortDirection.DESC ? (
                mergedAlbums.reverse()
            ) : (
                mergedAlbums
            );
        }

        return mergedAlbums;
    }
);