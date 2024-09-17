import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InterventionHeading from './Heading/InterventionHeading';
import { useParams } from 'react-router-dom';
import {
    clearLongTermGoal,
    getAllInterventionPlanDomainByInterventionId,
    getGoalScore,
    getGoalType,
    getInterventionPlanById,
    getPrimaryDiagnosisCode,
    getSecondaryDiagnosisCodes,
} from '../../redux/slice/InterventionAll/InterventionSlice';
import Tree from './Tree/Tree';
import GoalProgress from '../Generics/Cards/CardsForAll';
import MenuTabs from './MenuTabs/MenuTabs';
// Assets
import domainAdd from '../../assets/img/domainAdd.svg';
import library from '../../assets/img/libAdd.svg';
import goal from '../../assets/img/goal.svg';
import AddLongTermGoalModal from './Modal/AddLongTermGoal';
import AddShortTermGoalModal from './Modal/AddShortTermGoal';
import AddDomainInterventionModal from './Modal/AddDomainForIntervention';
import DiagnosisCode from './DiagnosisCode/DiagnosisCode';
import AddFromGoalLibrary from '../AddFromGoalLibrary';
interface MyComponentProps {}
const InterventionLandingPage: React.FC<MyComponentProps> = () => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const [open, setOpen] = useState(false);
    const [openGoal, setOpenGoal] = useState(false);
    const [openShortGoal, setOpenShortGoal] = useState(false);
    const [interventionNewName, setInterventionNewName] = useState(false);
    const [showLibraryModal, setShowLibraryModal] = useState(false);
    const interventionData = useSelector(
        (state: any) => state.interventionSlice
    );
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const handleRenameIntervention = (): void => {
        setInterventionNewName(true);
        dispatch(
            getInterventionPlanById({ id: params.id ?? params?.interventionId })
        );
    };
    const handleCancel = (): void => {
        setInterventionNewName(false);
        dispatch(
            getInterventionPlanById({ id: params.id ?? params?.interventionId })
        );
    };
    useEffect(() => {
        dispatch(getInterventionPlanById({ id: params.id }));
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params?.id,
                type: phaseType,
            })
        );
        dispatch(
            getPrimaryDiagnosisCode({
                id: interventionData?.interventionPlanById?.clientId?.childId,
            })
        );
        dispatch(
            getSecondaryDiagnosisCodes({
                id: interventionData?.interventionPlanById?.clientId?.childId,
            })
        );
    }, [
        dispatch,
        interventionData?.interventionPlanById?.clientId?.childId,
        params.id,
    ]);
    const longTermPercentage = Math.round(
        (interventionData?.interventionPlanById?.longTermGoalCountAchieved /
            interventionData?.interventionPlanById?.longTermGoalCount) *
            100
    );
    const shortTermPercentage = Math.round(
        (interventionData?.interventionPlanById?.shortTermGoalCountAchieved /
            interventionData?.interventionPlanById?.shortTermGoalCount) *
            100
    );
    const handleAddDomain = (): void => {
        setOpen(true);
    };
    const handleAddLongTermGoal = (): void => {
        setOpenGoal(true);
    };
    const handleAddShortTermGoal = (): void => {
        setOpenShortGoal(true);
        dispatch(clearLongTermGoal());
        const data1 = {};
        dispatch(getGoalScore({ data: data1 }));
        dispatch(getGoalType({ data: data1 }));
    };
    const handleAddFromLibrary = (): void => {
        setShowLibraryModal(true);
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
        {
            icon: library,
            label: 'Add From Library',
            onClick: handleAddFromLibrary,
        },
    ];
    return (
        <div data-testid="intervention-page">
            <InterventionHeading
                interventionNewName={interventionNewName}
                interventionData={interventionData}
                handleRenameIntervention={handleRenameIntervention}
                handleCancel={handleCancel}
            />
            <div className="flex">
                <Tree interventionData={interventionData} />
                <div className=" flex flex-col w-full ml-5">
                    <div className="flex ">
                        <GoalProgress
                            goalType="Long Term"
                            completionPercentage={
                                Number.isNaN(longTermPercentage)
                                    ? 0
                                    : longTermPercentage
                            }
                            totalPrograms={
                                interventionData?.interventionPlanById
                                    ?.longTermGoalCount
                            }
                            completedPrograms={
                                interventionData?.interventionPlanById
                                    ?.longTermGoalCountAchieved
                            }
                            imageWidth="6vw"
                        />
                        <GoalProgress
                            goalType="Short Term"
                            completionPercentage={
                                Number.isNaN(shortTermPercentage)
                                    ? 0
                                    : shortTermPercentage
                            }
                            totalPrograms={
                                interventionData?.interventionPlanById
                                    ?.shortTermGoalCount
                            }
                            completedPrograms={
                                interventionData?.interventionPlanById
                                    ?.shortTermGoalCountAchieved
                            }
                            imageWidth="5.5vw"
                        />
                    </div>
                    <div className="mr-5">
                        <MenuTabs menuItems={menuItems} />
                    </div>
                    <div className="mr-5">
                        <DiagnosisCode code={interventionData} />
                    </div>
                </div>
            </div>
            {openGoal && (
                <AddLongTermGoalModal
                    open={openGoal}
                    onClose={() => setOpenGoal(false)}
                    isCreatedFromSessionNote={false}
                    interventionData={interventionData}
                />
            )}
            {openShortGoal && (
                <AddShortTermGoalModal
                    open={openShortGoal}
                    onClose={() => setOpenShortGoal(false)}
                    isCreatedFromSessionNote={false}
                    interventionData={interventionData}
                />
            )}
            {open && (
                <AddDomainInterventionModal
                    open={open}
                    onClose={() => setOpen(false)}
                    interventionData={interventionData}
                />
            )}
            {showLibraryModal && (
                <AddFromGoalLibrary
                    open={showLibraryModal}
                    onClose={() => setShowLibraryModal(false)}
                />
            )}
        </div>
    );
};
export default InterventionLandingPage;
