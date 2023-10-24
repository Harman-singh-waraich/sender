import React from "react";

type Props = {
  selectedPrice?: string;
  onSelect?: () => void;
};
//TODO : fetch gas prices from etherscan
const GasSelector = (props: Props) => {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <button className=" btn btn-outline btn-error flex flex-col items-center rounded-lg">
        <p>Slow</p>
        <p>🥲 1 Gwei</p>
        <p>~1 min</p>
      </button>
      <button className=" btn btn-outline btn-info  flex flex-col items-center rounded-lg">
        <p>Avg.</p>
        <p>😁 2 Gwei</p>
        <p>~30 sec</p>
      </button>
      <button className=" btn btn-outline btn-success  flex flex-col items-center rounded-lg">
        <p>Fast</p>
        <p>🤩 3 Gwei</p>
        <p>~15 sec</p>
      </button>
    </div>
  );
};

export default GasSelector;
