import React from "react";
import TxnForm from "./TxnForm/TxnForm";
import TxnStatuses from "./TxnStatus";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="flex flex-col w-full items-center justify-around gap-1 md:gap-8 lg:gap-10">
      <div className="text-xl md:text-2xl">Send Tokens Seamlessly</div>
      {/* form */}
      <TxnForm />
      <div className="divider">History</div>
      {/* pending txns */}
      <TxnStatuses />
    </div>
  );
};

export default HomePage;
