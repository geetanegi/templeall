import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import edit from '../../../assets/img/edit.svg';
import goal from '../../../assets/img/goal.svg';
import {
    getAllGoalLibraryDomainByGoalLibraryId,
    getAllGoalLibraryLongTermByDomainId,
    getGoalLibraryById,
    getGoalLibraryDomainById,
    getGoalScore,
    getGoalType,
    setActiveDomainId,
    toggleExpandedDomain,
} from '../../../redux/slice/GoalLibrary/GoalLibraryData';
import InterventionHeading from '../Heading/GoalLibraryHeading';
import Tree from '../Tree/Tree';
import MenuTabs from '../MenuTabs/MenuTabs';
import AddLongTermGoalModal from '../Modal/AddLongTermGoal';
import AddShortTermGoalModal from '../Modal/AddShortTermGoal';
import Button from '../../Generics/Button';
import RenameComponent from '../Rename/RenameEntities';

interface MyComponentProps {}

const DomainScreen: React.FC<MyComponentProps> = () => {
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

    const GoalLibraryData = goalLibrarySlice.goalLibraryById?.[goalLibraryId];
    const GoalLibraryDomainData =
        goalLibrarySlice.goalLibraryDomainById?.[domainId];

    const handleRenameDomain = (): void => setDomainRename(true);

    const handleCancelDomain = (): void => {
        setDomainRename(false);
        dispatch(getGoalLibraryDomainById({ id: domainId }));
        dispatch(getAllGoalLibraryDomainByGoalLibraryId({ id: goalLibraryId }));
    };

    const handleRenameIntervention = (): void => {
        setInterventionNewName(true);
        dispatch(getGoalLibraryById({ id: goalLibraryId }));
    };

    const handleCancelIntervention = (): void => {
        setInterventionNewName(false);
        dispatch(getGoalLibraryById({ id: goalLibraryId }));
    };

    const handleAddLongTermGoal = (): void => setOpenGoal(true);

    const handleAddShortTermGoal = (): void => {
        setOpenShortGoal(true);
        dispatch(
            getAllGoalLibraryLongTermByDomainId({
                id: domainId,
            })
        );
        const data = {};
        dispatch(getGoalScore({ data }));
        dispatch(getGoalType({ data }));
    };

    useEffect(() => {
        if (!goalLibrarySlice.expandedDomains.includes(domainId)) {
            dispatch(toggleExpandedDomain(domainId));
            dispatch(setActiveDomainId(domainId));
        }
        dispatch(getGoalLibraryById({ id: goalLibraryId }));
        dispatch(getGoalLibraryDomainById({ id: domainId }));
        dispatch(getAllGoalLibraryDomainByGoalLibraryId({ id: goalLibraryId }));
    }, [dispatch, domainId, goalLibraryId, goalLibrarySlice.expandedDomains]);

    const menuItems = [
        {
            icon: goal,
            label: 'Add Long Term Goal',
            onClick: handleAddLongTermGoal,
        },
        {
            icon: goal,
            label: 'Add Short Term Goal',
            onClick: handleAddShortTermGoal,
        },
    ];

    return (
        <div data-testid="goal-library-domain-screen">
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
                                <RenameComponent
                                    onCancel={handleCancelDomain}
                                    nameValue={
                                        GoalLibraryDomainData?.name ?? ''
                                    }
                                    id={GoalLibraryDomainData?.id}
                                    type="DOMAIN"
                                    interventionLibraryId={GoalLibraryData?.id}
                                />
                            ) : (
                                <>
                                    <label className="font-semibold text-lg">
                                        {GoalLibraryDomainData?.name ?? ''}
                                    </label>
                                    <Button
                                        onClick={handleRenameDomain}
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

export default DomainScreen;
