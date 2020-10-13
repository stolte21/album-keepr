import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import SearchRoute from '../routes/SearchRoute';
import ArtistRoute from '../routes/ArtistRoute';
import SignInRoute from '../routes/SignInRoute';
import SignInSuccessRoute from '../routes/SignInSuccesRoute';
import SignInErrorRoute from '../routes/SignInErrorRoute';
import PrivateRoute from '../routes/PrivateRoute';
import SpotifyAlbumsRoute from '../routes/SpotifyAlbumsRoute';
import AppBar from './AppBar';
import ErrorNotification from './ErrorNotification';
import { signIn } from '../actions/authActions';
import { ACCESS_TOKEN_KEY } from '../constants/storageKeys';

const useStyles = makeStyles({
    container: {
        height: 'calc(100% - 64px)'
    }
})

const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);

const App = ({
    // props
    authorized,
    
    // action creators
    signIn
}) => {

    const classes = useStyles();
    const actuallyAuthorized = authorized || Boolean(accessToken);

    useEffect(() => {
        if (!authorized) {
            if (accessToken) {
                signIn(accessToken);
            }
        }
    }, [authorized, signIn]);

    return (
        <Switch>
            <>
                {actuallyAuthorized && <AppBar />}
                <ErrorNotification />

                <Container className={classes.container} maxWidth="xl">
                    <PrivateRoute authorized={actuallyAuthorized} path="/artist/:id">
                        <ArtistRoute />
                    </PrivateRoute>

                    <PrivateRoute exact authorized={actuallyAuthorized} path="/search">
                        <SearchRoute />
                    </PrivateRoute>

                    <Route path="/success*" component={SignInSuccessRoute} />
                    <Route path="/error*" component={SignInErrorRoute} />

                    {actuallyAuthorized ? (
                        <Route exact path="/" component={SpotifyAlbumsRoute} />
                    ) : (
                        <Route exact path="/" component={SignInRoute} />
                    )}
                </Container>
            </>
        </Switch>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        authorized: auth.accessToken ? true : false
    };
};

export default connect(mapStateToProps, { signIn })(App);