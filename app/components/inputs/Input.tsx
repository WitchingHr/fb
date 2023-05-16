"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

// props
interface InputProps {
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

// Input
const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  label,
  required,
  disabled,
  register,
  errors
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        disabled={disabled}
        {...register(id, { required: required })}
        className={
          `peer px-4 py-4 border w-full rounded
          ${errors?.[id] ? 'border-red-500' : 'border-neutral-200'}}`}
      />
      <label
        className="absolute top-3 left-4 text-neutral-400
        -translate-y-3 text-md origin-[0] transition
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
