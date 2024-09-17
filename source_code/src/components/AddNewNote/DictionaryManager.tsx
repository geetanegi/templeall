import React, { useState } from 'react';
import TabMenu from '../SubHeader/TabMenu';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Generics/Inputs/Input';
import { Field, useFormikContext } from 'formik';
import CommonGrid from '../Generics/Grid';
import ConstColumnDiv, { CustomName } from '../Generics/Grid/CommonFunction';
import Tooltip from '../Generics/Tooltip';
import edit from '../../assets/img/GridIcons/edit.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import { IRootState } from '../../redux/store';
import { SearchDictionary } from './SearchDictionary';
import ConfirmationModal from '../Generics/ConfirmationModal';
import EditData from './EditData';
import dictionaryOfSessionNote from '../../api/services/DictionaryOfSessionNote';
import { getActiveAsync } from '../../redux/slice/MineSlice/getMine';
import Notifications from '../Generics/Notifications';
const DictionaryManager: React.FC = () => {
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const appointment = useSelector((state: any) => state?.appointment?.value);
    const provider = useSelector((state: any) => state.scheduling?.provider);
    const getGridData = useSelector((state: IRootState) => state.getMine);
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        useState(false);
    const [editDictionary, setEditDictionary] = useState(false);
    const [event, setEvent] = useState({
        id: '',
        word: '',
        meaning: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [showSavedNotification, setShowSavedNotification] = useState(false);
    const [unableToUpdate, setUnableToUpdate] = useState(false);
    const [deleteWord, setDeleteWord] = useState(false);
    const { values, handleChange, setFieldTouched, setFieldValue } =
        useFormikContext<any>();
    const dispatch = useDispatch<any>();
    const ActionIntakeGrid = (e: any): React.JSX.Element => {
        const handleDelete = (): void => {
            setEvent({
                id: e?.id,
                word: e?.word,
                meaning: e?.meaning,
            });
            setOpenConfirmationModalForDelete(true);
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
            <div className="flex item-start ">
                <Tooltip title="Edit">
                    <img src={edit} onClick={() => handleEdit()} alt="edit" />
                </Tooltip>
                <Tooltip title="Delete">
                    <img
                        src={deleteIcon}
                        alt="Delete"
                        onClick={() => handleDelete()}
                        className="ml-4"
                    />
                </Tooltip>
            </div>
        );
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('Quick Phrase ', getGridData, 'word'),
            body: (e: any) => CustomName(e?.word, ''),
        },
        {
            header: ConstColumnDiv('Long Form', getGridData, 'Meaning'),
            body: (e: any) => CustomName(e?.meaning, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            // width: '10rem',
            body: (e: any) => ActionIntakeGrid(e),
        },
    ];
    const columnDefinitionsTemplateWithoutAction = [
        {
            header: ConstColumnDiv('Quick Phrase ', getGridData, 'word'),
            body: (e: any) => CustomName(e?.word, ''),
        },
        {
            header: ConstColumnDiv('Long Form', getGridData, 'Meaning'),
            body: (e: any) => CustomName(e?.meaning, ''),
        },
    ];
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: getGridData?.tab,
        assignedTo: userPermission?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
        serviceProviderId: provider || appointment?.primaryProvider?.id || '',
    };
    const clearInput = (): void => {
        setFieldValue('word', ''); // Clear the error message on input clear
        setFieldValue('meaning', ''); // Clear the error message on input clear
    };
    const saveWords = async (): Promise<void> => {
        const payload = {
            dictionaryId: '',
            word: values?.word || '',
            meaning: values?.meaning || '',
        };
        const res = await dictionaryOfSessionNote.saveAndEditWords(payload);
        if (!res?.data?.error) {
            if (res?.data?.data?.isDuplicate) {
                setErrorMessage(
                    'Long Form of this phrase already exist in your dictionary.'
                );
                setShowError(true);
            } else {
                dispatch(getActiveAsync(data));
                setShowSavedNotification(true);
                setFieldValue('word', '', false);
                setFieldValue('meaning', '', false);
                return res?.data;
            }
        } else {
            setUnableToUpdate(true);
        }
    };
    const handleDeleteCall = async (): Promise<any> => {
        const payload = {
            dictionaryId: event?.id,
        };
        const res = await dictionaryOfSessionNote.deleteWords(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            setDeleteWord(true);
            dispatch(getActiveAsync(data));
        } else {
            setOpenConfirmationModalForDelete(false);
            setUnableToUpdate(true);
        }
    };
    const closeNotification = (): any => {
        setTimeout(() => {
            setShowSavedNotification(false);
        }, 2000);
    };
    const closeUnsuccess = (): any => {
        setTimeout(() => {
            setUnableToUpdate(false);
        }, 2000);
    };
    const closeAfterDeletion = (): any => {
        setTimeout(() => {
            setDeleteWord(false);
        }, 2000);
    };
    return (
        <>
            <div className="" data-testid="dictionary-manager-grid">
                {/* Tabs for Dictionary Selection */}
                <div className="flex space-x-4 mb-4 justify-between">
                    <TabMenu
                        selectedTabMenu={1}
                        menuItems={[
                            'Your Dictionary',
                            'Organization Dictionary',
                        ]}
                        defaultTab="Your Dictionary"
                        apiCallParams={{
                            roleId: userPermission?.userRoles?.data?.roleId,
                            assignedTo: userPermission?.value?.data?.userId,
                            pagination: { startIndex: 0, noOfRecords: 19 },
                            order: '',
                            name: '',
                            filterValue: '',
                            serviceProviderId:
                                provider ||
                                appointment?.primaryProvider?.id ||
                                '',
                        }}
                        numColumns={2}
                    />
                    <SearchDictionary />
                </div>
                {/* Form for Adding New Word and Meaning */}
                {getGridData?.tab === 'Your Dictionary' && (
                    <div className="border border-gray-100 p-4 mb-6 rounded-md shadow-md">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600">
                                    Quick Phrase
                                </label>
                                <Field
                                    className="border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0  pb-1 outline-none"
                                    label=""
                                    isRequired={false}
                                    id="word"
                                    name="word"
                                    component={Input}
                                    value={values?.word}
                                    onChange={(e: any) => {
                                        setErrorMessage('');
                                        handleChange(e);
                                        setFieldTouched('word', true, false);
                                    }}
                                    placeholder="Enter Quick Phrase here"
                                />
                                {showError && (
                                    <span className="text-red-500 text-xs -mt-1">
                                        {errorMessage}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600">
                                    Long Form
                                </label>
                                <Field
                                    className="border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0  pb-1 outline-none"
                                    label=""
                                    isRequired={false}
                                    id="meaning"
                                    name="meaning"
                                    component={Input}
                                    value={values?.meaning}
                                    onChange={(e: any) => {
                                        handleChange(e);
                                        setFieldTouched('meaning', true, false);
                                    }}
                                    placeholder="Enter Long Form here"
                                />
                            </div>
                            <div className="flex items-center justify-end space-x-2">
                                <button
                                    className="text-sm text-gray-600"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        clearInput();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-12 py-2 bg-[#48ABCA] text-white rounded-md text-sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        saveWords();
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Dictionary Table */}
                <div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-gray-800 w-full">
                            {getGridData?.tab}
                        </h3>
                        <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-md mb-2"></div>
                    </div>
                    <div className="-ml-5 -mr-5">
                        <CommonGrid
                            getGridData={getGridData}
                            columnOfGrid={
                                getGridData?.tab === 'Your Dictionary'
                                    ? columnDefinitionsTemplateGrid
                                    : columnDefinitionsTemplateWithoutAction
                            }
                        />
                    </div>
                </div>
            </div>
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Phrase'}
                    name={event?.word}
                    title={`Are you sure you want to delete this phrase ${event.word} ?`}
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
                    setShowSavedNotification={setShowSavedNotification}
                    setUnableToUpdate={setUnableToUpdate}
                />
            )}
            {showSavedNotification && (
                <Notifications
                    open={true}
                    title={`Phrase and its long form ${event?.id ? 'edited' : 'saved'} successfully.`}
                    success={true}
                    onClose={closeNotification}
                />
            )}
            {unableToUpdate && (
                <Notifications
                    open={true}
                    title={'Unable to update this record'}
                    success={true}
                    onClose={closeUnsuccess}
                />
            )}
            {deleteWord && (
                <Notifications
                    open={true}
                    title={'A phrase deleted from dictionary successfully.'}
                    success={true}
                    onClose={closeAfterDeletion}
                />
            )}
        </>
    );
};
export default DictionaryManager;
