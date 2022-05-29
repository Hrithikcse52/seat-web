import { useUserQuery } from "hooks/user.hooks";
import { usePostsQuery } from "hooks/post.hooks";
import ScrollFeed from "./scrollFeed.comp";

export default function FeedPosts() {
  const { user, isFetched } = useUserQuery();
  const { posts } = usePostsQuery();
  console.log("posts", posts);
  if (isFetched && !user) return <>Loading..</>;

  return (
    <div className="flex w-full">
      <ScrollFeed />
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
