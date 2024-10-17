import React from 'react';
import { X } from 'lucide-react'



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed z-20 inset-0 backdrop-blur-sm bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center"
            >
                <div
                    className="bg-white md:mx-0 mx-5 rounded-lg max-w-max shadow-lg "
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='flex m-4 align-center justify-between mb-5'>
                        <h2 className="text-lg text-bold mb-4">{title}</h2>
                        <X className='bg-gray-400 text-white rounded-2xl p-1 cursor-pointer'
                            onClick={onClose}
                        />
                    </div>
                    <div className="">{children}</div>

                </div>
                {
                    footer ?
                        <div className='bg-[#F5F6F7] rounded-br-lg rounded-bl-lg p-6 border border-gray-200 w-[480px]'>
                            {footer}
                        </div> : null
                }

            </div>
        </>
    );
};

export default Modal;
