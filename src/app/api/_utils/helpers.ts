import { formatGwei, parseGwei, toHex } from "viem";
import { ResponseData } from "./types";
//NOTE : these are not prod ready, only makeshift

enum GasTypes {
  slow,
  avg,
  fast,
}

const supportedChains: { [key: string]: string } = {
  "5": "goerli",
  "11155111": "sepolia",
};

//gas in gwei
const getEstimatedTime = async (gas: string) => {
  const res = await fetch(
    `https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=${parseGwei(
      gas
    )}&apikey=${process.env.ETHERSCAN_KEY}`
  );
  const json = await res.json();
  return json.result;
};

const getBlockNumber = async (id: string | null) => {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ id: 1, jsonrpc: "2.0", method: "eth_blockNumber" }),
  };
  const res = await fetch(
    `https://eth-${id ? supportedChains[id] : "goerli"}.g.alchemy.com/v2/${
      process.env.ALCHEMY_KEY
    }`,
    options
  );

  const blockNumber = (await res.json()).result;

  return blockNumber;
};

//calculated from etherscan api,mostly accurate
export const getMainnetEstimates = async () => {
  try {
    const data = await fetch(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_KEY}`
    );

    const res = await data.json();

    const gasEstimates = [
      {
        type: GasTypes.slow,
        gas: res.result.SafeGasPrice,
        estimatedTime: await getEstimatedTime(res.result.SafeGasPrice),
      },
      {
        type: GasTypes.avg,
        gas: res.result.ProposeGasPrice,
        estimatedTime: await getEstimatedTime(res.result.ProposeGasPrice),
      },
      {
        type: GasTypes.fast,
        gas: res.result.FastGasPrice,
        estimatedTime: await getEstimatedTime(res.result.FastGasPrice),
      },
    ];
    return { gasEstimates, status: 200 };
  } catch (err) {
    console.log(err);
    return {
      gasEstimates: [
        { type: GasTypes.slow, gas: "0", estimatedTime: "12" },
        { type: GasTypes.avg, gas: "0", estimatedTime: "30" },
        { type: GasTypes.fast, gas: "0", estimatedTime: "60" },
      ],
      status: 500,
    };
  }
};

//makeshift api, estimating based on transactions in last block
export const getTestnetEstimates = async (chainId: string | null) => {
  try {
    const url = `https://eth-${
      chainId ? supportedChains[chainId] : "goerli"
    }.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;

    const requestData = {
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTransactionReceipts",
      params: [
        {
          blockNumber: await getBlockNumber(chainId),
        },
      ],
    };

    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const res: ResponseData = await data.json();

    const effectiveGasPrices: bigint[] = res.result.receipts.map((receipt) =>
      BigInt(receipt.effectiveGasPrice)
    );

    // Calculate low, avg, and high in wei
    const low: string =
      effectiveGasPrices
        .reduce(
          (min, value) => (value < min ? value : min),
          effectiveGasPrices[0]
        )
        ?.toString() ?? "0";

    const avg: string =
      (
        effectiveGasPrices.reduce((sum, value) => sum + value, BigInt(0)) /
        BigInt(effectiveGasPrices.length)
      )?.toString() ?? "0";

    const high: string =
      effectiveGasPrices
        .reduce(
          (max, value) => (value > max ? value : max),
          effectiveGasPrices[0]
        )
        ?.toString() ?? "0";

    //hardcoding time here based on avg goerli blovk time, doing accurate predictions takes alot of time and models
    const gasEstimates = [
      {
        type: GasTypes.slow,
        gas: formatGwei(BigInt(low)),
        estimatedTime: "60",
      },
      { type: GasTypes.avg, gas: formatGwei(BigInt(avg)), estimatedTime: "30" },
      {
        type: GasTypes.fast,
        gas: formatGwei(BigInt(high)),
        estimatedTime: "12",
      },
    ];

    return { gasEstimates, status: 200 };
  } catch (err) {
    console.log(err);

    return {
      gasEstimates: [
        { type: GasTypes.slow, gas: "0", estimatedTime: "12" },
        { type: GasTypes.avg, gas: "0", estimatedTime: "30" },
        { type: GasTypes.fast, gas: "0", estimatedTime: "60" },
      ],
      status: 500,
    };
  }
};
