import React from 'react';
import { db, cancelOutBoundRequest } from './../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button } from 'react-bootstrap';
import './../index.css';
import './Requests.css';

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
        <div className="grid-container grid-background">
            <div className="request-grid-wrapper">
                <div className="request-area">
                    <ul className="request-list">
                    {
                        userDoc.data().requestsSent.map((request) => {
                        return <li>{JSON.stringify(request)} <Button onClick={() => cancelRequest(request)} className="button-request"> Cancel Request </Button></li>
                        })
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OutBoundRequests
