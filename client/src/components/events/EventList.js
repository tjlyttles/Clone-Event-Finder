import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import EventContext from "../../context/event/eventContext";
import EventItem from "./EventItem";
import EventCardPreview from "./EventCardPreview";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


//Not being used
const EventList = () => {
    const eventContext = useContext(EventContext);
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const { events, getUserEvents, upcomingEvents } = eventContext;

    console.log(upcomingEvents);
    let pastEvents;

    useEffect(() => {
        getUserEvents(user._id);
        // eslint-disable-next-line
    }, []);

    if (events === null) {
        return (
            <div>
                <br /> <h4>Welcome! Try adding an event</h4>
            </div>
        );
    }
    //  else {
    //     upcomingEvents = events.filter(event => new Date(event.end) > new Date());
    //     pastEvents = events.filter(event => new Date(event.end) < new Date());
    // }


    return (
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Upcoming Events">
                {/* <br />
                <EventCardPreview /> */}
                <br />
                {
                    upcomingEvents.map(event => (
                        // <EventItem key={event._id} event={event} />
                        <EventCardPreview key={event._id} user={user} event={event} />
                    ))
                }
            </Tab>
            <Tab eventKey="profile" title="Past Events">
                <br />
                {
                    pastEvents.map(event => (
                        <EventItem key={event._id} event={event} />
                    ))
                }
            </Tab>
        </Tabs>
    );
};

export default EventList;
