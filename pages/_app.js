import "@/styles/globals.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {ThemeProvider} from "@material-tailwind/react";
import Head from "next/head";
import {persistor, store} from "../redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Layout from "@/components/layout";

export default function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1"
            />
            <title>Minah Game Store</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
