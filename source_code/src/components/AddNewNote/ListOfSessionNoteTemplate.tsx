import React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import { useSelector } from 'react-redux';

function ListOfSessionNoteTemplate({
    openModalById,
    onClose,
    setIsMultipleSession,
    isOpen,
}: {
    openModalById?: any;
    onClose?: any;
    setIsMultipleSession?: any;
    isOpen?: any;
}): React.JSX.Element {
    const listOfSessionNote = useSelector(
        (state: any) => state.template.listOfSessionNote.data
    );
    const code = useSelector((state: any) => state?.scheduling?.codeAfterEdit);

    const appointment = useSelector((state: any) => state?.appointment?.value);
    const allCode = useSelector((state: any) => state?.scheduling?.setCodes);

    const data =
        allCode?.length &&
        allCode?.filter(
            (item: any) =>
                item?.codeType === 'Billable' ||
                item?.codeType?.name === 'Billable'
        );
    const openModal = (e: any): any => {
        setIsMultipleSession(false);
        openModalById(e);
    };

    return (
        <Modal open={isOpen} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={`Billing Code -${code?.code || data?.[0]?.code || appointment?.authorizationCodes?.[0]?.authorizationCode?.code}`}
                icon={false}
                onExpand={undefined}
                onClose={onClose}
                closeIcon={true}
            />

            <ModalBody expandModal={false}>
                <div className=" w-[70rem]" data-testid="list-session-note">
                    <div>
                        <div className="container  mx-auto">
                            <ul className="bg-white rounded-lg shadow-md">
                                {listOfSessionNote?.map(
                                    (library: any, key: any) => {
                                        return (
                                            <li
                                                className="px-4 py-2 hover:bg-[#C4E4EE] hover:text-black transition-colors duration-300"
                                                key={key}
                                                onClick={() =>
                                                    openModal(library?.id)
                                                }
                                            >
                                                {library?.name}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default ListOfSessionNoteTemplate;
