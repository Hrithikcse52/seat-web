/* eslint-disable react/jsx-no-bind */

import { Editor } from "@mantine/rte";
import type { Delta, DeltaOperation, Sources } from "quill";
import ReactQuill from "@mantine/rte/node_modules/react-quill";
import EditorRich from "components/workspace/editor/customeditor.comp";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import instance from "utils/axios";
import { Avatar, Skeleton } from "@mantine/core";
import { useUserQuery } from "hooks/user.hooks";
import { getFullName } from "utils/nav.helper";
import { usePostsQuery } from "hooks/post.hooks";
import { formatDistanceToNow } from "date-fns";
import sanitize from "sanitize-html";

export default function FeedPosts() {
  const { user, isAuth, isFetched } = useUserQuery();
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const { posts, isFetched: isPostFetched, isLoading } = usePostsQuery();
  console.log("posts", posts);
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
      queryClient.refetchQueries("posts");
      toast.success("Successfully posted");
    } catch (error) {
      console.log("🚀 ~ file: editor.comp.tsx ~ line 55 ~ EditorRich ~ error", error);
    } finally {
      setEditorOpen(false);
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
        <div className="no-scrollbar flex-grow h-0 overflow-auto">
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
              <div className="flex flex-col flex-grow ml-4 ">
                <div className="h-60 overflow-auto no-scrollbar border-2">
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
                </div>
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
          {isLoading && !isPostFetched && (
            <div className="flex w-full p-8 border-b border-gray-300">
              <Skeleton height={50} circle mb="xl" />

              <div className="flex flex-col flex-grow ml-4">
                <div className="flex">
                  {/* <span className="font-semibold">Username</span>
                  <span className="ml-1">@username</span>
                  <span className="ml-auto text-sm">Just now</span> */}
                </div>
                <p className="mt-1">
                  <Skeleton height={8} mt={6} radius="xl" />

                  {/* <a className="underline" href="#">
                    
                  </a> */}
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
          )}
          {isPostFetched &&
            posts &&
            posts.map(post => (
              <div key={post._id} className="flex w-full p-8 border-b border-gray-300">
                <Avatar
                  className="flex-shrink-0 w-12 h-12 rounded-full"
                  src={post.createdBy.profileImg}
                  alt={getFullName(post.createdBy.name)}
                >
                  {post.createdBy.name.firstName[0] + post.createdBy.name.lastName[0]}
                </Avatar>

                <div className="flex flex-col flex-grow ml-4">
                  <div className="flex">
                    <span className="font-semibold">{post.createdBy.username}</span>
                    <span className="ml-1">@{post.createdBy.username}</span>
                    <span className="ml-auto text-sm">{formatDistanceToNow(new Date(post.created))}</span>
                  </div>
                  <div className="mt-1">
                    <div className="mt-4">
                      <div
                        className="font-normal text-sm text-black break-words mb-2 bottom-margin-8"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: sanitize(post.postDataHTML) }}
                      />
                    </div>
                    {/* <a className="underline" href="#">
                   
                 </a> */}
                  </div>

                  <div className="mt-4 w-full flex items-center justify-between">
                    <div className="flex items-center">
                      <button type="button" className="flex items-center group mr-8">
                        <div className="border border-gray-gray3 bg-white hover:bg-gray-gray2 cursor-pointer rounded-full flex justify-center items-center transition-all ease-in duration-75 lg:w-8 lg:h-8 w-6 h-6 border-none group-hover:bg-green-lighter group-hover:text-green-bright false">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z" />
                          </svg>
                        </div>
                        <span className="pl-1 text-sm font-normal">1</span>
                      </button>
                      <button type="button" className="flex items-center group ">
                        <div className="border border-gray-gray3 bg-white hover:bg-gray-gray2 cursor-pointer rounded-full flex justify-center items-center transition-all ease-in duration-75 lg:w-8 lg:h-8 w-6 h-6 border-none group-hover:bg-green-lighter group-hover:text-green-bright ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M13,11H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4-4H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Zm2-5H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z" />
                          </svg>
                        </div>
                        <span className="pl-1 text-sm font-normal" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

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
