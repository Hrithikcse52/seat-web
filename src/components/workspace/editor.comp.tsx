/* eslint-disable react/jsx-no-bind */
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  ContentBlock,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import "draft-js/dist/Draft.css";
import Buttonclass, { DButton, PButton, PrimartButton } from "elements/button";
import { useRef, useState } from "react";
import styled from "styled-components";

const StyledEditor = styled(Editor)`
  width: 300px;
  border: 2px solid black;
`;

export default function EditorRich() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorRef = useRef<Editor>(null);

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
    const text = editorState.getCurrentContent();
    console.log("text", text, convertToRaw(text));
  }
  return (
    <div className="border flex flex-col w-full  rounded-lg border-primaryBorder ">
      <div
        className="h-full min-h-[56px] max-h-36 border-2  overflow-y-auto"
        // onFocus={() => {
        //   console.log("focused");
        //   if (!editorRef) return;
        //   editorRef.current?.focus();
        // }}
      >
        <StyledEditor
          onFocus={() => {
            console.log("editor calle");
          }}
          placeholder="Write Something"
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onChange}

          // ref={editorRef}
          // readOnly
        />
      </div>
      <div className="ml-auto my-2">
        <Buttonclass accent="primary" className="ml-auto" type="submit">
          Submit
        </Buttonclass>
      </div>
    </div>
  );
}
