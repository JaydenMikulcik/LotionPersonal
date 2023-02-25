import React from "react";

import ContainerOutsideExample from "../components/header";
import LeftSide from "../components/leftSide";
import InputFields from "../components/inputFields";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Mainpage() {
  return (
    <div className="container-fluid">
      <ContainerOutsideExample />
      <Container>
        <Row>
          <Col>
            <LeftSide />
          </Col>
          <Col xs={6}>
            <InputFields />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Mainpage;
