import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-421B10J8PL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-421B10J8PL');
        `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
