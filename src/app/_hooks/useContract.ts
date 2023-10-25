"use client";
import { useState } from "react";
import { erc20ABI, usePublicClient } from "wagmi";
import { TransactionStatus } from "../_types/types";
import { writeContract } from "wagmi/actions";
import { useTransactionContext } from "../_providers/transactionProvider";

export interface Calldata {
  tokenAddress: `0x${string}`;
  recipient: `0x${string}`;
  amount: bigint;
  gasPrice?: bigint;
}

export const useContract = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { addTxn } = useTransactionContext();
  const publicClient = usePublicClient();
  //send token function
  //register hash => save state to local storage
  //TODO : add goerli gas price
  const transfer = (callData: Calldata) => {
    setSubmitting(true);

    writeContract({
      address: callData.tokenAddress,
      abi: erc20ABI,
      functionName: "transfer",
      args: [callData.recipient, callData.amount],
    })
      .then((data) => {
        setSubmitting(false);
        addTxn({
          hash: data.hash,
          to: callData.recipient,
          amount: callData.amount.toString(),
          gasPrice: callData.gasPrice?.toString() ?? "1",
          status: TransactionStatus.pending,
        });
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);
      });
  };

  return { transfer, isSubmitting };
};
