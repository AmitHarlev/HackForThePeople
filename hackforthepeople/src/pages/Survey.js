import React from 'react';
import Opinions from './../components/Opinions';


const Survey = ({user}) => {
    return (
        <div>
            <Opinions user={user}/>
        </div>
    )
}

export default Survey
