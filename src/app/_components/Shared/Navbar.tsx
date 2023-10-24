import React from "react";
import Web3Button from "./Web3Button";

const Navbar = () => {
  return (
    <div className="navbar backdrop-blur-sm bg-base-100 border-2 border-neutral rounded-full    box-border">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Sender</a>
      </div>
      <div className="flex-none">
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
