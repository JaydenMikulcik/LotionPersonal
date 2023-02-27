import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/styles.css";

function InputFields() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [edit, setEdit] = useState(true);

  let { id } = useParams();

  const handleToggleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  React.useEffect(() => {
    if (id) {
      let storedData = localStorage.getItem("entries");
      let parsedData = JSON.parse(storedData);
      setTitle(parsedData[id].Objtitle);
      setBody(parsedData[id].Objbody);
    }
  }, [id]);

  let updateLocalStorage = () => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({ Objtitle: title, Objbody: body, ObjId: entries.length });
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

    return `${year}-${
      month < 10 ? `0${month}` : `${month}`
    }-${date}, ${hours}-${minutes}-${seconds}`;
  };

  return (
    <div>
      <div>
        <input type="text" name="name" onChange={onChangeTitle} value={title} />
        <ButtonGroup aria-label="Basic example">
          {edit ? (
            <Button variant="secondary" onClick={handleToggleEdit}>
              Edit
            </Button>
          ) : (
            <Button variant="secondary" onClick={updateLocalStorage}>
              Save
            </Button>
          )}
          <Button variant="secondary">Delete</Button>
        </ButtonGroup>
        {!edit && <div>{getCurrentDate()}</div>}
        {edit ? (
          <p>{body}</p>
        ) : (
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            className="inputArea"
          />
        )}
      </div>
    </div>
  );
}

export default InputFields;
