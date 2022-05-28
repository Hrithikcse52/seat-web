/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
export default function FeedNav() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col flex-grow  border-r border-gray-300">
        <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
          <h1 className="text-xl font-semibold">Feed Title</h1>
          <button className="flex items-center h-8 px-2 text-sm bg-gray-300 rounded-sm hover:bg-gray-400">
            New post
          </button>
        </div>
        <div className="no-scroolbar flex-grow h-0 overflow-auto">
          <div className="flex w-full p-8 border-b-4 border-gray-300">
            <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-4">
              <textarea
                className="p-3 bg-transparent border border-gray-500 rounded-sm"
                name=""
                id=""
                // rows="3"
                placeholder="What's happening?"
              />
              <div className="flex justify-between mt-2">
                <button className="flex items-center h-8 px-3 text-xs rounded-sm hover:bg-gray-200">Attach</button>
                <button className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400">
                  Post
                </button>
              </div>
            </div>
          </div>
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
                <button className="text-sm font-semibold">Like</button>
                <button className="ml-2 text-sm font-semibold">Reply</button>
                <button className="ml-2 text-sm font-semibold">Share</button>
              </div>
            </div>
          </div>
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
                <button className="text-sm font-semibold">Like</button>
                <button className="ml-2 text-sm font-semibold">Reply</button>
                <button className="ml-2 text-sm font-semibold">Share</button>
              </div>
            </div>
          </div>
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
              <div className="flex items-center justify-center h-64 mt-2 bg-gray-200">
                <span className="font-semibold text-gray-500">Image</span>
              </div>
              <div className="flex mt-2">
                <button className="text-sm font-semibold">Like</button>
                <button className="ml-2 text-sm font-semibold">Reply</button>
                <button className="ml-2 text-sm font-semibold">Share</button>
              </div>
            </div>
          </div>
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
                <button className="text-sm font-semibold">Like</button>
                <button className="ml-2 text-sm font-semibold">Reply</button>
                <button className="ml-2 text-sm font-semibold">Share</button>
              </div>
            </div>
          </div>
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
                <button className="text-sm font-semibold">Like</button>
                <button className="ml-2 text-sm font-semibold">Reply</button>
                <button className="ml-2 text-sm font-semibold">Share</button>
              </div>
            </div>
          </div>
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
              <div className="flex items-center justify-center h-64 mt-2 bg-gray-200">
                <span className="font-semibold text-gray-500">Image</span>
              </div>
              <div className="flex mt-2">
                <button className="text-sm font-semibold">Like</button>
                <button className="ml-2 text-sm font-semibold">Reply</button>
                <button className="ml-2 text-sm font-semibold">Share</button>
              </div>
            </div>
          </div>
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
              <div className="flex items-center justify-center h-64 mt-2 bg-gray-200">
                <span className="font-semibold text-gray-500">Image</span>
              </div>
              <div className="flex mt-2">
                <button className="text-sm font-semibold">Like</button>
                <button className="ml-2 text-sm font-semibold">Reply</button>
                <button className="ml-2 text-sm font-semibold">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
        <input
          className="flex items-center h-8 px-2 border border-gray-500 rounded-sm"
          type="search"
          placeholder="Search…"
        />
        <div>
          <h3 className="mt-6 font-semibold">Trending</h3>
          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
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
          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
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
          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
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
    </div>
  );
}
