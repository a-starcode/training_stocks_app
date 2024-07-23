import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Libre_Franklin } from "@next/font/google"; // npm package
import { ToastContainer } from "react-toastify";

// we don't have to specify font weights because it is a variable google font (look it up)
const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html,
        body {
          font-family: ${libreFranklin.style.fontFamily};
          height: 100%;
        }
      `}</style>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
