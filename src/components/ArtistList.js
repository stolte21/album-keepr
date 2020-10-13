import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { List, Typography } from '@material-ui/core';
import ArtistRow from './ArtistRow';
import { SEARCH_ARTISTS } from '../actions/types';

const useStyles = makeStyles({
    emptyRoot: {
        position: 'absolute',
        width: '100%',
        top: '50%',
        left: 0
    },
    list: {
        width: '75%',
        padding: 8,
        margin: '0 auto'
    }
});

const ArtistList = ({ 
    artists,
    error
}) => {

    const classes = useStyles();

    const renderList = (artists) => {

        if (error) {
            return (
                <div className={classes.emptyRoot}>
                    <Typography variant="h2" align="center">
                        No results found.
                    </Typography>
    
                    <Typography variant="body1" align="center">
                        Double check you spelled that correctly.
                    </Typography>
                </div>
            );
        }
    
        return (
            <List className={classes.list}>
                {artists.map(artist => (
                    <ArtistRow key={artist.id} artist={artist} />
                ))}
            </List>
        );
    };

    return renderList(artists);
};

const mapStateToProps = ({ api: { error }}) => {
    return {
        error: error.get(SEARCH_ARTISTS)
    };
};

export default connect(mapStateToProps)(ArtistList);