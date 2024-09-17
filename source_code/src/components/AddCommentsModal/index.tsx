import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import { Field, Formik, FormikValues, FormikHelpers } from 'formik';
import check from '../../assets/img/check.svg';
import { getAllCommentCall } from '../../redux/slice/Comments/getComments';
import Tooltip from '../Generics/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import markReadAPI from '../../api/services/Comments/markRead.service';
import deleteMsg from '../../assets/img/deleteMsg.svg';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import readMsg from '../../assets/img/readMsg.svg';
import deleteCommentAPI from '../../api/services/Comments/deleteComment.service';
import {
    getTargetByIdCall,
    getTargetCall,
} from '../../redux/slice/getTarget/getTargetByProgramId';
import saveCommentsAPI from '../../api/services/Comments/saveComments.service';

interface Values {
    comments: string;
}

export default function AddCommentsModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const initialValues: any = {
        comments: '',
    };
    const params = useParams();
    const target = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const commentsData = useSelector(
        ({ getComment }: any) => getComment?.value?.data
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const dispatch = useDispatch<any>();
    const handleKeyChange = async (
        e: any,
        values: FormikValues,
        submitForm: any,
        resetForm: any
    ): Promise<any> => {
        if (e.key == 'Enter') {
            if (e.target.value?.length !== 0) {
                const data = {
                    commentsId: '',
                    createdBy: userPermission?.value?.data?.userId || 1,
                    modifiedBy: userPermission?.value?.data?.userId || 1,
                    name: 'abc',
                    comments: e?.target?.value,
                    targetId: params?.targetId ?? target?.id,
                    sessionRunId: '',
                };
                const res = await saveCommentsAPI.saveComments(data);

                dispatch(
                    getAllCommentCall({
                        targetId: params?.targetId ?? target?.id,
                    })
                );
                dispatch(
                    getTargetByIdCall({
                        targetId: params?.targetId ?? target?.id,
                    })
                );
                dispatch(
                    getTargetCall({
                        programId: params?.programId,
                        isTargetPinned: pinnedData?.addQuickLook,
                        quickLookId: pinnedData?.clickedQuickLook,
                    })
                );
                submitForm();
                resetForm();
                if (!res?.data?.error) {
                    return res?.data;
                } else {
                    return '';
                }
            }
        }
    };
    const getTime = (date: any): any => {
        const duration = moment.utc(date).local().fromNow();
        if (duration?.split(' ')[0] === 'in') {
            return 'a few seconds ago';
        } else if (duration === 'a few seconds ago') {
            return 'a minute ago';
        } else {
            return duration;
        }
    };

    const unsendComments = async (id: any): Promise<any> => {
        const data = {
            commentsId: id,
            targetId: params?.targetId ?? target?.id,
        };
        const response = await deleteCommentAPI.deleteComments(data);
        dispatch(
            getAllCommentCall({ targetId: params?.targetId ?? target?.id })
        );
        dispatch(
            getTargetByIdCall({ targetId: params?.targetId ?? target?.id })
        );
        dispatch(
            getTargetCall({
                programId: params?.programId,
                isTargetPinned: pinnedData?.addQuickLook,
                quickLookId: pinnedData?.clickedQuickLook,
            })
        );
        if (!response?.data?.error) {
            return response?.data;
        } else {
            return '';
        }
    };

    const markAsRead = async (id: any): Promise<any> => {
        const data1 = {
            commentsId: id,
            targetId: params?.targetId ?? target?.id,
        };
        const res = await markReadAPI.markRead(data1);
        dispatch(
            getAllCommentCall({ targetId: params?.targetId ?? target?.id })
        );
        dispatch(
            getTargetByIdCall({ targetId: params?.targetId ?? target?.id })
        );
        dispatch(
            getTargetCall({
                programId: params?.programId,
                isTargetPinned: pinnedData?.addQuickLook,
                quickLookId: pinnedData?.clickedQuickLook,
            })
        );
        if (!res?.data?.error) {
            return res?.data;
        } else {
            return '';
        }
    };

    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
    };
    React.useEffect(() => {
        dispatch(
            getAllCommentCall({ targetId: params?.targetId ?? target?.id })
        );
    }, [params?.targetId]);
    return (
        <Modal open={open} id={'add-comments-modal'} expandModal={false}>
            <ModalHeader
                title={'Comments'}
                onClose={onClose}
                closeIcon={true}
            />
            <ModalBody expandModal={false}>
                <div className="w-[50rem] px-8 py-4 mt-5">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        enableReinitialize={true}
                    >
                        {(props: any) => {
                            const {
                                values,
                                submitForm,
                                handleSubmit,
                                resetForm,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="">
                                        <div className="space-y-2">
                                            {commentsData?.map((item: any) => {
                                                // Replace `item.id` with the actual unique identifier property
                                                if (
                                                    item?.comments?.length > 0
                                                ) {
                                                    return (
                                                        <div
                                                            className="bg-gradient-to-r from-gray-100 hover:from-primary-200 from-0 hover:from-0 hover:to-transparent hover:cursor-pointer to-transparent px-3 py-1.5 flex justify-between items-center"
                                                            key={item.id} // Use unique identifier as the key
                                                        >
                                                            <div className="space-x-5 flex items-center">
                                                                <div
                                                                    onClick={() =>
                                                                        markAsRead(
                                                                            item?.id
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    {item?.isRead ? (
                                                                        <img
                                                                            src={
                                                                                check
                                                                            }
                                                                            alt="Checked"
                                                                        />
                                                                    ) : (
                                                                        <Tooltip title="Mark as read">
                                                                            <img
                                                                                src={
                                                                                    readMsg
                                                                                }
                                                                                alt="Unread"
                                                                            />
                                                                        </Tooltip>
                                                                    )}
                                                                </div>

                                                                <label
                                                                    className={`${
                                                                        item?.isRead
                                                                            ? 'font-extralight'
                                                                            : 'font-semibold'
                                                                    } text-md`}
                                                                >
                                                                    {
                                                                        item?.comments
                                                                    }
                                                                </label>

                                                                <label className="text-md font-extralight">
                                                                    {getTime(
                                                                        item?.createdDate
                                                                    )}
                                                                </label>

                                                                <label className="text-md font-extralight">
                                                                    {`${item?.createdBy?.firstName} ${item?.createdBy?.lastName}`}
                                                                </label>
                                                            </div>
                                                            <div
                                                                onClick={() =>
                                                                    unsendComments(
                                                                        item?.id
                                                                    )
                                                                }
                                                                className="cursor-pointer mr-6"
                                                            >
                                                                <img
                                                                    src={
                                                                        deleteMsg
                                                                    }
                                                                    alt="Delete"
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>

                                        {target?.commentsAllowed && (
                                            <>
                                                <Field
                                                    as="textarea"
                                                    isRequired={false}
                                                    id="comments"
                                                    name="comments"
                                                    rows={4}
                                                    className="py-2 mt-5 ps-4 rounded-md w-full border-2 border-gray-300 shadow-md outline-none"
                                                    value={values?.comments}
                                                    onKeyDown={(e: any) => {
                                                        handleKeyChange(
                                                            e,
                                                            values,
                                                            submitForm,
                                                            resetForm
                                                        );
                                                    }}
                                                    placeholder="Add comments"
                                                />
                                                <div className="flex justify-end mt-1">
                                                    <label className="text-sm font-light font-[monospace] text-gray-600">
                                                        Press ENTER to save
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
}
