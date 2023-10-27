import { useTokens } from "@/app/_hooks/useTokens";
import { isValidEthereumAddress } from "@/app/_utils/helpers";
import React, { useState } from "react";
import { Address } from "viem";
import Tooltip from "../../Shared/Tooltip";

type Props = {
  selectedToken: Address;
  setSelectedToken: (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  isDisabled?: boolean;
};

const TokenSelector = ({
  selectedToken,
  setSelectedToken,
  isDisabled,
}: Props) => {
  const { assets, isLoadingAssets } = useTokens();
  const [customToken, setCustomToken] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCustomToken(value);

    // Also update the selected token
    setSelectedToken(event);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <label className="flex flex-row items-center gap-1 text-gray-400 text-sm font-bold mb-2">
        Select token or enter custom token{" "}
        <Tooltip tip="We automatically detect your holdings. If you don't see a token, you can enter it manually." />
      </label>
      <div className="join w-full max-w-2xl">
        <input
          type="text"
          name="tokenAddress"
          value={selectedToken}
          onChange={handleInputChange}
          className={`join-item input input-bordered input-accent-content w-full  max-w-2xl ${
            selectedToken && !isValidEthereumAddress(selectedToken)
              ? "input-error"
              : ""
          }`}
          placeholder="Enter token address"
        />
        <select
          name="tokenAddress"
          className="join-item select select-bordered select-primary"
          onChange={setSelectedToken}
          value={selectedToken || customToken || "default"}
          disabled={isDisabled || isLoadingAssets}
        >
          <option disabled value={"default"}>
            Select Token
          </option>
          {assets.map((token, index) => (
            <option value={token.address} key={index}>
              {token.symbol}
            </option>
          ))}
          {customToken && (
            <option value={customToken} key={customToken}>
              Custom Token
            </option>
          )}
        </select>
      </div>
    </div>
  );
};

export default TokenSelector;
