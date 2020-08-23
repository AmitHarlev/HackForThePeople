import React from 'react';
import { db, cancelOutBoundRequest } from './../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button } from 'react-bootstrap';


const OutBoundRequests = ({user}) => {

    const [userDoc, loading, error] = useDocument(
        db.collection('users').doc(user.uid),
    );

    if (loading) {
        return <div/>
    }

    const cancelRequest = (request) => {
        cancelOutBoundRequest(request);
    }
    
    return (
        <div>
        <ul>
        {
            userDoc.data().requestsSent.map((request) => {
            return <li>{JSON.stringify(request)} <Button onClick={() => cancelRequest(request)}> Cancel Request </Button></li>
            })
        }
        </ul>
    </div>
    )
}

export default OutBoundRequests
