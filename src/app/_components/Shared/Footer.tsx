import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" w-full flex flex-col md:flex-row items-center justify-between gap-2 p-4 relative  border-t border-gray-700">
      {/* logo */}
      <div className="md:w-1/5 flex flex-row items-center gap-1 text-xl md:text-2xl">
        <Image src={"icon.svg"} alt="logo" width={40} height={40} /> Sender
      </div>
      {/* mad by */}
      <div className="md:w-3/5 items-center text-center">
        Made with ♡ by{" "}
        <Link
          className="underline"
          href="https://twitter.com/TurbanCoder"
          target="_blank"
          rel="noreferrer"
        >
          @turbancoder
        </Link>
      </div>
      <div className="md:w-1/5 text-end">
        <Link
          href="https://github.com/Harman-singh-waraich/sender"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </Link>
      </div>
    </div>
  );
};

export default Footer;
