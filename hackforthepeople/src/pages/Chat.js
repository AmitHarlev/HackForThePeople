import React, { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Redirect } from 'react-router-dom';
import { db } from './../firebase';
import ChatBox from './../components/ChatBox';

const Chat = ({ user }) => {

    const [meetingId, setMeetingId] = useState('');

    const [userDoc, userLoading, userError] = useDocument(
        db.collection('users').doc(user.uid)
    );

    useEffect(() => {
        if (!!userDoc) {
            setMeetingId(userDoc.data()['currentMeeting']);
        }
    }, [userDoc])

    if (meetingId !== '') {
        return <ChatBox user={user} meetingId={meetingId} />;
    }
    return (
        <Redirect to="/matches" />
    );

    // return (
    //     {meetingId !== '' ? <ChatBox user={user} meetingId={meetingId} /> : <></>}
    // )
}

export default Chat;
