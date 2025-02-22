import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
  title: string | React.ReactElement<any>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 rounded-lg flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-normal">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-full bg-gray-400 text-gray-400 hover:text-gray-900"
            >
              <X color="#ffffff" strokeWidth={1} size={24} className="p-1" />
            </button>
          </div>
          <div className="">{children}</div>
        </div>
        <div className="rounded-lg" style={{height: "max-content"}}>{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
