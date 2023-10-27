import { Address } from "viem";

export enum TransactionStatus {
  pending,
  success,
  failed,
  replaced,
  repriced,
  cancelled,
}
export type Transaction = {
  hash: Address | undefined;
  status: TransactionStatus;
  from: Address;
  to: Address;
  amount: string;
  gasPrice: string;
  symbol: string;
  decimals: number;
};
