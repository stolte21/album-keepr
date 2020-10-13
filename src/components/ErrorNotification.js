import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { SEARCH_ARTISTS } from '../actions/types';

const origin = { vertical: 'top', horizontal: 'center' };

const ErrorNotification = ({ errorMessage }) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            console.log('rendering');
            setOpen(true);
        }
    }, [errorMessage]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar 
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={origin}
        >
            <Alert
                elevation={6}
                variant="filled"
                severity="error"
                onClose={handleClose}
            >
                {errorMessage}
            </Alert>
        </Snackbar>
    );
};

const mapStateToProps = ({ api: { error }}) => {

    // some errors are displayed within its component,
    // list the actions here for errors in those scenarios
    const ignoreErrors = [ SEARCH_ARTISTS ];
    const errors = error.filter((value, key) => !ignoreErrors.includes(key));

    return {
        errorMessage: errors.toList().first()
    };
};

export default connect(mapStateToProps)(ErrorNotification);