import React, { useState } from 'react';
import comments from '../../assets/img/comments.svg';
import CommentsModal from './CommentsModal';
import moment from 'moment';

export default function SessionHistorySubModal({
    propsData,
}: {
    propsData: any;
    key: any;
}): React.JSX.Element {
    const [openModal, setOpenModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [count, setCount] = useState(null);

    const openModalOfComment = (comment: any, commentCount: any): any => {
        setSelectedComment(comment);
        setCount(commentCount);
        setOpenModal(true);
    };

    return (
        <>
            <div className="mb-8">
                <div className="mb-4 flex space-x-4">
                    <p className="text-sm">
                        <span className="font-semibold text-sm  text-[#394148]">
                            Ran By:
                        </span>{' '}
                        {propsData?.ranBy}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold text-sm text-[#394148]">
                            Ran On:
                        </span>{' '}
                        {moment(propsData?.ranOn).format(
                            'MM/DD/YYYY | hh:mm A'
                        )}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold text-sm  text-[#394148]">
                            Start Time:
                        </span>{' '}
                        {moment(propsData?.startTime).format('hh:mm A')}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold text-sm  text-[#394148]">
                            End Time:
                        </span>{' '}
                        {moment(propsData?.endTime).format('hh:mm A')}
                    </p>
                </div>
                <div className="container ">
                    <div className="border rounded-lg shadow-md ">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#C4E4EE]">
                                <tr>
                                    <th className="px-10 py-3 text-left text-gray-600 text-sm font-semibold   tracking-wider">
                                        Targets
                                    </th>

                                    <th className="px-10 py-3 text-left text-gray-600 text-sm font-semibold   tracking-wider">
                                        Phase
                                    </th>

                                    <th className="px-10 py-3 text-left text-gray-600 text-sm font-semibold   tracking-wider">
                                        Data Point
                                    </th>

                                    <th className="px-10 py-3 text-left text-gray-600 text-sm font-semibold   tracking-wider">
                                        Trials
                                    </th>

                                    <th className="px-10 py-3 text-left text-gray-600 text-sm font-semibold   tracking-wider">
                                        Comments
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {propsData?.targetData?.map(
                                    (data: any, index: any) => (
                                        <tr key={index}>
                                            <td className="px-10 py-4 whitespace-nowrap">
                                                {data.targetName}
                                            </td>

                                            <td className="px-10 py-4 whitespace-nowrap">
                                                {data.phase}
                                            </td>

                                            <td className="px-10 py-4 whitespace-nowrap">
                                                {data.dataPoint}
                                            </td>

                                            <td className="px-10 py-4 whitespace-nowrap">
                                                {data.trails}
                                            </td>

                                            <td className="px-10 py-4 whitespace-nowrap">
                                                <img
                                                    src={comments}
                                                    onClick={() => {
                                                        openModalOfComment(
                                                            data.comments,
                                                            data.commentsCount
                                                        );
                                                    }}
                                                    alt="comments"
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {openModal && (
                <CommentsModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    commentsData={selectedComment}
                    count={count}
                />
            )}
        </>
    );
}
