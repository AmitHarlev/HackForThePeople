import React from 'react';

import './App.css';
import HeaderBar from './components/HeaderBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import { PrivateRoute } from './components/Routes';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Match from './pages/Match';
import Requests from './pages/Requests';
import Chat from './pages/Chat';
import Resources from './pages/Resources';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <HeaderBar user={user} />;
  }
  
  return (
    <div>
      <HeaderBar user={user} />
      
      <Router>
        <Switch>
          <Route exact path="/">
            <Home user={user}/>
          </Route>

          {/* TODO: Don't pass loading in as prop here, taken care of loading above */}
          <PrivateRoute path="/survey" user={user} loading={loading} component={Survey} />
          <PrivateRoute path="/match" user={user} loading={loading} component={Match} />
          <PrivateRoute path="/requests" user={user} component={Requests} />
          <PrivateRoute path="/chat" user={user} loading={loading} component={Chat} />
          <PrivateRoute path="/resources" user={user} component={Resources} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
