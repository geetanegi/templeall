/* eslint-disable max-lines */
import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import GuidelineTemplateHeader from '../components/GuidelineTemplate/Header';
import DraggablePanel from '../components/GuidelineTemplate/DraggablePanel';
import DroppableContainer from '../components/GuidelineTemplate/DroppableContainer';
import FormOptionContainer from '../components/GuidelineTemplate/FormOptionContainer';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik, FormikErrors, FormikHelpers } from 'formik';
import {
    addElement,
    moveElements,
    deleteElement,
    getById,
    savingOnEdit,
    getAuthorizationCode,
} from '../redux/slice/template/templateSlice';
import templateAPIs from '../api/services/template.service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import checkDuplicateTemplateAPI from '../api/services/checkDuplicateTemplateName.service';
import { openNotification } from '../redux/slice/Notification/notifications';
import SessionHeader from '../components/GuidelineTemplate/SessionHeader';
import Button from '../components/Generics/Button';
import { ROUTES } from '../constants';
import {
    descriptionValidation,
    nameValidation,
} from '../constants/ValidationMessages';
interface MyData {
    name: string;
    description: string;
    authorizationCode: any;
    logo: string;
}
const initialValues: MyData = {
    name: '',
    description: '',
    authorizationCode: '',
    logo: '',
};
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please provide a valid name')
        .matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
            nameValidation
        ),
    description: Yup.string().matches(
        /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
        descriptionValidation
    ),
});
const validationSchema1 = Yup.object().shape({
    name: Yup.string().matches(
        /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
        nameValidation
    ),
    description: Yup.string().matches(
        /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
        descriptionValidation
    ),
    authorizationCode: Yup.mixed(),
});
interface Values {
    name: string;
    description: string;
    authorizationCode: any;
    logo: string;
}
function GuidelineTemplate(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const template = useSelector((state: any) => state.template);
    const [activeEl, setActiveEl] = React.useState('');
    const [selectedTab, setSelectedTab] = React.useState<number>(2);
    const [res, setRes] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isErrorName, setIsErrorName] = React.useState(false);
    const params = useParams();
    const location = useLocation();
    const isSessionNote = location.pathname.includes('session-note');
    const isViewMode = location.pathname.includes('/view/');
    const [textAreaVal, setTextAreaVal] = React.useState<any>('');
    const navigate = useNavigate();
    const setActiveElement = (id: string, isMandate: boolean): void => {
        setSelectedTab(isMandate ? 1 : 2);
        setActiveEl(id);
        setTextAreaVal(
            template?.value?.filter((data: any) => data.id == id)[0]
                .instructions
        );
    };
    const addNewElement = (el: any): void => {
        dispatch(addElement(el));
    };
    const deleteElements = (id: string): void => {
        dispatch(deleteElement(id));
    };
    const moveListItem = (dragIndex: any, hoverIndex: any): void => {
        dispatch(moveElements({ dragIndex, hoverIndex }));
    };
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const getTemplateData = (values: Values): any => ({
        type: isSessionNote ? 'SESSION_NOTE_TEMPLATE' : 'GUIDELINE_TEMPLATE',
        templateId: params?.id,
        isSystemGenerated: false,
        dataConfig: { template: template.value },
        name: values.name,
        description: values.description,
        createdBy: userPermission?.value?.data?.userId || '2',
        modifiedBy: userPermission?.value?.data?.userId || '1',
        status: '1',
        code: isSessionNote ? values.authorizationCode : '',
        organizationLogo: values.logo || '',
    });
    const editTemplate = async (values: Values): Promise<void> => {
        const response = await templateAPIs.edit(getTemplateData(values));
        if (!response?.data?.error) {
            setRes(true);
        } else {
            setIsError(response.data.error);
        }
    };
    const createTemplate = async (values: Values): Promise<void> => {
        const response = await templateAPIs.create(getTemplateData(values));
        if (!response?.data?.error) {
            setRes(true);
        } else {
            setIsError(response.data.error);
        }
    };
    const handleSave = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<void> => {
        setSubmitting(true);
        const data = {
            templateName: values.name,
            templateId: template?.isEditing
                ? template?.fullData?.template?.id
                : '',
        };
        const checkRes =
            await checkDuplicateTemplateAPI.checkDuplicateTemplate(data);
        if (!checkRes?.data?.error) {
            try {
                template?.isEditing
                    ? await editTemplate(values)
                    : await createTemplate(values);
                setSubmitting(false);
            } catch (error) {}
        } else {
            setIsErrorName(checkRes.data.error);
        }
    };
    const initializeTemplateData = (): void => {
        if (params?.id) {
            const data = {
                templateId: params.id,
                organizationId: '1',
                type: isSessionNote
                    ? 'SESSION_NOTE_TEMPLATE'
                    : 'GUIDELINE_TEMPLATE',
            };
            dispatch(getById(data));
            dispatch(savingOnEdit(true));
        }
    };
    React.useEffect(() => {
        initializeTemplateData();
    }, []);
    const setInitialActiveElement = (): void => {
        setActiveEl(
            template.value?.length
                ? template.value[template.value.length - 1].id
                : ''
        );
    };
    React.useEffect(() => {
        if (!activeEl.length) {
            setInitialActiveElement();
        }
        if (isSessionNote) {
            dispatch(getAuthorizationCode({ codeType: 'Billable' }));
        }
    }, [template.value, isSessionNote]);
    const handleResponseNotification = (): void => {
        if (res) {
            const message = template?.isEditing
                ? isSessionNote
                    ? 'Session Note Template edited successfully.'
                    : 'Guideline Template edited successfully.'
                : isSessionNote
                  ? 'Session Note Template created successfully.'
                  : 'Guideline Template created successfully.';
            setTimeout(
                () =>
                    dispatch(
                        openNotification({
                            success: true,
                            title: message,
                            description: '',
                        })
                    ),
                2000
            );
            setTimeout(() => {
                navigate(
                    isSessionNote ? '/session-note-grid' : '/guideline-grid'
                );
            }, 6000);
        }
    };
    React.useEffect(() => {
        handleResponseNotification();
    }, [res]);
    const renderFooterButtons = (
        handleSubmit: () => void,
        values: Values,
        shouldDisable: boolean
    ): any => (
        <div className="bg-gray-100 flex w-[100%] pr-10 justify-end pb-2">
            <Button
                type="secondary"
                onClick={() => navigate(ROUTES.sessionNoteGrid)}
                disabled={false}
                className="w-40"
            >
                Cancel
            </Button>
            <Button
                type="primary"
                onClick={handleSubmit}
                disabled={
                    !values.name?.length ||
                    !values.authorizationCode?.label?.length ||
                    shouldDisable
                }
                className="w-40 justify-center"
            >
                Save
            </Button>
        </div>
    );
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSave}
            validationSchema={
                isSessionNote ? validationSchema1 : validationSchema
            }
            enableReinitialize={true}
            validateOnChange={true}
            validateOnBlur={true}
        >
            {(props) => {
                const { handleSubmit, values, errors } = props;
                function hasErrors(errorVal: FormikErrors<Values>): boolean {
                    return Object.values(errorVal).some(
                        (error) => typeof error === 'string' && error.length > 0
                    );
                }
                const shouldDisable = hasErrors(errors);
                return (
                    <>
                        <div
                            className={`bg-gray-100 ${isSessionNote ? 'h-[118vh]' : 'h-[115vh]'} `}
                            data-testid="guideline-template-page"
                        >
                            <div>
                                {isSessionNote ? (
                                    <SessionHeader />
                                ) : (
                                    <GuidelineTemplateHeader
                                        readOnly={isViewMode}
                                    />
                                )}
                            </div>
                            <div className="flex justify-between h-[80%]">
                                <DraggablePanel
                                    isSessionNote={isSessionNote}
                                    readOnly={isViewMode}
                                />
                                <DroppableContainer
                                    template={template}
                                    addNewElement={addNewElement}
                                    moveListItem={moveListItem}
                                    deleteElement={deleteElements}
                                    setActiveElement={setActiveElement}
                                    activeEl={activeEl}
                                    setSelectedTab={setSelectedTab}
                                    isError={isError}
                                    isErrorName={isErrorName}
                                    setIsErrorName={setIsErrorName}
                                    setIsError={setIsError}
                                    readOnly={isViewMode}
                                />
                                <FormOptionContainer
                                    activeEl={activeEl}
                                    selectedTab={selectedTab}
                                    setSelectedTab={setSelectedTab}
                                    textAreaVal={textAreaVal}
                                    setTextAreaVal={setTextAreaVal}
                                    readOnly={isViewMode}
                                />
                            </div>
                            {isSessionNote &&
                                renderFooterButtons(
                                    handleSubmit,
                                    values,
                                    shouldDisable
                                )}
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}
export default withLayout(GuidelineTemplate);
