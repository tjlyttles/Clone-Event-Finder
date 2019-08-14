import React, { useContext, useState } from "react";
// import AuthContext from "../../context/auth/authContext";
import EventContext from "../../../context/event/eventContext";
import EventCard from "../EventCard";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./style.css"

//Child of User
const UserEvents = props => {
    const user = props.user
    const upcomingEvents = props.upcomingEvents
    const pastEvents = props.pastEvents

  
    

    const [showAddress] = useState("hide");
    const [showViewLink] = useState("show");


    return (
        <Tabs defaultActiveKey="future" id="user-event-tab">
            <Tab eventKey="future" title="Upcoming Events">
                <br />
                {upcomingEvents &&
                    upcomingEvents.map(event => <EventCard key={event._id} user={user} event={event}  showAddress={showAddress} showViewLink={showViewLink} />)
                }
            </Tab>
            <Tab eventKey="past" title="Past Events">
                <br />
                {pastEvents &&
                    pastEvents.map(event => <EventCard key={event._id} user={user} event={event} showAddress={showAddress} showViewLink={showViewLink} />)
                }
            </Tab>
        </Tabs>
    );
};

export default UserEvents;
