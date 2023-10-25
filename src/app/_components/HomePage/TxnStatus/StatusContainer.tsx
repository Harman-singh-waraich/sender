import { Transaction, TransactionStatus } from "@/app/_types/types";
import React from "react";

type Props = {
  txn: Transaction;
};

const StatusContainer = ({ txn }: Props) => {
  const { hash, to, amount, gasPrice, status } = txn;

  const accentColor =
    status === TransactionStatus.pending
      ? "info"
      : status === TransactionStatus.success
      ? "success"
      : "error";

  return (
    <div
      className={`flex flex-col p-2 gap-1 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg border border-${accentColor}`}
    >
      <p>To :- {hash}</p>
      <div className="flex flex-row justify-between">
        <p>Amount :- {amount.toString()}</p>
        <div>
          {TransactionStatus[status]}
          {status === TransactionStatus.pending && (
            <span
              className={`loading loading-spinner loading-md text-info`}
            ></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusContainer;
