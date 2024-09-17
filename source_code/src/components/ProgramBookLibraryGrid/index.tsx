/* eslint-disable max-len */
import * as React from 'react';
import Grid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
//Icons Import
import edit from '../../assets/img/GridIcons/edit.svg';
import copy from '../../assets/img/GridIcons/copy.svg';
import view from '../../assets/img/GridIcons/view.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import deleteProgramBookLibrary from '../../api/services/ProgramBookLibrary/deleteProgramBookLibrary.service';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import { useNavigate } from 'react-router-dom';
import { getProgramBookLibraryByIdAsync } from '../../redux/slice/ProgramBookLibrarySlice/getProgramBookLibraryDataById';
import {
    viewOnlyValueData,
    viewOnlyValueLibrary,
    viewOnlyValueLibraryById,
    viewOnlyValueLibraryName,
} from '../../redux/slice/ViewOnlyComponent/ViewOnly';
import {
    getProgramBookLibraryDomainFolderAsync,
    setFromLibrary,
} from '../../redux/slice/ProgramBookLibrarySlice/getProgramBookDomainFolderByUUID';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import { usePermission } from '../../hooks/usePermission';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import CopyProgramBookLibraryModal from './Modal/CopyProgramBookLibrary';
import Button from '../Generics/Button';

export default function ProgramBookLibraryGrid(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const { permissions } = usePermission({
        itemsToCheck: [
            'copy_program_book_library',
            'create_program_book_library',
            'delete_program_book_library',
            'view_program_book_library',
        ],
    });
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const [programLibraryId, setProgramLibraryId] = React.useState('');
    const [copyModal, setCopyModal] = React.useState(false);
    const [data1, setData] = React.useState({});
    const copyLibrary = (e: any): void => {
        setCopyModal(true);
        setData(e);
    };
    const handleDelete = async (): Promise<void> => {
        try {
            const response =
                await deleteProgramBookLibrary.deleteProgramBookLibrary(
                    programLibraryId
                );

            if (response.status === 500) {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Program Book Library not deleted successfully.',
                        description: '',
                    })
                );
                setProgramLibraryId('');
            } else if (!response?.data?.error) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Program Book Library deleted successfully.',
                        description: response,
                    })
                );
                setProgramLibraryId('');
                const initialData = {
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
                setTimeout(() => {
                    dispatch(getActiveAsync(initialData));
                }, 1000);
            } else if (response) {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Program Book Library not deleted successfully.',
                        description: response,
                    })
                );
                setProgramLibraryId('');
            } else {
                setProgramLibraryId('');
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Program Book Library deleted successfully.',
                        description: '',
                    })
                );
            }
        } catch (error) {
            dispatch(
                openNotification({
                    success: false,
                    title: 'Program Book Library not deleted successfully.',
                    description: '',
                })
            );
            setProgramLibraryId('');
        }
    };

    const ActionTemplateGrid = (e: any): any => {
        const navigate = useNavigate();

        const EditData = (): void => {
            if (permissions?.create_program_book_library) {
                dispatch(
                    getProgramBookLibraryByIdAsync({
                        ProgramBookUUID: e?.programBookLibraryUUID,
                    })
                );
                dispatch(
                    getProgramBookLibraryDomainFolderAsync({
                        ProgramBookUUID: e?.programBookLibraryUUID,
                    })
                );
                const data: any = true;
                dispatch(setFromLibrary(data));
                setTimeout(() => {
                    navigate(`/program-book/${e?.programBookLibraryUUID}`);
                }, 1500);
            }
        };
        const viewMode = (): void => {
            if (permissions?.view_program_book_library) {
                navigate(`/program-book/${e?.programBookLibraryUUID}`);
                dispatch(viewOnlyValueLibrary(true));
                dispatch(viewOnlyValueData(true));
                dispatch(viewOnlyValueLibraryById(e?.programBookLibraryUUID));
                dispatch(viewOnlyValueLibraryName(e?.name));
                dispatch(
                    getProgramBookLibraryDomainFolderAsync({
                        ProgramBookUUID: e?.programBookLibraryUUID,
                    })
                );
            }
        };
        const deleteLib = (): void => {
            if (permissions?.delete_program_book_library) {
                setProgramLibraryId(e?.programBookLibraryUUID);
            }
        };

        return (
            <div className="flex ml-[-2rem] justify-evenly items-start">
                <Tooltip title="View">
                    <img
                        data-testid="view-btn"
                        onClick={viewMode}
                        src={view}
                        alt="view"
                        className={`${!permissions?.view_program_book_library ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
                <Tooltip title="Edit">
                    <img
                        data-testid="EditData-btn"
                        className={` mt-1 ${!permissions?.create_program_book_library ? 'opacity-50 pointer-events-none' : ''}`}
                        src={edit}
                        onClick={EditData}
                        alt="edit"
                    />
                </Tooltip>
                <Tooltip title="Copy">
                    <Button
                        data-testid="copy-btn"
                        className={`${!permissions?.copy_program_book_library ? 'opacity-50 pointer-events-none' : ''}`}
                        type=""
                        onClick={() => copyLibrary(e)}
                    >
                        <img
                            src={copy}
                            alt="copy"
                            className={`${!permissions?.copy_goal_library ? 'opacity-50 pointer-events-none' : ''}`}
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Delete">
                    <img
                        data-testid="deleteIcon-btn"
                        src={deleteIcon}
                        onClick={deleteLib}
                        alt="deleteIcon"
                        className={`${!permissions?.delete_program_book_library ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
            </div>
        );
    };
    const title = 'Program Book Library';
    const getGridData = useSelector(({ getMine }: any) => getMine);

    const data = {
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
    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'PROGRAMBOOK_LIBRARY' }));
    }, [dispatch]);
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            headerName: '',
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Program Name', getGridData, 'name'),
            headerName: 'Program Name',

            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            body: (e: any) =>
                CustomName(
                    e?.createdBy?.firstName,
                    e?.createdBy?.lastName,
                    e?.createdBy
                ),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            body: (e: any) => ActionTemplateGrid(e),
        },
        {
            header: ConstColumnDiv('', getGridData, ''),
            headerName: '',
            width: '40px',
            body: () => CustomName('', ''),
        },
    ];

    return (
        <>
            <CommonSubHeader title={title} />
            <Grid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {programLibraryId && (
                <ConfirmationModal
                    title={
                        'Are you sure you want to delete this Program Book library ?'
                    }
                    open={programLibraryId ? true : false}
                    onClose={() => setProgramLibraryId('')}
                    handleStop={handleDelete}
                />
            )}
            {copyModal && (
                <CopyProgramBookLibraryModal
                    header={'Copy Program Book Library'}
                    title={'Are you sure you want to copy this library ?'}
                    data={data1}
                    open={copyModal}
                    onClose={() => setCopyModal(false)}
                />
            )}
        </>
    );
}
