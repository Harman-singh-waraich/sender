import "../globals.css";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import Navbar from "../_components/Shared/Navbar";
import { WagmiProvider } from "../_providers/walletProvider";
import { TransactionProvider } from "../_providers/transactionProvider";
import siteMetadata from "../_utils/siteMetaData";
import Head from "next/head";

import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../_components/Shared/Footer"));

const dosis = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl!),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.headerTitle,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: "index, follow",
  keywords: "rock paper scissor lizard spock game web3",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="images/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg+xml"
          sizes="480x480"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
      </Head>
      <body
        className={`h-auto px-2 md:px-16 lg:px-24 py-2 bg-neutral relative box-border  ${dosis.className}`}
      >
        <WagmiProvider>
          <TransactionProvider>
            <Navbar />
            {children}
            <Footer />
          </TransactionProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
