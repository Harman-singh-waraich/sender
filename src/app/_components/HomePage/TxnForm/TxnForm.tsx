"use client";
import React, { useMemo, useState } from "react";
import GasSelector from "./GasSelector";
import { Calldata, useContract } from "@/app/_hooks/useContract";
import { isValidEthereumAddress } from "@/app/_utils/helpers";
import { Gas } from "@/app/_types/types";

const TxnForm = () => {
  const { transfer, isSubmitting } = useContract();

  const [formData, setFormData] = useState({
    tokenAddress: "",
    amount: "",
    recipient: "",
    selectedPrice: { speed: "custom" } as Gas,
  });

  const isSubmittionDisabled = useMemo(
    () =>
      isSubmitting ||
      formData.amount === "" ||
      !isValidEthereumAddress(formData.recipient) ||
      !isValidEthereumAddress(formData.tokenAddress),
    [isSubmitting, formData]
  );

  //handlers
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (isSubmittionDisabled) return;

    const callData: Calldata = {
      tokenAddress: formData.tokenAddress as `0x${string}`,
      recipient: formData.recipient as `0x${string}`,
      amount: BigInt(formData.amount),
      gasPrice: formData.selectedPrice.value,
    };
    transfer(callData);
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const selectGasPrice = (gasPrice: Gas) => {
    setFormData({ ...formData, selectedPrice: gasPrice });
  };

  return (
    <form
      className="mt-6 px-6 md:px-16 lg:px-32 w-full flex flex-col items-center justify-center gap-6"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Asset
        </label>
        <input
          type="text"
          name="tokenAddress"
          value={formData.tokenAddress}
          onChange={handleChange}
          className="input input-bordered input-accent-content w-full  max-w-2xl "
          placeholder="Enter token address"
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amount
        </label>
        <div className="join w-full max-w-2xl">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className=" join-item input input-bordered input-accent-content w-full max-w-2xl"
            placeholder="Enter amount"
          />
          <button
            className="join-item btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Max
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2 ">
          Recipient
        </label>
        <input
          type="text"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          className="input input-bordered input-accent-content w-full max-w-2xl "
          placeholder="Enter recipient"
        />
      </div>
      {/* gas selector */}
      <GasSelector
        selectedPrice={formData.selectedPrice}
        onSelect={selectGasPrice}
        isDisabled={isSubmitting}
      />
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={isSubmittionDisabled}
          className="btn btn-accent btn-outline"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-1">
              Confirming
              <span className="loading loading-bars loading-sm"></span>
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default TxnForm;
