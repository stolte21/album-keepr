import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Menu,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
    Fab,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Autocomplete, Rating } from '@material-ui/lab';
import FilterChip from './FilterChip';
import { updateTableFilter } from '../actions/uiActions';

const useStyles = makeStyles({
    root: {
        marginBottom: 24,
        paddingLeft: 8,
        paddingRight: 8
    },
    details: {
        padding: 8
    },
    outlinedInput: {
        paddingLeft: 8
    },
    ratingClearButton: {
        position: 'absolute',
        padding: 4,
        right: 7
    },
    opButton: {
        width: 24,
        height: 24,
        fontSize: '1.5rem'
    },
    stars: {
        marginLeft: 12
    },
    ratingTextField: {
        '&:hover $clearIndicatorDirty, & .Mui-focused $clearIndicatorDirty': {
          visibility: 'visible'
        }
    },
    clearIndicatorDirty: {},
    clearIndicator: {
        visibility: 'hidden'
    },
    hidden: {
        display: 'none'
    }
});

const getOperationSymbol = (op) => {
    switch (op) {
        case '=':
            return '=';
        case '>=':
            return '≥';
        case '<=':
            return '≤';
        default:
            return null;
    }
};

const generateOperationsOptions = (key, eventHandler) => {
    const ops = ['', '>=', '<=', '='];

    return ops.map(op => (
        op ? (
            <MenuItem 
                key={op}
                value={op}
                onClick={() => eventHandler(key, op)}
            >
                {getOperationSymbol(op)}
            </MenuItem>
        ) : (
            <MenuItem 
                key="none"
                value={op}
                onClick={() => eventHandler(key, op)}
            >
                <em>None</em>
            </MenuItem>
        )
    ));
};

const TableFilter = ({
    // props
    artists,
    years,
    filter,
    panel,
    expanded,
    onExpansion,

    // action creators
    updateTableFilter,
}) => {

    const classes = useStyles();
    const [yearAnchor, setYearAnchor] = useState(null);
    const [ratingAnchor, setRatingAnchor] = useState(null);
    const { artist, year, yearOp, rating, ratingOp } = filter;

    const handleClickYear = (event) => {
        setYearAnchor(event.currentTarget);
    };

    const handleClickRating = (event) => {
        setRatingAnchor(event.currentTarget);
    };

    const handleYearOpsClose = () => {
        setYearAnchor(null);
    };

    const handleRatingOpsClose = () => {
        setRatingAnchor(null);
    };

    const handleFilterChange = (key, value) => {
        updateTableFilter(key, value);
        yearAnchor ? handleYearOpsClose() : handleRatingOpsClose();
    };

    const renderOpButton = (op, eventHandler) => {

        const opSymbol = getOperationSymbol(op);
    
        return (
            <Fab
                color="primary"
                size="small"
                onClick={eventHandler}
                classes={{
                    label: classes.opButton
                }}
            >
                {opSymbol ? opSymbol : <FilterListIcon />}
            </Fab>
        );
    };

    const renderArtistFilter = () => {
        return (
            <Autocomplete
                options={artists.map(artist => artist.title)}
                onInputChange={(e, value) => (
                    handleFilterChange('artist', value)
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Artist"
                        variant="outlined"
                        value={artist}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                )}
                freeSolo
            />
        );
    };

    const renderYearFilter = () => {

        const yearOpMenu = (
            <InputAdornment position="start">
                {renderOpButton(yearOp, handleClickYear)}
                <Menu
                    anchorEl={yearAnchor}
                    open={Boolean(yearAnchor)}
                    onClose={handleYearOpsClose}
                >
                    {generateOperationsOptions('yearOp', handleFilterChange)}
                </Menu>
            </InputAdornment>
        );

        return (
            <Autocomplete
                options={years.map(year => year.title)}
                onInputChange={(e, value, reason) => {
                    if (reason === 'clear') {
                        handleFilterChange('year', '');
                        handleFilterChange('yearOp', '');
                    } else {
                        handleFilterChange('year', value)
                    }
                }}
                freeSolo
                renderInput={params => {
                    params.InputProps.startAdornment = yearOpMenu;

                    return (
                        <TextField
                            {...params}
                            label="Release Year"
                            variant="outlined"
                            value={year}
                        />
                    );
                }}
            />
        );
    };

    const renderRatingFilter = () => {
        return (
            <FormControl
                className={classes.ratingTextField}
                variant="outlined"
                fullWidth
            >
                <InputLabel shrink={true}>Rating</InputLabel>
                <OutlinedInput
                    className={classes.outlinedInput}
                    label="Rating"
                    startAdornment={(
                        <InputAdornment position="start">
                            {renderOpButton(ratingOp, handleClickRating)}
                            <Menu
                                anchorEl={ratingAnchor}
                                open={Boolean(ratingAnchor)}
                                onClose={handleRatingOpsClose}
                            >
                                {generateOperationsOptions('ratingOp', handleFilterChange)}
                            </Menu>
                            <Rating
                                className={classes.stars}
                                name="filterRating"
                                value={rating}
                                onChange={(event, newRating) => handleFilterChange('rating', newRating)}
                                precision={0.5}
                            />
                        </InputAdornment>
                    )}
                    endAdornment={(
                        <IconButton
                            className={clsx(
                                classes.ratingClearButton,
                                classes.clearIndicator, {
                                    [classes.clearIndicatorDirty]: rating ? true : false
                                }
                            )}
                            onClick={() => {
                                handleFilterChange('rating', 0);
                                handleFilterChange('ratingOp', '');
                            }}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    )}
                />
            </FormControl>
        );
    };

    const filterGrid = (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                {renderArtistFilter()}
            </Grid>

            <Grid item xs={12} md={4}>
                {renderYearFilter()}
            </Grid>
            <Grid item xs={12} md={4}>
                {renderRatingFilter()}
            </Grid>
        </Grid>
    );

    const panelSummary = !expanded ? (
        <>
            <FilterChip label={artist} />
            <FilterChip label={year} operator={yearOp} hasOperator />
            <FilterChip label={rating} operator={ratingOp} hasOperator rating />
        </>
    ) : null;

    return (
        <ExpansionPanel 
            className={classes.root}
            expanded={panel ? expanded : true}
            onChange={onExpansion}
        >
            <ExpansionPanelSummary
                className={clsx({
                    [classes.hidden]: !panel
                })}
                expandIcon={<ExpandMoreIcon />}
            >
                {panelSummary}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                className={classes.details}
            >
                {filterGrid}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const mapStateToProps = ({ filter }) => {
    return {
        filter
    };
};

export default connect(
    mapStateToProps,
    { updateTableFilter }
)(TableFilter);