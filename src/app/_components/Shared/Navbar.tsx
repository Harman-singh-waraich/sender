import React from "react";
import Web3Button from "../Shared/Web3Button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar     box-border border-b border-gray-700">
      <div className="flex-1 flex flex-row items-center gap-1">
        <Image src={"icon.svg"} alt="logo" width={40} height={40} />{" "}
        <a href="/" className="normal-case text-xl md:text-2xl font-semibold">
          Sender
        </a>
      </div>
      <div className="flex-none">
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
