/* eslint-disable max-len */
import React from 'react';
import Modal, { ConfirmationModalFooter, ModalBody } from '../Modal';
import { X } from 'lucide-react';
interface ConfirmationModalInterface {
    title?: any;
    open?: boolean;
    onClose?: () => void;
    handleStop?: () => void;
    header?: string;
    name?: string;
    yesButtonText?: string;
    noButtonText?: string;
    isNoButtonPrimary?: boolean;
    showCancelIcon?: boolean;
    onSecondaryClick?: any;
}
export default function ConfirmationModal({
    title,
    open,
    onClose,
    handleStop,
    header,
    name,
    yesButtonText,
    noButtonText,
    isNoButtonPrimary,
    showCancelIcon,
    onSecondaryClick,
}: ConfirmationModalInterface): React.JSX.Element {
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalBody expandModal={false}>
                <div
                    data-testid="confirmation-modal"
                    className="space-y-3 px-5 py-10 h-60 w-full text-stone-800 flex flex-col justify-evenly items-center"
                >
                    <div className="my-3 text-center">
                        <label className="text-lg font-semibold ">
                            {header}
                        </label>
                        <h1>{name}</h1>
                    </div>
                    {showCancelIcon ? (
                        <div
                            className="absolute top-0 right-4 cursor-pointer"
                            onClick={onClose}
                        >
                            <X />
                        </div>
                    ) : null}
                    <h1>{title}</h1>
                    <div className="footer">
                        <ConfirmationModalFooter
                            onClose={
                                showCancelIcon ? onSecondaryClick : onClose
                            }
                            handleSubmit={handleStop}
                            yesButtonText={yesButtonText}
                            noButtonText={noButtonText}
                            isNoButtonPrimary={isNoButtonPrimary}
                        />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
