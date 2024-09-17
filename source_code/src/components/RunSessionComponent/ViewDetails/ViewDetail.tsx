import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../../Generics/Modal';
import durationIcon from '../../../assets/img/sessionScreen/durationIcon.svg';
import percentageIcon from '../../../assets/img/sessionScreen/percentageIcon.svg';
import frequencyIcon from '../../../assets/img/sessionScreen/Frequency.svg';
import latencyIcon from '../../../assets/img/latency.svg';
import ratingScaleIcon from '../../../assets/img/ratingScale.svg';
import scoreIcon from '../../../assets/img/score.svg';
import rateIcon from '../../../assets/img/sessionScreen/rate.svg';
import firstProbeIcon from '../../../assets/img/sessionScreen/firstprobe.svg';
import timeSamplingIcon from '../../../assets/img/sessionScreen/timesampling.svg';
import taskAnalysisIcon from '../../../assets/img/taskAnalysis.svg';
import TemplateData from '../../AddProgramModal/TemplateData';
import { Field, Formik, FormikValues, FormikHelpers } from 'formik';
import check from '../../../assets/img/check.svg';
import saveCommentsAPI from '../../../api/services/Comments/saveComments.service';
import { getAllCommentCall } from '../../../redux/slice/Comments/getComments';
import { useDispatch, useSelector } from 'react-redux';
import deleteCommentAPI from '../../../api/services/Comments/deleteComment.service';
import { utc } from 'moment';
import readMsg from '../../../assets/img/readMsg.svg';
import deleteMsg from '../../../assets/img/deleteMsg.svg';
import markReadAPI from '../../../api/services/Comments/markRead.service';
import { AppDispatch, IRootState } from '../../../redux/store';
interface Values {
    comments: string;
}
interface RootState {
    getComment: { value: { data: string[] } };
    runSession: { value: { session: { id: number } } };
}
export default function ViewDetail({
    open,
    onClose,
    target,
    currentTrial,
}: {
    open: boolean;
    onClose: any;
    target: any;
    currentTrial: any;
}): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const commentsData = useSelector(
        ({ getComment }: RootState) => getComment?.value?.data
    );
    const runSessionData = useSelector(
        ({ runSession }: RootState) => runSession?.value?.session
    );
    const initialValues: any = {
        comments: '',
    };
    const userPermission = useSelector(
        ({ getUserPermission }: IRootState) => getUserPermission
    );
    const [openDescription, setOpenDescription] = React.useState(false);
    const [openComments, setOpenComments] = React.useState(false);
    const [openGuidline, setOpenGuidline] = React.useState(false);
    const [, setGuidelineValue] = React.useState({});
    const url = window.location.href?.includes('view');
    const targetDetails =
        target?.masteryDataPrompts === undefined
            ? []
            : JSON?.parse(target?.masteryDataPrompts);
    const value = target?.templateData
        ? JSON?.parse(target?.templateData)
        : '{}';
    const guideline = target?.guidelineTemplateId?.data
        ? JSON?.parse(target?.guidelineTemplateId?.data)
        : '{}';
    const card1 = [
        {
            label: 'Current Phase',
            value: target?.targetStatus?.name,
        },
        {
            label: 'Upto Last 3 prompts used',
            value: targetDetails?.slice(-3).join(', '),
        },
        { label: 'Number of trials saved', value: '-' },
    ];
    const filterOptions: { [key: string]: (item: any) => boolean } = {
        Percent: () => true,
        'Task Analysis': (item) =>
            item.label === 'Current Phase' ||
            item.label === 'Upto Last 3 prompts used',
        Default: (item) => item.label === 'Current Phase',
    };
    const filterFunction =
        filterOptions[target?.targetType] || filterOptions['Default'];
    const filteredCardData =
        target?.targetType === 'Percent'
            ? card1
            : card1?.filter(filterFunction);
    React.useEffect(() => {
        if (target?.targetGoal?.length) {
            setOpenDescription(true);
        }
    }, [target?.id]);
    const setInitialValues = (): any => {
        if (value) {
            return value;
        } else {
            return '{}';
        }
    };
    const handleGuidelineTemplateSubmit = async (
        values: FormikValues
    ): Promise<any> => {
        const valueForm = setInitialValues();
        const responseObj: any = {};
        Object.keys(valueForm).forEach((keyName: string | any) => {
            if (values[keyName]) {
                responseObj[keyName] = values[keyName];
            } else {
                responseObj[keyName] = valueForm[keyName];
            }
        });
        setGuidelineValue(responseObj);
    };
    const getTime = (date: string[]): string => {
        const duration = utc(date).local().fromNow();
        if (duration?.split(' ')[0] === 'in') {
            return 'a few seconds ago';
        } else if (duration === 'a few seconds ago') {
            return 'a minute ago';
        } else {
            return duration;
        }
    };
    const handleKeyChange = (
        e: { key: string; target: { value: string | any[] } },
        values: FormikValues,
        submitForm: any,
        resetForm: any
    ): void => {
        (async () => {
            if (e.key == 'Enter') {
                if (e.target.value?.length !== 0) {
                    const data = {
                        commentsId: '',
                        createdBy: userPermission?.value?.data?.userId || 1,
                        modifiedBy: userPermission?.value?.data?.userId || 1,
                        name: 'abc',
                        comments: e?.target?.value,
                        targetId: target?.id,
                        sessionRunId: runSessionData?.id,
                    };
                    await saveCommentsAPI.saveComments(data);
                    submitForm();
                    resetForm();
                    dispatch(getAllCommentCall({ targetId: target?.id }));
                }
            }
        })();
    };
    const markAsRead = async (id: number): Promise<any> => {
        const data1 = {
            commentsId: id,
            targetId: target?.id,
        };
        const res = await markReadAPI.markRead(data1);
        dispatch(getAllCommentCall({ targetId: target?.id }));
        if (!res?.data?.error) {
            return res?.data;
        } else {
            return '';
        }
    };
    const unsendComments = async (id: number): Promise<any> => {
        const data = {
            commentsId: id,
            targetId: target?.id,
        };
        const response = await deleteCommentAPI.deleteComments(data);
        dispatch(getAllCommentCall({ targetId: target?.id }));
        if (!response?.data?.error) {
            return response?.data;
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
        dispatch(getAllCommentCall({ targetId: target?.id }));
    }, []);
    const iconMap: any = {
        Percent: { src: percentageIcon, alt: 'Percentage' },
        Duration: { src: durationIcon, alt: 'Duration' },
        'Rating Scale': {
            src: ratingScaleIcon,
            alt: 'Rating Scale Icon',
            className: 'w-4 h-4',
        },
        Latency: {
            src: latencyIcon,
            alt: 'Latency Icon',
            className: 'w-4 h-4',
        },
        Score: { src: scoreIcon, alt: 'Score Icon', className: 'w-4 h-4' },
        Frequency: { src: frequencyIcon, alt: 'Frequency' },
        rate: { src: rateIcon, alt: 'Rate', className: 'w-4 h-4' },
        'First Probe': {
            src: firstProbeIcon,
            alt: 'First Probe',
            className: 'w-4 h-4',
        },
        'Time Sampling': {
            src: timeSamplingIcon,
            alt: 'Time Sampling',
            className: 'w-4 h-4',
        },
        'Task Analysis': {
            src: taskAnalysisIcon,
            alt: 'Task Analysis Icon',
            className: 'w-4 h-4',
        },
    };
    const iconProps = iconMap[target?.targetType] || {};
    return (
        <>
            <Modal
                open={open}
                id={'view-detail-percent-modal'}
                expandModal={false}
            >
                <ModalHeader
                    title={`Program Name: ${target?.programName}`}
                    onClose={onClose}
                    closeIcon={true}
                />
                <ModalBody expandModal={false}>
                    <div className="md:px-9 md:pb-5 w-[60rem] space-y-2">
                        <div className="flex justify-between">
                            <label className="text-medium font-medium text-theme-lightBlue1">
                                {`Trial ${currentTrial}`}
                            </label>
                            <div className="flex space-x-1 items-center">
                                {iconProps.src && <img {...iconProps} />}
                                <label>
                                    {target?.targetType}
                                    {target?.targetType === 'Task Analysis' && (
                                        <label className="ml-2">
                                            {`(${target?.taskAnalysisType})`}
                                        </label>
                                    )}{' '}
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2 p-4 border shadow-sm rounded-md">
                            {filteredCardData?.map((item, index) => {
                                return (
                                    <div
                                        className="flex justify-between"
                                        key={index}
                                    >
                                        <label className="text-medium font-medium">
                                            {item?.label}
                                        </label>
                                        <label className="text-medium font-normal">
                                            {item?.value}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-4 border shadow-sm rounded-md space-y-4">
                            <div
                                className="flex justify-between border-b-gray-400 border-b-[1px] pb-2"
                                onClick={() => {
                                    setOpenDescription(!openDescription);
                                }}
                            >
                                <label className="text-medium font-medium">
                                    Description Text
                                </label>
                                <svg
                                    className={`${openDescription && 'rotate-180'} flex-shrink-0 h-[1.4rem] cursor-pointer`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                            <div
                                className={`${openDescription ? '' : 'hidden'}`}
                            >
                                <p>{target?.targetGoal}</p>
                            </div>
                        </div>
                        {(target?.targetType === 'Percent' ||
                            target?.targetType === 'Score') && (
                            <div className="p-4 border shadow-sm rounded-md space-y-3">
                                <div className="border-b-gray-400 border-b-[1px] pb-2">
                                    <label className="text-medium font-medium ">
                                        Trial Activity
                                    </label>
                                </div>
                                <div className="grid grid-cols-4 gap-4 pt-3">
                                    {targetDetails?.map(
                                        (
                                            item: string | number | boolean,
                                            index: number
                                        ) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="relative"
                                                >
                                                    <div className="absolute bg-white -start-3 -top-2 px-2 rounded-full border-gray-400 shadow-md">
                                                        <span className="text-md font-md">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="z-0 py-2 px-4 border shadow-md rounded-md w-max"
                                                        key={index}
                                                    >
                                                        <span className="text-sm font-md">
                                                            {item}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="p-4 border shadow-sm rounded-md space-y-4">
                            <div
                                className="flex justify-between border-b-gray-400 border-b-[1px] pb-2"
                                onClick={() => {
                                    setOpenGuidline(!openGuidline);
                                }}
                            >
                                <label className="text-medium font-medium">
                                    Guideline Notes
                                </label>
                                <svg
                                    className={`${openGuidline && 'rotate-180'} flex-shrink-0 h-[1.4rem] cursor-pointer`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                            <div
                                className={`${openGuidline ? 'space-y-4' : 'hidden'}`}
                            >
                                <Formik
                                    initialValues={setInitialValues()}
                                    onSubmit={handleGuidelineTemplateSubmit}
                                    validateOnChange
                                    enableReinitialize={true}
                                >
                                    {() => {
                                        return (
                                            <>
                                                <form>
                                                    <div
                                                        className={`${url ? 'pointer-events-none' : 'relative mt-5 pl-2'}`}
                                                    >
                                                        {guideline?.template?.map(
                                                            (
                                                                obj: {
                                                                    name: any;
                                                                    label: any;
                                                                    instructions: any;
                                                                    validations: {
                                                                        required: any;
                                                                    };
                                                                    htmlType: any;
                                                                    options: any;
                                                                    type: any;
                                                                },
                                                                index: number
                                                            ) => (
                                                                <>
                                                                    <TemplateData
                                                                        preventSubmit={
                                                                            false
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                        name={
                                                                            obj.name
                                                                        }
                                                                        label={
                                                                            obj?.label
                                                                        }
                                                                        instruction={
                                                                            obj?.instructions
                                                                        }
                                                                        isRequired={
                                                                            obj
                                                                                ?.validations
                                                                                ?.required ||
                                                                            false
                                                                        }
                                                                        htmlType={
                                                                            obj?.htmlType
                                                                        }
                                                                        options={
                                                                            obj?.options
                                                                        }
                                                                        type={
                                                                            obj.type
                                                                        }
                                                                    />
                                                                </>
                                                            )
                                                        )}
                                                    </div>
                                                </form>
                                            </>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </div>
                        {target?.commentsAllowed && (
                            <div className="p-4 pb-2 border shadow-sm rounded-md space-y-4">
                                <div
                                    className="flex justify-between border-b-gray-400 border-b-[1px] pb-2"
                                    onClick={() => {
                                        setOpenComments(!openComments);
                                    }}
                                >
                                    <label className="text-medium font-medium">
                                        Comments
                                    </label>
                                    <svg
                                        className={`${openComments && 'rotate-180'} flex-shrink-0 h-[1.4rem] cursor-pointer`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>
                                <div
                                    className={`${openComments ? 'flex flex-col relative' : 'hidden'}`}
                                >
                                    <div
                                        className={`${url ? 'pointer-events-none' : ''}`}
                                    >
                                        <div className="space-y-2">
                                            {commentsData?.map(
                                                (item: any, index: number) => {
                                                    return (
                                                        item?.comments?.length >
                                                            0 && (
                                                            <div
                                                                className="bg-gradient-to-r from-gray-100 hover:from-primary-200 from-0 hover:from-0 hover:to-transparent hover:cursor-pointer to-transparent px-3 py-1.5 flex justify-between items-center"
                                                                key={index}
                                                            >
                                                                <div className="space-x-5 flex items-center">
                                                                    <div
                                                                        onClick={() => {
                                                                            markAsRead(
                                                                                item?.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        {item?.isRead ? (
                                                                            <img
                                                                                src={
                                                                                    check
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <img
                                                                                src={
                                                                                    readMsg
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <label
                                                                        className={`${item?.isRead ? 'font-extralight' : 'font-medium'} text-md`}
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
                                                                        {`
                                                                                            ${item?.createdBy.firstName} ${item?.createdBy?.lastName} `}
                                                                    </label>
                                                                </div>
                                                                <div
                                                                    onClick={() => {
                                                                        unsendComments(
                                                                            item?.id
                                                                        );
                                                                    }}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <img
                                                                        src={
                                                                            deleteMsg
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    );
                                                }
                                            )}
                                        </div>
                                        <Formik
                                            initialValues={initialValues}
                                            onSubmit={handleSubmitForm}
                                            enableReinitialize={false}
                                        >
                                            {(props) => {
                                                const {
                                                    values,
                                                    submitForm,
                                                    handleSubmit,
                                                    resetForm,
                                                } = props;
                                                return (
                                                    <form
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <div className="">
                                                            <Field
                                                                as="textarea"
                                                                isRequired={
                                                                    false
                                                                }
                                                                id="comments"
                                                                name="comments"
                                                                rows={4}
                                                                className="py-2 mt-5 ps-4 rounded-md w-full border-2 border-gray-300 shadow-md outline-none"
                                                                value={
                                                                    values?.comments
                                                                }
                                                                onKeyDown={(e: {
                                                                    key: string;
                                                                    target: {
                                                                        value: string;
                                                                    };
                                                                }) => {
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
                                                                    Press ENTER
                                                                    to save
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </form>
                                                );
                                            }}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
