import React, { useEffect, useRef, useState, useCallback } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
// import Graphs from '../GraphMenu/GraphComponent';
import exportIcon from '../../../assets/img/exportIcon.svg';
import addComments from '../../../assets/img/addComments.svg';
import { Field, FieldProps, Formik } from 'formik';
import SelectComponent from '../../Generics/Inputs/Select';
import { useSelector, useDispatch } from 'react-redux';
import changeStatus from '../../../api/services/changeStatus.service';
import { getPhaseCall } from '../../../redux/slice/SavePhase/getPhaseReducer';
import { getStatusCall } from '../../../redux/slice/SaveStatus/getStatusReducer';
import changePhase from '../../../api/services/changePhase.service';
import AddCommentsModal from '../../AddCommentsModal';
import { useParams } from 'react-router-dom';
import { getTargetCall } from '../../../redux/slice/getTarget/getTargetByProgramId';
import TargetGraphComponent from '../../GraphMenu/TargetGraphComponent';
import moment from 'moment';

export default function TargetMenuGraph(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [options, setOptions] = useState({
        phase: [],
        status: [],
    });
    const params = useParams();
    const [openCommentModal, setOpenCommentsModal] = useState(false);
    const ref = useRef<any>(null);
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const statusData = useSelector(
        ({ getStatusReducer }: any) => getStatusReducer?.value?.data
    );
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const phaseData = useSelector(
        ({ getPhaseReducer }: any) => getPhaseReducer?.value?.data
    );
    const targetSelected = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const [dateValue, setDateValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
    });
    const handleValueChange = (newValue: any): void => {
        setDateValue(newValue);
    };
    const handleOpenModal = (): any => {
        setOpenCommentsModal(true);
    };
    const handleCloseModal = (): any => {
        setOpenCommentsModal(false);
    };
    const initialValues: any = {
        status: '',
        phase: '',
    };
    useEffect(() => {
        dispatch(getPhaseCall({ data: '' }));
        dispatch(getStatusCall({ data: '' }));
    }, []);
    const updateOptions = useCallback(
        (key: any): void => {
            if (key === 'phase') {
                const optionsData = phaseData?.map((item: any) => ({
                    value: item?.id,
                    label: item?.name,
                }));

                setOptions((prev: any) => ({
                    ...prev,
                    [key]: optionsData,
                }));
            } else if (key === 'status') {
                const optionsData = statusData?.map((item: any) => ({
                    value: item?.id,
                    label: item?.name,
                }));
                setOptions((prev: any) => ({
                    ...prev,
                    [key]: optionsData,
                }));
            }
        },
        [phaseData, statusData]
    );
    useEffect(() => {
        if (phaseData && phaseData?.length) {
            updateOptions('phase');
        }
    }, [phaseData, updateOptions]);
    useEffect(() => {
        if (statusData && statusData?.length) {
            updateOptions('status');
        }
    }, [statusData, updateOptions]);
    const handleSubmitForm = async (values: any, name: any): Promise<void> => {
        if (name === 'status') {
            const data = {
                id: targetData?.SelectedTarget?.id,
                type: 'target',
                status: values?.label,
            };
            const res = await changeStatus.changeStatus(data);
            if (!res?.data?.error) {
                dispatch(
                    getTargetCall({
                        programId: params?.programId,
                        isTargetPinned: pinnedData?.addQuickLook,
                        quickLookId: pinnedData?.clickedQuickLook,
                    })
                );
            }
        } else {
            const data = {
                id: targetData?.SelectedTarget?.id,
                type: 'target',
                phase: values?.label,
            };
            const res = await changePhase.phaseChange(data);
            if (!res?.data?.error) {
                dispatch(
                    getTargetCall({
                        programId: params?.programId,
                        isTargetPinned: pinnedData?.addQuickLook,
                        quickLookId: pinnedData?.clickedQuickLook,
                    })
                );
            }
        }
    };
    useEffect(() => {
        if (ref.current) {
            ref?.current?.setFieldValue('phase', {
                label: targetData?.SelectedTarget?.currentPhase,
                value: targetData?.SelectedTarget?.currentPhase,
            });
            ref?.current?.setFieldValue('status', {
                label: targetData?.SelectedTarget?.targetStatus,
                value: targetData?.SelectedTarget?.targetStatus,
            });
        }
    }, [targetData?.SelectedTarget]);

    useEffect(() => {
        if (targetSelected?.initiatedDate) {
            setDateValue({
                startDate: targetSelected.initiatedDate,
                endDate: new Date(
                    moment(targetSelected.initiatedDate, 'YYYY-MM-DD')
                        .add(7, 'days')
                        .format('YYYY-MM-DD')
                ),
            });
        }
    }, [targetSelected]);

    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );
    const disable = viewMode;

    return (
        <>
            <div className="mt-5 rounded-md w-full h-[80vh] shadow-md py-2">
                <div className="flex items-center relative">
                    <div
                        className="w-2/3 bg-gradient-to-r from-[#48ABCA]
                from-0% to-transparent h-[0.2rem] rounded-t-md"
                    ></div>
                    <div className="flex justify-between mt-2 py-4 absolute end-0">
                        <div>
                            <Datepicker
                                toggleClassName="absolute bg-theme-lightBlue1 rounded-r-lg text-white
                    right-0 h-full px-3 text-gray-400 focus:outline-none
                     disabled:opacity-40 disabled:cursor-not-allowed"
                                placeholder="From Date - To Date"
                                value={dateValue}
                                onChange={handleValueChange}
                                popoverDirection="down"
                                inputClassName="py-[0.5rem] px-3 w-[17rem] border-2 border-[#E5E5E5]-800 rounded-md text-sm"
                            />
                        </div>
                        <div>
                            <button
                                disabled={disable}
                                type="button"
                                className={`relative ml-6 w-[13rem] min-h-10 flex ps-16 items-center font-normal text-sm rounded border border-transparent bg-[#47AAC9] text-white hover:bg-[#47AAC9] disabled:opacity-50 disabled:pointer-events-none ${disable ? 'bg-secondary-200 cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                            >
                                <img
                                    src={exportIcon}
                                    alt="export"
                                    className="mx-2"
                                />
                                {'Export'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex my-6">
                    <Formik
                        initialValues={initialValues}
                        innerRef={ref}
                        onSubmit={handleSubmitForm}
                        validateOnChange
                    >
                        {(props: any) => {
                            const {
                                handleSubmit,
                                setFieldTouched,
                                touched,
                                errors,
                            } = props;
                            return (
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex">
                                            <div className="px-2 w-52 ml-5">
                                                <Field
                                                    disabled={disable}
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    name="status"
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: FieldProps) => (
                                                        <SelectComponent
                                                            isDisabled={disable}
                                                            isRequired={false}
                                                            isSearchable={false}
                                                            label={
                                                                'Current Phase :'
                                                            }
                                                            options={
                                                                options?.status
                                                            }
                                                            form={{
                                                                touched,
                                                                errors,
                                                            }}
                                                            field={{
                                                                value: field.value,
                                                                name: field.name,
                                                                onChange: (
                                                                    value
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        value
                                                                    );
                                                                    handleSubmitForm(
                                                                        value,
                                                                        field.name
                                                                    );
                                                                },
                                                            }}
                                                            handleBlur={
                                                                setFieldTouched
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            );
                        }}
                    </Formik>
                    {targetSelected?.commentsAllowed && (
                        <div className="px-2 ml-4 mt-5">
                            <button
                                disabled={disable}
                                onClick={handleOpenModal}
                                type="button"
                                className={`hover:-translate-y-1 hover:transition hover:duration-500 bg-[#48ABCA] relative inline-flex justify-center items-center h-[2.5rem] w-[2.5rem] text-sm font-semibold rounded-full border border-gray-200 text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none ${disable ? 'bg-secondary-200 cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                            >
                                <img src={addComments} />
                                {targetSelected?.unreadCommentCount > 0 && (
                                    <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-[40%] translate-x-[40%] bg-red-500 text-white">
                                        {targetSelected?.unreadCommentCount ||
                                            targetData?.SelectedTarget
                                                ?.unreadCommentCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-10 px-14">
                    <TargetGraphComponent
                        id={targetSelected?.id || ''}
                        fromDate={dateValue?.startDate || ''}
                        toDate={dateValue?.endDate || ''}
                        dataType={targetSelected?.targetType || ''}
                    />
                </div>
            </div>
            <AddCommentsModal
                open={openCommentModal}
                onClose={handleCloseModal}
            />
        </>
    );
}
