"use client";

import { useEffect, useState } from "react";

import Button from "../common/Button";

// props
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
  disabled?: boolean;
	actionLabel: string;
	title: string;
	subtitle: string;
	body: React.ReactNode;
	footer?: React.ReactNode;
}

// Modal
// modal component for displaying form content
const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	actionLabel,
  disabled,
	title,
	subtitle,
	body,
	footer,
}) => {
  // modal state for animation
  const [showModal, setShowModal] = useState(isOpen);

  // animade slide in on modal open
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // don't render if modal is closed
	if (!isOpen) {
		return null;
	}

	return (
    // modal backdrop, closes modal on click
		<div
      role="dialog"
      onClick={onClose}
      className="fixed z-50 w-screen h-screen bg-gray-500/50">

      {/* modal */}
			<div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className={`flex flex-col pb-4 mx-auto sm:mt-24
        h-screen w-screen sm:max-w-[400px] sm:h-min 
        bg-white dark:bg-[#242526] 
        sm:rounded shadow-xl duration-300
        ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} // animate slide in
      >
        <div
          className="flex justify-between px-4 py-3
          border-b border-neutral-300 dark:border-[#393b3d]"
        >
        
          {/* heading */}
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-black dark:text-[#e4e6eb]">{title}</h1>
            <h2 className="text-neutral-500 dark:text-neutral-400">{subtitle}</h2>
          </div>
        
          {/* close modal button */}
          <button
            onClick={onClose}
            className="mb-auto text-4xl text-neutral-500 dark:text-neutral-400"
          >
            ×
          </button>
        </div>
        
        {/* modal body */}
        <div className="p-4">{body}</div>
        
        {/* modal footer */}
        <div>{footer}</div>
        
        {/* submit button */}
        <Button
          label={actionLabel}
          disabled={disabled}
          onClick={onSubmit}
          secondary
        />
			</div>
		</div>
	);
};

export default Modal;
