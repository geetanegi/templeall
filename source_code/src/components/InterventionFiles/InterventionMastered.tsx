import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InterventionHeading from './Heading/InterventionHeading';
import empty from '../../assets/img/Empty_state_diagram.svg';
import { useParams } from 'react-router-dom';
import {
    getAllInterventionPlanDomainByInterventionId,
    getInterventionPlanById,
    getPrimaryDiagnosisCode,
    getSecondaryDiagnosisCodes,
} from '../../redux/slice/InterventionAll/InterventionSlice';
import Tree from './Tree/Tree';
interface MyComponentProps {}
const InterventionMastered: React.FC<MyComponentProps> = () => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const [interventionNewName, setInterventionNewName] = useState(false);
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
    return (
        <div data-testid="intervention-mastered-page">
            <InterventionHeading
                interventionNewName={interventionNewName}
                interventionData={interventionData}
                handleRenameIntervention={handleRenameIntervention}
                handleCancel={handleCancel}
            />
            <div className="flex">
                <Tree interventionData={interventionData} />
                <div className="flex h-[31.5rem] mx-[35rem]">
                    <div className="flex flex-col text-center items-center pt-[10rem] w-full space-y-3">
                        <img src={empty} />
                        <label className="font-light text-2xl">
                            There are currently no entities selected
                        </label>
                        <label className="font-medium text-medium text-primary-700">
                            Click on any entity to view details
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default InterventionMastered;
