import React, { useEffect, useRef, useState } from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import Breadcrumb from '../components/Breadcrumb';
import { ROUTES } from '../constants';
import CreateSessionForm from '../components/CreateSessionForm';
import ProgramBookMenu from '../components/CreateSessionForm/ProgramBookMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/slice/users/usersSlice';
import sessionApis from '../api/services/session.service';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Generics/Button';
import { openNotification } from '../redux/slice/Notification/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getSession,
    reInitSessionData,
    getAllTargetBySessionId,
} from '../redux/slice/session/sessionSlice';
import TargetList from '../components/CreateSessionForm/TargetList';
import { AppDispatch, IRootState } from '../redux/store';
import { ValuesType } from '../types/CreateSession.types';
import { nameValidation } from '../constants/ValidationMessages';
function CreateSession(): React.JSX.Element {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const params = useParams();
    const session = useSelector((state: IRootState) => state.session);
    const formikRef = useRef<HTMLFormElement>(null);
    const ref = useRef<any>(null);
    const dispatch = useDispatch<AppDispatch>();
    const initialValues: ValuesType = {
        sessionName: '',
        createdFor: '',
    };
    const userPermission = useSelector(
        ({ getUserPermission }: IRootState) => getUserPermission
    );
    const validationSchema = Yup.object().shape({
        sessionName: Yup.string()

            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            )
            .test(
                'checkDuplicateSessionName',
                'Please provide an unique session name',
                async (value: string | undefined): Promise<any> => {
                    if (params?.id) {
                        return true;
                    } else {
                        const res = await sessionApis.checkDuplicateName({
                            name: value ?? '',
                        });
                        return !res?.data?.data?.isDuplicate;
                    }
                }
            ),
        createdFor: Yup.number().required(),
    });
    const updateUserId = (id: string): void => {
        if (id !== userId) {
            setUserId(id);
            dispatch(reInitSessionData());
        }
    };
    const handleSave = async (formValues: ValuesType): Promise<any> => {
        try {
            const response = await sessionApis.createSession({
                name: formValues?.sessionName,
                createdFor: formValues?.createdFor,
                createdBy: userPermission?.value?.data?.userId || 1,
                modifiedBy: userPermission?.value?.data?.userId || 1,
                programBookUUID: session.value.programBookUUID,
                target: session.value.targets.map((target: any) => ({
                    id: target?.targetId?.id || target?.id,
                    orderCount: target.orderCount,
                })),
            });
            return response;
        } catch (err) {
            return {
                data: {
                    data: null,
                },
            };
        }
    };
    const handleEdit = async (formValues: ValuesType): Promise<any> => {
        try {
            const response = await sessionApis.editSession({
                name: formValues?.sessionName,
                sessionId: params?.id?.toString() || '',
                modifiedBy: userPermission?.value?.data?.userId || 1,
                target: session.value.targets.map((target: any) => ({
                    id: target?.targetId?.id || target.id,
                    orderCount: target.orderCount,
                })),
            });
            return response;
        } catch (err) {
            return {
                data: {
                    data: null,
                },
            };
        }
    };
    const handleSubmitForm = async (
        values: ValuesType,
        { setSubmitting }: FormikHelpers<ValuesType>
    ): Promise<void> => {
        setSubmitting(true);
        const response = params?.id
            ? await handleEdit(values)
            : await handleSave(values);
        if (response.data.data) {
            dispatch(
                openNotification({
                    success: true,
                    title: params.id
                        ? 'Session updated successfully.'
                        : 'Session created successfully.',
                    description: '',
                })
            );
            dispatch(reInitSessionData());
            navigate(ROUTES.sessionGrid);
        }
        setSubmitting(false);
    };
    useEffect(() => {
        dispatch(getAllUsers());
        if (params.id) {
            dispatch(
                getSession({
                    sessionId: params?.id,
                })
            );
            dispatch(
                getAllTargetBySessionId({
                    sessionId: params?.id,
                })
            );
        }
    }, [dispatch, params]);
    useEffect(() => {
        if (session?.value?.data?.id) {
            if (ref?.current) {
                ref?.current?.setFieldValue(
                    'sessionName',
                    session.value.data.name
                );
                ref?.current?.setFieldError('sessionName', '');
                ref?.current?.setFieldValue(
                    'createdFor',
                    session?.value?.data?.clientId?.id
                );
                setUserId(session?.value?.data?.clientId?.id);
            }
        }
    }, [session.value.data]);
    return (
        <div className="pl-5 pr-5 py-2">
            <Breadcrumb
                name={params?.id ? 'Edit Session' : 'Create Session'}
                pageName={'Sessions'}
                routeName={ROUTES?.sessionGrid}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                innerRef={ref}
            >
                {(props) => {
                    const { handleSubmit, isSubmitting, isValid, dirty } =
                        props;
                    return (
                        <>
                            <CreateSessionForm
                                formikRef={formikRef}
                                updateUserId={updateUserId}
                            />
                            <div className="flex w-full">
                                <ProgramBookMenu userId={userId} />
                                <div className="flex flex-col w-full">
                                    <TargetList />
                                    <div className="flex w-[95%] justify-end mr-20">
                                        <Button
                                            type={'secondary'}
                                            onClick={() => {
                                                navigate(ROUTES.sessionGrid);
                                                dispatch(reInitSessionData());
                                            }}
                                            disabled={false}
                                            className={'w-40'}
                                            data-testid="cancel-button"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type={'primary'}
                                            onClick={handleSubmit}
                                            disabled={
                                                !ref?.current?.values
                                                    ?.sessionName ||
                                                isSubmitting ||
                                                (!isValid && dirty) ||
                                                !session?.value?.targets?.length
                                            }
                                            className={'w-40 justify-center'}
                                            data-testid="create-session-save-button"
                                        >
                                            {isSubmitting
                                                ? 'Saving...'
                                                : 'Save'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                }}
            </Formik>
        </div>
    );
}
export default withLayout(CreateSession);
