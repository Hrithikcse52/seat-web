import FAQ from "components/home/faq.comp";
import Featurepage from "components/home/feature.comp";
import { projectDesc } from "config";

import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <title>{projectDesc.title}</title>
        <meta name="description" content={projectDesc.desc} />
        <meta name="google-site-verification" content="scuwdYjwsQ6Dd11OtBXuPO3vN2lwPC_LBWoQDjx5Ma0" />
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
      {/* <HomeCarausel /> */}
      <Featurepage />
      <FAQ />
    </>
  );
}

export default Home;
