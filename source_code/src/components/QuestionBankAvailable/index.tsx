/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';

import Button from '../Generics/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchQuestionAnswerType,
    fetchQuestionById,
    fetchQuestionQuestionType,
} from '../../redux/slice/questionBankManement/questionBankManementSlice';
import edit from '../../assets/img/GridIcons/edit.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import QuestionBankManagementApi from '../../api/services/QuestionBankManagement/QuestionBankManagementApi.service';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import CommonGrid from '../Generics/Grid';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import Tooltip from '../Generics/Tooltip';
import ConfirmationModal from '../Generics/ConfirmationModal';
import EditQuestiona from './Modal/EditQuestionModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import CommonSubHeader from '../SubHeader/CommonSubHeader';

export default function QuestionBankAvailable(): JSX.Element {
    const dispatch = useDispatch<any>();
    // Initialize with one empty input
    const [deleteModal, setDeleteModal] = useState(false);
    const [editQuestionModal, setEditQuestionModal] = useState(false);
    const [id, setId] = useState(null);

    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const getGridData = useSelector(({ getMine }: any) => getMine);

    const initialData = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'Question Bank Management',
        assignedTo: userPermission?.value?.data?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };

    useEffect(() => {
        dispatch(fetchQuestionQuestionType());
        dispatch(getActiveAsync(initialData));
        dispatch(savingTabData({ tab: 'Question Bank Management' }));
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchQuestionAnswerType());
    }, [dispatch]);

    const ActionInterventionGrid = (e: any) => {
        return (
            <div className="flex items-center space-x-5">
                <Tooltip title="Edit">
                    <Button
                        type=""
                        loading={false}
                        onClick={() => {
                            setEditQuestionModal(true);
                            setId(e?.id);
                            dispatch(fetchQuestionById({ id: e?.id }));
                        }}
                        className=""
                    >
                        <img data-testid="View-element" src={edit} alt="Edit" />
                    </Button>
                </Tooltip>
                <Tooltip title="Delete">
                    <Button
                        type=""
                        loading={false}
                        onClick={() => {
                            setId(e?.id); // Set the ID, assuming e is defined and has an id property
                            setDeleteModal(true); // Show the delete modal
                        }}
                        className=""
                    >
                        <img
                            data-testid="Delet-element"
                            src={deleteIcon}
                            alt="Delete"
                        />
                    </Button>
                </Tooltip>
            </div>
        );
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '10px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Questions', getGridData, ''),
            width: '40px',
            body: (e: { questionStatement: string }) =>
                CustomName(e?.questionStatement, ''),
        },
        {
            header: ConstColumnDiv(
                'Question Type',
                getGridData,
                'questionType'
            ),
            width: '40px',
            body: (e: { questionType: string }) =>
                CustomName(e?.questionType, ''),
        },
        {
            header: ConstColumnDiv('Answer Type', getGridData, ''),
            width: '40px',
            body: (e: { answerType: string }) => CustomName(e?.answerType, ''),
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
            width: '40px',
            body: (e: any) => ActionInterventionGrid(e),
        },
    ];
    const deletQuestion = async () => {
        try {
            await QuestionBankManagementApi?.deleteQuestionBankManagement({
                questionBankManagementId: id,
            });

            dispatch(
                openNotification({
                    success: true,
                    title: 'Question Deleted Successfully',
                    description: '',
                })
            );

            setDeleteModal(false); // Close the delete modal
            dispatch(getActiveAsync(initialData));
        } catch (error) {
            dispatch(
                openNotification({
                    success: false,
                    title: 'Failed to Delete Question',
                    description:
                        'An error occurred while deleting the question. Please try again.',
                })
            );

            console.error('Error deleting question:', error);
        }
    };

    return (
        <>
            <div className="p-4">
                <div className="grid">
                    <CommonSubHeader title="Question Bank Management" />
                    <CommonGrid
                        getGridData={getGridData}
                        columnOfGrid={columnDefinitionsTemplateGrid}
                    />
                </div>
            </div>
            {editQuestionModal && (
                <EditQuestiona
                    open={editQuestionModal}
                    onClose={() => setEditQuestionModal(false)}
                />
            )}
            {deleteModal && (
                <ConfirmationModal
                    title={'Are you sure you want to delete this question ?'}
                    open={deleteModal}
                    onClose={function (): void {
                        setDeleteModal(false);
                    }}
                    handleStop={deletQuestion}
                />
            )}
        </>
    );
}
