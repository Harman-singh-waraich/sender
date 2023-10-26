import { Address, parseUnits } from "viem";
import { EXPLORER_BASE } from "../_constants";
import { TransactionStatus } from "../_types/types";

export const isValidEthereumAddress = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);

//75 sec => 1 min 15 sec
export const formatTime = (secondsString: string) => {
  const seconds = parseInt(secondsString, 10);

  if (seconds < 60) {
    return `${seconds} sec`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  }
};

export const getTxnExplorerLink = (hash: string, chainId: number) => {
  return `${EXPLORER_BASE[chainId]}` + "/tx/" + hash;
};

export const getAddressExplorerLink = (address: Address, chainId: number) => {
  return `${EXPLORER_BASE[chainId]}` + "/address/" + address;
};

export const accentColor = (
  status: TransactionStatus,
  type: "text" | "border"
) =>
  status === TransactionStatus.pending
    ? `${type}-info`
    : status === TransactionStatus.success
    ? `${type}-success`
    : `${type}-error`;

export const balanceCheck = (
  inputAmount: string,
  balance: bigint | undefined,
  decimals: number | undefined
) => {
  if (!balance || !decimals) return true;
  return parseUnits(inputAmount, decimals) <= balance;
};
