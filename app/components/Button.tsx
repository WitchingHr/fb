"use client"

import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

// props
interface ButtonProps {
  label: string;
  submit?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
}

// Button
const Button: React.FC<ButtonProps> = ({
  label,
  submit = false,
  onClick,
  disabled,
  secondary = false
}) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
      className={
        `text-white font-bold py-2 px-4 rounded text-lg transition
        ${secondary ? 'bg-[#35a420] hover:bg-[#30911d]' : 'bg-[#1877f2] hover:bg-[#166ad9]'}`}
    >
      {label}
    </button>
  );
};

export default Button;
