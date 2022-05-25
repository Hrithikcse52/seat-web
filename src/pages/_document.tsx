import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <script
          async
          defer
          data-website-id="ff7f7cbc-5f7f-4669-a1ec-fca956437b21"
          src="https://umami-production-716c.up.railway.app/umami.js"
        />
        <link rel="icon" href="/favicon.svg" />

        {/* <!-- HTML Meta Tags --> */}
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
