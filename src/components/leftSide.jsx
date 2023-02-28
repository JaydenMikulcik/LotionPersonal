import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Cards from "./notecard";
import "../styles/styles.css";

function LeftSide() {
  const [data, setData] = useState([]);
  let { id } = useParams();

  let addNewCard = () => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({ Objtitle: "", Objbody: "", ObjId: entries.length });
    let addnewRoute = "/notes/" + (entries.length - 1);

    localStorage.setItem("entries", JSON.stringify(entries));
    console.log(addnewRoute);

    return addnewRoute;
  };

  useEffect(() => {
    const storedData = localStorage.getItem("entries");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []);
  return (
    <div className="tablePreviews">
      <Row className="topPart">
        <Col>
          <b>Notes</b>
        </Col>
        <Col>
          <Link to={addNewCard}>
            <div onClick={addNewCard}>
              <b>+</b>
            </div>
          </Link>
        </Col>
      </Row>
      <Row>
        {data.map((item, key) => {
          let active = false;
          if (id == key) {
            active = true;
          }
          return (
            <Cards
              key={key}
              title={item.Objtitle}
              date={item.Objdate}
              description={item.Objbody}
              id={item.ObjId}
              isActive={active}
            />
          );
        })}
      </Row>
    </div>
  );
}

export default LeftSide;
