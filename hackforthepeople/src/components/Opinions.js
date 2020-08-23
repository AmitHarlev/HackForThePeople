import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { setUserOpinions, db } from './../firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';


const Opinions = (props) => {
    const { user } = props;

    const [userDoc, loading, error] = useDocumentOnce(
        db.collection('users').doc(user.uid),
    );

    const [abortion, setAbortion] = useState(50);
    const [gunControl, setGunControl] = useState(50);

    useEffect(() => {
        if (!!userDoc) {
            setAbortion(userDoc.data()['Abortion'] || abortion);
            setGunControl(userDoc.data()['Gun Control'] || gunControl)
        }
    }, [userDoc])

    const gunControlSliderInput = React.createRef(); 
    const abortionSliderInput = React.createRef(); 

    let history = useHistory();

    const setUserOpinionsEvent = () => {
        const opinions =
            {
                "Gun Control": gunControl,
                "Abortion": abortion
            };
        setUserOpinions(opinions);
        history.push('/matches');
    }

    return (
    // TODO: Change this to a map instead of hard coding the issues
    <Form>
        <Form.Group controlId="gunControlGroup">
            <Form.Label>Gun Control</Form.Label>
            <Form.Control ref={gunControlSliderInput} value={gunControl} onChange={() => {setGunControl(gunControlSliderInput.current.value)}} type="range" />
        </Form.Group>
        <Form.Group controlId="abortionGroup">
            <Form.Label>Abortion</Form.Label>
            <Form.Control ref={abortionSliderInput} value={abortion} onChange={() => {setAbortion(abortionSliderInput.current.value)}} type="range" />
        </Form.Group>
        <Button onClick={setUserOpinionsEvent} variant="primary">
            Submit
        </Button>
    </Form>
    )
}

export default Opinions
