import React from 'react';
import RenameComponent from '../Rename/RenameEntities';
import Button from '../../Generics/Button';
import TabsForIntervention from '../Tabs/Tabs';
import edit from '../../../assets/img/edit.svg';
import { useLocation } from 'react-router-dom';
interface InterventionHeadingProps {
    interventionNewName: boolean;
    interventionData: any;
    handleRenameIntervention: () => void;
    handleCancel: () => void;
}

const InterventionHeading: React.FC<InterventionHeadingProps> = ({
    interventionNewName,
    interventionData,
    handleRenameIntervention,
    handleCancel,
}) => {
    const location = useLocation();
    const isViewMode = location.pathname.includes('view');
    return (
        <div
            className={`heading ml-3 mt-1 ${isViewMode ? 'pointer-events-none' : ''}`}
        >
            <div className="pr-3 pt-2">
                <div className="pb-1 flex justify-between ">
                    {interventionNewName ? (
                        <RenameComponent
                            onCancel={handleCancel}
                            nameValue={
                                interventionData?.interventionPlanById?.name ||
                                ''
                            }
                            id={
                                interventionData?.interventionPlanById?.id || ''
                            }
                            type="INTERVENTION"
                        />
                    ) : (
                        <div className="name flex">
                            <span className="text-[#18868D] font-semibold text-base">
                                {interventionData?.interventionPlanById?.name ??
                                    ''}
                            </span>
                            <Button
                                data-testid="RenameBtn"
                                onClick={handleRenameIntervention}
                                className=""
                                type="secondary"
                            >
                                <img src={edit} alt="Edit" />
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-1/2 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
            </div>
            <div className="flex justify-between pr-3 pt-1 pb-2">
                <TabsForIntervention />
            </div>
        </div>
    );
};

export default InterventionHeading;
