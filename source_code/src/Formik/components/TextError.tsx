import React, { ReactNode } from "react";

interface TextErrorProps {
  children: ReactNode;
}

const TextError: React.FC<TextErrorProps> = ({ children }) => {
  return <div className="text-red-500 text-sm mt-1">{children}</div>;
};

export default TextError;
