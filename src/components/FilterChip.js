import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
    chip: {
        marginRight: 8
    },
    label: {
        display: 'flex'
    }
});

const FilterChip = ({
    label,
    operator = null,
    hasOperator,
    rating
}) => {

    const classes = useStyles();

    if ((!label && !hasOperator) || ((!label || !operator) && hasOperator)) {
        return null;
    }

    return (
        <Chip
            className={classes.chip}
            classes={{
                label: classes.label
            }}
            color="primary"
            avatar={(operator ? (
                <Avatar>{operator}</Avatar>
            ) : null)}
            label={rating ? ( 
                <Rating
                    value={label}
                    precision={0.5}
                    size="small"
                    readOnly
                />
            ) : (
                label
            )}
        />
    );
};

export default FilterChip;