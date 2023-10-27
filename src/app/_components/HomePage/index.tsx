import React from "react";
import TxnForm from "./TxnForm/TxnForm";
import TxnStatuses from "./TxnStatus";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 md:gap-8 lg:gap-10">
      <div className="text-xl md:text-2xl">Send Tokens Seamlessly</div>
      {/* form */}
      <TxnForm />

      {/* divider */}
      <div className="w-full flex items-center max-w-xs md:max-w-md ">
        <hr className="flex-grow border-t border-gray-700" />
        <span className="mx-4 text-gray-700">History</span>
        <hr className="flex-grow border-t border-gray-700" />
      </div>

      {/* pending txns */}
      <TxnStatuses />
    </div>
  );
};

export default HomePage;
