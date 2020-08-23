import React from 'react';
import NewUserPrompt from '../components/NewUserPrompt';
import { Button } from 'react-bootstrap';
import { signInWithGoogle, signOut} from '../firebase'
import './Home.css'
import './../index.css'

const Home = ({user}) => {
    return (
        <div>
            {!!user ? <NewUserPrompt user={user} /> : <div/>}
            <div className="home-middle-band grid-container">
                <div className="home-heading-grid">
                    <h2 className="home-heading">Escape the echo chamber of political ideology.</h2>
                </div>
                <div className="home-text-grid">
                    <p className="home-text">Our country is more divided than ever. This is a great 
                            opportunity to practice discussing our beliefs in a safe environment, and 
                            learn how to hold difficult conversations about polarizing topics in a 
                            civilized manner.</p>
                    <Button variant="outline-info" onClick={signInWithGoogle} className="button-home">Try It Now!</Button>
                </div>
                <div className="home-img-grid">
                    <img src={require("./echo-chamber.jpg")} className="home-img"/>
                    <p className="home-source">Source: New York Times</p>
                </div>
            </div>
        </div>
    )
}

export default Home
