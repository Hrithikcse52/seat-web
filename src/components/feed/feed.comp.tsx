/* eslint-disable react/jsx-no-bind */

import { Editor } from "@mantine/rte";
import type { Delta, DeltaOperation, Sources } from "quill";
import ReactQuill from "@mantine/rte/node_modules/react-quill";
import EditorRich from "components/workspace/editor/customeditor.comp";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import instance from "utils/axios";
import { Avatar } from "@mantine/core";
import { useUserQuery } from "hooks/user.hooks";
import { getFullName } from "utils/nav.helper";

export default function FeedPosts() {
  const { user, isAuth, isFetched } = useUserQuery();
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const [editor, setEditor] = useState<Editor.UnprivilegedEditor>();
  const [editorOpen, setEditorOpen] = useState(false);
  if (isFetched && !user) return <>Loading..</>;
  async function submitPost(payload: { raw: DeltaOperation[]; html: string }) {
    try {
      const { data, status } = await instance.post("/post/create", payload);
      console.log("error", status, data);
      if (status !== 200) {
        console.log("error", status, data);
      }
      // queryClient.refetchQueries("blog");
      toast.success("Successfully posted");
    } catch (error) {
      console.log("🚀 ~ file: editor.comp.tsx ~ line 55 ~ EditorRich ~ error", error);
    }
  }

  function createPayload() {
    let raw;
    if (editor && editor.getContents) raw = editor.getContents();
    if (raw && raw.ops) {
      const payload = {
        raw: raw.ops,
        html: value,
      };
      submitPost(payload);
    }
  }

  function onChange(data: string, _delta: Delta, _sources: Sources, editors: Editor.UnprivilegedEditor): void {
    if (!editor) setEditor(editors);
    setValue(data);
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col flex-grow  border-r border-gray-300">
        <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
          <h1 className="text-xl font-semibold">Scroll Feeds</h1>
          <button
            onClick={() => {
              setEditorOpen(!editorOpen);
            }}
            type="button"
            className="flex items-center h-8 px-2 text-sm bg-gray-300 rounded-sm hover:bg-gray-400"
          >
            {editorOpen ? "Close Editor" : "Open Editor"}
          </button>
        </div>
        <div className="no-scroolbar flex-grow h-0 overflow-auto">
          {editorOpen && (
            <div className="flex w-full items-center p-8 border-b-4 border-gray-300">
              {user && (
                <Avatar
                  className="flex-shrink-0 w-12 h-12 rounded-full"
                  src={user.profileImg}
                  alt={getFullName(user.name)}
                >
                  {user.name.firstName[0] + user.name.lastName[0]}
                </Avatar>
              )}
              <div className="flex flex-col flex-grow ml-4">
                <EditorRich
                  controls={[
                    ["bold", "italic", "underline", "link"],
                    ["clean", "h1", "h2", "h3"],
                    ["alignLeft", "alignCenter", "alignRight"],
                  ]}
                  value={value}
                  style={{ border: "none" }}
                  placeholder="Write Something!"
                  onChange={onChange}
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={createPayload}
                    type="button"
                    className="ml-auto flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full p-8 border-b border-gray-300">
            <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-4">
              <div className="flex">
                <span className="font-semibold">Username</span>
                <span className="ml-1">@username</span>
                <span className="ml-auto text-sm">Just now</span>
              </div>
              <p className="mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.{" "}
                <a className="underline" href="#">
                  #hashtag
                </a>
              </p>
              <div className="flex mt-2">
                <button type="button" className="text-sm font-semibold">
                  Like
                </button>
                <button type="button" className="ml-2 text-sm font-semibold">
                  Reply
                </button>
                <button type="button" className="ml-2 text-sm font-semibold">
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* <div className="flex w-full p-8 border-b border-gray-300">
            <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-4">
              <div className="flex">
                <span className="font-semibold">Username</span>
                <span className="ml-1">@username</span>
                <span className="ml-auto text-sm">Just now</span>
              </div>
              <p className="mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.{" "}
                <a className="underline" href="#">
                  #hashtag
                </a>
              </p>
              <div className="flex items-center aspect-square justify-center h-64 mt-2 bg-gray-200">
                <span className="font-semibold text-gray-500">Image</span>
              </div>
              <div className="flex mt-2">
                <button type="button" className="text-sm font-semibold">
                  Like
                </button>
                <button type="button" className="ml-2 text-sm font-semibold">
                  Reply
                </button>
                <button type="button" className="ml-2 text-sm font-semibold">
                  Share
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
