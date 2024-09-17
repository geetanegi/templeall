/* eslint-disable max-len */
import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import SessionHistorySubModal from './SessionHistorySubModal';
import { useSelector } from 'react-redux';
import LoaderComponent from '../LoaderComponent';
export default function SessionHistoryModal({
    onClose,
    open,
    data,
}: {
    open: any;
    onClose: any;
    data: any;
}): React.JSX.Element {
    const title = `${data?.name}`;
    const sessionData = useSelector(
        (state: any) => state.session?.sessionHistory
    );
    return (
        <>
            <Modal open={open} id={'add-comments-modal'} expandModal={false}>
                <ModalHeader title={title} onClose={onClose} closeIcon={true} />
                <ModalBody expandModal={false}>
                    <div className="ml-2">
                        <div className="mb-4">
                            {sessionData?.loading ? (
                                <div className="w-[50rem]">
                                    <LoaderComponent />
                                </div>
                            ) : sessionData?.length ? (
                                sessionData?.map((item: any, key: any) => {
                                    return (
                                        <SessionHistorySubModal
                                            propsData={item}
                                            key={key}
                                        />
                                    );
                                })
                            ) : (
                                <div className="flex mt-10 w-[50rem] justify-around">
                                    Session run history data not found.
                                </div>
                            )}
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            {/* <CommonSubHeader title={title} /> */}
        </>
    );
}
