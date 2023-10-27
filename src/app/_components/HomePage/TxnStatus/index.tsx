"use client";
import React from "react";
import StatusContainer from "./StatusContainer";
import { useTransactionContext } from "@/app/_providers/transactionProvider";

//show list of txns, with pending and successfull
const TxnStatuses = () => {
  const { transactions } = useTransactionContext();

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {transactions.length ? (
        transactions.map((txn, index) => (
          <StatusContainer txn={txn} key={index} />
        ))
      ) : (
        <span className="text-gray-400">Send some tokens to populate this</span>
      )}
    </div>
  );
};

export default TxnStatuses;
