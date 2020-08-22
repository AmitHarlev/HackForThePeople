import React from 'react';
import './App.css';
import HeaderBar from './HeaderBar';
import Opinions from './Opinions';
import Matcher from './Matcher';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user, loading, error] = useAuthState(auth);


  return (

    <div>
      <HeaderBar user={user} />
      {user ? <div>
          <Opinions user={user} />
          <Matcher user={user}/>
        </div> : <div />}
    </div>
  );
}

export default App;
