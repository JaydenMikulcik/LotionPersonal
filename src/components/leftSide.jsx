import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Cards from "./notecard";
import "../styles/styles.css";

function LeftSide(props) {
  const [data, setData] = useState([]);
  let [newId, setNewId] = useState("");
  const [currenturl, setcurrenturl] = useState(window.location.href);
  let { id } = useParams();

  React.useEffect(() => {
    setcurrenturl(window.location.href);
  });

  let addNewCard = () => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({
      Objtitle: "Untitled",
      Objbody: "...",
      ObjId: entries.length,
    });
    let id = entries.length;

    localStorage.setItem("entries", JSON.stringify(entries));
    props.doUpdate();
    setNewId(entries.length);
    window.history.replaceState(currenturl, currenturl, `${id}`);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("entries");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, [props.status]);
  return (
    <div className="tablePreviews">
      <Row className="topPart">
        <Col>
          <b>Notes</b>
        </Col>
        <Col>
          <Link>
            <div onClick={addNewCard} className="d-flex justify-content-end">
              <b className="buttonsStyle">+</b>
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
