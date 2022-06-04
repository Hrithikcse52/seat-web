/* eslint-disable react/button-has-type */
import { useUserQuery } from "hooks/user.hooks";
import { usePostDetailsQuery, usePostsQuery } from "hooks/post.hooks";
import { Avatar } from "@mantine/core";
import { getFullName } from "utils/nav.helper";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import toast from "react-hot-toast";
import sanitize from "sanitize-html";
import instance from "utils/axios";
import { useRouter } from "next/router";
import Loader from "components/loader.comp";
import { useQueryClient } from "react-query";
import { useState } from "react";

function Details({ id }: { id: string }) {
  const router = useRouter();
  const { user, isFetched: isUserFetched } = useUserQuery();
  const { post, isFetched } = usePostDetailsQuery(id);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  if (isFetched && !post) router.push("/feed");

  async function handleReaction(action: "like" | "comment", postId: string, messageStr = "") {
    try {
      if (action === "like") {
        const idx = post?.likes.findIndex(likeId => likeId._id === user?._id);

        if (idx !== -1) {
          return;
        }
      }
      const { data, status } = await instance.post("/post/reaction", {
        action,
        postId,
        message: messageStr,
      });
      if (status !== 200) {
        toast.error(data.message || "something went wrong!");
      } else {
        queryClient.refetchQueries(["post", postId]);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong!");
    } finally {
      setMessage("");
    }
  }

  if (post)
    return (
      <div className="w-full">
        <div className="mt-4  w-8 h-8 rounded-full flex items-center justify-center hover:border-2 hover:cursor-pointer ml-4">
          <Link href="/feed" passHref>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-arrow-left"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="5" y1="12" x2="11" y2="18" />
                <line x1="5" y1="12" x2="11" y2="6" />
              </svg>
            </a>
          </Link>
        </div>
        <div className="flex w-full p-8 border-b border-gray-300">
          <Avatar
            className="flex-shrink-0 w-12 h-12 rounded-full"
            src={post && post.createdBy.profileImg}
            alt={getFullName(post.createdBy.name)}
          >
            {post.createdBy.name.firstName[0] + post.createdBy.name.lastName[0]}
          </Avatar>

          <div className="flex flex-col flex-grow ml-4">
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="font-semibold">{getFullName(post.createdBy.name)}</span>
                <span className="ml-1 text-sm">@{post.createdBy.username}</span>
              </div>
              <span className="ml-auto text-sm">{formatDistanceToNow(new Date(post.createdAt))}</span>
            </div>
            <div className="mt-1">
              <div className="mt-4">
                <div
                  className="font-normal text-sm text-black break-words mb-2 bottom-margin-8"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: sanitize(post.postDataHTML) }}
                />
              </div>
            </div>

            <div className="mt-4 w-full flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => {
                    handleReaction("like", post._id);
                  }}
                  type="button"
                  className="flex items-center group mr-8"
                >
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
                  <span className="pl-1 text-sm font-normal">{post.likes.length}</span>
                </button>
                <Link href={`/feed/${post._id}`} passHref>
                  <a className="flex items-center group ">
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
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start mt-6 mx-6">
          <div className="">
            {isUserFetched && user && (
              <Avatar
                className="flex-shrink-0 w-12 my-2 h-12 rounded-full"
                src={user.profileImg}
                alt={getFullName(user.name)}
              >
                {user.name.firstName[0] + user.name.lastName[0]}
              </Avatar>
            )}
          </div>
          <div className="flex w-full mx-2 flex-col">
            <span className=" rounded-xl border-2 mr-4 min-h-12">
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="rounded-xl p-4 min-h-12 w-full focus:ring-0 focus:ring-offset-0"
                type="text"
              />
            </span>
            <button
              type="button"
              onClick={() => {
                handleReaction("comment", post._id, message);
              }}
              className="ml-auto mr-4 my-4 rounded-xl flex items-center h-8 px-3 text-xs  bg-gray-300 hover:bg-gray-400"
            >
              Post
            </button>
          </div>
        </div>

        {isFetched &&
          post &&
          post.comments.map(comment => (
            <div key={comment.message} className="flex w-full items-start my-2 mx-6">
              <div className="">
                <Avatar
                  className="flex-shrink-0 w-12 my-2 h-12 rounded-full"
                  src={comment.user.profileImg}
                  alt={getFullName(comment.user.name)}
                >
                  {comment.user.name.firstName[0] + comment.user.name.lastName[0]}
                </Avatar>
              </div>
              <div className="flex w-full mx-2 flex-col">
                <span className="mr-4 min-h-12">{comment.message}</span>
              </div>
            </div>
          ))}
        <div className="w-full flex flex-col items-center text-center p-4 mb-4">
          <div className="mx-auto text-center mt-8">
            <svg width="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40.0005" r="32" fill="#F6F8FA" />
              <g filter="url(#filter0_d_11566_31157)">
                <path
                  d="M24 16.0005C24 13.7913 25.7909 12.0005 28 12.0005H68C70.2091 12.0005 72 13.7913 72 16.0005V27.0005C72 29.2096 70.2091 31.0005 68 31.0005H32.381C31.2862 31.0005 30.2394 31.4491 29.4844 32.2419L25.7241 36.1901C25.1016 36.8438 24 36.4032 24 35.5005V16.0005Z"
                  fill="white"
                />
                <path
                  d="M24.5 16.0005C24.5 14.0675 26.067 12.5005 28 12.5005H68C69.933 12.5005 71.5 14.0675 71.5 16.0005V27.0005C71.5 28.9335 69.933 30.5005 68 30.5005H32.381C31.1494 30.5005 29.9717 31.0052 29.1223 31.897L25.3621 35.8453C25.0508 36.1722 24.5 35.9518 24.5 35.5005V16.0005Z"
                  stroke="#D1D5DA"
                />
              </g>
              <rect x="34" y="17.0005" width="18" height="2" rx="1" fill="#959DA5" />
              <rect x="28" y="16.0005" width="4" height="4" rx="2" fill="#6FCF97" />
              <rect x="28" y="22.0005" width="40" height="2" rx="1" fill="#E1E4E8" />
              <rect x="28" y="25.0005" width="40" height="2" rx="1" fill="#E1E4E8" />
              <g filter="url(#filter1_d_11566_31157)">
                <path
                  d="M56 46.0005C56 43.7913 54.2091 42.0005 52 42.0005H12C9.79086 42.0005 8 43.7913 8 46.0005V57.0005C8 59.2096 9.79086 61.0005 12 61.0005H47.619C48.7138 61.0005 49.7606 61.4491 50.5156 62.2419L54.2759 66.1901C54.8984 66.8438 56 66.4032 56 65.5005V46.0005Z"
                  fill="white"
                />
                <path
                  d="M55.5 46.0005C55.5 44.0675 53.933 42.5005 52 42.5005H12C10.067 42.5005 8.5 44.0675 8.5 46.0005V57.0005C8.5 58.9335 10.067 60.5005 12 60.5005H47.619C48.8506 60.5005 50.0283 61.0052 50.8777 61.897L54.6379 65.8453C54.9492 66.1722 55.5 65.9518 55.5 65.5005V46.0005Z"
                  stroke="#D1D5DA"
                />
              </g>
              <rect x="18" y="47.0005" width="18" height="2" rx="1" fill="#959DA5" />
              <rect x="12" y="46.0005" width="4" height="4" rx="2" fill="#6FCF97" />
              <rect x="12" y="52.0005" width="40" height="2" rx="1" fill="#E1E4E8" />
              <rect x="12" y="55.0005" width="40" height="2" rx="1" fill="#E1E4E8" />
              <defs>
                <filter
                  id="filter0_d_11566_31157"
                  x="16"
                  y="8.00049"
                  width="64"
                  height="40.502"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11566_31157" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11566_31157" result="shape" />
                </filter>
                <filter
                  id="filter1_d_11566_31157"
                  x="0"
                  y="38.0005"
                  width="64"
                  height="40.502"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11566_31157" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11566_31157" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
          <div>
            <p className="text-sm font-normal mb-1">Your feedbacks are welcome!</p>
            <p className="text-xs font-light text-gray">Words have more power than we think. Be kind.</p>
          </div>
        </div>
      </div>
    );
  return <Loader />;
}

export default function PostDetails({ post }: { post: string }) {
  const { user, isFetched } = useUserQuery();
  const { posts } = usePostsQuery();
  const router = useRouter();

  return (
    <div className="flex w-full">
      <Details id={post} />
      <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
        <h3 className="mt-6 w-full font-semibold">Trending</h3>
        <div className="flex w-full py-4 border-b border-gray-300">
          <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
          <div className="flex flex-col flex-grow ml-2">
            <div className="flex flex-col text-sm">
              <span className="font-semibold">Username</span>
              <span className="">@username</span>
            </div>
            <p className="mt-1 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua.{" "}
              <a className="underline" href="#">
                #hashtag
              </a>
            </p>
          </div>
        </div>
        <div className="flex w-full py-4 border-b border-gray-300">
          <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
          <div className="flex flex-col flex-grow ml-2">
            <div className="flex flex-col text-sm">
              <span className="font-semibold">Username</span>
              <span className="ml-1">@username</span>
            </div>
            <p className="mt-1 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua.{" "}
              <a className="underline" href="#">
                #hashtag
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
