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

  return (
    <div className="resultado">
      <Link to={"/save"}>
        <img
          src={
            "https://www.vhv.rs/dpng/d/409-4098783_png-file-svg-home-icon-for-navbar-transparent.png"
          }
          alt="save"
          style={{ width: "40px", height: "40px", borderRadius: "5px", marginTop: "-20px"}}
          className="save"
        />
      </Link>
      <h3>Hello Coder</h3>
      <div className="Box">
        <Editor
          height="45vh"
          width="80vh"
          fontSize="15px"
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
