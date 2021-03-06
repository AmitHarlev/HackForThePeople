import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { setUserOpinions, db } from './../firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import './../index.css';
import './Opinions.css';

const Opinions = (props) => {
    const { user } = props;

    const [userDoc, loading, error] = useDocumentOnce(
        db.collection('users').doc(user.uid),
    );

    const [abortion, setAbortion] = useState(50);
    const [gunControl, setGunControl] = useState(50);
    const [healthcare, setHealthcare] = useState(50);

    useEffect(() => {
        if (!!userDoc) {
            setAbortion(userDoc.data()['Abortion'] || abortion);
            setGunControl(userDoc.data()['Gun Control'] || gunControl);
            setHealthcare(userDoc.data()['Universal Healthcare'] || healthcare);
        }
    }, [userDoc])

    const gunControlSliderInput = React.createRef(); 
    const abortionSliderInput = React.createRef();
    const healthcareSliderInput = React.createRef();

    let history = useHistory();

    const setUserOpinionsEvent = () => {
        const opinions =
            {
                "Gun Control": gunControl,
                "Abortion": abortion,
                "Universal Healthcare": healthcare,
            };
        setUserOpinions(opinions);
        history.push('/match');
    }

    return (
    // TODO: Change this to a map instead of hard coding the issues
        <div className="grid-container grid-background">
            <div className="survey-grid-wrapper">
                <p>Take a few minutes to rate your opinions on the following topics. No judgement here! Be honest so we can do our best to match you.</p>
                <div className="survey-area">
                    <Form>
                        <Form.Group controlId="gunControlGroup">
                            <Form.Label>Gun Control</Form.Label>
                            <Form.Control ref={gunControlSliderInput} value={gunControl} onChange={() => {setGunControl(gunControlSliderInput.current.value)}} type="range" />
                        </Form.Group>
                        <Form.Group controlId="abortionGroup">
                            <Form.Label>Abortion</Form.Label>
                            <Form.Control ref={abortionSliderInput} value={abortion} onChange={() => {setAbortion(abortionSliderInput.current.value)}} type="range" />
                        </Form.Group>
                        <Form.Group controlId="healthcareGroup">
                            <Form.Label>Universal Health Care</Form.Label>
                            <Form.Control ref={healthcareSliderInput} value={healthcare} onChange={() => {setHealthcare(healthcareSliderInput.current.value)}} type="range" />
                        </Form.Group>
                        <Button onClick={setUserOpinionsEvent} className="button-opinions" variant="primary">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Opinions
