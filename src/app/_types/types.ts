export enum TransactionStatus {
  pending,
  success,
  failed,
}
export type Transaction = {
  hash: `0x${string}` | undefined;
  status: TransactionStatus;
  to: `0x${string}`;
  amount: string;
  gasPrice: string;
};

export type Gas = { speed: "custom" | "slow" | "avg" | "fast"; value?: bigint };
