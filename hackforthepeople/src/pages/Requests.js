import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import InBoundRequests from '../components/InBoundRequests';
import OutBoundRequests from '../components/OutBoundRequests';


const Requests = ({user}) => {
    return (
        <div>
            <Tabs defaultActiveKey="inbound" id="uncontrolled-tab-example">
                <Tab eventKey="inbound" title="Inbound">
                    <InBoundRequests user={user}/>
                </Tab>
                <Tab eventKey="outbound" title="Outbound">
                    <OutBoundRequests user={user}/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Requests
