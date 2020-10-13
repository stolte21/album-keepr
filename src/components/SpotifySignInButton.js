import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, SvgIcon, CircularProgress } from '@material-ui/core';
import { ReactComponent as Spotify } from '../assets/SpotifyIcon.svg';
import { signIn } from '../api/albumKeeprApi';

const useStyles = makeStyles({
    button: {
        margin: 8,
    },
});

const SpotifySignInButton = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        if (!loading) {
            setLoading(true);
            signIn();
        }
    };

    return (
        <Button
            className={classes.button}
            variant="contained"
            onClick={handleSignIn}
            endIcon={loading ? (
                <CircularProgress size={20} />
            ) : (
                <SvgIcon 
                    component={Spotify}
                    viewBox="0 0 168 168"
                />
            )}
        >
            Sign in with Spotify
        </Button>
    );
};

export default SpotifySignInButton;