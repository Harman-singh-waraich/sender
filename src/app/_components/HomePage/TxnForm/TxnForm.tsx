"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { Calldata, useContract } from "@/app/_hooks/useContract";
import { balanceCheck, isValidEthereumAddress } from "@/app/_utils/helpers";
import { Address, formatUnits, parseUnits } from "viem";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { Gas } from "@/app/_hooks/useGas";
import Tooltip from "../../Shared/Tooltip";
import { useIsMounted } from "@/app/_hooks/useIsMounted";

const Web3Button = dynamic(() => import("../../Shared/Web3Button"));
const GasSelector = dynamic(() => import("./GasSelector"));
const TokenSelector = dynamic(() => import("./TokenSelector"));
interface FormData {
  tokenAddress: Address | string;
  amount: string;
  recipient: Address | string;
  selectedPrice: Gas | undefined;
}
const initialFormData = {
  tokenAddress: "",
  amount: "",
  recipient: "",
  selectedPrice: undefined,
};

const TxnForm = () => {
  const { transfer, isSubmitting } = useContract();
  const { address: account, isConnected } = useAccount();
  const { chain } = useNetwork();
  const isMounted = useIsMounted();

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const {
    data: tokenBalance,
    isLoading,
    isRefetching,
  } = useBalance({
    address: account,
    token:
      formData.tokenAddress !== ""
        ? (formData.tokenAddress as Address)
        : undefined,
    watch: true,
  });

  const isSubmittionDisabled = useMemo(
    () =>
      isSubmitting ||
      !formData.amount ||
      !formData.recipient ||
      !formData.tokenAddress ||
      !isValidEthereumAddress(formData.recipient) ||
      !isValidEthereumAddress(formData.tokenAddress) ||
      !balanceCheck(
        formData.amount,
        tokenBalance?.value!,
        tokenBalance?.decimals!
      ),
    [isSubmitting, formData]
  );

  useEffect(() => setFormData(initialFormData), [chain]);

  //handlers
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmittionDisabled || !tokenBalance?.decimals) return;

    const callData: Calldata = {
      tokenAddress: formData.tokenAddress as `0x${string}`,
      recipient: formData.recipient as `0x${string}`,
      amount: parseUnits(formData.amount, tokenBalance?.decimals),
      gasPrice: formData.selectedPrice?.value,
      symbol: tokenBalance.symbol,
      decimals: tokenBalance.decimals,
    };

    transfer(callData);

    setFormData(initialFormData);
  };

  // Function to handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMax = () => {
    if (isLoading || !tokenBalance?.value || !tokenBalance?.decimals) return;

    setFormData({
      ...formData,
      amount: formatUnits(tokenBalance.value, tokenBalance.decimals),
    });
  };

  const selectGasPrice = (gasPrice: Gas) => {
    setFormData({ ...formData, selectedPrice: gasPrice });
  };

  if (!isMounted) return <span className="loading loading-bars"></span>;

  return (
    <div
      className="mt-6 px-6 md:px-16 lg:px-32 w-full flex flex-col items-center justify-center gap-6"
      onSubmit={handleSubmit}
    >
      {/* token selection */}
      <TokenSelector
        selectedToken={formData.tokenAddress as Address}
        setSelectedToken={handleChange}
        isDisabled={isSubmitting || !isConnected}
      />

      {/* amount */}
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-400 text-sm font-bold mb-2">
          Amount
        </label>
        <div className="join w-full max-w-2xl">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={`join-item input input-bordered input-accent-content w-full max-w-2xl ${
              !balanceCheck(
                formData.amount,
                tokenBalance?.value,
                tokenBalance?.decimals
              )
                ? "input-error"
                : ""
            }`}
            placeholder="Enter amount"
          />
          <button
            className="join-item btn btn-primary disabled:border-purple-100 disabled:border-opacity-30"
            onClick={handleMax}
            disabled={
              isSubmitting || formData.tokenAddress == "" || !tokenBalance
            }
          >
            Max
          </button>
        </div>
        {formData.tokenAddress && tokenBalance && (
          <label
            className={`block text-sm font-bold mt-2 transition-opacity duration-1000 ${
              isRefetching ? "opacity-50" : "opacity-100"
            }`}
          >
            Balance :- {tokenBalance?.formatted} {tokenBalance?.symbol}
          </label>
        )}
      </div>

      {/* recipient */}
      <div className="w-full flex flex-col items-center">
        <label className="flex flex-row items-center gap-1 text-gray-400 text-sm font-bold mb-2 ">
          Recipient <Tooltip tip="Address to send tokens to" />
        </label>
        <input
          type="text"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          className={`input input-bordered input-accent-content w-full max-w-2xl ${
            formData.recipient && !isValidEthereumAddress(formData.recipient)
              ? "input-error"
              : ""
          }`}
          placeholder="Enter recipient"
        />
      </div>

      {/* gas selector */}
      <span className="flex flex-row items-center gap-1 text-gray-400 text-sm font-bold mb-2 ">
        Select a gas price if you want{" "}
        <Tooltip tip="Testnet prices may not be accurate" />
      </span>
      <GasSelector
        selectedPrice={formData.selectedPrice}
        onSelect={selectGasPrice}
        isDisabled={isSubmitting}
      />

      {/* submit button */}
      {isConnected ? (
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmittionDisabled}
            className="btn btn-accent btn-outline"
            onClick={handleSubmit}
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
      ) : (
        <Web3Button />
      )}
    </div>
  );
};

export default TxnForm;
