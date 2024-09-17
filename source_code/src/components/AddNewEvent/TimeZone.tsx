/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import Modal, { ModalBody } from '../Generics/Modal';
import { TimeZone } from '../../constants/TimeZone';
interface TimeZoneModalInterface {
    open?: boolean;
    onClose?: any;
    handleStop?: () => void;
    setTimeZone?: any;
}
export default function TimeZoneModal({
    open,
    onClose,
    setTimeZone,
}: TimeZoneModalInterface): React.JSX.Element {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                open &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalBody expandModal={false}>
                <div
                    className="h-60 w-96 text-stone-800 flex flex-col justify-evenly items-center"
                    ref={modalRef}
                >
                    {TimeZone.map((data: any, key) => {
                        return (
                            <div
                                key={key}
                                className="w-full cursor-pointer transition-colors duration-300 px-4 py-2 hover:bg-primary-600 hover:text-white"
                                onClick={() => setTimeZone(data)}
                                data-testid={`select-timezone-${key}`}
                            >
                                {data.title}
                            </div>
                        );
                    })}
                </div>
            </ModalBody>
        </Modal>
    );
}
