import React, { useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import DeleteButton from "../buttons/DeleteButton";
import JoinButton from "../buttons/JoinButton";
import LeaveButton from "../buttons/LeaveButton";
import EventContext from "../../context/event/eventContext";

//import EventAPI from "../../utils/EventAPI";
// child of searchevent, userevent
const EventCard = props => {
    const user = props.user;
    const event = props.event;
    const joinEvent = props.joinEvent
    const unjoinEvent = props.unjoinEvent
    const showAddress = props.showAddress;
    const showViewLink = props.showViewLink;
    let eventAddress;
    let viewLink;
    const eventContext = useContext(EventContext);
  const {

    deleteEvent
   
  } = eventContext;

    const [showAlert, setShowAlert] = useState(false);
    

    const handleDelete = eventId => {
        console.log("eventId", eventId);
        setShowAlert(false);
       deleteEvent(eventId);
        // deleteEvent(current._id);
        // clearCurrent();
        // clearUsers();
        // history.push("/user");
    };

    // <DeleteButton setCurrent={setCurrent} setShowAlert={setShowAlert} />

    const DeleteAlert = () => {
        return (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible style={{ marginBottom: 0 }}>
                <Alert.Heading>Are you sure you want to delete this event?</Alert.Heading>
                <Button className="btn-danger" onClick={() => handleDelete(event._id)}>Yes</Button>
            </Alert>
        );
    }

    if (showAddress === "show") {
        eventAddress = event.addressInfo
            ? <Fragment>{"Address: " + event.addressInfo}<br /></Fragment>
            : <Fragment>{"Address: N/A"}<br /></Fragment>;
    } else if (showAddress === "hide") {
        eventAddress = <Fragment />;
    }

    if (showViewLink === "show") {
        viewLink = <Link to={`/view/${event._id}`} className="card-link">View</Link>; // change to event/:id
    } else if (showViewLink === "hide") {
        viewLink = <Fragment />;
    }

    return (
        <Fragment>
            {event.name &&
                <Card>
                    {showAlert
                        ? <DeleteAlert />
                        : <Fragment>
                            <Card.Header style={{ background: "#343a40", color: "white" }}>
                                <Card.Title>preview {event.name.toUpperCase()}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {event.category}
                                </Card.Subtitle>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text style={{ textTransform: "capitalize" }}>
                                    Location: {event.location}<br />
                                    {eventAddress}
                                    Start: {event.start}<br />
                                    End: {event.end}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">
                                    People Going: {event.attendingId.length} / {event.groupSize}
                                </Card.Subtitle>
                            </Card.Body>
                            <Card.Footer style={{ background: "#343a40", color: "white" }}>
                                {viewLink}
                                {user._id === event.user && (
                                    <Fragment>
                                        <DeleteButton
                                            // setCurrent={setCurrent}
                                            setShowAlert={setShowAlert}
                                            event={event} />
                                    </Fragment>
                                )}

                            {user._id !== event.user && !user.attendId.includes(event._id) && <JoinButton user={user} event={event} joinEvent={joinEvent} setShowToast={props.setShowToast} />}
                                {event.user !== user._id && user.attendId.includes(event._id) && <LeaveButton user={user} event={event} unjoinEvent={unjoinEvent} />}
                            </Card.Footer>
                        </Fragment>
                    }
                </Card>
            }
        </Fragment>
    );
};

export default EventCard;
