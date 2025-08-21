import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ onCodeChange, description }) {
  const handleChange = (value) => {
    onCodeChange(value || "");
  };

  return (
    <div
      style={{ height: "400px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <Editor
        height="100%"
        language="javascript"
        value={description} // ✅ make it controlled
        theme="vs-dark"
        onChange={handleChange}
      />
    </div>
  );
}
