"use client";
import { useState } from "react";
import { erc20ABI, useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionStatus } from "../_types/types";
import { writeContract } from "wagmi/actions";
import { useTransactionContext } from "../_providers/transactionProvider";

export interface Calldata {
  tokenAddress: `0x${string}`;
  recipient: `0x${string}`;
  amount: bigint;
}

export const useContract = () => {
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [isSubmitting, setSubmitting] = useState(false);
  const { actions } = useTransactionContext();
  //send token function
  //register hash => save state to local storage
  //track txn

  const transfer = (callData: Calldata) => {
    setSubmitting(true);
    writeContract({
      address: callData.tokenAddress,
      abi: erc20ABI,
      functionName: "transfer",
      args: [callData.recipient, callData.amount],
    })
      .then((data) => {
        console.log(data.hash);
        setHash(data.hash);
        setSubmitting(false);
        actions.addTxn({
          hash: data.hash,
          to: callData.recipient,
          amount: callData.amount.toString(),
          gasPrice: "1",
          status: TransactionStatus.pending,
        });
      })
      .catch((err) => console.log);
  };

  useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      console.log("success");

      actions.updateTxnValue(data.transactionHash, {
        status: TransactionStatus.success,
      });
    },
    onError(err) {
      console.log(err);
      actions.updateTxnValue(hash, { status: TransactionStatus.failed });
    },
    onReplaced(response) {
      console.log("replaced", response);
      actions.updateTxnValue(hash, { status: TransactionStatus.failed });
    },
  });

  return { transfer, isSubmitting };
};
