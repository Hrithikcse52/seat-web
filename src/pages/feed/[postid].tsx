import PostDetails from "components/feed/postDetails.comp";
import Head from "next/head";
import { useRouter } from "next/router";

export default function FeedPostDetails() {
  const router = useRouter();

  const { postid } = router.query;
  return (
    <>
      <Head>
        <title>post | membook </title>
      </Head>
      <PostDetails post={postid as string} />
    </>
  );
}
