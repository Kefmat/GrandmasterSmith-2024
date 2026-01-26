import * as React from "react";
import { Providers } from "@/providers/providers";
import Head from "next/head";
import "../styles/globals.css";
import "../public/styles/tailwind.css";
import MainMenu from "@/components/MainMenu";
import LeftSideMenuLayout from "@/features/Common/Layout/Sections/LeftSideMenu/LeftSideMenu";
import Footer from "@/features/Common/Components/Footer/Footer";
import { ConsentBanner, ConsentProvider } from "react-hook-consent";
import "react-hook-consent/dist/styles/style.css";

import { AppProps } from "next/app";

import dotenv from "dotenv";
import Link from "next/link";

dotenv.config();

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ConsentProvider
        options={{
          services: [
            {
              id: "myid",
              name: "Auth0 cookies",
              scripts: [
                {
                  id: "external-script",
                  src: "https://auth0.com/",
                },
              ],
              cookies: [{ pattern: "cookie-name" }, { pattern: /regex/ }],
              localStorage: ["local-storage-key"],
              sessionStorage: ["session-storage-key"],
              mandatory: true,
            },
          ],
          // customHash: 'my-custom-hash', // optional, e.g. when changing the options based on language
          theme: "light",
        }}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>

        <div className="flex flex-col min-h-screen">
          <div className="flex-1 flex ">
            <header className="fixed top-0 w-full z-40">
              <MainMenu />
            </header>
            <nav className=" md:block fixed top-1/3 left-0  z-50 w-1/3 -translate-y-14">
              <LeftSideMenuLayout />
            </nav>
            <main
              className="flex-1 pt-10 pb-52 my-5 "
              style={{ minHeight: "80vh" }}
            >
              <Component {...pageProps} />
            </main>
          </div>
          <Footer />
        </div>
        <ConsentBanner
          settings={{
            hidden: false,
            label: "More",
            modal: { title: "Modal title" },
          }}
          decline={{ hidden: true, label: "No" }}
          approve={{ label: "Yes" }}
        >
          <>
            Can we use cookies and external services according to our{" "}
            <Link href="/gdpr">privacy policy</Link> to improve the browsing
            experience?
          </>
        </ConsentBanner>
      </ConsentProvider>
      ;
    </Providers>
  );
}

export default App;
