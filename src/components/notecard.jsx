import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "../styles/styles.css";

function Cards(props) {
  let newRoute = "/notes/" + props.id;

  const classStyling = ["cardStyle", props.isActive ? "activeCard" : ""].join(
    " "
  );
  return (
    <Row className={classStyling}>
      <Link to={newRoute}>
        <div className={classStyling}>
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {props.date}
            </Card.Subtitle>
            <Card.Text>
              <div
                style={{ color: props.isActive ? "white" : "black" }}
                dangerouslySetInnerHTML={{ __html: props.description }}
              />
            </Card.Text>
          </Card.Body>
        </div>
      </Link>
    </Row>
  );
}

export default Cards;
