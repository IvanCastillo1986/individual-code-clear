import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  handleChange,
  handleSubmit,
  handleEditorDidMount,
  monacoObjects
}) {
  const [fileText, setFileText] = useState(null);

  const getFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e) => setFileText(e.target.result);
    reader.readAsText(e.target.files[0]);
  }

  const handleFileSubmit = (e) => {
    e.preventDefault();
    monacoObjects.current.editor.setValue(fileText);
  }

  return (
    <div className="CodeEditor">
      <h2>Code Editor</h2>
      <form onSubmit={handleFileSubmit}>
        <label for="file">
          <input type="file" accept=".js" minSize={0} maxSize={5242880} onChange={getFile} />
        </label>
        <input type="submit" value="Import code from js file" />
      </form>
      <form action="" onSubmit={handleSubmit}>
        <Editor
          className="Editor"
          onChange={handleChange}
          defaultLanguage="javascript"
          defaultValue="// your code here"
          onMount={handleEditorDidMount}
        />
        <input type="submit" value="Submit Code" />
      </form>
    </div>
  );
}

// MONACO EDITOR NOTES
// The editor instance does not perform computations for us.
// It's pretty much just an area where you can write text.
// It's got a bunch of nested divs built into it for UI/UX reasons
// It looks for patterns in the text that are considered bad code, and provides syntax error
// markers when the patterns signify what is programmed as bad code somewhere in Monaco Editor's
// files.
// It lets us customize many UI/functional options.
// When you start to inspect the portion of the DOM that takes user input text, you find the <div>,
// which holds a <span> element, which actually holds <spans> which holds this user input text.
// Each line in the Editor is:
// comprised of two <span> elements
// First span takes the first word in the line, before the first space
// Second span takes the rest of the text in the line
// styled with a height of 18
// positioned absolutely at a multiple of 18px from the top when added, from it's parent
// container <div class='view-lines'>, another div that is positioned absolutely.
// It's a mess of nested <div>s, with the parent div of this entire text area being:
// <div class='monaco-scrollable-element editor-scrollable vs mac'>
