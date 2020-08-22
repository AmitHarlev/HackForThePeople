import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import './App.css';
import HeaderBar from './components/HeaderBar';
import { PrivateRoute, SurveyRoute } from './components/Routes';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Matches from './pages/Matches';
import Chat from './pages/Chat';

function App() {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div>
      <HeaderBar user={user} />
      {/* TODO: remove once finished testing */}
      {user ? <Chat user={user} /> : <></>}

      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <SurveyRoute path="/survey" user={user} component={Survey}></SurveyRoute>
          <PrivateRoute path="/matches" user={user} component={Matches}></PrivateRoute>
          <PrivateRoute path="/chat" user={user} component={Chat}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
