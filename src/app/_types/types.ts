export enum TransactionStatus {
  pending,
  success,
  failed,
  replaced,
  repriced,
  cancelled,
}
export type Transaction = {
  hash: `0x${string}` | undefined;
  status: TransactionStatus;
  to: `0x${string}`;
  amount: string;
  gasPrice: string;
};

export type Gas = { speed: "custom" | "slow" | "avg" | "fast"; value?: bigint };
