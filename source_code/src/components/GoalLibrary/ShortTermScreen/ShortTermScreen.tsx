import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import edit from '../../../assets/img/edit.svg';
import goal from '../../../assets/img/goal.svg';
import Tree from '../Tree/Tree';
import MenuTabs from '../MenuTabs/MenuTabs';
import AddShortTermGoalModal from '../Modal/AddShortTermGoal';
import Button from '../../Generics/Button';
import RenameComponent from '../Rename/RenameEntities';
import {
    clearLongTermGoal,
    getAllGoalLibraryDomainByGoalLibraryId,
    getAllGoalLibraryLongTermByDomainId,
    getAllGoalLibraryShortTermLongTermById,
    getGoalLibraryById,
    getGoalLibraryDomainById,
    getGoalLibraryLongTermById,
    getGoalLibraryShortTermById,
    getGoalScore,
    getGoalType,
    setActiveDomainId,
    setActiveLongTermId,
    toggleExpandedDomain,
} from '../../../redux/slice/GoalLibrary/GoalLibraryData';
import GoalLibraryHeading from '../Heading/GoalLibraryHeading';

interface MyComponentProps {}

const ShortTermScreen: React.FC<MyComponentProps> = () => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const [openShortGoal, setOpenShortGoal] = useState(false);
    const [domainRename, setDomainRename] = useState(false);
    const [interventionNewName, setInterventionNewName] = useState(false);

    const goalLibrarySlice = useSelector(
        (state: any) => state.GoalLibrarySlice
    );

    const goalLibraryId = params.id ?? params.goalLibraryId ?? '';
    const domainId = params.domainId ?? '';
    const longTermId = params.longTermGoalId ?? '';

    const GoalLibraryData = goalLibrarySlice.goalLibraryById?.[goalLibraryId];
    const GoalLibraryDomainData =
        goalLibrarySlice.goalLibraryDomainById?.[domainId];
    const GoalLibraryLongTermData =
        goalLibrarySlice.goalLibraryLongTermById?.[longTermId];

    const handleRenameShortTerm = (): void => {
        setDomainRename(true);
    };
    const handleCancelShortTerm = (): void => {
        setDomainRename(false);
        dispatch(getAllGoalLibraryShortTermLongTermById({ id: longTermId }));
        dispatch(getGoalLibraryShortTermById({ id: params.shortTermGoalId }));
        dispatch(getGoalLibraryDomainById({ id: domainId }));
        dispatch(getGoalLibraryLongTermById({ id: longTermId }));
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
        dispatch(getAllGoalLibraryShortTermLongTermById({ id: longTermId }));
        dispatch(getGoalLibraryShortTermById({ id: params.shortTermGoalId }));
        dispatch(getAllGoalLibraryLongTermByDomainId({ id: domainId }));
        dispatch(getGoalLibraryById({ id: goalLibraryId }));
        dispatch(getGoalLibraryLongTermById({ id: longTermId }));
        dispatch(getGoalLibraryDomainById({ id: domainId }));
        dispatch(getAllGoalLibraryDomainByGoalLibraryId({ id: goalLibraryId }));
        dispatch(toggleExpandedDomain(domainId));
        dispatch(setActiveDomainId(domainId));
        dispatch(setActiveLongTermId(null));
        dispatch(getAllGoalLibraryLongTermByDomainId({ id: domainId }));
    }, [dispatch, domainId, goalLibraryId, longTermId, params.shortTermGoalId]);

    const handleAddShortTermGoal = (): void => {
        setOpenShortGoal(true);
        dispatch(clearLongTermGoal());
        const data = {};
        dispatch(getGoalScore({ data }));
        dispatch(getGoalType({ data }));
    };

    const menuItems = [
        {
            icon: goal,
            label: 'Edit Short Term Goal',
            onClick: handleAddShortTermGoal,
        },
    ];

    return (
        <div data-testid="short-term-screen">
            <GoalLibraryHeading
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
                                    {`${goalLibrarySlice.goalLibraryShortTermById?.interventionPlanDomainId?.name} / ${goalLibrarySlice.goalLibraryShortTermById?.interventionPlanLongTermGoalId?.name} / `}
                                    <RenameComponent
                                        onCancel={handleCancelShortTerm}
                                        nameValue={
                                            goalLibrarySlice
                                                .goalLibraryShortTermById
                                                ?.name || ''
                                        }
                                        id={
                                            goalLibrarySlice
                                                .goalLibraryShortTermById?.id
                                        }
                                        interventionPlanDomainId={
                                            GoalLibraryDomainData?.id
                                        }
                                        interventionLibraryId={
                                            GoalLibraryData?.id
                                        }
                                        type="SHORT_TERM_GOAL"
                                        interventionPlanLongTermGoalId={
                                            GoalLibraryLongTermData?.id
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <label className="font-semibold text-lg">
                                        {GoalLibraryDomainData?.name
                                            ? `${goalLibrarySlice.goalLibraryShortTermById?.interventionPlanDomainId?.name} / ${goalLibrarySlice.goalLibraryShortTermById?.interventionPlanLongTermGoalId?.name} / ${goalLibrarySlice.goalLibraryShortTermById?.name}`
                                            : ''}
                                    </label>
                                    <Button
                                        onClick={handleRenameShortTerm}
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
            {openShortGoal && (
                <AddShortTermGoalModal
                    isEdit={true}
                    open={openShortGoal}
                    onClose={() => setOpenShortGoal(false)}
                    isCreatedFromSessionNote={false}
                    goalLibrarySlice={goalLibrarySlice}
                />
            )}
        </div>
    );
};

export default ShortTermScreen;
