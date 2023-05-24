"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

// props
interface InputProps {
  id: string;
  type?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

// Input
// custom input component for react-hook-form
const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  label,
  required,
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" " // placeholder for label animation
        maxLength={
          id === 'firstName' || id === 'lastName' ? 50 :
          id === 'email' ? 254 :
          id === 'password' ? 16 : undefined
        }
        minLength={id === 'password' ? 4 : undefined}
        disabled={disabled}
        {...register(id, { required })}
        className={
          `peer p-4 pt-6 w-full border dark:bg-[#3a3b3c] dark:text-neutral-400 rounded
          ${!errors[id] && 'dark:border-0'}
          ${errors[id] ? 'border-red-500 focus:border-red-500' : 'border-neutral-200'}}`}
      />

      {/* label, animates on input focus */}
      <label
        htmlFor={id}
        className={`absolute top-3 left-4 
        -translate-y-3 text-md origin-[0] 
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-4
        select-none transition
        ${errors[id] ? 'text-red-500' : 'text-neutral-400'}`}
      >
        {/* label = error message or label prop */}
        {errors[id] ? `${label} required` : label}
      </label>
    </div>
  );
};

export default Input;
