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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
