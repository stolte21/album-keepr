import { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { signIn } from '../actions/authActions';

const SignInSuccessRoute = ({
    // props
     location,

     // action creators
     signIn
}) => {

    const history = useHistory();

    useEffect(() => {
        const { access_token } = queryString.parse(location.search);
        signIn(access_token);
        history.replace('/');

    // eslint-disable-next-line
    }, []);

    return null;
};

export default connect(null, { signIn })(SignInSuccessRoute);