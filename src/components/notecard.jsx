import React from "react";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Cards(props) {
  let newRoute = "/notes/" + props.id;
  return (
    <Link to={newRoute}>
      <Card className="cardStyling">
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.date}
          </Card.Subtitle>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Cards;
