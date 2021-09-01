import "./App.css";
import Editor from "@monaco-editor/react";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const handleChange = (value, e) => {
    setInput(value);
  };
  console.log(input);
  return (
    <div className="App">
      <Editor
        onChange={handleChange}
        height="90vh"
        defaultLanguage="javascript"
      />
    </div>
  );
}

export default App;
