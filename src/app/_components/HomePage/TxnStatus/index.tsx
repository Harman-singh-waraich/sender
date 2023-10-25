"use client";
import React, { useEffect } from "react";
import StatusContainer from "./StatusContainer";
import { useTransactionContext } from "@/app/_providers/transactionProvider";

type Props = {};
//show list of txns, with pending and successfull
const TxnStatuses = (props: Props) => {
  //TODO: fetch txns appropiately
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
