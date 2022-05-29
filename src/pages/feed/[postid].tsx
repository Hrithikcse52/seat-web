import PostDetails from "components/feed/postDetails.comp";
import { useRouter } from "next/router";

export default function FeedPostDetails() {
  const router = useRouter();
  console.log(router);
  const { postid } = router.query;
  return <PostDetails post={postid as string} />;
}
