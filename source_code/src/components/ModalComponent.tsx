import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed z-[1000000000] inset-0 backdrop-blur-sm bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center"
        >
            <div
                className="bg-white md:mx-0 mx-5 rounded-lg max-w-max shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >   
                <div className="flex m-4 align-center justify-between mb-5">
                    <h2 className="text-[18px] font-normal mb-4">{title}</h2>
                    <X
                        className="bg-gray-400 text-white rounded-2xl p-1 cursor-pointer"
                        onClick={handleClose}
                    />
                </div>
                <div>{children}</div>
            </div>
            {footer && (
                <div className="bg-[#F5F6F7] rounded-br-lg rounded-bl-lg p-6 border border-gray-200 w-[480px]">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Modal;
