import React from 'react';

export function PrivateRoute({ component: Component, authenticated, ...rest }) {
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
export function SurveyRoute({ component: Component, authenticated, ...rest }) {
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