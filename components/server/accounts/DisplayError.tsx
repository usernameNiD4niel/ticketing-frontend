import React from "react";

type DisplayErrorProps = {
  errorMessage: string;
};

const DisplayError: React.FC<DisplayErrorProps> = ({ errorMessage }) => {
  return <p className="text-red-500 text-sm">{errorMessage}</p>;
};

export default DisplayError;
