import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAccount, useNetwork } from "wagmi";
import {
  FetchBalanceResult,
  FetchTokenResult,
  fetchBalance,
  fetchToken,
} from "wagmi/actions";
import { ALCHEMY_BASE } from "../_constants";

export interface Token extends FetchTokenResult {
  balance: FetchBalanceResult["value"];
  balanceFormatted: FetchBalanceResult["formatted"];
}

export const useTokens = () => {
  const [assets, setAssets] = useState<Token[]>([]);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  const { address } = useAccount();
  const { chain } = useNetwork();

  const url = `${ALCHEMY_BASE[chain?.id!]}${
    process.env.NEXT_PUBLIC_ALCHEMY_KEY
  }`;

  // REQUEST OPTIONS
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [address],
    }),
  };

  const fetcher = (url: any, options: any) =>
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => json.result.tokenBalances)
      .catch((err) => console.error("error:" + err));

  //load initial data with 1 min interval
  const { data, isLoading, isValidating } = useSWR(
    [url, options],
    ([url, options]) => fetcher(url, options),
    { refreshInterval: 60000 }
  );

  useEffect(() => {
    const fetchAssets = async () => {
      if (!data) return;
      setIsFetchingDetails(true);

      const unfilteredTokens: FetchTokenResult[] = await Promise.all(
        data?.map(async (token: any) => {
          try {
            const detail: FetchTokenResult = await fetchToken({
              address: token.contractAddress,
            });

            return detail;
          } catch (err) {
            //some tokens are corrupt
            return null;
          }
        })
      );

      //remove tokens like "rare.io" and stuff
      const filteredTokens = unfilteredTokens.filter(
        (token) =>
          token &&
          !token.name.includes(".") &&
          !token.name.includes("@") &&
          !token.name.includes("&")
      );

      //fetch token details
      const tokens: Token[] = await Promise.all(
        filteredTokens?.map(async (token: FetchTokenResult) => {
          const balance = await fetchBalance({
            address: address!,
            token: token.address,
          });

          return {
            ...token,
            balance: balance.value,
            balanceFormatted: balance.formatted,
          };
        })
      );

      setAssets(tokens);

      setIsFetchingDetails(false);
    };

    fetchAssets();
  }, [data]);

  return {
    assets,
    isLoadingAssets: isLoading || isFetchingDetails || isValidating,
  };
};
