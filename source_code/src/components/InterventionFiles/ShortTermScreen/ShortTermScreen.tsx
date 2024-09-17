import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import library from '../../../assets/img/libAdd.svg';
import edit from '../../../assets/img/edit.svg';
import goal from '../../../assets/img/goal.svg';
import viewScore from '../../../assets/img/viewScore.svg';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import exportIcon from '../../../assets/img/exportIcon.svg';
import {
    clearLongTermGoal,
    getAllInterventionPlanDomainByInterventionId,
    getAllInterventionPlanShortTermLongTermById,
    getGoalScore,
    getGoalType,
    getInterventionPlanById,
    getInterventionPlanDomainById,
    getInterventionPlanLongTermById,
    getInterventionPlanShortTermById,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import InterventionHeading from '../Heading/InterventionHeading';
import Tree from '../Tree/Tree';
import MenuTabs from '../MenuTabs/MenuTabs';
import AddShortTermGoalModal from '../Modal/AddShortTermGoal';
import Button from '../../Generics/Button';
import RenameComponent from '../Rename/RenameEntities';
import CurrentPhase from '../Phases/ChangePhases';
import ViewScoreShortTerm from './viewScoreShortTerm';
import {
    getShortTermGoalByIdCall,
    getShortTermScoreCall,
} from '../../../redux/slice/Intervention/getShortTermGoalById';
import ShortTermGraphComponent from '../../GraphMenu/ShortTermGraphComponent';
interface MyComponentProps {}
const ShortTermScreen: React.FC<MyComponentProps> = () => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const isViewMode = window.location.href.includes('view');
    const [openViewScore, setOpenViewScore] = useState(false);
    const [openShortGoal, setOpenShortGoal] = useState(false);
    const [domainRename, setDomainRename] = useState(false);
    const interventionData = useSelector(
        (state: any) => state.interventionSlice
    );
    const [interventionNewName, setInterventionNewName] = useState(false);
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const handleRenameLongTerm = (): void => {
        setDomainRename(true);
    };
    const handleCancelShortTerm = (): void => {
        setDomainRename(false);
        dispatch(getInterventionPlanDomainById({ id: params.domainId }));
        dispatch(
            getInterventionPlanShortTermById({ id: params?.shortTermGoalId })
        );
        dispatch(
            getAllInterventionPlanShortTermLongTermById({
                id: params.longTermGoalId,
            })
        );
    };
    const handleRenameIntervention = (): void => {
        setInterventionNewName(true);
        dispatch(
            getInterventionPlanById({ id: params.id ?? params?.interventionId })
        );
    };
    const handleCancelIntervention = (): void => {
        setInterventionNewName(false);
        dispatch(
            getInterventionPlanById({ id: params.id ?? params?.interventionId })
        );
    };
    const handleScore = (): void => {
        setOpenViewScore(true);
        dispatch(
            getShortTermScoreCall({ shortTermGoalId: params?.shortTermGoalId })
        );
    };
    useEffect(() => {
        dispatch(
            getShortTermGoalByIdCall({
                interventionPlanShortTermGoalId: params?.shortTermGoalId,
            })
        );
        dispatch(getInterventionPlanById({ id: params?.interventionId }));
        dispatch(
            getInterventionPlanDomainById({
                id:
                    interventionData?.interventionPlanDomainById?.id ||
                    params?.domainId,
            })
        );
        dispatch(
            getInterventionPlanLongTermById({ id: params?.longTermGoalId })
        );
        dispatch(
            getInterventionPlanShortTermById({ id: params?.shortTermGoalId })
        );
        dispatch(
            getAllInterventionPlanShortTermLongTermById({
                id: params?.longTermGoalId,
            })
        );
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params?.interventionId,
                type: phaseType,
            })
        );
    }, [
        dispatch,
        interventionData?.interventionPlanDomainById?.id,
        params?.domainId,
        params?.interventionId,
        params?.longTermGoalId,
        params?.shortTermGoalId,
    ]);
    const handleAddFromLibrary = (): void => {};
    const handleAddShortTermGoal = (): void => {
        setOpenShortGoal(true);
        dispatch(clearLongTermGoal());
        const data1 = {};
        dispatch(getGoalScore({ data: data1 }));
        dispatch(getGoalType({ data: data1 }));
    };
    const menuItems = [
        {
            icon: goal,
            label: 'Edit Short Term Goal',
            onClick: handleAddShortTermGoal,
        },
        {
            icon: library,
            label: 'Add From Library',
            onClick: handleAddFromLibrary,
        },
        {
            icon: viewScore,
            label: 'View Score',
            onClick: handleScore,
        },
    ];
    const [dateValue, setDateValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
    });
    const handleValueChange = (newValue: any): void => {
        setDateValue(newValue);
    };
    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );
    const disable = viewMode;
    return (
        <div data-testid="short-term-page">
            <InterventionHeading
                interventionNewName={interventionNewName}
                interventionData={interventionData}
                handleRenameIntervention={handleRenameIntervention}
                handleCancel={handleCancelIntervention}
            />
            <div className="flex">
                <Tree interventionData={interventionData} />
                <div className=" flex flex-col w-full ml-5">
                    <div className="flex flex-col pr-3 pt-2">
                        <div className="pb-1 flex items-center ">
                            {domainRename ? (
                                <>
                                    {`${interventionData?.interventionPlanShortTermById?.interventionPlanDomainId?.name}  /${interventionData?.interventionPlanShortTermById?.interventionPlanLongTermGoalId?.name} / `}
                                    <RenameComponent
                                        onCancel={() => handleCancelShortTerm()}
                                        nameValue={
                                            interventionData
                                                ?.interventionPlanShortTermById
                                                ?.name
                                                ? interventionData
                                                      ?.interventionPlanShortTermById
                                                      ?.name
                                                : ''
                                        }
                                        id={
                                            interventionData
                                                ?.interventionPlanShortTermById
                                                ?.id
                                        }
                                        type={'SHORT_TERM_GOAL'}
                                        interventionPlanId={
                                            interventionData
                                                ?.interventionPlanById?.id
                                        }
                                        interventionPlanLongTermGoalId={
                                            interventionData
                                                ?.interventionPlanLongTermById
                                                ?.id
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <label className=" font-semibold text-lg">
                                        {interventionData
                                            ?.interventionPlanDomainById?.name
                                            ? interventionData
                                                  ?.interventionPlanShortTermById
                                                  ?.interventionPlanDomainId
                                                  ?.name +
                                              '/' +
                                              interventionData
                                                  ?.interventionPlanShortTermById
                                                  ?.interventionPlanLongTermGoalId
                                                  ?.name +
                                              '/' +
                                              interventionData
                                                  ?.interventionPlanShortTermById
                                                  ?.name
                                            : ''}
                                    </label>
                                    <Button
                                        disabled={isViewMode ? true : false}
                                        onClick={handleRenameLongTerm}
                                        className="mx-2"
                                        type="secondary"
                                    >
                                        <img src={edit} alt="Edit" />
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className="w-1/2 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                    </div>
                    <div className="mr-5">
                        <MenuTabs menuItems={menuItems} />
                    </div>
                    <div className="mt-5 rounded-md w-full h-[80vh] shadow-md py-2">
                        <div className="flex items-center relative">
                            <div
                                className="w-2/3 bg-gradient-to-r from-[#48ABCA]
                from-0% to-transparent h-[0.2rem] rounded-t-md"
                            ></div>
                            <div className="flex justify-between mt-2 py-4 absolute end-5">
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
                        <div className="flex my-6 ml-4">
                            <div>
                                <CurrentPhase
                                    disableIntervention={true}
                                    id={
                                        interventionData
                                            ?.interventionPlanShortTermById?.id
                                    }
                                    defaultValue={
                                        interventionData
                                            ?.interventionPlanShortTermById
                                            ?.shortTermGoalStatus
                                    }
                                    term="shortTermGoal"
                                    interventionData={interventionData}
                                />
                            </div>
                        </div>
                        <div className="mt-10 px-14">
                            <ShortTermGraphComponent
                                id={
                                    interventionData
                                        ?.interventionPlanShortTermById?.id ||
                                    ''
                                }
                                type={
                                    interventionData
                                        ?.interventionPlanShortTermById
                                        ?.goalScore?.name || 'Score'
                                }
                                fromDate={dateValue?.startDate || ''}
                                toDate={dateValue?.endDate || ''}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {openShortGoal && (
                <AddShortTermGoalModal
                    isEdit={true}
                    open={openShortGoal}
                    onClose={() => setOpenShortGoal(false)}
                    isCreatedFromSessionNote={false}
                    interventionData={interventionData}
                />
            )}
            {openViewScore && (
                <ViewScoreShortTerm
                    open={openViewScore}
                    onClose={() => setOpenViewScore(false)}
                />
            )}
        </div>
    );
};
export default ShortTermScreen;
