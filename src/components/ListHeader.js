import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SortDirection } from 'react-virtualized';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, TableSortLabel } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { updateTableSort } from '../actions/uiActions';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        padding: 12,
        textAlign: 'center'
    }
}));

const columns = {
    album: {
        text: 'Album'
    },
    artist: {
        text: 'Artist'
    },
    releaseDate: {
        text: 'Release Date'
    },
    rating: {
        text: 'Rating'
    },
    notes: {
        text: 'Notes'
    }
};

const ListHeader = ({
    // props
    sortBy,
    sortDirection,

    // action creators
    updateTableSort
}) => {

    const classes = useStyles();
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleClickSortMenu = (event) => {
        if (event.target.getAttribute('name')) {
            setMenuAnchor(event.currentTarget);
        } else {
            handleChangeSortDirection();
        }
    };

    const handleCloseSortMenu = () => {
        setMenuAnchor(null);
    };

    const handleChooseSortBy = (newSortBy) => {
        updateTableSort(newSortBy, sortDirection);
        handleCloseSortMenu();
    };

    const handleChangeSortDirection = () => {
        const newSortDirection = sortDirection === SortDirection.ASC ? (
            SortDirection.DESC
        ) : (
            SortDirection.ASC
        );

        updateTableSort(sortBy, newSortDirection);
    };

    const renderMenuItems = () => {
        return Object.keys(columns).map(key => (
            <MenuItem
                key={key}
                onClick={() => handleChooseSortBy(key)}
            >
                {columns[key].text}
            </MenuItem>
        ));
    };

    return (
        <div className={classes.root}>
            <TableSortLabel
                active
                direction={sortDirection.toLowerCase()}
                IconComponent={ArrowDownwardIcon}
                onClick={handleClickSortMenu}
                name="label"
            >
                {columns[sortBy].text}
            </TableSortLabel>
            <Menu
                id="sort-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleCloseSortMenu}
            >
                {renderMenuItems()}
            </Menu>
        </div>
    );
};

const mapStateToProps = ({ sort }) => {

    const { sortBy, sortDirection } = sort;

    return {
        sortBy, sortDirection
    };
};

export default connect(mapStateToProps, { updateTableSort })(ListHeader);