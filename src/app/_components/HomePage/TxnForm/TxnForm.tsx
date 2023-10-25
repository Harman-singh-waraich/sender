"use client";
import React, { useCallback, useEffect, useState } from "react";
import GasSelector from "./GasSelector";
import { Calldata, useContract } from "@/app/_hooks/useContract";

type Props = {};

const TxnForm = (props: Props) => {
  const { transfer, isSubmitting } = useContract();

  const [formData, setFormData] = useState({
    assets: "",
    amount: "",
    recipient: "",
  });

  // Function to handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      const callData = {
        tokenAddress: formData.assets,
        recipient: formData.recipient,
        amount: BigInt(formData.amount),
      };
      transfer(callData as Calldata);
    },
    [formData]
  );

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          name="assets"
          value={formData.assets}
          onChange={handleChange}
          className="input input-bordered input-accent-content w-full  max-w-2xl "
          placeholder="Enter asset address"
        />
      </div>
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amount
        </label>
        <div className="join w-full max-w-2xl">
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className=" join-item input input-bordered input-accent-content w-full max-w-2xl"
            placeholder="Enter amount"
          />
          <button className="join-item btn btn-primary">Max</button>
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
      <GasSelector />
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-accent btn-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TxnForm;
