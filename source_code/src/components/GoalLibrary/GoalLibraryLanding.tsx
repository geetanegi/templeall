import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    getGoalLibraryById,
    clearLongTermGoal,
    getGoalScore,
    getGoalType,
    getAllGoalLibraryDomainByGoalLibraryId,
    clearDomain,
} from '../../redux/slice/GoalLibrary/GoalLibraryData';
import Tree from './Tree/Tree';
import MenuTabs from './MenuTabs/MenuTabs';
// Assets
import domainAdd from '../../assets/img/domainAdd.svg';
import goal from '../../assets/img/goal.svg';

import AddLongTermGoalModal from './Modal/AddLongTermGoal';
import AddShortTermGoalModal from './Modal/AddShortTermGoal';
import GoalLibraryHeading from './Heading/GoalLibraryHeading';
import AddDomain from './Modal/AddDomain';

interface MyComponentProps {}

const GoalLibraryLanding: React.FC<MyComponentProps> = () => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const goalLibrarySlice = useSelector(
        (state: any) => state.GoalLibrarySlice
    );

    const [open, setOpen] = useState(false);
    const [openGoal, setOpenGoal] = useState(false);
    const [openShortGoal, setOpenShortGoal] = useState(false);
    const [interventionNewName, setInterventionNewName] = useState(false);

    const handleRenameIntervention = (): void => {
        setInterventionNewName(true);
        dispatch(
            getGoalLibraryById({ id: params.id ?? params?.goalLibraryId })
        );
    };

    const handleCancel = (): void => {
        setInterventionNewName(false);
        dispatch(
            getGoalLibraryById({ id: params.id ?? params?.goalLibraryId })
        );
    };

    useEffect(() => {
        dispatch(
            getGoalLibraryById({ id: params.id ?? params?.goalLibraryId })
        );
        dispatch(
            getAllGoalLibraryDomainByGoalLibraryId({
                id: params?.id ?? params?.goalLibraryId,
            })
        );
        dispatch(clearDomain());
        dispatch(clearLongTermGoal());
    }, [dispatch, params?.goalLibraryId, params.id]);

    const handleAddDomain = (): void => setOpen(true);
    const handleAddLongTermGoal = (): void => setOpenGoal(true);
    const handleAddShortTermGoal = (): void => {
        setOpenShortGoal(true);
        const data1 = {};
        dispatch(getGoalScore({ data: data1 }));
        dispatch(getGoalType({ data: data1 }));
    };

    const menuItems = [
        { icon: domainAdd, label: 'Add Domain', onClick: handleAddDomain },
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
        <div data-testid="goal-library-landing-page">
            <GoalLibraryHeading
                interventionNewName={interventionNewName}
                goalLibrarySlice={goalLibrarySlice}
                handleRenameIntervention={handleRenameIntervention}
                handleCancel={handleCancel}
            />
            <div className="flex">
                <Tree libraryId={params.id ?? params?.goalLibraryId} />
                <div className="flex flex-col w-full ml-5">
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
            {open && (
                <AddDomain
                    open={open}
                    onClose={() => setOpen(false)}
                    goalLibrarySlice={goalLibrarySlice}
                />
            )}
        </div>
    );
};

export default GoalLibraryLanding;
