import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { db } from './../firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

const Matcher = ({user}) => {

    const [userDoc, loading, error] = useDocumentOnce(
        db.collection('users').doc(user.uid),
    );

    const topicRef = React.createRef();
    const lowerBoundRef = React.createRef();
    const upperBoundRef = React.createRef();

    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(100);

    const findMatches = () => {
        // TODO: IT IS CURRENTLY ARBITRARILY GREATER THAN!!!
        const matchedUsers = db.collection('users').where(topicRef.current.value, '>=', lowerBound).where(topicRef.current.value, '<=', upperBound);
        matchedUsers.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
            });
        });
    }

    return (
    <Form>
        <Form.Group controlId="topic">
            <Form.Label>Topic to Match On</Form.Label>
            <Form.Control ref={topicRef} as="select" custom>
                <option>Gun Control</option>
                <option>Abortion</option>
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
    )
}

export default Matcher
