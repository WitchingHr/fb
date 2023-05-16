"use client"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  subtitle: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  body,
  footer
}) => {
  
  if (!isOpen) {
    return null;
  }

  // TODO: add modal

  return (
    <div className="fixed w-screen h-screen bg-gray-500/20">
      <div className="flex flex-col">

      </div>
    </div>
  );
};

export default Modal;
