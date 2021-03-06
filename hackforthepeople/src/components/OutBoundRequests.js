import React from 'react';
import { db, cancelOutBoundRequest } from './../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button } from 'react-bootstrap';
import './../index.css';
import './Requests.css';
import { useHistory } from 'react-router-dom';


const OutBoundRequests = ({user}) => {

    const [userDoc, loading, error] = useDocument(
        db.collection('users').doc(user.uid),
    );

    let history = useHistory();

    if (loading) {
        return <div/>
    }

    const cancelRequest = (request) => {
        cancelOutBoundRequest(request);
    }
    
    return (
        <div className="grid-container grid-background">
            <div className="request-grid-wrapper">
                <div className="request-area">
                    <ul className="request-list">
                    {
                        userDoc.data().requestsSent.map((request) => {
                            return <li className='list-element-request'>
                                {request.name + " (" + request.topic + ": " + request.value + ") - Rating: " + request.rating}
                                {request.state === 1 ? <Button onClick={() => history.push('/chat')} className="button-request">Join Chat</Button>: <Button className="button-request" onClick={() => cancelRequest(request)}> Cancel Request </Button>}
                            </li>
                        })
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OutBoundRequests
