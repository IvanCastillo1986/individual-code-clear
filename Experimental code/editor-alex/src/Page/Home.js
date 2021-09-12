import React from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import { apiURL } from "../Util/apiURL";

import Solution from "./Solution";
import Came from "./Came";

const API_Dtbased = apiURL();

export default function Home() {
  const [input, setInput] = useState({ code: "//" });
  const [sol, setSol] = useState([]);
  const [fix, setFix] = useState("");
  const [last, setLast] = useState("");

  const handleInput = (value, e) => {
    setInput({ code: value });
    setFix(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLast(fix);
    try {
      axios.post(`${API_Dtbased}/eslint`, input).then((res) => {
        setSol(res.data.result[0].messages);
      });
    } catch (error) {
      console.log("Errror in component:", error);
    }
    console.log("handleSubmit");
  };

  console.log(input, "input");
  console.log(sol, "sol");

  return (
    <div className="resultado">
      <h3>Hello Coder</h3>
      <div className="Box">
        <Editor
          height="50vh"
          width="80vh"
          onChange={handleInput}
          defaultLanguage="javascript"
          className="edit"
        />
        {""}
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit Code</button>
        </form>
        <Came last={last} />
      </div>
      <Solution sol={sol} />
    </div>
  );
}
