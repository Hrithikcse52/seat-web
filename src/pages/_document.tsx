import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <script
          async
          defer
          data-website-id="ccf915e6-8cea-4e99-b0f8-ecce7039fa40"
          src="https://umami-production-716c.up.railway.app/umami.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
