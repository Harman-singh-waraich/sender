"use client";
import { useTransactionContext } from "@/app/_providers/transactionProvider";
import { Transaction, TransactionStatus } from "@/app/_types/types";
import {
  accentColor,
  getAddressExplorerLink,
  getTxnExplorerLink,
} from "@/app/_utils/helpers";
import Link from "next/link";
import React from "react";
import { formatUnits } from "viem";
import { useNetwork, useWaitForTransaction } from "wagmi";

type Props = {
  txn: Transaction;
};

const StatusContainer = ({ txn }: Props) => {
  const { hash, from, to, amount, gasPrice, status, symbol, decimals } = txn;
  const { updateTxnValue, addTxn } = useTransactionContext();
  const { chain } = useNetwork();

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
      //on replace add new txn to state and update previous one
      console.log("replaced", response);
      const newStatus = TransactionStatus[response.reason];

      updateTxnValue(hash, { status: newStatus });
      const newTxn = response.transaction;

      addTxn({
        hash: newTxn.hash,
        from: from,
        to: newTxn.to!,
        amount: amount,
        gasPrice: gasPrice,
        status: TransactionStatus.pending,
        symbol: symbol,
        decimals: decimals,
      });
    },
  });

  return (
    <div
      className={`flex flex-col p-2 gap-1 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-2xl border ${accentColor(
        status,
        "border"
      )} `}
    >
      <div className="w-full flex flex-row flex-wrap justify-between items-center">
        <p className="text-lg md:text-xl">
          {formatUnits(BigInt(amount), decimals)} {symbol}
        </p>
        <Link
          href={getTxnExplorerLink(hash as string, chain?.id!)}
          target="_blank"
          rel="noreferrer"
          className=" text-blue-300 underline"
        >
          View on explorer
        </Link>
      </div>
      {/* from */}
      <span className="text-sm md:text-base text-accent">
        From :{" "}
        <Link
          href={getAddressExplorerLink(from, chain?.id!)}
          target="_blank"
          rel="noreferrer"
          className="text-sm md:text-base text-white"
        >
          {from}
        </Link>
      </span>
      {/* to */}
      <span className="text-sm md:text-base text-accent">
        To :{" "}
        <Link
          href={getAddressExplorerLink(to, chain?.id!)}
          target="_blank"
          rel="noreferrer"
          className="text-sm md:text-base text-white"
        >
          {to}
        </Link>
      </span>

      {/* status */}
      <div className="flex flex-row justify-center items-center gap-1 self-end">
        <span className={`${accentColor(status, "text")}`}>
          {TransactionStatus[status]}
        </span>
        {status === TransactionStatus.pending && (
          <span
            className={`loading loading-spinner loading-md text-info`}
          ></span>
        )}
      </div>
    </div>
  );
};

export default StatusContainer;
