import React, { useEffect, useState } from 'react';
import { useDocumentOnce, useDocument } from 'react-firebase-hooks/firestore';
import { addChatMessage, db, addChatRating } from './../firebase';
import './ChatBox.css';
import { Form, Button } from 'react-bootstrap';

const ChatBox = ({ user }) => {

    const [meetingId, setMeetingId] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const chatRef = React.createRef();

    const [userDoc, userLoading, userError] = useDocumentOnce(
        db.collection('users').doc(user.uid)
    );

    useEffect(() => {
        if (!!userDoc) {
            setMeetingId(userDoc.data()['currentMeeting']);
        }
    }, [userDoc])

    // TODO: change to meetingId
    // TODO: update immediately
    const [meetingDoc, meetingLoading, meetingError] = useDocument(
        db.collection('meetings').doc("hApVQp4xLfKbmuoP20Py")
    );

    useEffect(() => {
        if (!!meetingDoc) {
            let msgs = [];
            meetingDoc.data()['messages'].forEach((msg) => {
                msgs.push(msg);
            });
            setMessages(msgs);
        }
    }, [meetingDoc]);

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleSendMsg = (event) => {
        event.preventDefault();
        addChatMessage(meetingId, Date.now(), newMessage);
        setNewMessage('');
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const time = `${date.getHours()}:` + `${date.getMinutes()}`.padStart(2, '0');
        return `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${time}`;
    }

    return (
        <div>
            <div className="chat-area" ref={chatRef}>
                {messages.map(msg => {
                    return <p key={msg.timestamp} className={"chat-bubble " + (user.uid === msg.uid ? "current-user" : "")}>
                        {msg.message}
                        <br />
                        <span className="chat-time float-right">{formatTime(msg.timestamp)}</span>
                    </p>
                })}
            </div>

            <Form onSubmit={handleSendMsg}>
                <input onChange={handleChange} value={newMessage}></input>
                <Button type="Send">Send</Button>
            </Form>
        </div>
    );
}

export default ChatBox;