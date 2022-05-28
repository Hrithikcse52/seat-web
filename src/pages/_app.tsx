/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "components/navbar/navbar.comp";
import Footer from "components/footer/footer.comp";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import NavBarNew from "components/navbar/navbarnew.comp";
import Feed from "components/feed/feed.comp";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log({ pageProps }, router.pathname);
  return (
    <QueryClientProvider client={queryClient}>
      <NavBarNew />
      {router.pathname === "/login" || router.pathname === "/" ? (
        <Component {...pageProps} />
      ) : (
        <Feed>
          <Component {...pageProps} />
        </Feed>
      )}
      {/* <Footer /> */}
      <ReactQueryDevtools />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
