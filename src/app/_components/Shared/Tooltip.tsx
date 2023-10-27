import Image from "next/image";
import React from "react";

type Props = {
  tip: string;
};

const Tooltip = ({ tip }: Props) => {
  return (
    <div className="tooltip tooltip-info w-3 h-3" data-tip={tip}>
      <Image src="assets/question.svg" alt="question" fill={true} />
    </div>
  );
};

export default Tooltip;
