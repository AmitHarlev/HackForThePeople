import React from 'react';
import './App.css';
import { signInWithGoogle, auth } from './firebase';

function App() {

  // db.collection("users").add({
  //   displayName: "Amit Harlev",
  // });

  return (
    <div>
      Hello
      <button onClick={signInWithGoogle}>Login</button>
      <button onClick={() => {console.log(auth.currentUser.email)}}>Me</button>
      <button onClick={() => {auth.signOut()}}>Sign out</button>
    </div>
  );
}

export default App;
