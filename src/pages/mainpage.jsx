import React, { useState } from "react";

import ContainerOutsideExample from "../components/header";
import LeftSide from "../components/leftSide";
import InputFields from "../components/inputFields";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Mainpage() {
  const [showLeft, setShowLeft] = useState(true);

  const handleToggleLeft = () => {
    setShowLeft((prevState) => !prevState);
  };

  return (
    <div>
      <ContainerOutsideExample toggleLeft={handleToggleLeft} />
      <Container className="rightBorder">
        <Row>
          {showLeft && (
            <Col xs={3}>
              <LeftSide />
            </Col>
          )}
          <Col>
            <InputFields />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Mainpage;
