import * as React from 'react';

import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearOnlyRow,
    selectedSessionSummary,
} from '../../redux/slice/session/sessionSlice';

export default function RenderSelectedSession({
    indexVal,
}: {
    indexVal: number;
}): React.JSX.Element {
    const dispatch = useDispatch();
    const tableHeaderData = [
        'Target',
        'Target Type',
        'Data Point',
        'Current Phase',
        'Phase Change',
    ];
    const targetBody = useSelector((state: any) =>
        state.session.selectedSummary[indexVal]
            ? state.session.selectedSummary[indexVal]
            : {}
    );

    const deleteSelectedSummary = (key: string): any => {
        const updatedTargetBody = { ...targetBody };
        delete updatedTargetBody[key];
        dispatch(
            selectedSessionSummary({
                update: true,
                updatedTargetBody: { [indexVal]: updatedTargetBody },
            })
        );
        dispatch(clearOnlyRow());
    };
    const removeSuffix = (str: string): any => {
        const lastUnderScrore = str.lastIndexOf('_');
        if (lastUnderScrore !== -1) {
            return str.substring(0, lastUnderScrore);
        }
        return str;
    };

    return (
        <div data-testid="render-selected">
            {Object.keys(targetBody)?.map((item: any, index: any) => {
                return (
                    <div
                        className="w-[60rem] border-2 border-gray-300 rounded-md shadow-md mt-4"
                        key={index}
                        data-testid="render-selected"
                    >
                        <div className="space-y-5">
                            <div className="flex  py-3 bg-gray-200 px-5 justify-between">
                                <div className="space-x-1">
                                    <label className="text-sm font-semibold">
                                        {`Session:`}
                                    </label>
                                    <label className="text-sm font-medium text-gray-800">
                                        {removeSuffix(item)}
                                    </label>
                                </div>

                                <div>
                                    <img
                                        src={deleteIcon}
                                        alt="deleteIcon"
                                        className="cursor-pointer"
                                        onClick={() =>
                                            deleteSelectedSummary(item)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-[0.5rem] pb-2">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="inline-block align-middle">
                                        <div className="rounded-lg overflow-hidden dark:border-neutral-700">
                                            <table className="w-[57rem]">
                                                <thead className="bg-gray-300 dark:bg-neutral-700">
                                                    <tr>
                                                        {tableHeaderData?.map(
                                                            (
                                                                itemHeading: any,
                                                                indexHeading: any
                                                            ) => {
                                                                return (
                                                                    <th
                                                                        key={
                                                                            indexHeading
                                                                        }
                                                                        scope="col"
                                                                        className="px-6 py-3 text-start text-sm font-semibold  dark:text-neutral-400"
                                                                    >
                                                                        {
                                                                            itemHeading
                                                                        }
                                                                    </th>
                                                                );
                                                            }
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody className="">
                                                    {targetBody[item]?.map(
                                                        (
                                                            item1: any,
                                                            indexBody: any
                                                        ) => {
                                                            return (
                                                                <tr
                                                                    key={
                                                                        indexBody
                                                                    }
                                                                >
                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                                        {
                                                                            item1?.targetName
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                                        {
                                                                            item1?.targetType
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                                        {
                                                                            item1?.dataPoint
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                                        {
                                                                            item1?.currentPhase
                                                                        }
                                                                    </td>

                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                                        {
                                                                            item1?.phaseChange
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
