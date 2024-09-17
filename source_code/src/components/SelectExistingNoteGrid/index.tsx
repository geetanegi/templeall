/* eslint-disable max-len */
import * as React from 'react';
import Grid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
//Icons Import
import edit from '../../assets/img/GridIcons/edit.svg';
import copy from '../../assets/img/GridIcons/copy.svg';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import {
    getActiveAsync,
    savingTabData,
    savingTabHistoryData,
} from '../../redux/slice/MineSlice/getMine';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import {
    copySessionNoteById,
    getClientProviderDetails,
    getNoteById,
} from '../../redux/slice/template/templateSlice';
const ActionTemplateGrid = (
    e: any,
    setIsEdit: any,
    setNote: any,
    setMode: any
): any => {
    const dispatch = useDispatch<any>();
    const appointment = useSelector((state: any) => state.appointment.value);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const codeAfterEdit = useSelector(
        (state: any) => state?.scheduling?.codeAfterEdit
    );
    const codeWithNonBilable = useSelector(
        (state: any) => state?.scheduling?.setCodes
    );
    const allCodes = codeWithNonBilable?.filter(
        (item: any) =>
            item?.codeType === 'Billable' || item?.codeType?.name === 'Billable'
    );
    const EditData = (): void => {
        const payload = {
            providerId: appointment?.primaryProvider?.id || '',
            clientId: appointment?.appointmentWith?.id || '',
            appointmentId: appointment?.id || '',
        };
        dispatch(getClientProviderDetails(payload));
        const data = {
            sessionNoteDataId: e?.id,
        };
        dispatch(getNoteById(data));
        setTimeout(() => {
            setIsEdit(true);
        }, 2000);
    };
    const CopyData = (): void => {
        const payload = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            appointmentId: appointment?.id,
            authorizationCode:
                allCodes?.[0]?.id ||
                codeAfterEdit?.id ||
                appointment?.authorizationCodes?.[0]?.authorizationCode?.id,
            type: 'SESSION_EXISTING_NOTE',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: appointment?.appointmentWith?.id,
            publishStatus: 'Published',
        };
        dispatch(
            copySessionNoteById({
                sessionNoteDataId: e?.id,
                appointmentWith: appointment?.appointmentWith?.id,
            })
        );
        setTimeout(() => {
            dispatch(getActiveAsync(payload));
        }, 500);
    };
    return (
        <div className="flex ml-[-0.5rem]">
            <Tooltip title="Edit">
                <img
                    src={edit}
                    onClick={() => {
                        EditData();
                        setMode('');
                    }}
                    alt="edit"
                />
            </Tooltip>
            <Tooltip title="Copy">
                <img
                    className="ml-5"
                    src={copy}
                    onClick={CopyData}
                    alt="copy"
                />
            </Tooltip>
        </div>
    );
};
export default function SelectExistingNoteGrid({
    onClose,
    first,
    setIsEdit,
    setNote,
    setMode,
}: {
    first?: any;
    onClose?: any;
    setIsEdit?: any;
    setNote?: any;
    setMode?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const title = 'Select Existing Note';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const appointment = useSelector((state: any) => state.appointment.value);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const code = useSelector((state: any) => state?.scheduling?.codeAfterEdit);
    const codeWithNonBilable = useSelector(
        (state: any) => state?.scheduling?.setCodes
    );
    const allCodes =
        codeWithNonBilable &&
        codeWithNonBilable?.filter(
            (item: any) =>
                item?.codeType === 'Billable' ||
                item?.codeType?.name === 'Billable'
        );
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        appointmentId: appointment?.id,
        authorizationCode:
            code?.id ||
            allCodes?.[0]?.id ||
            appointment?.authorizationCodes?.[0]?.authorizationCode?.id,
        type: 'SESSION_EXISTING_NOTE',
        assignedTo: userPermission?.value?.data?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: appointment?.appointmentWith?.id,
        publishStatus: 'Published',
    };
    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'SESSION_EXISTING_NOTE' }));
        dispatch(savingTabHistoryData({ tabHistory: 'SESSION_EXISTING_NOTE' }));
    }, [dispatch]);
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv(
                'Session Notes Name',
                getGridData,
                'sessionNoteDataName'
            ),
            headerName: 'Program Name',
            width: '12rem',
            body: (e: any) => CustomName(e?.sessionNoteDataName, ''),
        },
        {
            header: ConstColumnDiv(
                'Created By  ',
                getGridData,
                'createdBy.firstName'
            ),
            body: (e: any) =>
                CustomName(e?.createdBy?.firstName, e?.createdBy?.lastName),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: any) =>
                ActionTemplateGrid(e, setIsEdit, setNote, setMode),
        },
    ];
    return (
        <>
            <Modal open={first} id={'add-comments-modal'} expandModal={false}>
                <ModalHeader title={title} onClose={onClose} closeIcon={true} />
                <ModalBody expandModal={false}>
                    <div
                        className="grid w-3/4 min-w-[80rem]"
                        data-testid="select-existing-note"
                    >
                        <Grid
                            getGridData={getGridData}
                            columnOfGrid={columnDefinitionsTemplateGrid}
                        />
                    </div>
                </ModalBody>
            </Modal>
            {/* <CommonSubHeader title={title} /> */}
        </>
    );
}
