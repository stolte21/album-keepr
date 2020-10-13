import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, TextField, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        width: '50%',
        minWidth: 250,
        margin: 8
    }
});

const ArtistSearchBar = ({ onSearch, loading }) => {

    const classes = useStyles();
    const [term, setTerm] = useState('');

    return (
        <div className={classes.root}>
            <TextField
                className={classes.input}
                placeholder="Search for artists"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={({ key, keyCode }) => {
                    if ((key === 'Enter' || keyCode === 13) && !loading) {
                        onSearch(term)
                    }
                }}
                InputProps={{
                    endAdornment: loading ? (
                        <IconButton disabled>
                            <CircularProgress size={24} />
                        </IconButton>
                    ) : (
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    )
                }}
            />
        </div>
    );
};

export default ArtistSearchBar;