"use client";
import { useState } from "react";
import { erc20ABI, useAccount, usePublicClient } from "wagmi";
import { TransactionStatus } from "../_types/types";
import { writeContract } from "wagmi/actions";
import { useTransactionContext } from "../_providers/transactionProvider";

export interface Calldata {
  tokenAddress: `0x${string}`;
  recipient: `0x${string}`;
  amount: bigint;
  gasPrice?: bigint;
  symbol: string;
  decimals: number;
}

export const useContract = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { addTxn } = useTransactionContext();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  //send token function
  //register hash => save state to local storage
  const transfer = async (callData: Calldata) => {
    setSubmitting(true);

    //calculating estimated gas
    const gas = await publicClient.estimateContractGas({
      address: callData.tokenAddress,
      abi: erc20ABI,
      functionName: "transfer",
      args: [callData.recipient, callData.amount],
      account: address!,
    });

    //calculating default gas price if gas price from calldata is undefined
    const defaultGasPrice = await publicClient.getGasPrice();

    writeContract({
      address: callData.tokenAddress,
      abi: erc20ABI,
      functionName: "transfer",
      args: [callData.recipient, callData.amount],
      gasPrice: callData.gasPrice,
      gas: gas ?? BigInt(50000), //setting default in case estimation fails
    })
      .then((data) => {
        setSubmitting(false);
        addTxn({
          hash: data.hash,
          from: address!,
          to: callData.recipient,
          amount: callData.amount.toString(),
          gasPrice: callData.gasPrice?.toString() ?? defaultGasPrice.toString(),
          status: TransactionStatus.pending,
          symbol: callData.symbol,
          decimals: callData.decimals,
        });

        //scroll the window to show the history once user submit txns
        if (typeof window) {
          window.scrollBy({
            top: 200,
            behavior: "smooth",
          });
        }
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);
      });
  };

  return { transfer, isSubmitting };
};
