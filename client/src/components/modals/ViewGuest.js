import React from "react";
import Card from "react-bootstrap/Card";

const ViewGuest = props => {
  const user = props.user;
  console.log(props);

  return (
    <Card>
      {user && user.image && (
        <Card.Img variant="top" src={user && user.image} />
      )}
      <Card.Body>
        <Card.Title> {user && user.displayname}'s Profile</Card.Title>
        <Card.Text>
          {user &&
          user.firstname + " " + user.lastname === "undefined undefined"
            ? "Name: Not available."
            : "Name: " + (user && user.firstname + " " + user.lastname)}
          <br />
          {user && user.bio === "undefined"
            ? "No Info"
            : "Bio: " + (user && user.bio)}
        </Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          textAlign: "right",
          background: "#343a40",
          color: "white"
        }}
      />
    </Card>
  );
};

export default ViewGuest;
