import React from "react";
import { Field } from "formik";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
  min?: string;
  step?: string;
  error?: boolean;
  helperText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  required = false,
  value,
  onChange,
  min,
  step,
  error,
  helperText,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1">
      {label}
      {required && "*"}
    </label>
    <Field
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      step={step}
      className={`w-full p-2 border rounded ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {helperText && (
      <span className="text-sm text-red-500 mt-1">{helperText}</span>
    )}
  </div>
);

export default FormField;
