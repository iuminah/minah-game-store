import "@/styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Head from "next/head";
import {persistor, store} from "../redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Layout from "@/components/layouts/layout";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {appWithTranslation} from "next-i18next";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
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

export default appWithTranslation(MyApp);
