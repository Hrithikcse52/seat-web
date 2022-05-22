/* eslint-disable react/jsx-no-bind */
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  ContentBlock,
} from "draft-js";
import { useState } from "react";

export default function EditorRich() {
  const content = new ContentBlock();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (editorStatevalue: EditorState) =>
    setEditorState(editorStatevalue);

  function handleKeyCommand(command: string): DraftHandleValue {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  function handleSubmit() {
    const text = editorState.getCurrentContent().getPlainText(" \n ");
    console.log("text", { text });
  }
  return (
    <div className="border w-full p-8 rounded-lg border-primaryBorder cursor-text">
      <div className="h-full  min-h-[56px] max-h-36  overflow-y-auto">
        <Editor
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onChange}
        />
      </div>
      <button onClick={handleSubmit} type="button">
        Submit
      </button>
    </div>
  );
}
