import React from 'react';
import { db, ignoreInboundRequest, acceptIncomingRequest } from './../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button } from 'react-bootstrap';
import './../index.css';
import './Requests.css';
import { useHistory } from 'react-router-dom';

const InBoundRequests = ({ user }) => {
    const [userDoc, loading, error] = useDocument(
        db.collection('users').doc(user.uid),
    );

    let history = useHistory();

    if (loading) {
        return <div/>
    }

    const ignoreRequest = (request) => {
        ignoreInboundRequest(request);
    }

    const acceptRequest = (request) => {
        acceptIncomingRequest(request);
        setTimeout(() => {
            history.push('/chat');
        }, 200);
        
    }
    

    return (
        <div className="grid-container grid-background">
            <div className="request-grid-wrapper">
                <div className="request-area">
                    <ul className="request-list">
                    {
                    userDoc.data().requests.map((request) => {
                    return <li>
                        {request.name + " (" + request.topic + ": " + request.value + ") - " + request.rating + " stars"}
                        {request.state === 1 ? <Button onClick={() => history.push('/chat')}>Join Chat</Button> : <>
                        <Button onClick={() => ignoreRequest(request)} className="button-request"> Ignore Request </Button>
                        <Button onClick={() => acceptRequest(request)} className="button-request"> Accept Request </Button> </>}
                        </li>
                        })
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default InBoundRequests
