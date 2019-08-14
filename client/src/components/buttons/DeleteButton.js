import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

// Child of EventCard, EventCardPreview, ViewEvent
const DeleteButton = props => {

    return (
        <Fragment>
            <Link style={{float: "left"}} className="card-link" to={`/edit/${props.event._id}`}>Edit</Link>
            <Button className="btn-danger" onClick={() => props.setShowAlert(true)} size="sm" style={{ float: "right" }}>Delete</Button>
        </Fragment>
    );
}

export default DeleteButton;
