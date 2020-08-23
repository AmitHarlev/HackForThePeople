import React from 'react';
import { db, ignoreInboundRequest, acceptIncomingRequest } from './../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button } from 'react-bootstrap';
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
        <div>
            <ul>
            {
                userDoc.data().requests.map((request) => {
                return <li>{JSON.stringify(request)} <Button onClick={() => ignoreRequest(request)}> Ignore Request </Button><Button onClick={() => acceptRequest(request)}> Accept Request </Button></li>
                })
            }
            </ul>
        </div>
    )
}

export default InBoundRequests
