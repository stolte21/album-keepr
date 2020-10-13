import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardActions,
    Typography
} from '@material-ui/core';
import SpotifySignInButton from './SpotifySignInButton';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        textAlign: 'center',
        maxWidth: 500,
        padding: 32,
        [theme.breakpoints.down('xs')]: {
            padding: 0
        }
    },
    actions: {
        justifyContent: 'center'
    }
}));

const SignInCard = () => {

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {

        const { main, light } = theme.palette.primary;
        const root = document.getElementById('root');
        root.style.backgroundImage = `linear-gradient(0deg, ${main} 0%, ${light} 100%)`;

        return () => {
            root.style.backgroundImage = '';
        };
    }, [theme.palette.primary]);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography color="textPrimary">
                        This application requires a Spotify account to lookup your saved music
                        and to browse its library.
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <SpotifySignInButton />
                </CardActions>
            </Card>
        </div>
    );
};

export default SignInCard;