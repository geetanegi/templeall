// src/Drawer.tsx

import { CircleArrowLeft } from "lucide-react";
import React from "react";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className: string;
  title?:string
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  className,
  title=''
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="fixed inset-0" onClick={onClose}></div>
      <div
        className={`absolute right-0 h-full w-64 bg-white shadow-lg transition-transform ${className ? className : ""}`}
      >
        <div className="flex items-center border shadow-sm"
        >
          <button className="p-4 text-xl" onClick={onClose}>
            <CircleArrowLeft size={24} color="#95C11E" />
          </button>
          <span>{title}</span>
        </div>
        
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
