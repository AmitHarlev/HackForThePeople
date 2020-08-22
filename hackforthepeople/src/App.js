import React from 'react';
import './App.css';
import HeaderBar from './HeaderBar';
import Opinions from './Opinions';
import Matcher from './Matcher';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import './App.css';
import HeaderBar from './components/HeaderBar';
import Opinions from './components/Opinions';
import { PrivateRoute, SurveyRoute } from './components/Routes';

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (

    <div>
      <HeaderBar user={user} />
      {user ? <Opinions user={user} /> : <div />}

      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <SurveyRoute path="/survey" component={Survey}></SurveyRoute>
          <PrivateRoute path="/chat" authenticated={user} component={Chat}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
