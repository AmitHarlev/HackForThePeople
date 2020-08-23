import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { db, sendConversationRequest } from './../firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Rating from 'react-rating';
import './../index.css';
import './Matcher.css';

const Matcher = ({user}) => {

    const [matches, setMatches] = useState([]);

    const [userDoc, loading, error] = useDocumentOnce(
        db.collection('users').doc(user.uid),
    );

    const topicRef = React.createRef();
    const lowerBoundRef = React.createRef();
    const upperBoundRef = React.createRef();

    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(100);

    const findMatches = () => {
        const matchedUsers = db.collection('users').where(topicRef.current.value, '>=', lowerBound).where(topicRef.current.value, '<=', upperBound);
        matchedUsers.get().then(function(querySnapshot) {
            const matchesFound=[];
            querySnapshot.forEach(function(doc) {
                if (doc.id !== user.uid) {
                    matchesFound.push({
                        id: doc.id,
                        data: doc.data(),
                        topic: topicRef.current.value,
                    })
                }
            });
            setMatches(matchesFound);
        });
    }

    const sendRequest = (selectedUser) => {
        sendConversationRequest(selectedUser);
    } 

    return (
        <div className="grid-container grid-background">
            <div className="matches-grid-wrapper">
                <div className="matches-area">
                    {matches.length===0 ?
                    <Form>
                        <Form.Group controlId="topic">
                            <Form.Label>What topic do you want to match on?</Form.Label>
                            <Form.Control ref={topicRef} as="select" custom>
                                <option>Gun Control</option>
                                <option>Abortion</option>
                                <option>Universal Healthcare</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="range">
                            <Form.Label>Set your range:</Form.Label>
                            <Form.Control ref={lowerBoundRef} value={lowerBound} onChange={() => {setLowerBound(lowerBoundRef.current.value)}} type="range" />
                            <Form.Control ref={upperBoundRef} value={upperBound} onChange={() => {setUpperBound(upperBoundRef.current.value)}} type="range" />
                        </Form.Group>
                            
                        <Button onClick={findMatches} variant="primary" className="button-matches">
                            Match!
                        </Button>
                    </Form>
                    :
                    <>
                        <ul className="match-list">
                            { matches.map((match) => {
                            return <li key={match.id}>
                                    {match.data.name}
                                    <Button className="button-request" onClick={() => {sendRequest(match)}}>Send Conversation Request</Button>
                                    <br />
                                    {/* <div className="match-rating">
                                        <Rating start={0} stop={5} initialRating={match.data.rating} readonly={true} />
                                    </div> */}
                                </li>
                            }) }
                        </ul>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Matcher
