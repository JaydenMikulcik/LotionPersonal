import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/styles.css";

function InputFields() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [edit, setEdit] = useState(true);

  let { id } = useParams();

  const handleToggleEdit = () => {
    setEdit((prevState) => !prevState);
    getCurrentDate();
  };

  let indexIds = (array) => {
    for (var i = 0; i < array.length; i++) {
      array[i].ObjId = i;
    }
    return array;
  };

  React.useEffect(() => {
    if (id) {
      let storedData = localStorage.getItem("entries");
      let parsedData = JSON.parse(storedData);
      setTitle(parsedData[id].Objtitle);
      setBody(parsedData[id].Objbody);
      setDate(parsedData[id].Objdate);
    }
  }, [id]);

  let updateLocalStorage = (remove) => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    if (remove) {
      entries.splice(id, 1);
      entries = indexIds(entries);
      localStorage.setItem("entries", JSON.stringify(entries));
      return;
    }
    if (entries && id < entries.length) {
      entries[id] = {
        Objtitle: title,
        Objbody: body,
        ObjId: id,
        Objdate: date,
      };
    } else {
      entries.push({
        Objtitle: title,
        Objbody: body,
        ObjId: entries.length,
        Objdate: date,
      });
    }
    localStorage.setItem("entries", JSON.stringify(entries));
    console.log(entries);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const getCurrentDate = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    let formatted = `${year}-${
      month < 10 ? `0${month}` : `${month}`
    }-${date}, ${hours}-${minutes}-${seconds}`;
    setDate(formatted);
  };

  return (
    <div>
      <div>
        <Row className="titleArea">
          <Col>
            <Row>
              <input
                type="text"
                name="name"
                onChange={onChangeTitle}
                value={title}
                className="inputStyle"
              />
            </Row>
            {!edit && <Row>{date}</Row>}
          </Col>

          <Col
            aria-label="Basic example"
            className="buttonsStyle d-flex justify-content-end"
          >
            <div className="buttonsStyle d-flex justify-content-end">
              {edit ? (
                <button onClick={handleToggleEdit} className="buttonsStyle">
                  Edit
                </button>
              ) : (
                <button
                  className="buttonsStyle"
                  onClick={() => updateLocalStorage(false)}
                >
                  Save
                </button>
              )}
              <button
                className="buttonsStyle"
                onClick={() => updateLocalStorage(true)}
              >
                Delete
              </button>
            </div>
          </Col>
        </Row>
        {edit ? (
          <div dangerouslySetInnerHTML={{ __html: body }} />
        ) : (
          <div>
            <ReactQuill
              theme="snow"
              value={body}
              onChange={setBody}
              className="inputArea"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InputFields;
