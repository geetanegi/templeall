// src/Drawer.tsx

import { CircleArrowLeft } from "lucide-react";
import React, { useEffect } from "react";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  title?:string
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  className,
  title=''
}) => {

  useEffect(() => {
    if (isOpen) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }

    return () => {
        document.body.classList.remove('overflow-hidden');
    };
}, [isOpen]);

const handleClose = () => {
  document.body.classList.remove('overflow-hidden');
  onClose(); 
};

  return (
    <div
      className={`fixed inset-0 z-40 backdrop-blur-sm bg-gray-900 bg-opacity-30 transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="fixed inset-0"></div>
      <div
        className={`absolute right-0 h-full w-64 bg-white shadow-lg transition-transform ${className ? className : ""}`}
      >{
        title ?  <div className="flex items-center border shadow-sm"
        >
          <button className="p-4 text-xl" onClick={handleClose}>
            <CircleArrowLeft size={24} color="#95C11E" />
          </button>
          <span>{title}</span>
        </div> : null
      }
       
        
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
