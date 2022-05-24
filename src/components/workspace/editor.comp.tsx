/* eslint-disable react/jsx-no-bind */
import Button from "elements/button";
import { useRef, useState } from "react";
import ReactQuill from "@mantine/rte/node_modules/react-quill";
import type { Delta, DeltaOperation, Sources } from "quill";
import type { Editor } from "@mantine/rte";
import instance from "utils/axios";

import RichEditor from "./customeditor.comp";

export default function EditorRich(props: { workspace: string }) {
  const { workspace } = props;
  async function submitPost(payload: {
    raw: DeltaOperation[];
    html: string;
    workspace: string;
  }) {
    try {
      const { data, status } = await instance.post("/blog/create", payload);
      if (status !== 200) {
        console.log("error", status, data);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: editor.comp.tsx ~ line 55 ~ EditorRich ~ error",
        error
      );
    }
  }
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
          let raw;
          if (editor && editor.getContents) raw = editor.getContents();
          if (raw && raw.ops) {
            const payload = {
              raw: raw.ops,
              html: value,
              workspace,
            };
            submitPost(payload);
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
}
