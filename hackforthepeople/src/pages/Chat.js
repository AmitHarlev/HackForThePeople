import React, { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
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
    return <></>

    // return (
    //     {meetingId !== '' ? <ChatBox user={user} meetingId={meetingId} /> : <></>}
    // )
}

export default Chat;
