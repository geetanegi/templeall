import * as React from 'react';
import { Field, Formik } from 'formik';
import AddLongTermGoalModal from '../InterventionFiles/Modal/AddLongTermGoal';
import { useSelector, useDispatch } from 'react-redux';
import { getDomainByUserTypeCall } from '../../redux/slice/Intervention/DomainsByUserType';
import { getAllPhases } from '../../redux/slice/Intervention/getAllPhasesForIntervention';
import changeStatusPhase from '../../api/services/Intervention/saveChangeStatusPhase.service';
import Notifications from '../Generics/Notifications';
import { clearShortTermGoal } from '../../redux/slice/Intervention/getShortTermGoalById';
import AddLongTermGoalModalInSessionNote from './Modal/AddLongTermGoalModalInSessionNote';
import { CustomDateWithoutTime } from '../Generics/Grid/CommonFunction';

export default function LongTermGoal({
    mode,
}: {
    mode: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [openGoal, setOpenGoal] = React.useState(false);
    const [addOpenGoal, setAddOpenGoal] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<{
        [key: string]: string;
    }>({});

    const appointment = useSelector((state: any) => state.appointment.value);
    const phaseData = useSelector(
        (state: any) => state?.interventionPhases?.value?.data
    );
    const longGoalData = useSelector(
        (state: any) => state?.allInProgressGoals?.inProgressLongTerm
    );
    const showNotification = useSelector(
        (state: any) => state?.getShortTermGoalById?.longStatus
    );
    const showAddNotification = useSelector(
        (state: any) => state?.getShortTermGoalById?.checkLongGoalStatus
    );

    React.useEffect(() => {
        dispatch(getAllPhases({ type: 'INTERVENTION_PLAN_OBJECT_STATUS' }));
    }, [dispatch]);

    React.useEffect(() => {
        // Initialize selected values based on longGoalData
        const initialSelectedValues = longGoalData?.reduce(
            (acc: any, item: any) => {
                acc[item.id] = item?.longTermGoalStatus?.id;
                return acc;
            },
            {}
        );
        setSelectedValue(initialSelectedValues);
    }, [longGoalData]);

    const closeNotification = (): any => {
        setTimeout(() => {
            dispatch(clearShortTermGoal());
        }, 2000);
    };

    const handleAddLongTermGoal = (test: boolean): void => {
        const payload = {
            providerId: appointment?.primaryProvider?.id,
            clientId: appointment?.appointmentWith?.id,
        };
        dispatch(getDomainByUserTypeCall(payload));
        setTimeout(() => {
            setOpenGoal(test);
        }, 1500);
    };
    const changeStatus = async (id: any, data: any): Promise<void> => {
        setSelectedValue((prevSelectedValues: any) => ({
            ...prevSelectedValues,
            [id]: data.target.value,
        }));
        const phaseValue = phaseData.filter(
            (item: any) => item.id == data.target.value
        );
        const payload = {
            id: id,
            type: 'longTermGoal',
            phase: phaseValue?.[0]?.name,
        };
        const res = await changeStatusPhase.changeStatus(payload);
        if (!res?.data?.error) {
        }
    };
    const handleLongTermGoalModal = (data: boolean): void => {
        const payload = {
            providerId: appointment?.primaryProvider?.id,
            clientId: appointment?.appointmentWith?.id,
        };
        dispatch(getDomainByUserTypeCall(payload));
        setTimeout(() => {
            setAddOpenGoal(data);
        }, 2000);
    };

    return (
        <>
            <div className="w-full">
                <div className=" w-full flex py-3 px-5 bg-primary-300 ">
                    <label className="text-sm font-medium w-1/2">Goal</label>
                    <label className="text-sm font-medium w-1/3">
                        Created On
                    </label>
                    <label className="text-sm font-medium w-1/4">Status</label>
                </div>
                <div className="py-3 px-4 w-full">
                    <Formik
                        initialValues={selectedValue}
                        onSubmit={() => {}}
                        enableReinitialize={true}
                    >
                        {(props: any) => {
                            const { handleSubmit } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    {longGoalData?.map(
                                        (item: any, index: any) => (
                                            <div
                                                className="flex py-3  items-center"
                                                key={index}
                                            >
                                                <div className="text-sm font-medium w-1/2">
                                                    {item?.name}
                                                </div>
                                                <div className="text-sm font-medium w-1/3">
                                                    {CustomDateWithoutTime(
                                                        item?.createdDate
                                                    )}
                                                </div>
                                                <div className="w-1/4">
                                                    <Field
                                                        as="select"
                                                        name={`status_${item.id}`}
                                                        id={`selectStatus_${item.id}`}
                                                        value={
                                                            selectedValue
                                                                ? selectedValue[
                                                                      item?.id
                                                                  ]
                                                                : ''
                                                        }
                                                        className="block w-full  rounded-md py-2 px-3 bg-transparent border border-gray-200 shadow-sm text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                                                        onChange={(e: any) =>
                                                            changeStatus(
                                                                item.id,
                                                                e
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select a status
                                                        </option>
                                                        {phaseData?.map(
                                                            (item1: any) => (
                                                                <option
                                                                    key={
                                                                        item1?.id
                                                                    }
                                                                    value={
                                                                        item1?.id
                                                                    }
                                                                >
                                                                    {
                                                                        item1?.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>

            <div className="space-x-5 text-right mt-2">
                {mode === 'view' ? null : (
                    <>
                        <button
                            type="button"
                            className={`bg-theme-lightBlue1 h-[2rem] shadow-md text-white rounded-md text-[12.5px] px-7`}
                            id="fill-and-justify-item-1"
                            data-hs-tab="#fill-and-justify-1"
                            aria-controls="fill-and-justify-1"
                            role="tab"
                            onClick={() => handleLongTermGoalModal(true)}
                        >
                            {'+ Add Goal'}
                        </button>
                        <button
                            type="button"
                            className={`bg-theme-lightBlue1 h-[2rem] shadow-md text-white rounded-md text-[12.5px] px-7`}
                            id="fill-and-justify-item-1"
                            data-hs-tab="#fill-and-justify-1"
                            aria-controls="fill-and-justify-1"
                            role="tab"
                            onClick={() => handleAddLongTermGoal(true)}
                        >
                            {'+ Create New Goal'}
                        </button>
                    </>
                )}
            </div>
            {addOpenGoal && (
                <AddLongTermGoalModalInSessionNote
                    open={addOpenGoal}
                    onClose={() => setAddOpenGoal(false)}
                />
            )}
            {openGoal && (
                <AddLongTermGoalModal
                    open={openGoal}
                    onClose={() => setOpenGoal(false)}
                    isCreatedFromSessionNote={true}
                />
            )}
            {showNotification && (
                <Notifications
                    open={true}
                    title={'Long Term Goal Created Successfully.'}
                    success={true}
                    onClose={closeNotification}
                />
            )}
            {showAddNotification && (
                <Notifications
                    open={true}
                    title={'Long Term Goal Added Successfully.'}
                    success={true}
                    onClose={closeNotification}
                />
            )}
        </>
    );
}
