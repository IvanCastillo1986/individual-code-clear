import React from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import { apiURL } from "../Util/apiURL";
import { Link } from "react-router-dom";
import Solution from "./Solution";
import Came from "./Came";

const API_Dtbased = apiURL();

export default function Home() {
  const [input, setInput] = useState({ input: "" });
  const [sol, setSol] = useState([]);
  const [last, setLast] = useState("");
  const [show, setShow] = useState("Show");

  const handleInput = (value, e) => {
    setInput({ input: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(`${API_Dtbased}/eslint`, input).then((res) => {
        setSol(res.data.result[0].messages);
      });
    } catch (error) {
      console.log("Errror in component:", error);
    }
    console.log("handleSubmit");
  };

  const handleFixSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3333/eslint/fix", input).then((res) => {
      setLast(res.data.fixedResult[0].output);
    });
  };

  const showButton = (e) => {
    if (show === "Show") {
      setShow("Hide");
    } else {
      setShow("Show");
    }
  };

  return (
    <div className="resultado">
      <Link to={"/code"}>
        <img
          src={
            "https://www.vhv.rs/dpng/d/409-4098783_png-file-svg-home-icon-for-navbar-transparent.png"
          }
          alt="save"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "5px",
            marginTop: "-20px",
          }}
          className="save"
        />
      </Link>

      <h3>Hello Coder</h3>
      <div className="Box">
        <Editor
          height="45vh"
          width="75vh"
          fontSize="15px"
          onChange={handleInput}
          defaultLanguage="javascript"
          className="edit"
        />
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit Code</button>
          </form>
          <form onSubmit={handleFixSubmit}>
            <button type="submit" value={show} onClick={showButton}>
              {show}
            </button>
          </form>
        </div>
        <div>{show === "Hide" ? <Came last={last} /> : null}</div>
        <Solution sol={sol} />
      </div>
    </div>
  );
}
