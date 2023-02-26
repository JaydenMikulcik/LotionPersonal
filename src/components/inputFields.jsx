import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/styles.css";

function InputFields() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  let changePage = () => {
    console.log("here");
    if (Number.isInteger(window.location.pathname.split("/")[-1])) {
      let index = parseInt(window.location.pathname.split("/")[-1]);
      let storedData = localStorage.getItem("entries");
      let parsedData = JSON.parse(storedData);
      console.log(parsedData[index], index);
      setTitle(parsedData[index].Objtitle);
      setBody(parsedData[index].Objbody);
    }
  };

  let updateLocalStorage = () => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({ Objtitle: title, Objbody: body, ObjId: entries.length });
    localStorage.setItem("entries", JSON.stringify(entries));
    console.log(entries);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      {changePage()}
      <div>
        <input type="text" name="name" onChange={onChangeTitle} value={title} />
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={updateLocalStorage}>
            Save
          </Button>
          <Button variant="secondary">Delete</Button>
        </ButtonGroup>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          className="inputArea"
        />
      </div>
    </div>
  );
}

export default InputFields;
