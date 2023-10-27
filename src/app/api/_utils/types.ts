export interface Receipt {
  blockHash: string;
  blockNumber: string;
  transactionIndex: string;
  transactionHash: string;
  from: string;
  to: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  contractAddress: string;
  logs: {
    blockHash: string;
    blockNumber: string;
    transactionIndex: string;
    address: string;
    logIndex: string;
    data: string;
    removed: boolean;
    topics: string[];
    transactionHash: string;
  }[];
  logsBloom: string;
  root: string;
  status: number;
  effectiveGasPrice: string;
  type: string;
}

export interface ResponseData {
  jsonrpc: string;
  id: number;
  result: {
    receipts: Receipt[];
  };
}
