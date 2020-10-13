import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppTitle from '../components/AppTitle';
import SignInCard from '../components/SignInCard';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
    },
    wrapper: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const SignInRoute = () => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <AppTitle />
                <SignInCard />
            </div>
        </div>
    );
};

export default SignInRoute;