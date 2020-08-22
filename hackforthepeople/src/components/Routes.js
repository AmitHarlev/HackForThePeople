import React from 'react';
import { Route, Redirect } from "react-router-dom";

<<<<<<< HEAD

const PrivateRoute = ({ component: Component, user, loading, ...rest }) => {
=======
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
>>>>>>> add proper exports
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

<<<<<<< HEAD
export { PrivateRoute };
=======
// TODO: redirect if already completed survey
const SurveyRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => authenticated == true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
        />
    );
}

export default { PrivateRoute, SurveyRoute };
>>>>>>> add proper exports
