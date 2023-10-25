export enum TransactionStatus {
  pending,
  success,
  failed,
}
export type Transaction = {
  hash: string | undefined;
  status: TransactionStatus;
  to: `0x${string}`;
  amount: string;
  gasPrice: string;
};
