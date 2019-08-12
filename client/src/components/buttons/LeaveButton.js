import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import EventContext from "../../context/event/eventContext";

  // Child of EventCard, EventCardPreview, ViewEvent
const LeaveButton = props => {
  const eventContext = useContext(EventContext);
  const { unjoinEvent } = eventContext;

  const handleUnjoin = event => {
    unjoinEvent(event);
  };

  return (
    // <Button
    //     type="submit"
    //     style={{ float: "right" }}
    //     className="btn-warning"
    //     size="sm"
    //     onClick={() => handleUnjoin()}
    // >
    //     - Leave Event
    // </Button>

    <Button
      type="submit"
      className="btn-warning"
      onClick={() => handleUnjoin(props.event._id)}
      size="sm"
      style={{ float: "right" }}
    >
      - Leave Event
    </Button>
  );
};

export default LeaveButton;
