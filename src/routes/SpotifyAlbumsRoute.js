import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Container, withWidth } from '@material-ui/core';
import TableFilter from '../components/TableFilter';
import VirtualizedList from '../components/VirtualizedList';
import VirtualizedTable from '../components/VirtualizedTable';
import ListHeader from '../components/ListHeader';
import { createLoadingSelector, getFilteredSpotifyAlbums } from '../selectors';
import { openFormDialog } from '../actions/uiActions';
import { GET_RATED_ALBUMS, FETCH_SAVED_ALBUMS } from '../actions/types'; 
import generateFilterOptions from '../utils/filterOptions';

const useStyles = makeStyles({
    root: {
        height: '100%',
        paddingTop: 24,
        paddingLeft: 0,
        paddingRight: 0
    },
    list: {
        height: 'calc(100% - 350px)'
    },
    listCollapsed: {
        height: 'calc(100% - 140px)'
    },
    table: {
        height: 'calc(100% - 100px)'
    }
});

const tableColumns = [
    {
        width: 76,
        label: '',
        disableSort: true,
        dataKey: 'images',
        minWidth: 76,
    }, {
        width: 150,
        label: 'Album',
        dataKey: 'name',
        flexGrow: 1
    }, {
        width: 200,
        label: 'Artist',
        dataKey: 'artist',
        flexGrow: 1
    }, {
        width: 150,
        label: 'Release Date',
        dataKey: 'releaseDate',
        flexGrow: 1
    }, {
        width: 150,
        label: 'Rating',
        dataKey: 'rating',
        flexGrow: 2,
    }, {
        width: 400,
        minWidth: 350,
        label: 'Notes',
        dataKey: 'notes',
        flexGrow: 3,
        flexShrink: 0
    }
];

const isSmall = (width) => {
    return width === 'sm' || width === 'xs';
};

const SpotifyAlbumsRoute = ({
    loading,
    allAlbums,
    spotifyAlbums,
    width,
    openFormDialog
}) => {

    const classes = useStyles();
    const [artists, setArtists] = useState([]);
    const [years, setYears] = useState([]);
    const [filterExpanded, setFilterExpanded] = useState(true);

    useEffect(() => {
        const { artistOptions, yearOptions } = generateFilterOptions(allAlbums.toList());
        setArtists(artistOptions);
        setYears(yearOptions);
    }, [spotifyAlbums, allAlbums]);

    const handleRowClick = (album) => {
        const initialValues = {
            rating: album.rating,
            notes: album.notes
        };

        openFormDialog(album, initialValues);
    };

    const handleExpansionClick = (e, isExpanded) => {
        setFilterExpanded(isExpanded);
    };

    return (
        <Container 
            className={classes.root}
            maxWidth="lg"
        >
            <TableFilter 
                artists={artists}
                years={years}
                panel={isSmall(width)}
                expanded={filterExpanded}
                onExpansion={handleExpansionClick}
            />
            {isSmall(width) ? (
                <div 
                    className={clsx({
                        [classes.list]: filterExpanded,
                        [classes.listCollapsed]: !filterExpanded
                    })}
                >
                    <ListHeader />
                    <VirtualizedList
                        loading={loading}
                        rows={spotifyAlbums}
                        onAlbumClick={handleRowClick}
                    />
                </div>
            ) : (
                <div className={classes.table}>
                    <VirtualizedTable
                        loading={loading}
                        rows={spotifyAlbums}
                        columns={tableColumns}
                        defaultSortBy="releaseDate"
                        onAlbumClick={handleRowClick}
                    />
                </div>
            )}
        </Container>
    );
};

const loadingSelector = createLoadingSelector([GET_RATED_ALBUMS, FETCH_SAVED_ALBUMS]);

const mapStateToProps = (state) => {
    return {
        loading: loadingSelector(state),
        allAlbums: state.spotify.savedAlbums,
        spotifyAlbums: getFilteredSpotifyAlbums(state)
    };
};

export default connect(
    mapStateToProps,
    { openFormDialog }
)(withWidth()(SpotifyAlbumsRoute));