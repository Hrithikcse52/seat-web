/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { BACKEND_URL, projectDesc } from "config";
import { useConversationQuery, useMessagesQuery } from "hooks/message.hooks";
import { useMsgSocket } from "hooks/socket.hooks";
import { useUserQuery } from "hooks/user.hooks";
import { useQueryClient } from "react-query";
import { Participant } from "types/conversation.type";
import instance from "utils/axios";
import Loader from "components/loader.comp";
import { getFullName } from "utils/nav.helper";
import { conversationNameHandler } from "utils/user.helper";
import Head from "next/head";
import { formatDistanceToNow } from "date-fns";

const howl = new Howl({
  src: ["notification.wav"],
});

function ChatBox({ index, receiverIndex }: { index: number; receiverIndex: number }) {
  const { conversations, isFetched } = useConversationQuery();
  const { user, isFetched: isUserFetched } = useUserQuery();
  const [message, setMessage] = useState("");
  const { messages, isFetched: isMsgFetched } = useMessagesQuery(conversations && conversations[index]._id);
  const queryClient = useQueryClient();
  const messageContainer = useRef<HTMLDivElement>(null);
  const { msgSoc } = useMsgSocket();

  function scrollToButtom() {
    if (messageContainer && messageContainer.current) {
      messageContainer.current.scrollTo({ top: messageContainer.current.scrollHeight, behavior: "smooth" });
    }
  }
  useEffect(() => {
    scrollToButtom();
  }, [messages]);

  async function handleWebSocket(newMsg: any) {
    await queryClient.invalidateQueries(["conversation", user?._id]);
    queryClient.setQueryData(["messages", newMsg.conversation, user?._id], (old: any) =>
      old && Array.isArray(old.data) ? { data: [...old.data, newMsg], status: old.status } : old
    );
    howl.play();
  }

  useEffect(() => {
    if (msgSoc && user) {
      msgSoc.on("newMsg", newMsg => {
        handleWebSocket(newMsg);
        // if (!conversations?.find(conv => conv === newMsg.conversation)) {
        //   queryClient.invalidateQueries(["messages", newMsg.conversation, user._id]);
        // }
        // queryClient.setQueryData(["messages", newMsg.conversation, user._id], (old: any) =>
        //   Array.isArray(old.data) ? { data: [...old.data, newMsg], status: old.status } : old
        // );
        // howl.play();
      });
    }
  }, [msgSoc]);

  async function handleSendMessage(receiver: Participant, conversation: string) {
    const { status } = await instance.post(`${BACKEND_URL}/conversation/send`, {
      receiver: receiver._id,
      receiverUsername: receiver.username,
      message,
      conversation,
    });
    if (status === 200) {
      queryClient.invalidateQueries(["messages", conversation]);
      setMessage("");
    }
  }

  if (isUserFetched && user && isFetched && conversations)
    return (
      <div className="hidden lg:col-span-2 lg:block overflow-auto">
        <div className="w-full">
          <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={conversations[index].participants[receiverIndex].profileImg}
              alt={conversations[index].participants[receiverIndex].username}
            />
            <span className="block ml-2 font-bold text-gray-600">
              {getFullName(conversations[index].participants[receiverIndex].name)}
            </span>
            <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3" />
          </div>
          <div ref={messageContainer} className=" w-full h-[70vh] p-6 overflow-y-auto ">
            <ul className="space-y-2">
              {isMsgFetched &&
                messages &&
                messages.map(msg => {
                  if (user._id === msg.sender) {
                    return (
                      <li key={msg._id} className="flex justify-end">
                        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                          <span className="block">{msg.message}</span>
                        </div>
                      </li>
                    );
                  }
                  return (
                    <li key={msg._id} className="flex justify-start">
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                        <span className="block">{msg.message}</span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage(conversations[index].participants[receiverIndex], conversations[index]._id);
            }}
          >
            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              {/* <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button> */}

              <input
                type="text"
                value={message}
                onChange={e => {
                  setMessage(e.target.value);
                }}
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
              />
              {/* <button>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
              <path
              
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button> */}
              <button type="submit">
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    );

  return <Loader />;
}

/* eslint-disable react/button-has-type */
function InboxComp() {
  const { user, isFetched: isUserFet } = useUserQuery();
  const { conversations, isFetched } = useConversationQuery();
  const [selectedConv, setSelectedCov] = useState(0);

  if (isUserFet && user) {
    return (
      <div className="w-full h-full">
        <div className=" border rounded lg:grid lg:grid-cols-3">
          <div className="border-r border-gray-300 lg:col-span-1">
            {/* <div className="mx-3 my-3">
              <div className="relative text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-gray-300"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="search"
                  className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                  name="search"
                  placeholder="Search"
                  required
                />
              </div>
            </div> */}

            <ul className="overflow-auto ">
              <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              {isFetched &&
                conversations &&
                conversations.map((conversation, idx) => {
                  const index = conversationNameHandler(conversation, user._id);
                  return (
                    <li key={conversation._id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCov(idx);
                        }}
                        className="flex w-full items-center px-3 py-2 text-sm transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100 focus:outline-none"
                      >
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          // src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                          src={conversation.participants[index].profileImg}
                          alt={conversation.participants[index].username}
                        />
                        <div className="flex flex-col w-full pb-2">
                          <div className="flex justify-between">
                            <span className="block ml-2 font-semibold text-gray-600">
                              {getFullName(conversation.participants[index].name)}
                            </span>
                            <span className="block ml-2 text-sm text-gray-600">
                              {formatDistanceToNow(new Date(conversation.chat.createdAt ?? conversation.createdAt))}
                            </span>
                          </div>
                          <span className="ml-2 self-start text-sm text-gray-600">
                            {conversation.chat.message ?? "Send First Message.."}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          {/* top sould be open */}
          {conversations && conversations.length > 0 && (
            <ChatBox
              index={selectedConv}
              receiverIndex={conversationNameHandler(conversations[selectedConv], user._id)}
            />
          )}
        </div>
      </div>
    );
  }
  return <Loader />;
}

export default function InboxPage() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <title>Inbox</title>
        <meta name="description" content={projectDesc.desc} />

        <meta property="og:url" content={projectDesc.site} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={projectDesc.title} />
        <meta property="og:description" content={projectDesc.desc} />
        <meta property="og:image" content="https://ui-avatars.com/api/?name=demomembook" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={projectDesc.site} />
        <meta name="twitter:title" content={projectDesc.title} />
        <meta name="twitter:description" content={projectDesc.desc} />
        <meta name="twitter:image" content="https://ui-avatars.com/api/?name=demomembook" />
      </Head>
      <div className="w-full h-[89vh] ">
        <InboxComp />
      </div>
    </>
  );
}
