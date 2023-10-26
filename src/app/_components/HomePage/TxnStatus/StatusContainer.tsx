import { useTransactionContext } from "@/app/_providers/transactionProvider";
import { Transaction, TransactionStatus } from "@/app/_types/types";
import React from "react";
import { useWaitForTransaction } from "wagmi";

type Props = {
  txn: Transaction;
};

const StatusContainer = ({ txn }: Props) => {
  const { hash, to, amount, gasPrice, status } = txn;
  const { updateTxnValue, addTxn } = useTransactionContext();

  //runs for pending txns
  useWaitForTransaction({
    hash: status === TransactionStatus.pending ? hash! : undefined, //only run for pending txn, this hooks doesnt run when hash is undefined
    scopeKey: hash,
    onSuccess(data) {
      console.log("success", data.transactionHash);

      updateTxnValue(data.transactionHash, {
        status: TransactionStatus.success,
      });
    },
    onError(err) {
      console.log(err);
      updateTxnValue(hash, { status: TransactionStatus.failed });
    },
    onReplaced(response) {
      console.log("replaced", response);
      const newStatus = TransactionStatus[response.reason];

      updateTxnValue(hash, { status: newStatus });
      const newTxn = response.transaction;

      addTxn({
        hash: newTxn.hash,
        to: newTxn.to!,
        amount: amount,
        gasPrice: gasPrice,
        status: TransactionStatus.pending,
      });
    },
  });

  const accentColor =
    status === TransactionStatus.pending
      ? "border-info"
      : status === TransactionStatus.success
      ? "border-success"
      : "border-error";

  return (
    <div
      className={`flex flex-col p-2 gap-1 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg border ${accentColor}`}
    >
      <p>To :- {to}</p>
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
