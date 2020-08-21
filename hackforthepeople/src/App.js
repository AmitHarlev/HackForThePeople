import React from 'react';
import './App.css';
import HeaderBar from './HeaderBar'
import { signInWithGoogle, auth } from './firebase';

function App() {

  return (
    <div>
      <HeaderBar />
    </div>
  );
}

export default App;
