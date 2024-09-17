/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React from 'react';
import Modal, { ModalHeader } from '../../Generics/Modal';
import { useSelector } from 'react-redux';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
    CustomNewOld,
} from '../../Generics/Grid/CommonFunction';
import Grid from '../../Generics/Grid';

interface AddInterventionModalProps {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly dataProgramBook: any;
}

const InterventionHistory: React.FC<AddInterventionModalProps> = ({
    dataProgramBook,
    open,
    onClose,
}) => {
    const getGridData = useSelector(({ getHistory }: any) => getHistory);

    const columnDefinitionsTemplateGrid = [
        {
            width: '100px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Action ', getGridData, ''),
            width: '',
            body: (e: any) => CustomName(e?.action, ''),
        },
        {
            header: ConstColumnDiv('Old Value ', getGridData, ''),
            width: '',
            body: (e: any) => CustomNewOld(e?.oldValue),
        },
        {
            header: ConstColumnDiv('New Value ', getGridData, ''),
            width: '',
            body: (e: any) => CustomNewOld(e?.newValue),
        },
        {
            header: ConstColumnDiv('Executed By ', getGridData, ''),
            width: '',
            body: (e: any) => CustomName(e?.firstName, e?.lastName),
        },
        {
            header: ConstColumnDiv(
                'Executed On',
                getGridData,
                '',
                dataProgramBook?.id
            ),
            width: '',
            body: (e: any) => CustomDate(e?.executedOn),
        },
    ];
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={`${dataProgramBook?.name} - Intervention Plan History`}
                icon={false}
                onExpand={undefined}
                onClose={onClose}
                closeIcon={true}
            />
            <div className="flex flex-col p-5 min-w-[80rem] min-h-[40rem] overflow-auto">
                <div className="name flex ml-5 mb-5">
                    <span className="text-base font-semibold">
                        Created By :
                        <span className="font-normal">{` ${dataProgramBook?.createdBy?.firstName} ${dataProgramBook?.createdBy?.lastName}`}</span>
                    </span>
                    <span className="text-base font-semibold ml-3">
                        Created On :
                        <span className="font-normal">{` ${new Date(dataProgramBook?.createdDate).toLocaleString()}`}</span>
                    </span>
                </div>
                <Grid
                    id={dataProgramBook?.id}
                    getGridData={getGridData}
                    columnOfGrid={columnDefinitionsTemplateGrid}
                />
            </div>
        </Modal>
    );
};

export default InterventionHistory;
