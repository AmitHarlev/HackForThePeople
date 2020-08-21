import React from 'react';
import './App.css';
import HeaderBar from './HeaderBar';
import Opinions from './Opinions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user, loading, error] = useAuthState(auth);


  return (

    <div>
      <HeaderBar user={user} />
      {user ? <Opinions user={user} /> : <div />}
    </div>
  );
}

export default App;
