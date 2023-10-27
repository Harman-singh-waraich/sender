import { useEffect, useState } from "react";
import useSWR from "swr";
import { parseGwei } from "viem";
import { useNetwork } from "wagmi";

export enum GasTypes {
  slow,
  avg,
  fast,
}
export type Gas = { speed: GasTypes; value?: bigint };

type GasEstimate = {
  type: GasTypes;
  gas: string;
  estimatedTime: string;
};

//TODO :- make serverless functions to fetch gas estimates for goerli
export const useGas = () => {
  const { chain } = useNetwork();

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          throw Error("unable to fetch");
        }
        return data.gasEstimates;
      });

  const {
    data: gasEstimates,
    error,
    isLoading,
    isValidating,
  } = useSWR(`/api/gas-tracker?id=${chain?.name}`, fetcher, {
    refreshInterval: 10000,
  });

  return {
    gasEstimates: gasEstimates as GasEstimate[],
    isLoading: isLoading || isValidating,
    isError: error,
  };
};
