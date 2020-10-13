import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    text: {
        color: 'white',
        fontWeight: 350
    }
})

const AppTitle = () => {

    const classes = useStyles();

    return (
        <Typography
            className={classes.text}
            align="center"
            variant="h1"
            gutterBottom
            noWrap
        >
            Album Keepr
        </Typography>
    );
};

export default AppTitle;