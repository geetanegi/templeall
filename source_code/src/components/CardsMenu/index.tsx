import * as React from 'react';
import programCard from '../../assets/img/programCard.svg';
import targetCard from '../../assets/img/targetCard.svg';
import { useSelector } from 'react-redux';

export default function CardsMenu(): React.JSX.Element {
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const programMastered = Math.round(
        (programBookData?.programCountAchieved /
            programBookData?.programCount) *
            100
    );
    const targetMastered = Math.round(
        (programBookData?.targetCountAchieved / programBookData?.targetCount) *
            100
    );

    return (
        <div className="flex">
            <div className="flex flex-row w-1/2 h-[17vh] justify-between px-8 mr-4 bg-white border  shadow-md rounded-md">
                <div className="flex flex-col pt-2 pb-2 justify-around">
                    <label className="text-base  text-black font-semibold">
                        Programs Mastered{' '}
                        <label className="text-3xl  text-black ml-2 font-normal">
                            {Number.isNaN(programMastered)
                                ? 0
                                : programMastered}
                            %
                        </label>
                    </label>
                    <div className="flex">
                        <div>
                            <label className="text-black font-light text-sm mr-1">
                                Total Programs{' '}
                            </label>
                            <label className="text-green-500 text-[1.32rem]">
                                {programBookData?.programCount}
                            </label>
                        </div>
                        <div className="ml-10">
                            <label className="text-black font-light text-sm mr-1">
                                Completed Programs{' '}
                            </label>
                            <label className="text-[1.32rem]  text-red-500">
                                {programBookData?.programCountAchieved}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="py-[1rem] pr-4">
                    <img src={programCard} style={{ width: '6vw' }}></img>
                </div>
            </div>

            <div className="flex flex-row w-1/2 h-[17vh] justify-between px-8 bg-white border  shadow-md rounded-md">
                <div className="flex flex-col pt-2 pb-2 justify-around">
                    <label className="text-base  text-black font-semibold">
                        Targets Mastered{' '}
                        <label className="text-3xl  text-black ml-2 font-normal">
                            {Number.isNaN(targetMastered) ? 0 : targetMastered}%
                        </label>
                    </label>
                    <div className="flex">
                        <div>
                            <label className="text-black font-light text-sm mr-1">
                                Total Targets{' '}
                            </label>
                            <label className="text-green-500 text-[1.32rem]">
                                {programBookData?.targetCount}
                            </label>
                        </div>
                        <div className="ml-10">
                            <label className="text-black font-light text-sm mr-1">
                                Completed Targets{' '}
                            </label>
                            <label className="text-[1.32rem]  text-red-500">
                                {programBookData?.targetCountAchieved}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="py-[1rem] pr-5">
                    <img src={targetCard} style={{ width: '5.5vw' }}></img>
                </div>
            </div>
        </div>
    );
}
