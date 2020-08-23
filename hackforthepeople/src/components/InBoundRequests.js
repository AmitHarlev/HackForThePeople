import React from 'react';
import { db, ignoreInboundRequest } from './../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button } from 'react-bootstrap';

const InBoundRequests = ({ user }) => {
    const [userDoc, loading, error] = useDocument(
        db.collection('users').doc(user.uid),
    );

    if (loading) {
        return <div/>
    }

    const ignoreRequest = (request) => {
        ignoreInboundRequest(request);
    }
    

    return (
        <div>
            <ul>
            {
                userDoc.data().requests.map((request) => {
                return <li>{JSON.stringify(request)} <Button onClick={() => ignoreRequest(request)}> Ignore Request </Button></li>
                })
            }
            </ul>
        </div>
    )
}

export default InBoundRequests
