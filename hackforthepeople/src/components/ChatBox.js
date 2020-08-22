import React, { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { addChatMessage, db, addChatRating } from './../firebase';
import './ChatBox.css';

const ChatBox = ({ user, meetingId }) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const chatRef = React.createRef();

    const [meetingDoc, meetingLoading, meetingError] = useDocument(
        db.collection('meetings').doc(meetingId)
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
        const chatArea = chatRef.current;
        event.preventDefault();
        addChatMessage(meetingId, Date.now(), newMessage);
        setNewMessage('');
        chatArea.scrollBy(0, chatArea.innerHeight); // TODO: not working
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

            <form onSubmit={handleSendMsg}>
                <input onChange={handleChange} value={newMessage}></input>
                <button>Send</button>
            </form>
        </div>
    );
}

export default ChatBox;