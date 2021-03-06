import FeedPosts from "components/feed/feed.comp";
import Head from "next/head";
import { projectDesc } from "config";
/*

    <meta property="og:description" content="OPEN_GRAPH_DESCRIPTION" />
      <meta property="og:title" content="OPEN_GRAPH_TITLE" />
      <meta property="og:type"  content="website" />
      <meta property="og:url"   content="WEBSITE_URL" />
    <!-- Image -->
      <meta property="og:image" content="URL_TO_IMAGE" />
      <meta property="og:image:alt"    content="Website icon" />
      <meta property="og:image:height" content="80" />
      <meta property="og:image:secure_url" content="URL_TO_IMAGE" />
      <meta property="og:image:type"  content="image/png" />
      <meta property="og:image:width" content="80" />
      <meta property="og:locale" content="en_GB" />

*/

export default function FeedPage() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <title>Feed Page | membook</title>
        <meta name="description" content={projectDesc.desc} />
        <meta property="og:url" content={projectDesc.site} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Feed Page | membook" />
        <meta property="og:description" content={projectDesc.desc} />
        <meta property="og:image" content="https://ui-avatars.com/api/?name=demomembook" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={projectDesc.site} />
        <meta name="twitter:title" content="Feed Page | membook" />
        <meta name="twitter:description" content={projectDesc.desc} />
        <meta name="twitter:image" content="https://ui-avatars.com/api/?name=demomembook" />
      </Head>
      <FeedPosts />
    </>
  );
}
