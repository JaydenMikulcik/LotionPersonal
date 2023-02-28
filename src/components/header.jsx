import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../styles/styles.css";

function ContainerOutsideExample(props) {
  return (
    <div>
      <Navbar expand="lg" variant="light" bg="white">
        <Container>
          <div className="d-flex justify-content-start">
            <button onClick={props.toggleLeft} style={{ alignItems: "left" }}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div>
            <div className="boldTop">
              <h1>Lotion</h1>
            </div>
            <div style={{ color: "grey" }}>Like notion, but worse.</div>
          </div>
          <div></div>
        </Container>
      </Navbar>
    </div>
  );
}

export default ContainerOutsideExample;
