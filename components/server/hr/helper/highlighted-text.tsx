import React, { FC } from "react";

interface HighlightedTextProps {
  text: string;
}

const HighlightedText: FC<HighlightedTextProps> = ({ text }) => {
  return <span className="p-1 w-fit bg-[#879FFF] text-white">{text}</span>;
};

export default HighlightedText;
