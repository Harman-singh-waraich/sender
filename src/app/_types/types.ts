export enum TxnStatus {
  pending,
  success,
  failed,
}
export type Txn = {
  hash: string | undefined;
  status: TxnStatus;
  to: `0x${string}`;
  amount: bigint;
  gasPrice: bigint;
};
