import React, { useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import DeleteButton from "../buttons/DeleteButton";
import JoinButton from "../buttons/JoinButton";
import LeaveButton from "../buttons/LeaveButton";
import EventContext from "../../context/event/eventContext";
import moment from "moment";

//import EventAPI from "../../utils/EventAPI";
// child of searchevent, userevent
const EventCard = props => {
  const user = props.user;
  const event = props.event;
  const setUsers = props.setUsers;
  console.log(setUsers);
  const [show, setShowProfile] = useState(false);

  const handleCloseProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);

  const showAddress = props.showAddress;
  const showViewLink = props.showViewLink;
  let eventAddress;
  let viewLink;
  const eventContext = useContext(EventContext);
  const { deleteEvent } = eventContext;

  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = eventId => {
    console.log("eventId", eventId);
    setShowAlert(false);
    deleteEvent(eventId).then(() => window.location.reload());
  };

  // <DeleteButton setCurrent={setCurrent} setShowAlert={setShowAlert} />

  const DeleteAlert = () => {
    return (
      <Alert
        variant="danger"
        onClose={() => setShowAlert(false)}
        dismissible
        style={{ marginBottom: 0 }}
      >
        <Alert.Heading>
          Are you sure you want to delete this event?
        </Alert.Heading>
        <Button className="btn-danger" onClick={() => handleDelete(event._id)}>
          Yes
        </Button>
      </Alert>
    );
  };

  if (showAddress === "show") {
    eventAddress = event.addressInfo ? (
      <Fragment>
        {"Address: " + event.addressInfo}
        <br />
      </Fragment>
    ) : (
      <Fragment>
        {"Address: N/A"}
        <br />
      </Fragment>
    );
  } else if (showAddress === "hide") {
    eventAddress = <Fragment />;
  }

  if (showViewLink === "show") {
    viewLink = (
      <Link to={`/view/${event._id}`} className="card-link">
        View
      </Link>
    ); // change to event/:id
  } else if (showViewLink === "hide") {
    viewLink = <Fragment />;
  }
if(show) {
  return (
    <>
      <Modal show={show} onHide={handleCloseProfile}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfile}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


  return (
    <Fragment>
      {event.name && (
        <Card style={{ minWidth: "20rem" }}>
          {showAlert ? (
            <DeleteAlert />
          ) : (
            <Fragment>
              <Card.Header style={{ background: "#343a40", color: "white" }}>
                {setUsers ? (
                  <Card.Title style={{ color: "orange" }}>
                    {" "}
                    {event.name.toUpperCase()}
                  </Card.Title>
                ) : (
                  <Card.Title>
                    <Link to={`/view/${event._id}`} className="card-link">
                      {" "}
                      {event.name.toUpperCase()}
                    </Link>
                  </Card.Title>
                )}
                <Card.Subtitle className="mb-2 text-muted">
                  {event.category}
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                {setUsers && (
                  <Card.Text>
                    Descriptions: {event.description}
                    <br />
                  </Card.Text>
                )}
                <Card.Text style={{ textTransform: "capitalize" }}>
                  Location: {event.location} <br />
                  {event.addressInfo}
                  <br />
                  Start: {moment(event.start).format("MMMM Do YYYY, h:mm:ss a")}
                  <br />
                  End: {moment(event.end).format("MMMM Do YYYY, h:mm:ss a")}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  People Going:{" "}
                  {event.groupSize === "Any" ? (
                    "Free for all to join."
                  ) : (
                    <Fragment>
                      {event.attendingId.length} / {event.groupSize}
                    </Fragment>
                  )}
                  <br />
                  {setUsers &&
                    setUsers.map((user ,i) => (
                      <Fragment>
                        <br />
                        <Link to="#" onClick={setShowProfile(true)}>{user.displayname}</Link>
                      </Fragment>
                    ))}
                </Card.Subtitle>
                {setUsers && props.mapLat !== null && props.mapLng !== null && (
                  <div>
                    <img
                      alt="Map unavailable"
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                        props.mapLat
                      },${
                        props.mapLng
                      }&zoom=12&size=200x200&key=AIzaSyCYVVZWUbW5smunCA6s8Ke2oZZortfWv6o`}
                      style={{ float: "left" }}
                    />
                  </div>
                )}
              </Card.Body>

              <Card.Footer style={{ background: "#343a40" }}>
                {user._id === event.user && (
                  <Fragment>
                    <DeleteButton
                      // setCurrent={setCurrent}
                      setShowAlert={setShowAlert}
                      event={event}
                    />
                  </Fragment>
                )}

                {user._id !== event.user &&
                  !user.attendId.includes(event._id) && (
                    <JoinButton
                      user={user}
                      event={event}
                      setShowToast={props.setShowToast}
                    />
                  )}
                {event.user !== user._id &&
                  user.attendId.includes(event._id) && (
                    <LeaveButton user={user} event={event} />
                  )}
              </Card.Footer>
            </Fragment>
          )}
        </Card>
      )}
    </Fragment>
  );
};

export default EventCard;
