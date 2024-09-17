import React from 'react';
import targetCard from '../../../assets/img/targetCard.svg';

// Define TypeScript interfaces for props
interface GoalProgressProps {
    goalType: string;
    completionPercentage: any;
    totalPrograms: number;
    completedPrograms: number;
    imageWidth: string;
}

// Define the functional component with TypeScript interfaces
const GoalProgress: React.FC<GoalProgressProps> = ({
    goalType,
    completionPercentage,
    totalPrograms,
    completedPrograms,
    imageWidth,
}) => {
    return (
        <div className="flex flex-row w-full h-[17vh] justify-between px-8 bg-white border shadow-md rounded-md mr-5">
            <div className="flex flex-col pt-2 pb-2 justify-around">
                <label className="text-2xl text-black font-semibold">
                    {goalType} Goal Mastered
                    <span className="text-3xl text-black ml-2 font-normal">
                        {completionPercentage} %
                    </span>
                </label>
                <div className="flex">
                    <div>
                        <label className="text-black font-light text-sm mr-1">
                            Total {goalType} Goal{' '}
                        </label>
                        <label className="text-green-500 text-[1.32rem]">
                            {totalPrograms}
                        </label>
                    </div>
                    <div className="ml-10">
                        <label className="text-black font-light text-sm mr-1">
                            Completed {goalType} Goal{' '}
                        </label>
                        <label className="text-[1.32rem] text-red-500">
                            {completedPrograms}
                        </label>
                    </div>
                </div>
            </div>
            <div className="py-[1rem] pr-4">
                <img
                    src={targetCard}
                    style={{ width: imageWidth }}
                    alt="Target Card"
                />
            </div>
        </div>
    );
};

export default GoalProgress;
