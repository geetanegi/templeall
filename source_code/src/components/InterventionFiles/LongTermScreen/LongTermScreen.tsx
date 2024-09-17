import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import library from '../../../assets/img/libAdd.svg';
import edit from '../../../assets/img/edit.svg';
import goal from '../../../assets/img/goal.svg';
import {
    clearLongTermGoal,
    getAllInterventionPlanDomainByInterventionId,
    getAllInterventionPlanLongTermByDomainId,
    getGoalScore,
    getGoalType,
    getInterventionPlanById,
    getInterventionPlanDomainById,
    getInterventionPlanLongTermById,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import InterventionHeading from '../Heading/InterventionHeading';
import Tree from '../Tree/Tree';
import MenuTabs from '../MenuTabs/MenuTabs';
import AddShortTermGoalModal from '../Modal/AddShortTermGoal';
import Button from '../../Generics/Button';
import RenameComponent from '../Rename/RenameEntities';
import CurrentPhase from '../Phases/ChangePhases';
import AddFromGoalLibrary from '../../AddFromGoalLibrary';
import AddLongTermGoalModal from '../Modal/AddLongTermGoal';
interface MyComponentProps {}
const LongTermScreen: React.FC<MyComponentProps> = () => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const isViewMode = location.pathname.includes('view');
    const [openGoal, setOpenGoal] = useState(false);
    const [openShortGoal, setOpenShortGoal] = useState(false);
    const [domainRename, setDomainRename] = useState(false);
    const [showLibraryModal, setShowLibraryModal] = useState(false);
    const interventionData = useSelector(
        (state: any) => state.interventionSlice
    );
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const [interventionNewName, setInterventionNewName] = useState(false);
    const handleRenameLongTerm = (): void => {
        setDomainRename(true);
    };
    const handleCancelLongTerm = (): void => {
        setDomainRename(false);
        dispatch(getInterventionPlanDomainById({ id: params.domainId }));
        dispatch(
            getInterventionPlanLongTermById({ id: params?.longTermGoalId })
        );
        dispatch(
            getAllInterventionPlanLongTermByDomainId({
                id: params.domainId,
                type: phaseType,
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
    useEffect(() => {
        dispatch(getInterventionPlanById({ id: params?.interventionId }));
        dispatch(getInterventionPlanDomainById({ id: params?.domainId }));
        dispatch(
            getInterventionPlanLongTermById({ id: params?.longTermGoalId })
        );
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params?.interventionId,
                type: phaseType,
            })
        );
    }, [
        dispatch,
        params?.domainId,
        params?.interventionId,
        params?.longTermGoalId,
    ]);
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
        {
            icon: library,
            label: 'Add From Library',
            onClick: handleAddFromLibrary,
        },
    ];
    return (
        <div data-testid="long-term-page">
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
                                    {`${interventionData?.interventionPlanDomainById?.name}  / `}
                                    <RenameComponent
                                        onCancel={() => handleCancelLongTerm()}
                                        nameValue={
                                            interventionData
                                                ?.interventionPlanLongTermById
                                                ?.name
                                                ? interventionData
                                                      ?.interventionPlanLongTermById
                                                      ?.name
                                                : ''
                                        }
                                        id={
                                            interventionData
                                                ?.interventionPlanLongTermById
                                                ?.id
                                        }
                                        interventionPlanDomainId={
                                            interventionData
                                                ?.interventionPlanDomainById?.id
                                        }
                                        type={'LONG_TERM_GOAL'}
                                        interventionPlanId={
                                            interventionData
                                                ?.interventionPlanById?.id
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <label className=" font-semibold text-lg">
                                        {interventionData
                                            ?.interventionPlanDomainById?.name
                                            ? interventionData
                                                  ?.interventionPlanDomainById
                                                  ?.name +
                                              '/' +
                                              interventionData
                                                  ?.interventionPlanLongTermById
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
                    <div>
                        <CurrentPhase
                            id={
                                interventionData?.interventionPlanLongTermById
                                    ?.id
                            }
                            defaultValue={
                                interventionData?.interventionPlanLongTermById
                                    ?.longTermGoalStatus
                            }
                            term="longTermGoal"
                            interventionData={interventionData}
                        />
                    </div>
                </div>
            </div>
            {openShortGoal && (
                <AddShortTermGoalModal
                    open={openShortGoal}
                    onClose={() => setOpenShortGoal(false)}
                    isCreatedFromSessionNote={false}
                    interventionData={interventionData}
                />
            )}
            {showLibraryModal && (
                <AddFromGoalLibrary
                    open={showLibraryModal}
                    onClose={() => setShowLibraryModal(false)}
                />
            )}
            {openGoal && (
                <AddLongTermGoalModal
                    isEdit={true}
                    open={openGoal}
                    onClose={() => setOpenGoal(false)}
                    isCreatedFromSessionNote={false}
                    interventionData={interventionData}
                />
            )}
        </div>
    );
};
export default LongTermScreen;
