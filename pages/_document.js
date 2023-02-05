import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="application-name" content="❤️ Minah Game Store ❤️" />
        <meta
          name="apple-mobile-web-app-title"
          content="❤️ Minah Game Store ❤️"
        />
        <meta name="author" content="Minah" />
        <meta name="copyright" content="Minah" />
        <meta name="description" content="❤️ Minah Game Store ❤️" />
        <meta property="og:url" content="https://minah-game-store.vercel.app" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#121212" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
