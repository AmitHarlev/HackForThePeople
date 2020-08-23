import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import Popup from 'react-popup';
import Rating from 'react-rating';
import { addChatMessage, db, endCurrentMeeting, addChatRating } from './../firebase';
import './ChatBox.css';
import './Popup.css';
import './../index.css';

const ChatBox = ({ user, meetingId }) => {

    const [otherUserId, setOtherUserId] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const chatRef = React.createRef();

    const [meetingDoc] = useDocument(
        db.collection('meetings').doc(meetingId)
    );

    useEffect(() => {
        if (!!meetingDoc) {
            let msgs = [];
            meetingDoc.data()['messages'].forEach((msg) => {
                msgs.push(msg);
            });
            setMessages(msgs);

            meetingDoc.data()['ratings'].forEach((rating) => {
                if (rating["uid"] !== user.uid) {
                    setOtherUserId(rating["uid"]);
                }
            })
        }
    }, [meetingDoc]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const time = `${date.getHours()}:` + `${date.getMinutes()}`.padStart(2, '0');
        return `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${time}`;
    }

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

    let history = useHistory();

    const handleEnd = () => {
        Popup.plugins().prompt(otherUserId, meetingId, history);
        // endCurrentMeeting(meetingId);
    }

    return (
        <div className="grid-container grid-background">
            <div className="chat-grid-wrapper">
                <div className="chat-heading">
                    <span className="chat-name">You are chatting with Amit</span>
                    <button className="btn btn-secondary button-end" onClick={handleEnd}>End Session</button>
                </div>

                <div className="chat-grid">
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
                        <input onChange={handleChange} value={newMessage} placeholder={"Type your message here"} className="chat-type" />
                        <button className="btn btn-primary button-send">Send</button>
                    </form>
                </div>

                <Popup />
            </div>
        </div>
    );
}

export default ChatBox;


const Prompt = ({ otherUserId, meetingId }) => {

    const handleRatingChange = (value) => {
        addChatRating(otherUserId, meetingId, value);
    }

    return <>
        <p>Please rate how your interaction went. How productive was the conversation and was the other person respectful?</p>
        <br />
        <Rating start={0} stop={5} initialRating={0} onChange={handleRatingChange} />
    </>;
}

/** Prompt plugin */
Popup.registerPlugin('prompt', function (otherUserId, meetingId, history) {
    let promptValue = null;
    let promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: null,
        content: "Are you sure you want to end your session?",
        buttons: {
            left: [{
                text: 'Back',
                action: function () {
                    Popup.close();
                }
            }],
            right: [{
                text: 'Continue',
                key: 'enter',
                className: 'success',
                action: function () {
                    Popup.close();
                    Popup.create({
                        title: null,
                        content: <Prompt onChange={promptChange} otherUserId={otherUserId} meetingId={meetingId} />,
                        buttons: {
                            left: [],
                            right: [{
                                text: 'Continue',
                                key: 'enter',
                                className: 'success',
                                action: function () {
                                    endCurrentMeeting(meetingId);
                                    Popup.close();
                                    history.push('/match');
                                }
                            }]
                        }
                        
                    })
                }
            }]
        }
    });
});