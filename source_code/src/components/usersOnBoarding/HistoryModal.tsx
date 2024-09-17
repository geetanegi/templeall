/* eslint-disable max-len */
import * as React from 'react';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import { useSelector } from 'react-redux';
import { CustomDate } from '../Generics/Grid/CommonFunction';
import LoaderComponent from '../LoaderComponent';
export default function HistoryModal({
    onClose,
    open,
    data,
}: {
    open: any;
    onClose: any;
    data: any;
}): React.JSX.Element {
    const title = `${data?.firstName} ${data?.lastName}`;
    const inOutTime = useSelector(({ users }: any) => users?.history);
    return (
        <>
            <Modal open={open} id={'add-comments-modal'} expandModal={false}>
                <ModalHeader title={title} onClose={onClose} closeIcon={true} />
                <ModalBody expandModal={false}>
                    <div className="ml-2">
                        <div className="mb-4 flex space-x-4">
                            <p className="text-sm">
                                <span className="font-semibold text-sm">
                                    Role:
                                </span>{' '}
                                {data?.roleName}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold text-sm">
                                    ID:
                                </span>{' '}
                                {data?.id}
                            </p>
                        </div>
                        <div className="mb-4 w-[50rem]">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="">
                                    <tr>
                                        <th className=" font-semibold px-6 py-3 text-left text-sm    tracking-wider">
                                            Log in
                                        </th>
                                        <th className="font-semibold px-6 py-3 text-left text-sm   tracking-wider">
                                            Logout
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {inOutTime?.loading ? (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                                            >
                                                <LoaderComponent />
                                            </td>
                                        </tr>
                                    ) : inOutTime?.length ? (
                                        inOutTime?.map((i: any, index: any) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {CustomDate(i?.loginTime)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {i?.logoutTime?.length
                                                        ? CustomDate(
                                                              i?.logoutTime
                                                          )
                                                        : ''}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                                            >
                                                <div className="flex justify-center mt-7">
                                                    {'No Data Found'}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <CommonSubHeader title={title} />
        </>
    );
}
