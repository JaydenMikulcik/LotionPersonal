import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../styles/styles.css";

function ContainerOutsideExample(props) {
  return (
    <div>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <button onClick={props.toggleLeft}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div>
            <div className="boldTop">Lotion</div>
            <div>Like notion, but worse.</div>
          </div>
          <div></div>
        </Container>
      </Navbar>
    </div>
  );
}

export default ContainerOutsideExample;
