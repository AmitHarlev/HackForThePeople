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
    const rangeCenterRef = React.createRef();
    const radiusRef = React.createRef();

    const [rangeCenter, setRangeCenter] = useState(50);
    const [searchedForMatches, setSearchedForMatches] = useState(false);

    const findMatches = () => {
        const radius = parseInt(radiusRef.current.value);
        const matchedUsers = db.collection('users').where(topicRef.current.value, '>=', rangeCenter-radius).where(topicRef.current.value, '<=', rangeCenter+radius);
        const topic = topicRef.current.value;
        matchedUsers.get().then(function(querySnapshot) {
            const matchesFound=[];
            debugger;
            console.log(radius);
            querySnapshot.forEach(function(doc) {
                if (doc.id !== user.uid) {
                    matchesFound.push({
                        id: doc.id,
                        data: doc.data(),
                        topic: topic,
                    })
                }
            });
            setMatches(matchesFound);
        });
        setSearchedForMatches(true);
    }

    const sendRequest = (selectedUser) => {
        sendConversationRequest(selectedUser);
    } 

    return (
        <>
        {matches.length===0 ?
        <>
        <Form>
            <Form.Group controlId="topic">
                <Form.Label>Topic to Match On</Form.Label>
                <Form.Control ref={topicRef} as="select" custom>
                    <option>Gun Control</option>
                    <option>Abortion</option>
                    <option>Universal Healthcare</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="center">
                <Form.Label>Range</Form.Label>
                <Form.Control ref={rangeCenterRef} value={rangeCenter} onChange={() => {setRangeCenter(rangeCenterRef.current.value)}} type="range" />
            </Form.Group>
            <Form.Group controlId="radius">
                <Form.Label>Range Radius</Form.Label>
                <Form.Control ref={radiusRef} as="select" custom>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                </Form.Control>
            </Form.Group>
                
            <Button onClick={findMatches} variant="primary">
                Match!
            </Button>
        </Form>
        {searchedForMatches ? <h2>No matches found! Try a different range.</h2> : <div/>}
        </>
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
