import "@/styles/globals.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {ThemeProvider} from "@material-tailwind/react";
import Head from "next/head";

export default function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider>
      <Head>
        <title>Minah Game Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
