import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-1 p-2 relative  border-t border-gray-400">
      {/* logo */}
      <div className="flex flex-row items-center gap-1 text-xl md:text-2xl">
        <Image src={"icon.svg"} alt="logo" width={40} height={40} /> Sender
      </div>
      <div>
        <Link
          href="https://github.com/Harman-singh-waraich/sender"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </Link>
      </div>

      {/* mad by */}
      <div className="w-full absolute bottom-0 items-center text-center">
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
    </div>
  );
};

export default Footer;
