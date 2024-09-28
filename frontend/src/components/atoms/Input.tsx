import React from "react";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}

const Input: React.FC<InputProps> = ({ id, value, onChange, options }) => (
  <select
    id={id}
    className="border border-gray-300 rounded"
    value={value}
    onChange={onChange}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Input;
