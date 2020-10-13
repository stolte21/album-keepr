import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Input,
    TextField,
    Button
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { saveAlbum, editAlbumRating } from '../actions/albumKeeprActions';
import { closeFormDialog } from '../actions/uiActions';
import useForm from '../hooks/useForm';

const useStyles = makeStyles({
    rating: {
        padding: 12
    }
});

const defaultFormValues = {
    rating: 0,
    notes: ''
};

const defaultAlbum = {
    id: '',
    name: ''
}

const FormDialog = ({
    // props
    open,
    edit,
    hasFavoritedOnSpotify,
    album,
    initialValues,

    // action creators
    saveAlbum,
    editAlbumRating,
    closeFormDialog
}) => {

    const classes = useStyles();
    const [saving, setSaving] = useState(false);
    const [formValues, handleInputChange, setForm] = useForm(initialValues);
    const { rating, notes } = formValues;
    const { id, name } = album || defaultAlbum;

    useEffect(() => {
        setForm(initialValues);
    // eslint-disable-next-line
    }, [id]);

    const handleSave = () => {

        setSaving(true);

        const saveFunc = edit ? editAlbumRating : saveAlbum;

        saveFunc(id, rating, notes, !hasFavoritedOnSpotify, album)
        .then(() => {
            closeFormDialog();
            setSaving(false);
        });
    };

    const isDisabled = () => {
        return (
            rating === 0 ||
            (rating === initialValues.rating && notes === initialValues.notes) ||
            saving
        );
    };

    return (
        <Dialog open={open} onClose={closeFormDialog}>
            <DialogTitle>
                {name}
            </DialogTitle>

            <DialogContent>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Rating</InputLabel>
                    <Input
                        startAdornment={(
                            <Rating
                                className={classes.rating}
                                name="formRating"
                                value={rating}
                                precision={0.5}
                                onChange={(e, newRating) => handleInputChange('rating', newRating)}
                            />
                        )}
                    />
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    multiline
                    rows="5"
                    rowsMax="5"
                    label="Notes"
                    value={notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={closeFormDialog} variant="contained">
                    Cancel
                </Button>
                <Button 
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    disabled={isDisabled()}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = ({ dialog }) => {

    const { 
        open,
        album,
        initialValues 
    } = dialog;

    const edit = Boolean(initialValues && (initialValues.rating || initialValues.notes));
    const hasFavoritedOnSpotify = initialValues ? true : false;
    const startingValues = initialValues || defaultFormValues;

    return {
        open,
        edit,
        hasFavoritedOnSpotify,
        album,
        initialValues: startingValues,
    };
};

export default connect(
    mapStateToProps,
    { saveAlbum, editAlbumRating, closeFormDialog }
)(FormDialog);