/* eslint-disable max-lines */
import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, FormikHelpers } from 'formik';

import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Generics/Button';
import { ROUTES } from '../constants';

import IntakeDroppableContainer from '../components/IntakeFormBuilder/IntakeDroppableContainer';
import IntakeDraggablePanel from '../components/IntakeFormBuilder/IntakeDraggablePanel';
import IntakeEditorApi from '../api/services/IntakeEditor/IntakeEditorApi';
import { openNotification } from '../redux/slice/Notification/notifications';

import {
    deleteElement,
    addElement,
    moveElements,
} from '../redux/slice/IntakeEditor/intakeEditor';
import IntakeFormOption from '../components/IntakeFormBuilder/IntakeFormOption';
import {
    getActiveAsync,
    savingTabData,
} from '../redux/slice/MineSlice/getMine';
import IntakeHeader from '../components/IntakeFormBuilder/IntakeHeader';

interface MyData {
    logo: string;
}
const initialValues: MyData = {
    logo: '',
};

interface Values {
    logo: string;
}
interface Question {
    id: number;
    question: string;
}
interface RootState {
    getUserPermission: {
        userRoles: { data: { roleId: number } };
        value: { data: { userId: number } };
    };
}
function IntakeFormBuilder(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [activeEl, setActiveEl] = React.useState('');
    const [selectedTab, setSelectedTab] = React.useState<number>(2);
    const [logoPreview, setLogoPreview] = React.useState<string>('');
    const [richTextContentForLegal, setRichTextContentForLegal] =
        React.useState<any>(null);
    const [preserveEvent, setPreserveEvent] = React.useState<any>(null);
    const [updatedQuestion, setUpdatedQuestion] = React.useState<any>({});
    const [selectedQuestions, setSelectedQuestions] = React.useState<any>({});
    const [showSignError, setShowSignError] = React.useState<any>('');

    const location = useLocation();
    const isSessionNote = location.pathname.includes('session-note');
    const isViewMode = location.pathname.includes('/view/');
    const [textAreaVal, setTextAreaVal] = React.useState<any>('');
    const navigate = useNavigate();
    const template = useSelector((state: any) => state.intakeEditor);
    const userPermission = useSelector(
        (state: RootState) => state.getUserPermission
    );
    const getGridData = useSelector(({ getMine }: any) => getMine);

    const addNewElement = (el: any): void => {
        dispatch(addElement(el));
    };
    const setActiveElement = (id: string, isMandate: boolean): void => {
        setSelectedTab(isMandate ? 1 : 2);
        setActiveEl(id);
        setTextAreaVal(
            template?.value?.filter((data: any) => data.id == id)[0]
                .instructions
        );
    };
    const deleteElements = (id: string): void => {
        dispatch(deleteElement(id));
    };
    const moveListItem = (dragIndex: any, hoverIndex: any): void => {
        dispatch(moveElements({ dragIndex, hoverIndex }));
    };
    const handleApiCall = (e: any): void => {
        dispatch(savingTabData({ tab: e }));
    };
    const payload = {
        heading: 'Client Intake Forms',
        roleId: userPermission?.userRoles?.data?.roleId || '',
        type: getGridData?.tab || 'Client Intake Forms',
        assignedTo: userPermission?.value?.data?.userId || '',
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '',
        publishStatus: 'Published',
    };
    const handleSaveProgress = async (): Promise<void> => {
        const questionsData = Object.entries(updatedQuestion).map(
            ([therapyName, questions]) => ({
                questionType: therapyName,
                questionList: (questions as Question[]).map((question) => ({
                    id: String(question.id),
                })),
            })
        );
        const data = {
            clientIntakeFormId: '',
            legalIntroduction: preserveEvent,
            dataConfig: { template: template.value },
            logo: logoPreview,
            questionsData: questionsData,
            fullySaved: false,
        };

        try {
            const checkRes = await IntakeEditorApi.create(data);

            if (!checkRes?.data?.error) {
                navigate(ROUTES.clientIntakeForm);
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Client intake form builder progress saved successfully.',
                        description: '',
                    })
                );
                handleApiCall('Client Intake Forms');
                dispatch(getActiveAsync(payload));
            } else {
                dispatch(
                    openNotification({
                        success: false,
                        title: checkRes?.data?.description,
                        description: '',
                    })
                );
            }
        } catch (error) {
            console.error('Error while saving selected questions:', error);
            dispatch(
                openNotification({
                    success: false,
                    title: 'An error occurred while saving questions',
                    description: 'Please try again later.',
                })
            );
        }
    };

    const handleSave = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<void> => {
        setSubmitting(true);

        const questionsData = Object.entries(updatedQuestion).map(
            ([therapyName, questions]) => ({
                questionType: therapyName,
                questionList: (questions as Question[]).map((question) => ({
                    id: String(question.id),
                })),
            })
        );
        const hasValidQuestion = template?.value?.find(
            (field: any) => field.name === 'signature'
        );

        if (!hasValidQuestion) {
            setSubmitting(false);
            setShowSignError(
                'Please drag at least one signature component to complete the form.'
            );
            return;
        }

        const data = {
            clientIntakeFormId: '',
            legalIntroduction: preserveEvent,
            dataConfig: { template: template.value },
            logo: logoPreview,
            questionsData: questionsData,
            fullySaved: true,
        };

        try {
            const checkRes = await IntakeEditorApi.create(data);

            if (!checkRes?.data?.error) {
                setSubmitting(false);
                navigate(ROUTES.clientIntakeForm);
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Client intake form builder created successfully.',
                        description: '',
                    })
                );
                handleApiCall('Client Intake Forms');
                dispatch(getActiveAsync(payload));
            } else {
                dispatch(
                    openNotification({
                        success: false,
                        title: checkRes?.data?.description,
                        description: '',
                    })
                );
            }
        } catch (error) {
            console.error('Error while saving selected questions:', error);
            dispatch(
                openNotification({
                    success: false,
                    title: 'An error occurred while saving questions',
                    description: 'Please try again later.',
                })
            );
        } finally {
            setSubmitting(false);
        }
    };

    const renderFooterButtons = (
        handleSubmit: () => void,
        isValid: boolean,
        dirty: any,
        isSubmitting: any
    ): any => (
        <div>
            <div className="bg-gray-100 flex w-[100%] pr-10 justify-end space-x-4 mt-4">
                <Button
                    type="secondary"
                    onClick={() => {
                        navigate(ROUTES.clientIntakeForm);
                        dispatch(getActiveAsync(payload));

                        handleApiCall('Client Intake Forms');
                    }}
                    className="w-33 justify-center"
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    onClick={handleSaveProgress}
                    className="w-40 justify-center"
                >
                    Save Progress
                </Button>

                <Button
                    type="primary"
                    onClick={handleSubmit}
                    className="w-40 justify-center"
                    disabled={
                        isSubmitting ||
                        (!isValid && dirty) ||
                        !logoPreview?.length ||
                        !preserveEvent?.length
                    }
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
            </div>
            {showSignError && (
                <div className="text-red-500 text-sm mt-2 justify-end flex pr-10">
                    {showSignError}
                </div>
            )}
        </div>
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSave}
            enableReinitialize={true}
            validateOnChange={true}
            validateOnBlur={true}
        >
            {(props) => {
                const { handleSubmit, isValid, dirty, isSubmitting } = props;

                return (
                    <>
                        <div
                            className={`bg-gray-100 ${isSessionNote ? 'h-[118vh]' : 'h-[117vh]'} `}
                            data-testid="intake-template-page"
                        >
                            <div>
                                <IntakeHeader />
                            </div>
                            <div className="flex justify-between h-[80%]">
                                <IntakeDraggablePanel
                                    isSessionNote={isSessionNote}
                                    readOnly={isViewMode}
                                />
                                <IntakeDroppableContainer
                                    template={template}
                                    addNewElement={addNewElement}
                                    moveListItem={moveListItem}
                                    deleteElement={deleteElements}
                                    setActiveElement={setActiveElement}
                                    activeEl={activeEl}
                                    setSelectedTab={setSelectedTab}
                                    updatedQuestion={updatedQuestion}
                                    setUpdatedQuestion={setUpdatedQuestion}
                                    selectedQuestions={selectedQuestions}
                                    setSelectedQuestions={setSelectedQuestions}
                                    logoPreview={logoPreview}
                                    setLogoPreview={setLogoPreview}
                                    richTextContent={richTextContentForLegal}
                                    setRichTextContent={
                                        setRichTextContentForLegal
                                    }
                                    setPreserveEvent={setPreserveEvent}
                                />
                                <IntakeFormOption
                                    activeEl={activeEl}
                                    selectedTab={selectedTab}
                                    setSelectedTab={setSelectedTab}
                                    textAreaVal={textAreaVal}
                                    setTextAreaVal={setTextAreaVal}
                                    readOnly={isViewMode}
                                />
                            </div>
                            {renderFooterButtons(
                                handleSubmit,
                                isValid,
                                dirty,
                                isSubmitting
                            )}
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}
export default withLayout(IntakeFormBuilder);
