import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  color?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  color,
  children,
}) => (
  <button
    className={`px-2 py-1 rounded ${
      color
        ? `text-${color}-500 border border-${color}-500 hover:bg-${color}-500 hover:text-white`
        : ""
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
