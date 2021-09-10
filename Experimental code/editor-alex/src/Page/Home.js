import React from "react";
import Editor from "@monaco-editor/react";
import { useState , useEffect } from "react";
import axios from "axios";
import { apiURL } from '../Util/apiURL'

import Solution from "./Solution";

const API_Dtbased = apiURL()

export default function Home() {
  const [input, setInput] = useState('');
  const [sol, setSol] = useState('');
  const [tol, setTol] = useState('');

  const handleInput = (value, e) => {
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSol(input);
  };
  
  useEffect(() => {
    axios.post(`${API_Dtbased}/eslint`, sol).then((res)=>{
      const {data} = res
      console.log(data.payload)
      setTol(data)
    })
  },[])

  console.log(input, "input");
  console.log(sol, "sol");

  return (
    <div>
      <h3>Hello Coder</h3>
      <div className="Box">
        <Editor
          height="70vh"
          width="70vh"
          onChange={handleInput}
          defaultLanguage="javascript"
          className="edit"
        />
        {""}
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit Code</button>
        </form>
        <Solution sol={sol} />
      </div>
    </div>
  );
}
