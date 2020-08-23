import React from 'react';
import NewUserPrompt from '../components/NewUserPrompt';

const Home = ({user}) => {
    return (
        <div>
            {!!user ? <NewUserPrompt user={user} /> : <div/>}
        </div>
    )
}

export default Home
