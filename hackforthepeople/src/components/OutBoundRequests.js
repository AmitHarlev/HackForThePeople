import React from 'react';
import { db } from './../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

const OutBoundRequests = ({user}) => {

    const [userDoc, loading, error] = useDocument(
        db.collection('users').doc(user.uid),
    );

    if (loading) {
        return <div/>
    }
    
    return (
        <div>
        <ul>
        {
            userDoc.data().requestsSent.map((request) => {
            return <li>{JSON.stringify(request)}</li>
            })
        }
        </ul>
    </div>
    )
}

export default OutBoundRequests
