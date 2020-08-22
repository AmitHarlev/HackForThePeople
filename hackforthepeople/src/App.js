import React from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar';
import Opinions from './components/Opinions';
import Matcher from './components/Matcher';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { PrivateRoute } from './components/Routes';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Survey from './pages/Survey';

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
          <PrivateRoute path="/chat" user={user} loading={loading} component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
