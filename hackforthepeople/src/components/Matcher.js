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
            querySnapshot.forEach(function(doc) {
                if (doc.id !== user.uid) {
                    matchesFound.push({
                        id: doc.id,
                        data: doc.data(),
                        topic: topic,
                        disabled: false,
                    })
                }
            });
            setMatches(matchesFound);
        });
        setSearchedForMatches(true);
    }

    const sendRequest = (selectedUser) => {
        sendConversationRequest(selectedUser);
        const new_matches = [];
        for (const match of matches) {
            if (match === selectedUser) {
                selectedUser.disabled = true;
                new_matches.push(selectedUser);
            } else {
                new_matches.push(new_matches);
            }
        }
        setMatches(new_matches)
    } 
    console.log(matches);
    return (
        <div className="grid-container grid-background">
            <div className="matches-grid-wrapper">
                <div className="matches-area">
                    {matches.length===0 ?
                    <>
                    <Form>
                        <Form.Group controlId="topic">
                            <Form.Label>What topic do you want to match on?</Form.Label>
                            <Form.Control ref={topicRef} as="select" custom>
                                <option>Gun Control</option>
                                <option>Abortion</option>
                                <option>Universal Healthcare</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="center">
                            <Form.Label>Set your range:</Form.Label>
                            <Form.Control ref={rangeCenterRef} value={rangeCenter} onChange={() => {setRangeCenter(rangeCenterRef.current.value)}} type="range" />
                        </Form.Group>
                        <Form.Group controlId="radius">
                            <Form.Label>Set your range radius:</Form.Label>
                            <Form.Control ref={radiusRef} as="select" custom>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                            </Form.Control>
                        </Form.Group>
                            
                        <Button onClick={findMatches} variant="primary" className="button-matches">
                            Match!
                        </Button>
                    </Form>
                    {/* {searchedForMatches ? <h2>No matches found! Try a different range.</h2> : <div/>} */}
                    </>
                    :
                    <>
                        <ul className="match-list">
                            { matches.map((match) => {
                            return <li key={match.id}>{match.data["name"] + " (" + match.topic + ": " + match.data[match.topic] + ") - Rating: " + match.data["rating"]} <Button disabled={match.disabled} onClick={() => {sendRequest(match)}}>Send Conversation Request</Button></li>
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
