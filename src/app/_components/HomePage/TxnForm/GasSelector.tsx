import { Gas, useGas } from "@/app/_hooks/useGas";
import { formatTime, gasBtnStyle, gasText } from "@/app/_utils/helpers";
import React from "react";
import { parseGwei } from "viem";

type Props = {
  selectedPrice: Gas | undefined;
  onSelect: (gasPrice: Gas) => void;
  isDisabled: boolean;
};

const GasSelector = ({ selectedPrice, onSelect, isDisabled }: Props) => {
  const { gasEstimates, isLoading } = useGas();

  return (
    <div
      className={`w-full min-h-fit grid grid-cols-3 gap-4 transition-opacity duration-1000 ${
        isLoading ? "opacity-50" : "opacity-100"
      } ${isDisabled || isLoading ? "btn-disabled opacity-50" : ""}`}
    >
      {gasEstimates ? (
        gasEstimates.map((estimate, index) => (
          <div
            className={`btn h-full min-h-full text-sm md:text-base  btn-outline ${gasBtnStyle(
              estimate.type
            )}  ${selectedPrice?.speed === estimate.type && "btn-active"}  `}
            onClick={() =>
              onSelect({ speed: estimate.type, value: parseGwei(estimate.gas) })
            }
            key={index}
          >
            <p>{gasText(estimate.type)}</p>
            <p>{estimate.gas} Gwei</p>
            <p>~{formatTime(estimate.estimatedTime)}</p>
          </div>
        ))
      ) : (
        <span className=" col-span-3 flex items-center justify-center gap-1">
          Fetching Gas Prices{" "}
          <span className="loading loading-bars loading-sm"></span>{" "}
        </span>
      )}
    </div>
  );
};

export default GasSelector;
