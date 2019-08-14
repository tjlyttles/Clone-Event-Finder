import React, { useContext, useEffect, useRef, useState, Fragment } from "react";
import EventContext from "../context/event/eventContext";
import EventItem from "../components/events/EventItem";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import AuthContext from "../context/auth/authContext";
import Button from "react-bootstrap/Button";
import Loading from "../components/Loading";
import history from "../utils/history";
import Container from "react-bootstrap/Container"
import CardDeck from "react-bootstrap/CardDeck"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import EventCard from "../components/events/EventCard";
import Toast from "../components/Toast";
import CardColumns from "react-bootstrap/CardColumns";

const SearchEvent = () => {
  useEffect(() => {
    if (!user) {
      authContext.loadUser();
    }
  });
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated } = authContext;
  const text = useRef("");
  const eventContext = useContext(EventContext);
  const {
    getEvents,
    clearUsers,
    clearCurrent,
    filterEvents,
    clearFilter,
    upcomingEvents,
    events,
    filtered,
    needReRender,
    joinEvent,
    unjoinEvent,
    callReRender
  } = eventContext;
  //console.log(events);

  useEffect(() => {
    
      //console.log(needReRender)
      getEvents();
      
      //console.log(needReRender)
  
    // eslint-disable-next-line
  }, []);

  const handleChange = e => {
    if (text.current.value !== "") {
      filterEvents(e.target.value);
    } else {
      clearFilter();
    }
  };

  const [showAddress] = useState("hide");
  const [showViewLink] = useState("show");

  const [showToast, setShowToast] = useState(false);

  if (!events || !user) {
    return <Loading />;
  }


return (
  
    <Fragment>
    <Card>
      <Card.Body>
        <Card.Title>Event Search</Card.Title>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={text} onChange={handleChange} />
          </Form.Group>
        
          <Button className="float-right">Search</Button>
        </Form>
      </Card.Body>
    </Card> 
    <Card style={{padding: 30}}>
      <Card.Body>
        <Card.Title>Results</Card.Title>
      
        <Row style={{display: "flex", justifyContent: "space-between"}}>
          {upcomingEvents === null ? (
            <div>No Events Available</div>
          ) : filtered !== null ? (
            filtered.map(event => (
              <EventCard key={event._id} event={event} user={user} showAddress={showAddress} showViewLink={showViewLink} setShowToast={setShowToast} />
            ))
          ) : (
            upcomingEvents.map(event => (
              <EventCard key={event._id} event={event} user={user} showAddress={showAddress} showViewLink={showViewLink} setShowToast={setShowToast} />
         ))
          )}
 </Row>
      </Card.Body>
    </Card>  
  </Fragment>
);
};


export default SearchEvent;