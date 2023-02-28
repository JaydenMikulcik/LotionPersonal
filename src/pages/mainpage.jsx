import React, { useState } from "react";

import ContainerOutsideExample from "../components/header";
import LeftSide from "../components/leftSide";
import InputFields from "../components/inputFields";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/styles.css";

function Mainpage() {
  const [showLeft, setShowLeft] = useState(true);
  const [update, toggleUpdate] = useState(false);

  const handleToggleLeft = () => {
    setShowLeft((prevState) => !prevState);
  };

  const handleUpdate = () => {
    toggleUpdate((prevState) => !prevState);
  };

  return (
    <div className="further">
      <ContainerOutsideExample toggleLeft={handleToggleLeft} />
      <div className="rightBorder">
        <Row>
          {showLeft && (
            <Col xs={3} style={{ paddingRight: 0 }}>
              <LeftSide doUpdate={handleUpdate} status={update} />
            </Col>
          )}
          <Col>
            <InputFields doUpdate={handleUpdate} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Mainpage;
