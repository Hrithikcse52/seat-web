/* eslint-disable react/jsx-no-bind */
import Button from "elements/button";
import { useRef, useState } from "react";

import ReactQuill from "@mantine/rte/node_modules/react-quill";
import type { Delta, Sources } from "quill";
import type { Editor } from "@mantine/rte";
import RichEditor from "./customeditor.comp";

export default function EditorRich() {
  const [value, setValue] = useState("");
  const editorRef = useRef<ReactQuill>(null);

  const [editor, setEditor] = useState<Editor.UnprivilegedEditor>();
  function onChange(
    data: string,
    delta: Delta,
    sources: Sources,
    editors: Editor.UnprivilegedEditor
  ): void {
    if (!editor) setEditor(editors);
    setValue(data);
  }
  // console.log("content", editor && editor.getContents());
  return (
    <div className="border rounded">
      <RichEditor
        ref={editorRef}
        controls={[
          ["bold", "italic", "underline", "link"],
          ["unorderedList", "clean", "h1", "h2", "h3"],
          ["alignLeft", "alignCenter", "alignRight"],
        ]}
        value={value}
        style={{ border: "none" }}
        placeholder="Write Something!"
        onChange={onChange}
      />
      <Button
        className="ml-auto my-4 mr-4"
        onClick={() => {
          console.log("final data", value, editor);
          if (editor && editor.getContents)
            console.log("html", editor.getContents());
        }}
      >
        Submit
      </Button>
    </div>
  );
}
