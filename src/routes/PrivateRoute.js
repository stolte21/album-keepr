import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ 
    authorized,
    children,
    ...props
}) => {
    return (
        <Route
            render={({ location }) => (
                authorized ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                    />
                )
            )}
            {...props}
        />
    );
};

export default PrivateRoute;