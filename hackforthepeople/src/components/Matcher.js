import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { db, sendConversationRequest } from './../firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

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
        <>
        {matches.length===0 ?
        <Form>
            <Form.Group controlId="topic">
                <Form.Label>Topic to Match On</Form.Label>
                <Form.Control ref={topicRef} as="select" custom>
                    <option>Gun Control</option>
                    <option>Abortion</option>
                    <option>Universal Healthcare</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="range">
                <Form.Label>Range</Form.Label>
                <Form.Control ref={lowerBoundRef} value={lowerBound} onChange={() => {setLowerBound(lowerBoundRef.current.value)}} type="range" />
                <Form.Control ref={upperBoundRef} value={upperBound} onChange={() => {setUpperBound(upperBoundRef.current.value)}} type="range" />
            </Form.Group>
                
            <Button onClick={findMatches} variant="primary">
                Match!
            </Button>
        </Form>
        :
        <>
            <h2>Matches</h2>
            <ul>
                { matches.map((match) => {
                return <li key={match.id}>{match.data.name} <Button onClick={() => {sendRequest(match)}}>Send Conversation Request</Button></li>
                }) }
            </ul>
        </>
        }
        </>
    )
}

export default Matcher
