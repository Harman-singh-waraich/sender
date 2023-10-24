import { Txn, TxnStatus } from "@/app/_types/types";
import React from "react";
import StatusContainer from "./StatusContainer";

type Props = {};
//show list of txns, with pending and successfull
const TxnStatuses = (props: Props) => {
  //TODO: fetch txns appropiately
  const txns: Txn[] = [
    {
      hash: "oxxxxx",
      to: "0xxx",
      amount: BigInt(1),
      gasPrice: BigInt(1),
      status: TxnStatus.pending,
    },
    {
      hash: "oxxxxx",
      to: "0xxx",
      amount: BigInt(1),
      gasPrice: BigInt(1),
      status: TxnStatus.success,
    },
    {
      hash: "oxxxxx",
      to: "0xxx",
      amount: BigInt(1),
      gasPrice: BigInt(1),
      status: TxnStatus.failed,
    },
  ];
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {txns.map((txn, index) => (
        <StatusContainer txn={txn} key={index} />
      ))}
    </div>
  );
};

export default TxnStatuses;
