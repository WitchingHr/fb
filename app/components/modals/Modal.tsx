"use client";

import Button from "../Button";

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

  // don't render if modal is closed
	if (!isOpen) {
		return null;
	}

	return (
    // modal backdrop, closes modal on click
		<div onClick={onClose} className="fixed z-50 w-screen h-screen bg-gray-500/50">

      {/* modal */}
			<div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className="flex flex-col pb-4 bg-white h-screen w-screen sm:max-w-[400px]
        sm:h-min sm:rounded sm:mt-24 shadow-xl mx-auto"
      >
				<div className="flex justify-between px-4 py-3 border-b border-neutral-300">

          {/* heading */}
					<div className="flex flex-col gap-1">
						<h1 className="text-3xl font-bold">{title}</h1>
						<h2 className="text-neutral-500">{subtitle}</h2>
					</div>

          {/* close modal button */}
					<button
						onClick={onClose}
						className="mb-auto text-4xl text-neutral-500"
					>
						×
					</button>
				</div>

        {/* modal body */}
				<div className="p-4">{body}</div>

        {/* modal footer */}
				<div>{footer}</div>

        {/* submit button */}
				<Button label={actionLabel} disabled={disabled} onClick={onSubmit} secondary />
			</div>
		</div>
	);
};

export default Modal;
