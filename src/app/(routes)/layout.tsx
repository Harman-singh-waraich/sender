import "../globals.css";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import Navbar from "../_components/HomePage/Navbar";
import { WagmiProvider } from "../_providers/walletProvider";

const dosis = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sender",
  description: "Send Tokens seamlessely",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`h-auto px-6 md:px-16 lg:px-24 py-2 bg-neutral relative box-border  ${dosis.className}`}
      >
        <WagmiProvider>
          <Navbar />
          {children}
        </WagmiProvider>
      </body>
    </html>
  );
}
