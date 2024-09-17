import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import library from '../../../assets/img/libAdd.svg';
import edit from '../../../assets/img/edit.svg';
import goal from '../../../assets/img/goal.svg';
import {
    clearLongTermGoal,
    getAllInterventionPlanDomainByInterventionId,
    getGoalScore,
    getGoalType,
    getInterventionPlanById,
    getInterventionPlanDomainById,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import InterventionHeading from '../Heading/InterventionHeading';
import Tree from '../Tree/Tree';
import MenuTabs from '../MenuTabs/MenuTabs';
import AddLongTermGoalModal from '../Modal/AddLongTermGoal';
import AddShortTermGoalModal from '../Modal/AddShortTermGoal';
import Button from '../../Generics/Button';
import RenameComponent from '../Rename/RenameEntities';
import AddFromGoalLibrary from '../../AddFromGoalLibrary';
interface MyComponentProps {}
const DomainScreen: React.FC<MyComponentProps> = () => {
    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch<any>();
    const isViewMode = location.pathname.includes('view');
    const [openGoal, setOpenGoal] = useState(false);
    const [openShortGoal, setOpenShortGoal] = useState(false);
    const [domainRename, setDomainRename] = useState(false);
    const [showLibraryModal, setShowLibraryModal] = useState(false);
    const interventionData = useSelector(
        (state: any) => state.interventionSlice
    );
    const [interventionNewName, setInterventionNewName] = useState(false);
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const handleRenameDomain = (): void => {
        setDomainRename(true);
    };
    const handleCancelDomain = (): void => {
        setDomainRename(false);
        dispatch(getInterventionPlanDomainById({ id: params.domainId }));
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params.id ?? params.interventionId,
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
        dispatch(getInterventionPlanById({ id: params.interventionId }));
        dispatch(getInterventionPlanDomainById({ id: params.domainId }));
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params?.interventionId,
                type: phaseType,
            })
        );
    }, [dispatch, params.domainId, params.interventionId]);
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
        <div data-testid="intervention-domain-screen">
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
                                <RenameComponent
                                    onCancel={() => handleCancelDomain()}
                                    nameValue={
                                        interventionData
                                            ?.interventionPlanDomainById?.name
                                            ? interventionData
                                                  ?.interventionPlanDomainById
                                                  ?.name
                                            : ''
                                    }
                                    id={
                                        interventionData
                                            ?.interventionPlanDomainById?.id
                                    }
                                    type={'DOMAIN'}
                                    interventionPlanId={
                                        interventionData?.interventionPlanById
                                            ?.id
                                    }
                                />
                            ) : (
                                <>
                                    <label className=" font-semibold text-lg">
                                        {interventionData
                                            ?.interventionPlanDomainById?.name
                                            ? interventionData
                                                  ?.interventionPlanDomainById
                                                  ?.name
                                            : ''}
                                    </label>
                                    <Button
                                        disabled={isViewMode ? true : false}
                                        onClick={handleRenameDomain}
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
            {showLibraryModal && (
                <AddFromGoalLibrary
                    open={showLibraryModal}
                    onClose={() => setShowLibraryModal(false)}
                />
            )}
        </div>
    );
};
export default DomainScreen;
