import React from 'react';
import logo from './logo.svg';
import './App.css';
import { db, signInWithGoogle, auth } from './firebase';
import { Messaging } from "./components/Messaging";

function App() {

  db.collection("users").add({
    displayName: "Amit Harlev",
  });

  let user = auth.currentUser;

  return (
    <div>
      Hello
      <button onClick={signInWithGoogle}>Login</button>
      <button onClick={() => {console.log(auth.currentUser.email)}}>Me</button>
      <button onClick={() => {auth.signOut()}}>Sign out</button>

      <Messaging></Messaging>
    </div>
  );
}

export default App;
