import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Cards from "./notecard";
import "../styles/styles.css";

function LeftSide() {
  const [data, setData] = useState([]);

  let addNewCard = () => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({ Objtitle: "", Objbody: "", ObjId: entries.length });
    let addnewRoute = "/notes/" + (entries.length - 1);
    console.log(entries.length);

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
      <Table striped className="tablePreviews">
        <thead className="topPart">
          <tr>
            <th>Notes</th>
            <th>
              <Link to={addNewCard}>
                <div onClick={addNewCard}>+</div>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            return (
              <Cards
                key={key}
                title={item.Objtitle}
                date="7"
                description={item.Objbody}
                id={item.ObjId}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default LeftSide;
