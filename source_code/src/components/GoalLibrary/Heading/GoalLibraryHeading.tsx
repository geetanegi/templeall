import React from 'react';
import RenameComponent from '../Rename/RenameEntities';
import Button from '../../Generics/Button';
import edit from '../../../assets/img/edit.svg';
import { useParams } from 'react-router-dom';

interface GoalLibraryHeadingProps {
    interventionNewName: boolean;
    goalLibrarySlice: any;
    handleRenameIntervention: () => void;
    handleCancel: () => void;
}

const GoalLibraryHeading: React.FC<GoalLibraryHeadingProps> = ({
    interventionNewName,
    goalLibrarySlice,
    handleRenameIntervention,
    handleCancel,
}) => {
    const params = useParams();
    const goalLibraryId = params?.id || params?.goalLibraryId || '';
    const goalLibrary =
        goalLibrarySlice?.goalLibraryById?.[goalLibraryId] || {};

    return (
        <div className="heading ml-3 mt-1 mb-3">
            <div className="pr-3 pt-2">
                <div className="pb-1 flex justify-between">
                    {interventionNewName ? (
                        <RenameComponent
                            onCancel={handleCancel}
                            nameValue={goalLibrary.name || ''}
                            id={goalLibrary.id || ''}
                            type="GOAL_LIBRARY"
                        />
                    ) : (
                        <div className="nameAndEdit flex items-center">
                            <span className="text-[#18868D] font-semibold text-base">
                                {goalLibrary.name ?? ''}
                            </span>
                            <Button
                                onClick={handleRenameIntervention}
                                className=""
                                type="secondary"
                            >
                                <img src={edit} alt="Edit" />
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-1/2 bg-gradient-to-r from-[#48ABCA] to-transparent h-[0.2rem]"></div>
            </div>
        </div>
    );
};

export default GoalLibraryHeading;
