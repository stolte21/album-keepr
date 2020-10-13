import React from 'react';
import { connect } from 'react-redux';
import { searchSpotifyArtists } from '../actions/spotifyActions';
import ArtistSearchBar from '../components/ArtistSearchBar';
import ArtistList from '../components/ArtistList';
import { SEARCH_ARTISTS } from '../actions/types';
import { createLoadingSelector } from '../selectors';

const HomeRoute = ({
    // props
    loading,
    artists,

    // action creators
    searchSpotifyArtists
}) => {

    const handleSearch = (term) => {
        searchSpotifyArtists(term);
    };

    return (
        <div>
            <ArtistSearchBar 
                onSearch={handleSearch}
                loading={loading}
            />

            <ArtistList
                artists={artists}
            />
        </div>
    );
};

const loadingSelector = createLoadingSelector([SEARCH_ARTISTS]);

const mapStateToProps = (state) => {

    const { spotify: { artists }} = state;

    return {
        loading: loadingSelector(state),
        artists
    };
};

export default connect(
    mapStateToProps,
    { searchSpotifyArtists }
)(HomeRoute);