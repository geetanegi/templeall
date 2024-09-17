import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import edit from '../../../assets/img/edit.svg';
import goal from '../../../assets/img/goal.svg';
import InterventionHeading from '../Heading/GoalLibraryHeading';
import Tree from '../Tree/Tree';
import MenuTabs from '../MenuTabs/MenuTabs';
import AddShortTermGoalModal from '../Modal/AddShortTermGoal';
import Button from '../../Generics/Button';
import RenameComponent from '../Rename/RenameEntities';
import {
    getAllGoalLibraryDomainByGoalLibraryId,
    getAllGoalLibraryLongTermByDomainId,
    getGoalLibraryById,
    getGoalLibraryDomainById,
    getGoalLibraryLongTermById,
    getGoalScore,
    getGoalType,
    setActiveDomainId,
    setActiveLongTermId,
    toggleExpandedDomain,
    toggleExpandedLongTerm,
} from '../../../redux/slice/GoalLibrary/GoalLibraryData';
import AddLongTermGoalModal from '../Modal/AddLongTermGoal';

interface MyComponentProps {}

const LongTermScreen: React.FC<MyComponentProps> = () => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const [openGoal, setOpenGoal] = useState(false);
    const [openShortGoal, setOpenShortGoal] = useState(false);
    const [domainRename, setDomainRename] = useState(false);
    const [interventionNewName, setInterventionNewName] = useState(false);

    const goalLibrarySlice = useSelector(
        (state: any) => state.GoalLibrarySlice
    );
    const goalLibraryId = params.id ?? params.goalLibraryId ?? '';
    const domainId = params.domainId ?? '';
    const LongTermId = params.longTermGoalId ?? '';

    const GoalLibraryData = goalLibrarySlice.goalLibraryById?.[goalLibraryId];
    const GoalLibraryDomainData =
        goalLibrarySlice.goalLibraryDomainById?.[domainId];
    const GoalLibraryLongTermData =
        goalLibrarySlice.goalLibraryLongTermById?.[LongTermId];

    const handleRenameLongTerm = (): void => setDomainRename(true);
    const handleCancelLongTerm = (): void => {
        setDomainRename(false);
        dispatch(getGoalLibraryDomainById({ id: domainId }));
        dispatch(getGoalLibraryLongTermById({ id: LongTermId }));
        dispatch(getAllGoalLibraryLongTermByDomainId({ id: domainId }));
    };
    const handleRenameIntervention = (): void => {
        setInterventionNewName(true);
        dispatch(getGoalLibraryById({ id: goalLibraryId }));
    };
    const handleCancelIntervention = (): void => {
        setInterventionNewName(false);
        dispatch(getGoalLibraryById({ id: goalLibraryId }));
    };
    useEffect(() => {
        dispatch(getAllGoalLibraryLongTermByDomainId({ id: domainId }));
        dispatch(getGoalLibraryById({ id: goalLibraryId }));
        dispatch(getGoalLibraryLongTermById({ id: LongTermId }));
        dispatch(getGoalLibraryDomainById({ id: domainId }));
        dispatch(getAllGoalLibraryDomainByGoalLibraryId({ id: goalLibraryId }));
        if (!goalLibrarySlice.expandedDomains.includes(domainId)) {
            dispatch(toggleExpandedDomain(domainId));
            dispatch(setActiveDomainId(domainId));
        }
        if (!goalLibrarySlice.expandedLongTerms.includes(LongTermId)) {
            dispatch(toggleExpandedLongTerm(LongTermId));
            dispatch(setActiveLongTermId(LongTermId));
        }
    }, [
        LongTermId,
        dispatch,
        domainId,
        goalLibraryId,
        goalLibrarySlice.expandedDomains,
        goalLibrarySlice.expandedLongTerms,
    ]);

    const handleAddShortTermGoal = (): void => {
        setOpenShortGoal(true);
        const data = {};
        dispatch(getGoalScore({ data }));
        dispatch(getGoalType({ data }));
    };
    const handleAddLongTermGoal = (): void => {
        setOpenGoal(true);
    };

    const menuItems = [
        {
            icon: goal,
            label: 'Edit Long Term Goal',
            onClick: handleAddLongTermGoal,
        },
        {
            icon: goal,
            label: 'Add Short Term Goal',
            onClick: handleAddShortTermGoal,
        },
    ];

    return (
        <div data-testid="long-term-screen">
            <InterventionHeading
                interventionNewName={interventionNewName}
                goalLibrarySlice={goalLibrarySlice}
                handleRenameIntervention={handleRenameIntervention}
                handleCancel={handleCancelIntervention}
            />
            <div className="flex">
                <Tree libraryId={goalLibraryId} />
                <div className="flex flex-col w-full ml-5">
                    <div className="flex flex-col pr-3 pt-2">
                        <div className="pb-1 flex items-center">
                            {domainRename ? (
                                <>
                                    {`${GoalLibraryDomainData?.name} / `}
                                    <RenameComponent
                                        onCancel={handleCancelLongTerm}
                                        nameValue={
                                            GoalLibraryLongTermData?.name ?? ''
                                        }
                                        id={GoalLibraryLongTermData?.id}
                                        interventionPlanDomainId={
                                            GoalLibraryDomainData?.id
                                        }
                                        type="LONG_TERM_GOAL"
                                        interventionLibraryId={
                                            GoalLibraryData?.id
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <label className="font-semibold text-lg">
                                        {GoalLibraryDomainData?.name
                                            ? `${
                                                  GoalLibraryLongTermData
                                                      ?.interventionPlanDomainId
                                                      ?.name +
                                                  '/' +
                                                  GoalLibraryLongTermData?.name
                                              }`
                                            : ''}
                                    </label>
                                    <Button
                                        onClick={handleRenameLongTerm}
                                        className="mx-2"
                                        type="secondary"
                                    >
                                        <img src={edit} alt="Edit" />
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className="w-1/2 bg-gradient-to-r from-[#48ABCA] to-transparent h-[0.2rem]"></div>
                    </div>
                    <div className="mr-5">
                        <MenuTabs menuItems={menuItems} />
                    </div>
                </div>
            </div>
            {openGoal && (
                <AddLongTermGoalModal
                    isEdit={true}
                    open={openGoal}
                    onClose={() => setOpenGoal(false)}
                    isCreatedFromSessionNote={false}
                    goalLibrarySlice={goalLibrarySlice}
                />
            )}
            {openShortGoal && (
                <AddShortTermGoalModal
                    open={openShortGoal}
                    onClose={() => setOpenShortGoal(false)}
                    isCreatedFromSessionNote={false}
                    goalLibrarySlice={goalLibrarySlice}
                />
            )}
        </div>
    );
};

export default LongTermScreen;
