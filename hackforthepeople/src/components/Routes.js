import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
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