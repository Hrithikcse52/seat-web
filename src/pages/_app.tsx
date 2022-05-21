/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "components/navbar/navbar.comp";
import Footer from "components/footer/footer.comp";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
