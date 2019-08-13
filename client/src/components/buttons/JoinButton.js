import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import EventContext from "../../context/event/eventContext";
//import EventAPI from "../../utils/EventAPI";


// Child of EventCard, EventCardPreview, ViewEvent
const JoinButton = props => {
  const user = props.user;
  //console.log(user)

  const event = props.event;
  //console.log(event)
  const eventContext = useContext(EventContext);
  const { joinEvent } = eventContext;


  const handleJoin = (eventInfo, setShowToast) => {
    //console.log(eventInfo);
    if (
      eventInfo.groupSize !== "Any" &&
      parseInt(eventInfo.groupSize) === eventInfo.attendingId.length
    ) {
      alert("Sorry, this event is full. 😟");
    } else {
      joinEvent(eventInfo._id).then(() => setShowToast(true));
     
    
      //       setEvent(urlId);
      //       getUsersProfile(urlId);
    }
  };

  return (
    <Button
      type="submit"
      className="btn-success"
      onClick={() => handleJoin(event, props.setShowToast)}
      size="sm"
      style={{ float: "right" }}
    >
      + Join
    </Button>
  );
};

export default JoinButton;
