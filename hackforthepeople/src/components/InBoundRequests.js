import React from 'react';
import { db } from './../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

const InBoundRequests = ({ user }) => {
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
                userDoc.data().requests.map((request) => {
                return <li>{JSON.stringify(request)}</li>
                })
            }
            </ul>
        </div>
    )
}

export default InBoundRequests
