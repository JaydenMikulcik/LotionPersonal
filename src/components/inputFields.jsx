import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function InputFields() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  let updateLocalStorage = () => {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({ Objtitle: title, Objbody: body });
    localStorage.setItem("entries", JSON.stringify(entries));
    console.log(entries);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <div>
        <input type="text" name="name" onChange={onChangeTitle} value={title} />
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={updateLocalStorage}>
            Save
          </Button>
          <Button variant="secondary">Delete</Button>
        </ButtonGroup>
        <ReactQuill theme="snow" value={body} onChange={setBody} />
      </div>
    </div>
  );
}

export default InputFields;
