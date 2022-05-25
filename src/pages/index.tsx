import HomeCarausel from "components/carausel/carausel.comp";
import FAQ from "components/home/faq.comp";
import Featurepage from "components/home/feature.comp";

import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Member Book</title>
        <link rel="icon" href="/favicon.svg" />

        {/* <!-- HTML Meta Tags --> */}
        <title>Membook | Your most meaningful professional network</title>
        <meta
          name="description"
          content="Membook is a community of working professionals focused on building a personal brand, sharing professional content, and finding peers to collaborate with."
        />
        <meta
          name="google-site-verification"
          content="scuwdYjwsQ6Dd11OtBXuPO3vN2lwPC_LBWoQDjx5Ma0"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://demo.membook.me/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Membook | Your most meaningful professional network"
        />
        <meta
          property="og:description"
          content="Membook is a community of working professionals focused on building a personal brand, sharing professional content, and finding peers to collaborate with."
        />
        <meta
          property="og:image"
          content="https://ui-avatars.com/api/?name=demomembook"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://demo.membook.me/" />
        <meta
          name="twitter:title"
          content="Membook | Your most meaningful professional network"
        />
        <meta
          name="twitter:description"
          content="Membook is a community of working professionals focused on building a personal brand, sharing professional content, and finding peers to collaborate with."
        />
        <meta
          name="twitter:image"
          content="https://ui-avatars.com/api/?name=demomembook"
        />
      </Head>
      <HomeCarausel />
      <Featurepage />
      <FAQ />
    </>
  );
}

export default Home;
