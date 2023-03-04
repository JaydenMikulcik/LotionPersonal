import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/styles.css";

function InputFields(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [edit, setEdit] = useState(true);
  const [currenturl, setcurrenturl] = useState(window.location.href);

  let { id } = useParams();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted !== "Invalid Date") {
      setDate(formatted);
      console.log(formatted);
    }
  };
  function handleChange(event) {
    const newValue = event.target.value;
    formatDate(newValue);
    console.log(newValue);
  }

  const handleToggleEdit = () => {
    setEdit((prevState) => !prevState);
    console.log(currenturl);
    if (!date) getCurrentDate();
    window.history.pushState(currenturl, currenturl, `${id}/edit`);
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
      if (!date) getCurrentDate();
    }
  }, [id]);

  React.useEffect(() => {
    setcurrenturl(window.location.href);
    if (!date) getCurrentDate();
  });

  let updateLocalStorage = (remove) => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    if (remove) {
      entries.splice(id, 1);
      entries = indexIds(entries);
      localStorage.setItem("entries", JSON.stringify(entries));
      props.doUpdate();
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
    props.doUpdate();
    console.log(entries);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const getCurrentDate = () => {
    let newDate = new Date();
    let day = newDate.toLocaleString("default", { day: "2-digit" });
    let month = newDate.toLocaleString("default", { month: "2-digit" });
    let year = newDate.getFullYear();

    let hours = newDate.toLocaleString("default", {
      hour: "2-digit",
      hour12: false,
    });
    let minutes = newDate
      .getMinutes()
      .toLocaleString(undefined, { minimumIntegerDigits: 2 });
    let formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log(formatted);
    formatDate(formatted);
  };

  const confirmDelete = () => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      updateLocalStorage(true);
    }
  };

  return (
    <div>
      {id ? (
        <div>
          <Row className="titleArea">
            <Col>
              <Row>
                {currenturl.includes("edit") ? (
                  <input
                    type="text"
                    name="name"
                    onChange={onChangeTitle}
                    value={title}
                    className="inputStyle"
                  />
                ) : (
                  <div className="inputStyle">{title}</div>
                )}
              </Row>
              <Row>
                <Col>
                  <span>{date}</span>
                </Col>
                {currenturl.includes("edit") && (
                  <Col>
                    <input
                      style={{
                        width: "20px",
                        color: "blue",
                        transform: "scale(1.5)",
                        borderStyle: "none",
                      }}
                      type="datetime-local"
                      onChange={handleChange}
                    />
                  </Col>
                )}
              </Row>
            </Col>

            <Col
              aria-label="Basic example"
              className=" d-flex justify-content-end"
            >
              <div className=" d-flex justify-content-end">
                {!currenturl.includes("edit") ? (
                  <button onClick={handleToggleEdit} className="buttonsStyle">
                    Edit
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link to={`../notes/${id}`}>
                      <button
                        className="buttonsStyle"
                        style={{ height: "98px" }}
                        onClick={() => updateLocalStorage(false)}
                      >
                        Save
                      </button>
                    </Link>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link to={`../notes/`}>
                    <button
                      className="buttonsStyle"
                      style={{ height: "98px" }}
                      onClick={() => confirmDelete()}
                    >
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          {!currenturl.includes("edit") ? (
            <div
              dangerouslySetInnerHTML={{ __html: body }}
              style={{ fontSize: "130%" }}
            />
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
      ) : (
        <div
          style={{
            paddingTop: "250px",
            color: "grey",
            verticalAlign: "middle",
            textAlign: "center",
            fontSize: "250%",
          }}
        >
          Select a note, or create a new one.
        </div>
      )}
    </div>
  );
}

export default InputFields;
