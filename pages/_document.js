import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Minah" />
        <meta name="copyright" content="Minah" />
        <meta name="description" content="❤️ Minah Game Store ❤️" />

        <meta name="theme-color" content="#123D93" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
