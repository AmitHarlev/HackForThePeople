import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import './App.css';
import HeaderBar from './components/HeaderBar';
import Opinions from './components/Opinions';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { PrivateRoute, SurveyRoute } from './components/Routes';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Matches from './pages/Matches';
import Chat from './pages/Chat';

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
          <PrivateRoute path="/matches" authenticated={user} component={Matches}></PrivateRoute>
          <PrivateRoute path="/chat" authenticated={user} component={Chat}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
