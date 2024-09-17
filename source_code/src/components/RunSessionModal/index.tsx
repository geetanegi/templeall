import React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../Generics/Tooltip';
import run from '../../assets/img/run.svg';
import { ROUTES } from '../../constants';
import { usePermission } from '../../hooks/usePermission';

export default function RunSessionModal({
    sessionDetails,
    appointmentWith,
    setShowSessionsModal,
}: {
    sessionDetails: any;
    appointmentWith: any;
    setShowSessionsModal: any;
}): React.JSX.Element {
    const navigate = useNavigate();
    const { permissions } = usePermission({
        itemsToCheck: ['run_session'],
    });
    const getBody = (e: any): any => {
        const runSession = (): void => {
            if (permissions?.run_session) {
                navigate(`${ROUTES.runSession}/${e.id}`);
            }
        };
        return (
            <div className="flex">
                <Tooltip title="Run" placement="middle">
                    <img
                        src={run}
                        onClick={runSession}
                        alt="run"
                        className={`${!permissions?.run_session || e?.isSystemGenerated ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
            </div>
        );
    };
    return (
        <Modal open={true} id={'add-domain-modal'} expandModal={false}>
            <ModalHeader
                title={`Session list for ${appointmentWith.firstName} ${appointmentWith.lastName}`}
                onExpand={undefined}
                closeIcon
                onClose={() => setShowSessionsModal(false)}
            />
            <ModalBody expandModal={false}>
                <DataTable
                    value={sessionDetails}
                    tableStyle={{
                        minWidth: '50rem',
                        border: '1px solid #ccc',
                    }}
                >
                    <Column field="name" header="Name"></Column>
                    <Column
                        field="action"
                        style={{
                            width: '200px',
                            justifyContent: 'center',
                        }}
                        header="Action"
                        body={(rowData): React.JSX.Element => (
                            <span>{getBody(rowData)}</span>
                        )}
                    ></Column>
                </DataTable>
            </ModalBody>
        </Modal>
    );
}
