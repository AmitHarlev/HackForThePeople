import React from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar';
import Opinions from './components/Opinions';
import Matcher from './components/Matcher';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { PrivateRoute, SurveyRoute } from './components/Routes';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Survey from './pages/Survey';

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (

    <div>
      <HeaderBar user={user} />
      {user ? <div><Opinions user={user} /><Matcher user={user}/></div> : <div />}

      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <SurveyRoute path="/survey" component={Survey}></SurveyRoute>
          <PrivateRoute path="/chat" authenticated={user} loading={loading} component={Chat}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
