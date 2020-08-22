import React from 'react';
import NewUserPrompt from '../components/NewUserPrompt';

const Home = ({user}) => {
    return (
        <div>
            <NewUserPrompt user={user} />
        </div>
    )
}

export default Home
