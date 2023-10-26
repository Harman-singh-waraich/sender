import { useGas } from "@/app/_hooks/useGas";
import { Gas } from "@/app/_types/types";
import { formatTime } from "@/app/_utils/helpers";
import React from "react";
import { parseGwei } from "viem";

type Props = {
  selectedPrice: Gas;
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
      {/* slow option */}
      <div
        className={`btn h-full min-h-full text-sm md:text-base  btn-outline btn-error  ${
          selectedPrice?.speed === "slow" && "btn-active"
        }  `}
        onClick={() =>
          onSelect({ speed: "slow", value: parseGwei(gasEstimates[0]?.gas) })
        }
      >
        <p>Slow - 🥲 {gasEstimates[0]?.gas} Gwei</p>
        <p>~{formatTime(gasEstimates[0]?.estimatedTime)}</p>
      </div>
      {/* avg option */}
      <div
        className={` btn btn-outline btn-info h-full min-h-full text-sm md:text-base ${
          selectedPrice?.speed === "avg" && "btn-active"
        }`}
        onClick={() =>
          onSelect({ speed: "avg", value: parseGwei(gasEstimates[1]?.gas) })
        }
      >
        <p>Avg. - 😁 {gasEstimates[1]?.gas} Gwei</p>
        <p>~{formatTime(gasEstimates[1]?.estimatedTime)}</p>
      </div>
      {/* fast option */}
      <div
        className={`btn btn-outline h-full min-h-full text-sm md:text-base  btn-success ${
          selectedPrice?.speed === "fast" && "btn-active"
        }`}
        onClick={() =>
          onSelect({ speed: "fast", value: parseGwei(gasEstimates[2]?.gas) })
        }
      >
        <p>Fast - 🤩 {gasEstimates[2]?.gas} Gwei</p>
        <p>~{formatTime(gasEstimates[2]?.estimatedTime)}</p>
      </div>
    </div>
  );
};

export default GasSelector;
