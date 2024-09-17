import * as React from 'react';
import { useState } from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateDomainModalActions,
} from '../Generics/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';
import {
    getDomainByIdCall,
    savingDomainIndex,
    savingProgramBookTree,
} from '../../redux/slice/GetDomainById/getDomainById';
import * as Yup from 'yup';
import Input from '../Generics/Inputs/Input';
import { openNotification } from '../../redux/slice/Notification/notifications';
import createDomainAPI from '../../api/services/createDomain.service';
import { getProgramBookLibraryDomainFolderAsync } from '../../redux/slice/ProgramBookLibrarySlice/getProgramBookDomainFolderByUUID';
import { nameValidation } from '../../constants/ValidationMessages';
interface Values {
    domainName: string;
}
export default function AddDomainModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [duplicate, setDuplicate] = useState(false);
    const params = useParams();
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const activeTab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const programBookDataLibrary = useSelector(
        ({ saveProgramBookLibrary }: any) => saveProgramBookLibrary?.value?.data
    );
    const programBookDataById = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const initialValues: any = {
        domainName: '',
    };
    const validationSchema = Yup.object().shape({
        domainName: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{1,150}$/,
            nameValidation
        ),
    });
    const createDomain = async (values: any): Promise<any> => {
        const data = {
            programBookLibraryUUID:
                programBookDataLibrary?.programBookLibraryUUID ||
                programBookDataById?.programBookLibraryUUID,
            programBookUUID: params?.id,
            templateDomainId: '1',
            name: values.domainName,
            description: 'dummy',
            createdBy:
                programBookData?.createdBy?.id ||
                programBookDataLibrary?.createdBy?.id ||
                programBookDataById?.createdBy?.id ||
                1,
            modifiedBy:
                programBookData?.modifiedBy?.id ||
                programBookDataLibrary?.modifiedBy?.id ||
                programBookDataById?.modifiedBy?.id ||
                '',
        };
        const payload = {
            programBookUUID: params?.id,
        };
        const res = await createDomainAPI.createDomain(data);
        if (!res.data.error) {
            res?.data?.data?.isDuplicate
                ? setDuplicate(res?.data?.data?.isDuplicate)
                : setDuplicate(false);
            return {
                domainPayload: payload,
                res,
            };
        } else {
            setDuplicate(res?.data?.data?.isDuplicate);
            return 'error';
        }
    };
    const libraryId = useSelector(({ ViewOnly }: any) => ViewOnly?.libraryId);
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
        const response = await createDomain(values);
        dispatch(
            savingDomainIndex({
                domainIndex: response?.res?.data?.data?.id,
            })
        );
        dispatch(savingProgramBookTree(response?.res?.data?.data?.id));
        if (response?.res?.data?.data?.id) {
            onClose();
            const data: any = {
                phase: activeTab,
                programBookUUID:
                    response?.domainPayload?.programBookUUID || libraryId,
                isTargetPinned: pinnedData?.addQuickLook,
                quickLookId: pinnedData?.clickedQuickLook,
            };
            dispatch(getDomainByIdCall(data));
            dispatch(
                getProgramBookLibraryDomainFolderAsync({
                    ProgramBookUUID:
                        programBookDataLibrary?.programBookLibraryUUID ||
                        programBookDataById?.programBookLibraryUUID,
                })
            );
            dispatch(
                openNotification({
                    success: true,
                    title: 'Domain created successfully',
                    description: '',
                })
            );
        }
    };
    return (
        <Modal open={open} id={'add-domain-modal'} expandModal={false}>
            <ModalHeader
                title={'Create Domain'}
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitForm}
                    validationSchema={validationSchema}
                    validateOnChange
                >
                    {(props: any) => {
                        const {
                            values,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isValid,
                            setFieldTouched,
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="overflow-y-auto w-[30rem]">
                                    <Field
                                        label="Domain Name"
                                        isRequired={true}
                                        id="domainName"
                                        name="domainName"
                                        component={Input}
                                        value={values.domainName}
                                        onChange={(e: any) => {
                                            setFieldTouched('domainName');
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        placeholder="Domain Name"
                                        autoFocus={true}
                                    />
                                    {duplicate && (
                                        <span className="text-[red] text-sm">
                                            Please provide an unique Domain name
                                        </span>
                                    )}
                                </div>
                                <CreateDomainModalActions
                                    onClose={onClose}
                                    isSubmitting={isSubmitting}
                                    isValid={isValid}
                                    handleSubmit={handleSubmit}
                                    value={!values.domainName?.length}
                                />
                            </form>
                        );
                    }}
                </Formik>
            </ModalBody>
        </Modal>
    );
}
