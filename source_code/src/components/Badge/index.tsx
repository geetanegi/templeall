/* eslint-disable max-len */
import React, { useState } from 'react';
import TargetModal from '../CreateSessionForm/TargetModal';

export default function Badge({
    icon,
    title,
    handleCancel,
    targetData,
}: {
    icon?: any;
    title: string;
    handleCancel: any;
    targetData?: any;
}): React.JSX.Element {
    const [openTargetModal, setOpenTargetModal] = useState(false);
    const handleCancelModal = (): any => {
        setOpenTargetModal(false);
    };
    const handleOpenModal = (): any => {
        setOpenTargetModal(true);
    };
    return (
        <>
            <div className="hover:border-[#47AAC9] h-6 bg-[#EAEAEA] cursor-pointer mt-1 inline-flex flex-nowrap items-center  border border-gray-200 rounded-full p-1.5">
                {icon}
                <div
                    className=" whitespace-nowrap text-sm font-light text-gray-800"
                    onClick={handleOpenModal}
                >
                    {title}
                </div>
                <div className="ms-2.5 inline-flex justify-center items-center size-5 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    <svg
                        className="flex-shrink-0 size-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        onClick={handleCancel}
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </div>
            </div>
            {openTargetModal ? (
                <TargetModal
                    open={openTargetModal}
                    onClose={handleCancelModal}
                    data={targetData?.targetId || targetData}
                />
            ) : null}
        </>
    );
}
