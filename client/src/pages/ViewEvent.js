import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EventContext from "../context/event/eventContext";
import AuthContext from "../context/auth/authContext";
import history from "../utils/history";
import Map from "../components/Map";

import EventCard from "../components/events/EventCard";

// Parent
const ViewEvent = props => {
  useEffect(() => {
    //console.log("run")
    if (!user) {
      //console.log("Why ??")
      authContext.loadUser();
      //console.log(user)
    }

    // eslint-disable-next-line
  });
  const urlId = props.match.params.id;
  console.log(props.match.params.id);
  const authContext = useContext(AuthContext);
  const eventContext = useContext(EventContext);
  const {
    getCurrent,
    clearCurrent,
    current,
    joinEvent,
    unjoinEvent,
    deleteEvent,
    getUsersProfile,
    setUsers,
    clearUsers
  } = eventContext;
  /*if (current === null) {
      history.push("/user");
    }*/
  // let currentEvent = localStorage.getItem("cacheEvent")
  // console.log(JSON.stringify(currentEvent))
  const [showToast, setShowToast] = useState(false);
  const { user } = authContext;
  const [showAddress] = useState("show");
  const [showViewLink] = useState("hide");

  //console.log(user)
  //const user = '';
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (current) {
      setEvent(current);
    }

    // eslint-disable-next-line
  }, [current]);

  useEffect(() => {
    getCurrent(urlId);
    getUsersProfile(urlId);
    // eslint-disable-next-line
  }, []);

  console.log(current);

  //console.log("non-effect",authContext)
  //console.log("non-effect",eventContext)

  const [event, setEvent] = useState({
    _id: "",
    name: "",
    location: "",
    addressInfo: "",
    category: "Movie",
    groupSize: "",
    description: "",
    attendingId: [],
    start: null,
    end: null,
    mapLat: null,
    mapLng: null
  });

  const { mapLat, mapLng } = event;
  console.log(mapLat);

  const handleDelete = () => {
    setShowAlert(false);
    deleteEvent(current._id);
    history.push("/user");
  };
  if (!current) {
    return <Loading />;
  }

  if (showAlert) {
    return (
      <Card>
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>
            Are you sure you want to delete this event?
          </Alert.Heading>
          <Button className="btn-danger" onClick={handleDelete}>
            Yes
          </Button>
        </Alert>
      </Card>
    );
  }

  return (
    <Fragment>
      {!current ? (
        <h1>This event is not available.</h1>
      ) : (
        <div style={{ width: "100%" }}>
          <Card>
            <EventCard
              key={event._id}
              event={event}
              user={user}
              showAddress={showAddress}
              showViewLink={showViewLink}
              setShowToast={setShowToast}
              setUsers={setUsers}
              mapLat = {mapLat}
              mapLng = {mapLng}
            />
           
          </Card>
        </div>
      )}{" "}
    </Fragment>
  );
};

export default ViewEvent;

// `https://maps.googleapis.com/maps/api/staticmap?center=${latLng}&zoom=14&size=100x100&key=AIzaSyDy8pqEx_u7wJ7MdWaUQkQ4HqQSWEy8RgI`
