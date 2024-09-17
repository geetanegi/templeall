import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../../Generics/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import { CustomDateWithoutTime } from '../../Generics/Grid/CommonFunction';

export default function ViewScoreShortTerm({
    open,
    onClose,
}: {
    open?: boolean;
    onClose?: any;
}): React.JSX.Element {
    const convertSeconds = (seconds: any): any => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} Mins  ${remainingSeconds} Sec`;
    };
    const gridData = useSelector((state: any) => state?.getShortTermGoalById);
    const scoreColumn = (item: any): any => {
        if (item?.shortTermGoalType === 'Duration') {
            return (
                <span className="font-light">
                    {convertSeconds(item?.score)}
                </span>
            );
        } else if (
            item?.shortTermGoalType === 'Percent Accuracy' ||
            item?.shortTermGoalType === 'Percent of Opportunities'
        ) {
            return (
                <span className="font-light">
                    {item?.score}
                    {'%'}
                </span>
            );
        } else {
            return <span className="font-light">{item?.score}</span>;
        }
    };
    const columnDefinitions = [
        {
            header: 'Date',
            body: (e: any) => CustomDateWithoutTime(e?.date),
        },
        {
            header: 'Score',
            body: (e: any) => scoreColumn(e),
        },
        {
            header: 'Comments',
            body: (e: any) => e?.comment,
        },
        {
            header: 'Submitted By',
            body: (e: any) => e?.submittedBy,
        },
    ];

    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'Score for short term goal'}
                onExpand={undefined}
                icon={false}
                onClose={onClose}
                closeIcon={true}
            />
            <ModalBody expandModal={false}>
                <div className="" data-testid="view-page">
                    <h1 className="font-[lato] text-sm text-zinc-700 my-2 mx-2">
                        Score Type -
                        {gridData?.ShortTermGoal?.scoreType?.name
                            ? gridData?.ShortTermGoal?.scoreType?.name
                            : ''}
                    </h1>
                    <div className="card m-1 border border-[#E5E5E5] rounded shadow-md w-full overflow-y-auto h-[30rem]">
                        <DataTable
                            value={gridData?.score}
                            tableStyle={{
                                minWidth: '50rem',
                                border: '1px solid #ccc',
                            }}
                        >
                            {columnDefinitions?.map((column: any) => (
                                <Column
                                    style={{
                                        width: `${column.width ? column.width : ''}`,
                                        fontSize: '13px',
                                        fontFamily: 'Lato',
                                    }}
                                    key={column?.header}
                                    header={column?.header}
                                    body={(rowData): React.JSX.Element => (
                                        <span>{column?.body(rowData)}</span>
                                    )}
                                />
                            ))}
                        </DataTable>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
