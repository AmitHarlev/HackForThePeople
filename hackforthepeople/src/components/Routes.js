import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, loading, ...rest }) => {
    return (
        loading ? <div/> :
        <Route
            {...rest}
            render={(props) => !!user === true
                ? <Component user={user} loading={loading} {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
        />
    );
}

export { PrivateRoute };
