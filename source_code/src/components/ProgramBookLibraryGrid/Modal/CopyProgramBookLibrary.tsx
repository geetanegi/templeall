/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Modal, { ModalBody } from '../../Generics/Modal';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import {
    getActiveAsync,
    savingTabData,
} from '../../../redux/slice/MineSlice/getMine';
import { useSelector, useDispatch } from 'react-redux';
import CopyProgramBookLibrary from '../../../api/services/ProgramBookLibrary/copyProgramBookLibrary.service';

interface CopyTemplateModalInterface {
    readonly header?: string;
    readonly title: string;
    readonly data?: any;
    readonly open: boolean;
    readonly onClose: () => void;
}

export default function CopyProgramBookLibraryModal({
    header,
    title,
    data,
    open,
    onClose,
}: CopyTemplateModalInterface): React.JSX.Element {
    const [state, setState] = useState('');
    const dispatch = useDispatch<any>();
    useEffect(() => {
        if (data?.name) {
            setState(`${data.name}-Copy`);
        }
    }, [data]);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const gridData = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'PROGRAMBOOK_LIBRARY',
        assignedTo: userPermission?.value?.data?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    const handleSubmit = async (): Promise<void> => {
        onClose();
        try {
            await CopyProgramBookLibrary.copyProgramBookLibrary({
                id: data?.id,
                Name: state,
            });
            dispatch(
                openNotification({
                    success: true,
                    title: 'Program Book Library copied successfully.',
                    description: '',
                })
            );
        } catch (err) {
            dispatch(
                openNotification({
                    success: false,
                    title: 'Program Book Library copied not successfully.',
                    description: '',
                })
            );
        }
        dispatch(getActiveAsync(gridData));
        dispatch(savingTabData({ tab: 'PROGRAMBOOK_LIBRARY' }));
    };
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
                        <label
                            htmlFor="programBookLibrary"
                            className="text-md font-semibold"
                        >
                            Program Book Library
                        </label>
                        <input
                            id="programBookLibrary"
                            className="font-light border-t-0 border-l-0 border-r-0 border-b-2 border-gray-300 ps-0"
                            value={state}
                            onChange={(e) => {
                                setState(e?.target?.value);
                            }}
                        />
                    </div>

                    <div className="footer items-center text-center">
                        <div>
                            <button
                                type="button"
                                className="py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="py-2 px-9 w-[110px] inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
