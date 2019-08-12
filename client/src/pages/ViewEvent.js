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
  console.log(props.match.params.id)
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
        setEvent(current)

    }
      
    // eslint-disable-next-line
  }, [current]);

  useEffect(() => {
   
      getCurrent(urlId)
      
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

  const {
    name,
    location,
    addressInfo,
    category,
    groupSize,
    description,
    attendingId,
    start,
    end,
    mapLat,
    mapLng
  } = event;

  const handleJoin = () => {
    if (groupSize !== "Any" && parseInt(groupSize) === attendingId.length) {
      alert("Sorry, this event is full. 😟");
    } else {
      joinEvent(event);
      setShowToast(true);
    
      setEvent(current);
      getUsersProfile(current);
    }
  };

  const handleUnjoin = () => {
    unjoinEvent(event);
    setEvent(current);
    getUsersProfile(current);
  };

  const handleDelete = () => {
    setShowAlert(false);
    deleteEvent(current._id);
    clearCurrent();
    clearUsers();
    history.push("/user");
  };
  if (!current || !user) {
    return <Loading />;
  }

  if (showAlert) {
    return (
      <Card style={{ width: "25rem" }}>
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
    // <Fragment>
    //   {event.user ? (
    //     <CardGroup>
    //       <Card style={{ width: "25rem" }}>
    //         <Card.Header style={{ background: "#343a40", color: "white" }}>
    //           <Card.Title>{name.toUpperCase()}</Card.Title>
    //           <Card.Subtitle className="mb-2 text-muted">
    //             {category}
    //           </Card.Subtitle>
    //         </Card.Header>

    //         <Card.Body>
    //           <Card.Text style={{ textTransform: "capitalize" }}>
    //             Location: {location}
    //             <br />
    //             Address: {addressInfo}
    //             <br />
    //             Start Time: {start}
    //             <br />
    //             End Time: {end}
    //           </Card.Text>
    //           <Card.Text>{description}</Card.Text>
    //           <Card.Subtitle className="mb-2 text-muted">
    //             {attendingId.length} out of {groupSize} people are going.
    //           </Card.Subtitle>
    //           <Card.Subtitle className="mb-2 text-muted">
    //             People Attending: <br />
    //             {setUsers
    //               ? setUsers.map(userLink => (
    //                   <Fragment>
    //                     <Link to="#" key={userLink._id}>
    //                       {userLink.username}
    //                     </Link>
    //                     <br />
    //                   </Fragment>
    //                 ))
    //               : null}
    //           </Card.Subtitle>
    //         </Card.Body>
    //         <Card.Footer>
    //           {event.user === user._id && (
    //             <DeleteButton event={event} setShowAlert={setShowAlert} />
    //           )}
    //           {event.user !== user._id &&
    //             !event.attendingId.includes(user._id) && (
    //               <JoinButton user={user} event={event} setShowToast={props.setShowToast}  />
    //             )}
    //           {event.user !== user._id &&
    //             event.attendingId.includes(user._id) && (
    //               <LeaveButton user={user} event={event}   />
    //             )}
    //         </Card.Footer>
    //       </Card>

    //       <Card>
    //         <Map lat={mapLat} lng={mapLng} />
    //       </Card>
    //     </CardGroup>
    //   ) : (
    //     <div> Sorry, this event is not available.</div>
    //   )}
    //   <Row>
    //     <Col xs={6}>
    //       <Toast
    //         onClose={() => setShowToast(false)}
    //         show={showToast}
    //         delay={3000}
    //         autohide
    //       >
    //         <Toast.Header>
    //           <strong className="mr-auto">{name.toUpperCase()}</strong>
    //         </Toast.Header>
    //         <Toast.Body>Event Joined!</Toast.Body>
    //       </Toast>
    //     </Col>
    //   </Row>
    //   <Toast showToast={showToast} setShowToast={setShowToast} />
    // </Fragment>
    <Fragment>
    {event === null ? (
      <h1>
        Sorry an error occurred. This event is unavailable at this time.
      </h1>
    ) : (
      <Fragment>
        <CardGroup>
          <EventCard
            key={event._id}
            event={event}
            user={user}
            showAddress={showAddress}
            showViewLink={showViewLink}
            setShowToast={setShowToast} 
          />
          {/* <Card><Map lat={mapLat} lng={mapLng} /></Card> */}
        </CardGroup>
    
      </Fragment>
    )
    // )
    // : (
    //     <div> Sorry, this event is not available.</div>
    //   )
    }

    {/* <Toast event={events} showToast={showToast} setShowToast={setShowToast} /> */}
  </Fragment>
  );
};

export default ViewEvent;
