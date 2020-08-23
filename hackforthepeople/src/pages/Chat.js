import React, { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Redirect } from 'react-router-dom';
import { db } from './../firebase';
import ChatBox from './../components/ChatBox';

const Chat = ({ user }) => {

    const [meetingId, setMeetingId] = useState('temp');

    const [userDoc, userLoading, userError] = useDocument(
        db.collection('users').doc(user.uid)
    );

    useEffect(() => {
        if (!!userDoc) {
            console.log("egg");
            setMeetingId(userDoc.data()['currentMeeting']);
        }
    }, [userDoc])

    if (userLoading || meetingId === "temp") {
        return <div/>
    }

    return (
        <>
        {meetingId === '' ?  <Redirect to="/match" /> : <ChatBox user={user} meetingId={meetingId} /> }
        </>
    );

}

export default Chat;