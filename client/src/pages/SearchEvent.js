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
  //console.log(events);

//   return (
      
//       <Container>
//         {/* navbar - HOME/OTHER NAV LINKS */}
//         {/* search bar - event name, category, time frame, distance (google api) */}
//         <Card style={{ width: "90%", margin: "0 auto" }}>
//           <Card.Body>
//             <Card.Title>Event Search</Card.Title>
//             <Form>
//               <Form.Group controlId="exampleForm.ControlInput1">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control ref={text} onChange={handleChange} />
//               </Form.Group>
//             { /*<Form.Group controlId="exampleForm.ControlSelect2">
//               <Form.Label>Category</Form.Label>
//               <Form.Control as="select" multiple>
//                 {eventCategories.map((category, i) => (
//                   <option key={i}>{category}</option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="exampleForm.ControlTextarea1">
//               <Form.Label>Location</Form.Label> {/* need to link google api /}
//               <Form.Control type="text" />
//             </Form.Group>
//             /* ADD TIME RANGE */}
//             <Button className="float-right">Search</Button>
//           </Form>

//         </Card.Body>
//       </Card>
//       <CardDeck>
//         <Row className="mt-5 mb-5">
//           {events === null ? (
//             <div>No Events Available</div>
//           ) : filtered !== null ? (
//               filtered.map(event =>
//                 // <Col xs={12} sm={9} md={6} lg={4}>
//                 <EventItem key={event._id} event={event} />
//               // </Col>
//               )
//           ) : (
//                 events.map(event =>
//                   // <Col xs={12} sm={9} md={6} lg={4}>
//                     <EventItem key={event._id} event={event} />
//                   // </Col>
//                 )
//           )}
//         </Row>
//       </CardDeck>
//     </Container>
//   );
// };

return (
  <Fragment>
    {/* search bar - event name, category, time frame, distance (google api) */}
    <Card>
      <Card.Body>
        <Card.Title>Event Search</Card.Title>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={text} onChange={handleChange} />
          </Form.Group>
          {/*<Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" multiple>
              {eventCategories.map((category, i) => <option key={i}>{category}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Location</Form.Label> {/* need to link google api /}
            <Form.Control type="text" />
          </Form.Group>
          /* ADD TIME RANGE */}
          <Button className="float-right">Search</Button>
        </Form>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <Card.Title>Results</Card.Title>
        <CardColumns>
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
        </CardColumns>
      </Card.Body>
    </Card>
  </Fragment>
);
};


export default SearchEvent;