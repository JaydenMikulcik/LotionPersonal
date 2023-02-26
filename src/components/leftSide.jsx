import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import Cards from "./notecard";
import "../styles/styles.css";

function LeftSide() {
  const [data, setData] = useState([]);

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
            <th>+</th>
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
