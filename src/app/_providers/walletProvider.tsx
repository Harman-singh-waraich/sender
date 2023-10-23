"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [goerli, mainnet, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Sender",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "black",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "large",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
