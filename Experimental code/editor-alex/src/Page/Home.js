import React from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { apiURL } from "../Util/apiURL";
import { Link } from "react-router-dom";
import Solution from "./Solution";
import Came from "./Came";

const API_Dtbased = apiURL();

export default function Home() {
  // const history = useHistory();
  const [input, setInput] = useState({ input: "//" });
  const [sol, setSol] = useState([]);
  const [fix, setFix] = useState("");
  const [last, setLast] = useState("");
  // const [date, setDate] = useState({ name: "" });

  const handleInput = (value, e) => {
    setInput({ input: value });
    setFix(value);
    // setDate(value);
  };

  // const handleInput2 = (value, e) => {
  //   const {value} = e.target
  //   setDate({ ...date, name: value});
  // };
  // const handleSubmit2 = (e) => {
  //   e.preventDefault();
  //   addCards(date);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLast(fix);
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
    axios.post("http://localhost:3333/eslint/fix", input).then((response) => {
      setLast(response.data.fixedResult[0].output);
    });
  };

  // const addCards = (new_card) => {
  //   axios.post(`${API_Dtbased}/code`, new_card).then((res) => {
  //     history.push("/");
  //   });
  // };
  console.log(sol, "da");
  // console.log(date, "date");
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
          // last={last}
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
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit Code</button>
          </form>
          {/* <form onSubmit={handleSubmit2} >
            <button type="submit">Save</button>
          </form> */}
        </div>
        <div>
          <form onSubmit={handleFixSubmit}>
            <button type="submit"> Code Fix</button>
          </form>
          {/* <form onSubmit={handleSubmit2} >
            <button type="submit">Save</button>
          </form> */}
        </div>
        <Solution sol={sol} />
      </div>
      {last ? <Came last={last} /> : null}
     
    </div>
  );
}
