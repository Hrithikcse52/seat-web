import { useUserQuery } from "hooks/user.hooks";
import { usePostsQuery } from "hooks/post.hooks";
import ScrollFeed from "./scrollFeed.comp";
import TrendingPosts from "./trending.comp";

export default function FeedPosts() {
  const { user, isFetched } = useUserQuery();
  const { posts } = usePostsQuery();
  if (isFetched && !user) return <>Loading..</>;

  return (
    <div className="flex w-full">
      <ScrollFeed />
      <TrendingPosts />
    </div>
  );
}
