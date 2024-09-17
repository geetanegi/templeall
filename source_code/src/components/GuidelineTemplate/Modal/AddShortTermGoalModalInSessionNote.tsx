import * as React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
import Checkbox from '../../Generics/Inputs/Checkbox';
import domain from '../../../assets/img/domain.svg';
import { useSelector, useDispatch } from 'react-redux';
import saveShortTermsGoalsTree from '../../../api/services/Intervention/saveAddShortTermGoalsTree.service';
import { setStatusShortTermGoalFromCheck } from '../../../redux/slice/Intervention/getShortTermGoalById';
import { callShortInProgressGoals } from '../../../redux/slice/Intervention/InProgressShortTermLongTerm';
import { getAllNotShortTermGoal } from '../../../redux/slice/Intervention/AllNotShortTermGoals';
import { getAllInterventionPlanLongTermByDomainId } from '../../../redux/slice/InterventionAll/InterventionSlice';
export default function AddShortTermGoalModalInSessionNote({
    open,
    onClose,
}: {
    open: any;
    onClose: any;
}): React.JSX.Element {
    const [openListIndex, setOpenListIndex] = React.useState<any>({});
    const [check, setCheck] = React.useState<any>({});
    const [checkedValues, setCheckedValues] = React.useState<any>([]);
    const dispatch = useDispatch<any>();
    const toggleList = (index: any): any => {
        setOpenListIndex((prevOpenListIndex: any) => ({
            ...prevOpenListIndex,
            [index]: !prevOpenListIndex[index],
        }));
    };
    const interventionShortTermGoalData = useSelector(
        (state: any) => state.allNotInprogressGoals?.value
    );
    const InProgressDomainData = useSelector(
        ({ DomainsByUserType }: any) => DomainsByUserType?.domain
    );
    const appointment = useSelector((state: any) => state.appointment.value);
    const LongTermGoalData = useSelector(
        (state: any) =>
            state.interventionSlice?.allInterventionPlanLongTermByDomainId
    );
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const handleCheckboxChange = (index: any): any => {
        setCheck((prevOpenListIndex: any) => ({
            ...prevOpenListIndex,
            [index]: !prevOpenListIndex[index],
        }));
        setCheckedValues([...checkedValues, index]);
    };
    const handleDomainClick = (item: any): void => {
        dispatch(
            getAllInterventionPlanLongTermByDomainId({
                id: item?.id,
                type: phaseType,
            })
        );
    };
    const handleProgramClick = (itemProgram: any): void => {
        dispatch(
            getAllNotShortTermGoal({
                longTermGoalId: itemProgram?.id,
            })
        );
    };
    const handleSubmitFrom = async (e: any): Promise<void> => {
        e.preventDefault();
        const payload = {
            shortTermGoalIds: checkedValues,
        };
        const res = await saveShortTermsGoalsTree.saveGoals(payload);
        if (!res?.data?.error) {
            onClose(false);
            const payloadData = {
                providerId: appointment?.primaryProvider?.id || '',
                clientId: appointment?.appointmentWith?.id || '',
            };
            dispatch(callShortInProgressGoals(payloadData));
            dispatch(setStatusShortTermGoalFromCheck());
        }
    };
    return (
        <>
            <Modal open={open} id={'add-shortTermGoal'} expandModal={false}>
                <ModalHeader
                    title={'Add Short Term Goal'}
                    onExpand={undefined}
                    icon={false}
                />
                <ModalBody expandModal={false}>
                    <div className="w-[60rem]">
                        <div
                            id="application-sidebar"
                            className={`max-h-[25rem] w-full h-auto z-auto hs-overlay rounded-md hs-overlay-open:translate-x-0 -translate-x-full  transition-all duration-300 transform top-0 start-0 bottom-0 z-[60] border-e border-gray-200 pb-10  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0`}
                        >
                            <nav
                                className={`rounded-b-md hs-accordion-group py-1 w-full flex flex-col flex-wrap overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-primary-600`}
                            >
                                <ul className="space-b-1.5">
                                    {InProgressDomainData?.map(
                                        (item: any, index: any) => {
                                            return (
                                                <li
                                                    className="hs-accordion border-b-[0.1rem] border-solid border-[#394148]"
                                                    id="users-accordion"
                                                    key={index}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleDomainClick(
                                                                item
                                                            )
                                                        }
                                                        type="button"
                                                        className={`hs-accordion-toggle px-6 py-3 w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 ${
                                                            !openListIndex[
                                                                item?.id
                                                            ]
                                                                ? 'hover:bg-gray-300'
                                                                : 'bg-gray-300'
                                                        } hover:bg-gray-300`}
                                                    >
                                                        <img src={domain}></img>
                                                        <label className="text-[#333333] font-medium text-md ">
                                                            {item?.name}
                                                        </label>
                                                        <svg
                                                            onClick={() =>
                                                                toggleList(
                                                                    item?.id
                                                                )
                                                            }
                                                            className={`${openListIndex[item?.id] ? 'rotate-180' : ''} hs-accordion-active:hidden ms-auto block w-4 h-4 cursor-pointer`}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="m6 9 6 6 6-6" />
                                                        </svg>
                                                    </button>
                                                    <div
                                                        id="users-accordion-sub"
                                                        className={`${
                                                            !openListIndex[
                                                                item?.id
                                                            ]
                                                                ? 'hidden'
                                                                : ''
                                                        } hs-accordion-content w-full overflow-hidden transition-[height] duration-300`}
                                                    >
                                                        <ul
                                                            className="hs-accordion-group"
                                                            data-hs-accordion-always-open
                                                        >
                                                            {LongTermGoalData?.[
                                                                item?.id
                                                            ]?.map(
                                                                (
                                                                    itemGoal: any,
                                                                    indexGoal: any
                                                                ) => {
                                                                    return (
                                                                        <li
                                                                            className="hs-accordion"
                                                                            id="users-accordion-sub-1"
                                                                            key={
                                                                                indexGoal
                                                                            }
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    handleProgramClick(
                                                                                        itemGoal
                                                                                    );
                                                                                }}
                                                                                className={`${
                                                                                    !openListIndex[
                                                                                        itemGoal
                                                                                            ?.id
                                                                                    ]
                                                                                        ? ' hover:bg-gray-200'
                                                                                        : 'bg-gray-200'
                                                                                } hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-[1.5rem] hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700`}
                                                                            >
                                                                                <div className="flex space-x-3">
                                                                                    <div>
                                                                                        <label className="font-normal ps-8">
                                                                                            {
                                                                                                itemGoal?.name
                                                                                            }
                                                                                        </label>
                                                                                    </div>
                                                                                    <div>
                                                                                        <svg
                                                                                            onClick={() =>
                                                                                                toggleList(
                                                                                                    itemGoal?.id
                                                                                                )
                                                                                            }
                                                                                            className={`${openListIndex[itemGoal?.id] ? 'rotate-180' : ''} hs-accordion-active:hidden block w-4 h-4 cursor-pointer`}
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            width="24"
                                                                                            height="24"
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
                                                                                </div>
                                                                            </button>
                                                                            <div
                                                                                id="users-accordion-sub-1-child"
                                                                                className={`${!openListIndex[itemGoal?.id] ? 'hidden' : ''} droppable hs-accordion-content w-full overflow-hidden transition-[height] duration-300`}
                                                                            >
                                                                                <ul className="flex flex-col">
                                                                                    {interventionShortTermGoalData?.[
                                                                                        itemGoal
                                                                                            ?.id
                                                                                    ]?.map(
                                                                                        (
                                                                                            itemShortTerm: any,
                                                                                            indexShortTerm: any
                                                                                        ) => {
                                                                                            return (
                                                                                                <div
                                                                                                    key={
                                                                                                        indexShortTerm
                                                                                                    }
                                                                                                >
                                                                                                    <li
                                                                                                        className={`${openListIndex[itemShortTerm?.id] ? ' hover:bg-gray-100' : 'bg-gray-100'} flex items-start ps-[3rem]  justify-between `}
                                                                                                    >
                                                                                                        <div
                                                                                                            className="flex space-x-2 items-center"
                                                                                                            onClick={() =>
                                                                                                                toggleList(
                                                                                                                    itemShortTerm?.id
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            <Checkbox
                                                                                                                checked={
                                                                                                                    check[
                                                                                                                        itemShortTerm
                                                                                                                    ]
                                                                                                                }
                                                                                                                onChange={() =>
                                                                                                                    handleCheckboxChange(
                                                                                                                        itemShortTerm?.id
                                                                                                                    )
                                                                                                                }
                                                                                                            />
                                                                                                            <label className="text-[#333333] font-sm text-sm p-2  flex">
                                                                                                                <label className="font-light">
                                                                                                                    {
                                                                                                                        itemShortTerm?.name
                                                                                                                    }
                                                                                                                </label>
                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </ModalBody>
                <CreateClientModalActions
                    onClose={onClose}
                    isDisabled={false}
                    handleSubmit={handleSubmitFrom}
                />
            </Modal>
        </>
    );
}
