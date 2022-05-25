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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
