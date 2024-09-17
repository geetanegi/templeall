import React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import { utc } from 'moment';

export default function CommentsModal({
    open,
    onClose,
    commentsData,
    count,
}: {
    open: any;
    onClose: any;
    commentsData: any;
    count: any;
}): React.JSX.Element {
    const getTime = (date: any): any => {
        const duration = utc(date).local().fromNow();
        if (duration?.split(' ')[0] === 'in') {
            return 'a few seconds ago';
        } else if (duration === 'a few seconds ago') {
            return 'a minute ago';
        } else {
            return duration;
        }
    };

    return (
        <>
            <Modal open={open} id={'add-comments-modal'} expandModal={false}>
                <ModalHeader
                    title={'Comments'}
                    onClose={onClose}
                    closeIcon={true}
                />

                <ModalBody expandModal={false}>
                    <div className="overflow-x-auto w-[50rem] relative">
                        {count > 0 && count === 1 ? (
                            <span className="absolute right-[5.6rem]  text-[#48ABCA] ">
                                {count}&nbsp; Comment
                            </span>
                        ) : (
                            count > 1 && (
                                <span className=" absolute right-[5.6rem] text-[#48ABCA] ">
                                    {count}&nbsp; Comments
                                </span>
                            )
                        )}
                        <table
                            className={`min-w-full bg-white border rounded-lg shadow-md ${commentsData?.length ? 'mt-8' : ''}
                                
                                `}
                        >
                            <thead className="bg-[#C4E4EE]  w-[50rem]">
                                <tr className=" w-[47rem] flex justify-between ">
                                    <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 tracking-wider">
                                        Comment
                                    </th>
                                    <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 tracking-wider">
                                        Commented By
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {commentsData?.length ? (
                                    commentsData.map(
                                        (data: any, index: any) => (
                                            <tr
                                                key={index}
                                                className="flex justify-between border-b border-gray-200 whitespace-nowrap"
                                            >
                                                <td className="px-6 py-4  flex items-center">
                                                    <span className="mr-4">
                                                        {data.comments}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {getTime(
                                                            data.createdDate
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4  w-[13rem]">
                                                    {data.createdBy
                                                        ? data?.createdBy
                                                        : ''}
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="px-6 py-4 border-b border-gray-200 text-center"
                                        >
                                            No comments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
