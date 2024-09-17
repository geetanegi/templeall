/* eslint-disable max-len */
import React from 'react';
import Modal, {
    ConfirmationCopyModalFooter,
    ModalBody,
} from '../Generics/Modal';

interface CopyTemplateModalInterface {
    title: string;
    open: boolean;
    onClose: () => void;
    handleStop: () => void;
    header?: string;
    name?: string;
    value: string;
    setValue: any;
    showError: boolean;
}

export default function CopyTemplateModal({
    title,
    open,
    onClose,
    handleStop,
    header,
    name,
    value,
    setValue,
    showError,
}: CopyTemplateModalInterface): React.JSX.Element {
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalBody expandModal={false}>
                <div className="space-y-3 px-5 py-10 h-60 w-full text-stone-800 flex flex-col justify-evenly">
                    <div className="mb-3 text-center">
                        <label className="text-lg font-semibold ">
                            {header}
                        </label>
                        <h1>{title}</h1>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-md font-semibold ">{name}</label>
                        <input
                            className="font-light border-t-0 border-l-0 border-r-0 border-b-2 border-gray-300 ps-0"
                            value={value}
                            onChange={(e) => {
                                setValue(e?.target?.value);
                            }}
                        />
                    </div>
                    {showError && (
                        <div className="errorMsg text-red-700 text-xs  my-1 font-[lato]">
                            Template name should be unique
                        </div>
                    )}

                    <div className="footer items-center text-center">
                        <ConfirmationCopyModalFooter
                            onClose={onClose}
                            handleSubmit={handleStop}
                        />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
