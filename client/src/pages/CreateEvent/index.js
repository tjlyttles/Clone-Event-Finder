import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Grid from "@material-ui/core/Grid";
import history from "../../utils/history";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DateTimePicker from "react-datetime-picker"
import AuthContext from "../../context/auth/authContext";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
//import MapCont from "../components/Map";
import EventContext from "../../context/event/eventContext";
import Geocode from "react-geocode";
import "./style.css"

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const useStyles = {
  grid: {
    width: "30%"
  },
  flexBetween: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  flexEvenly: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  fontSize: {}
};
const CreateEvent = props => {
  const urlId = props.match.params.id;
  console.log(urlId);

  const eventContext = useContext(EventContext);
  const authContext = useContext(AuthContext);
  const {
    addEvent,
    updateEvent,
    clearCurrent,
    getCurrent,
    current
  } = eventContext;
  const { user } = authContext;
  const [date, setDate] = useState(new Date());
  const [validated, setValidated] = useState(false);
  // const [startTime, setStartTime] = useState(new Date());
  // const [endTime, setEndTime] = useState(new Date());
  const [timeMessage, setTimeMessage] = useState("");
  const [event, setEvent] = useState({
    name: "",
    location: "",
    category: "Movie",
    groupSize: "",
    description: "",
    attendId: "",
    addressInfo: "",
    start: null,
    end: null,
    mapLat: null,
    mapLng: null
  });
  useEffect(() => {
    if (!user) {
      authContext.loadUser();
      // console.log("missing user")
    }
  });


  const {
    name,
    location,
    category,
    groupSize,
    description,
    start,
    end
    //addressInfo
  } = event;

  const goBack = () => {
    clearCurrent();
    history.push("/user");
  };

  const handleChange = e => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const handleStart = value => {
    setEvent({ ...event, start: value });
  };
  const handleEnd = value => {
    setEvent({ ...event, end: value });
    console.log(event.end);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let userInput = event.location;
    let address;
    let placeId;
    let mapLatData;
    let mapLngData;
    console.log(userInput);
    if (
      event.name === "" ||
      event.location === "" ||
      event.groupSize === "" ||
      event.start === null ||
      event.end === null
    ) {
      alert("Please fill in required (*) fields.");
    } else if (Date.parse(event.end) <= Date.parse(event.start)) {
      alert("Please check your times are correct.");
    } else {
      Geocode.fromAddress(userInput)
        .then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            // setLocation({...locationInput, mapLat: lat})
            // setLocation({...locationInput, mapLng: lng})
            address = response.results[0].formatted_address;
            mapLatData = lat;
            mapLngData = lng;
            console.log(response.results[0]);
            placeId = response.results[0].place_id;
          },
          error => {
            console.error(error);
          }
        )
        .finally(() => {
          const postEvent = { ...event };
          postEvent.addressInfo = address;
          postEvent.mapLat = mapLatData;
          postEvent.mapLng = mapLngData;
          setEvent(postEvent);

          addEvent(postEvent);

          history.push("/user");
          //console.log(e)
        });
    }
  };

  // const clearAll = () => {
  //   clearCurrent();
  // };

  const eventCategories = [
    "Movie",
    "Concert",
    "Food/Drink",
    "Bar/Club",
    "Gaming",
    "Coding",
    "Party",
    "Conversation",
    "Other"
  ];

  const [locationInput, setLocation] = useState({
    mapLat: 32.712043,
    mapLng: -117.142254
  });

  return (
    <Container>
      {/* <Navigation /> */}
      <br />
      <Row>
        <Col>
          <Card id="create-event">
            <Card.Title id="create-event-tittle" style={{ textAlign: "center" }}>
              {current ? "Edit Event" : "Create Event"}
            </Card.Title>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">
                        *Event Name:
                      </InputGroup.Text>
                    
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      value={name}
                      type="text"
                      name="name"
                      onChange={handleChange}
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">
                        *Event Location:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      value={location}
                      type="text"
                      name="location"
                      onChange={handleChange}
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </InputGroup>
                </Form.Group>

                <Row>
                  {" "}
                  <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Categories</Form.Label>
                      <Form.Control
                        value={category}
                        name="category"
                        onChange={handleChange}
                        as="select"
                      >
                        {eventCategories.map((category, i) => (
                          <option key={i}>{category}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Label>
                      *Up to how many would you like to join you:
                    </Form.Label>

                    <div
                      key={`custom-inline-radio`}
                      style={useStyles.flexBetween}
                      className="mb-3"
                    >
                      <Form.Check
                        custom
                        inline
                        checked={groupSize === "2"}
                        onChange={handleChange}
                        label="+1"
                        value="2"
                        name="groupSize"
                        type="radio"
                        id={`custom-inline-radio-1`}
                      />
                      <Form.Check
                        custom
                        inline
                        checked={groupSize === "3"}
                        onChange={handleChange}
                        label="+2"
                        value="3"
                        name="groupSize"
                        type="radio"
                        id={`custom-inline-radio-2`}
                      />
                      <Form.Check
                        custom
                        inline
                        checked={groupSize === "4"}
                        onChange={handleChange}
                        label="+3"
                        value="4"
                        name="groupSize"
                        type="radio"
                        id={`custom-inline-radio-3`}
                      />
                      <Form.Check
                        custom
                        inline
                        onChange={handleChange}
                        label="+4"
                        value="5"
                        checked={groupSize === "5"}
                        name="groupSize"
                        type="radio"
                        id={`custom-inline-radio-4`}
                      />
                      <Form.Check
                        custom
                        inline
                        checked={groupSize === "6"}
                        onChange={handleChange}
                        label="+5"
                        name="groupSize"
                        value="6"
                        type="radio"
                        id={`custom-inline-radio-5`}
                      />
                      <Form.Check
                        custom
                        inline
                        checked={groupSize === "Any"}
                        onChange={handleChange}
                        label="Any"
                        name="groupSize"
                        value="Any"
                        type="radio"
                        id={`custom-inline-radio-6`}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Event Details:</Form.Label>
                      <Form.Control
                        value={description}
                        type="text"
                        name="description"
                        onChange={handleChange}
                        as="textarea"
                        rows="3"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <div>
                  
                      <h6>*Date and time to meet up:</h6>
                      <DateTimePicker
                        //requred="true"
                        minDate={date}
                        name="start"
                        value={start}
                        onChange={handleStart}
                      />
                      <br />
                      <br />
                      <h6>*When the event will end:</h6>
                      <DateTimePicker
                        //requred="true"
                        minDate={date}
                        name="end"
                        value={end}
                        onChange={handleEnd}
                      />
                    </div>
                  </Col>
                </Row>
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="outline-primary" type="submit">
                    Submit
                  </Button>
                  <Link to="/user">
                    <Button onClick={goBack} variant="outline-info">
                      Back To Profile
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* 
      <Row>
        <Col>
          <div style={{ margin: "10px" }}>
            <Map />
            </div>
        </Col>
        </Row> */}
    </Container>
  );
};

export default CreateEvent;
