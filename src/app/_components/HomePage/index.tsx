import React from "react";
import TxnForm from "./TxnForm/TxnForm";
import TxnStatuses from "./TxnStatus";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="flex flex-col w-full items-center justify-around gap-10">
      {/* form */}
      <TxnForm />
      <div className="divider"></div>
      {/* pending txns */}
      <TxnStatuses />
    </div>
  );
};

export default HomePage;
