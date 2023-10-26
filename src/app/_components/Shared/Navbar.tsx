import React from "react";
import Web3Button from "../Shared/Web3Button";

const Navbar = () => {
  return (
    <div className="navbar     box-border border-b border-gray-400">
      <div className="flex-1">
        <a className="normal-case text-xl md:text-2xl font-semibold">Sender</a>
      </div>
      <div className="flex-none">
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
