import { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'querystring';
import { signInError } from '../actions/authActions';

const SignInErrorRoute = ({
    // props
    location,

    // action creators
    signInError
}) => {

    useEffect(() => {
        const { message } = queryString.parse(location.search);
        signInError(message);

    // eslint-disable-next-line
    }, []);

    return null;
};

export default connect(null, { signInError })(SignInErrorRoute);