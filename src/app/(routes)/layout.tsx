import "../globals.css";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import Navbar from "../_components/Shared/Navbar";
import { WagmiProvider } from "../_providers/walletProvider";
import { TransactionProvider } from "../_providers/transactionProvider";

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
        className={`h-auto px-2 md:px-16 lg:px-24 py-2 bg-neutral relative box-border  ${dosis.className}`}
      >
        <WagmiProvider>
          <TransactionProvider>
            <Navbar />
            {children}
          </TransactionProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
