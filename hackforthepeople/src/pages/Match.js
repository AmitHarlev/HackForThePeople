import React from 'react'
import Matcher from './../components/Matcher';
import { useHistory } from "react-router-dom";
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from './../firebase';




const Match = ({user}) => {
    const [userDoc, loading, error] = useDocumentOnce(
        db.collection('users').doc(user.uid),
    );

    let history = useHistory();

    if (loading) {
        return <div/>
    }

    if (!userDoc || !userDoc.data() || !userDoc.data().completedSurvey) {
        history.push('/');
    }

    return (
        <div>
           <Matcher user={user} />
        </div>
    )
}

export default Match
