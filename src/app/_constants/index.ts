import { goerli, mainnet, sepolia } from "viem/chains";

export const ALCHEMY_BASE: { [key: number]: string } = {
  [sepolia.id]: "https://eth-goerli.g.alchemy.com/v2/",
  [goerli.id]: "https://eth-goerli.g.alchemy.com/v2/",
  [mainnet.id]: "https://eth-mainnet.g.alchemy.com/v2/",
};
export const EXPLORER_BASE: { [key: number]: string } = {
  [sepolia.id]: "https://sepolia.etherscan.io",
  [goerli.id]: "https://goerli.etherscan.io",
  [mainnet.id]: "hhttps://etherscan.io",
};
