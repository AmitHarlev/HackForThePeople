import React, { useEffect } from 'react'
import { db } from './../firebase';
import { useDocumentOnce, useDocument } from 'react-firebase-hooks/firestore';
import NewUserSurveyPrompt from './NewUserSurveyPrompt';

const NewUserPrompt = ({user}) => {
    const [userDoc, loading, error] = useDocument(
        db.collection('users').doc(user.uid),
    );

    if (loading) {
        return (<div/>)
    }
    
    const FirstTimeSurveyPrompt = !!userDoc && !!userDoc.data() && !userDoc.data().completedSurvey
        ? <NewUserSurveyPrompt />
        : <div />


    return (
        <div>
            {FirstTimeSurveyPrompt}
        </div>
    )
}

export default NewUserPrompt
