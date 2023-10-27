"use client";
import React from "react";
import StatusContainer from "./StatusContainer";
import { useTransactionContext } from "@/app/_providers/transactionProvider";

//show list of txns, with pending and successfull
const TxnStatuses = () => {
  const { transactions } = useTransactionContext();

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {transactions.map((txn, index) => (
        <StatusContainer txn={txn} key={index} />
      ))}
    </div>
  );
};

export default TxnStatuses;
