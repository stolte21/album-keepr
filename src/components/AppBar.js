import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AlbumIcon from '@material-ui/icons/Album';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    },
    selectedIcon: {
        backgroundColor: 'rgba(55, 55, 55, 0.3)'
    }
});

const screenButtons = [
    {
        title: 'Home',
        route: '/',
        Icon: AlbumIcon,
    },
    {
        title: 'Search',
        route: '/search',
        Icon: SearchIcon
    }
];

const AppBar = () => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    return (
        <MuiAppBar position="relative">
            <Toolbar>
                <Typography className={classes.title} variant="h5">
                    Album Keepr
                </Typography>

                <div>
                    {screenButtons.map(({ title, route, Icon }) => (
                        <IconButton
                            key={title}
                            className={clsx({
                                [classes.selectedIcon]: route === location.pathname
                            })}
                            title={title}
                            color="inherit"
                            onClick={() => history.push(route)}
                        >
                            <Icon />
                        </IconButton>
                    ))}
                </div>
            </Toolbar>
        </MuiAppBar>
    )
};

export default AppBar;