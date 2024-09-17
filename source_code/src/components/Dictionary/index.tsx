import * as React from 'react';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import Delete from '../../assets/img/delete.svg';
import edit from '../../assets/img/editIcon.svg';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
import { Link } from 'react-router-dom';
import { usePermission } from '../../hooks/usePermission';
import CommonGrid from '../Generics/Grid';
import { AppDispatch } from '../../redux/store';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import ConfirmationModal from '../Generics/ConfirmationModal';
import deleteDictionaryAPI from '../../api/services/Dictionary/deleteDictionary.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import EditData from '../AddNewNote/EditData';
export default function Dictionary(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const { permissions } = usePermission({
        itemsToCheck: ['delete_dictionary', 'edit_dictionary'],
    });
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'Dictionary',
        assignedTo: userPermission?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: 'DESC',
        name: 'createdDate',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'Dictionary' }));
    }, [dispatch]);
    const [event, setEvent] = React.useState({ id: '', word: '', meaning: '' });
    const [editDictionary, setEditDictionary] = React.useState(false);
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const ActionTemplateGrid = (e: any): any => {
        const handleDelete = (): void => {
            if (permissions?.delete_dictionary) {
                setEvent({
                    id: e?.id,
                    word: e?.word,
                    meaning: e?.meaning,
                });
                setOpenConfirmationModalForDelete(true);
            }
        };
        const handleEdit = (): void => {
            setEvent({
                id: e?.id,
                word: e?.word,
                meaning: e?.meaning,
            });
            setEditDictionary(true);
        };
        return (
            <div className="flex items-center">
                <Tooltip title="Edit">
                    <Link
                        to={''}
                        onClick={handleEdit}
                        className={`${!permissions?.edit_dictionary ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img className=" mt-1 ml-4" src={edit} alt="edit" />
                    </Link>
                </Tooltip>
                <Tooltip title="Delete">
                    <Link
                        to={''}
                        onClick={handleDelete}
                        className={`${!permissions?.delete_dictionary ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img src={Delete} alt="Delete" className="ml-4" />
                    </Link>
                </Tooltip>
            </div>
        );
    };
    const handleDeleteCall = async (): Promise<any> => {
        const payload = {
            dictionaryId: event?.id,
        };
        const res = await deleteDictionaryAPI.deleteDictionary(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'A phrase deleted from dictionary successfully.',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to delete this record',
                        description: '',
                    })
                );
            }, 800);
        }
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('Quick Phrase', getGridData, 'word'),
            width: '12rem',
            body: (e: any) => CustomName(e?.word, ''),
        },
        {
            header: ConstColumnDiv('Long Form', getGridData, 'meaning'),
            width: '12rem',
            body: (e: any) => CustomName(e?.meaning, ''),
        },

        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            width: '12rem',
            body: (e: any) =>
                CustomName(
                    e?.createdBy?.firstName,
                    e?.createdBy?.lastName,
                    e?.createdBy
                ),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            width: '12rem',
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '12rem',
            body: (e: any) => ActionTemplateGrid(e),
        },
    ];
    return (
        <>
            <CommonSubHeader title={'Dictionary'} />

            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Phrase'}
                    name={event?.word}
                    title={`Are you sure you want to delete this phrase?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={handleDeleteCall}
                />
            )}
            {editDictionary && (
                <EditData
                    open={editDictionary}
                    onClose={() => {
                        setEditDictionary(false);
                    }}
                    word={event?.word}
                    meaning={event?.meaning}
                    wordLabel={'Quick Phrase'}
                    meaningLabel={'Long Form'}
                    dictionaryId={event?.id}
                    setShowSavedNotification={() => undefined}
                    setUnableToUpdate={() => undefined}
                    type="Dictionary-grid"
                />
            )}
        </>
    );
}
