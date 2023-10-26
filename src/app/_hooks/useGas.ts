import { useEffect, useState } from "react";
import useSWR from "swr";
import { parseGwei } from "viem";

//TODO :- make serverless functions to fetch gas estimates for goerli
export const useGas = () => {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => [
        data.result.SafeGasPrice,
        data.result.ProposeGasPrice,
        data.result.FastGasPrice,
      ]);

  const { data, error, isLoading, isValidating } = useSWR(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=MXEI49CNKBAJZKYCCKUW2YSVR4X7B1VV8R`,
    fetcher,
    { refreshInterval: 10000 }
  );

  const [resolvedGasEstimates, setResolvedGasEstimates] = useState<any[]>([]);
  const [isFetchingTime, setIsFetchingTime] = useState(false);

  //fetch respective estimated times for each gas value
  useEffect(() => {
    const fetchGasEstimates = async () => {
      setIsFetchingTime(true);
      const gasEstimates = await Promise.all(
        data?.map(async (gas) => {
          const res = await fetch(
            `https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=${parseGwei(
              gas
            )}&apikey=MXEI49CNKBAJZKYCCKUW2YSVR4X7B1VV8R`
          );
          const json = await res.json();
          return { gas: gas, estimatedTime: json.result };
        }) || []
      );
      setIsFetchingTime(false);
      setResolvedGasEstimates([...gasEstimates]);
    };

    fetchGasEstimates();
  }, [data]);

  return {
    gasEstimates: resolvedGasEstimates,
    isLoading: isLoading || isValidating || isFetchingTime,
    isError: error,
  };
};
