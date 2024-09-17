import * as React from 'react';
import cancel from '../../assets/img/close.svg';
import { useSelector } from 'react-redux';

export default function ViewTargetInSummary({
    onClose,
    selectedName,
}: {
    onClose?: any;
    selectedName?: any;
}): React.JSX.Element {
    const tableHeaderData = ['Target', 'Data Point'];
    const targetBody = useSelector(
        (state: any) => state.session.value.targetData
    );

    return (
        <div
            data-testid="view-target-summary"
            className="absolute z-50 right-[2rem] min-h-[71vh] shadow-md rounded-md border border-2 bg-white min-w-[39rem]"
        >
            <div className="flex flex-col  p-5">
                <div className="flex justify-between items-center pt-2 pb-1  pr-3">
                    <h3 className="font-medium text-gray-800 w-full">
                        {selectedName}
                    </h3>
                    <button
                        onClick={onClose ? onClose : undefined}
                        type="button"
                        className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <span className="sr-only">close</span>
                        <img src={cancel} onClick={onClose}></img>
                    </button>
                </div>
                <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-md"></div>
                <div className="-m-1.5 overflow-x-auto mt-5">
                    <div className="min-w-full inline-block align-middle">
                        <div className="rounded-lg overflow-hidden dark:border-neutral-700">
                            <table className="min-w-full">
                                <thead className="bg-gray-300 dark:bg-neutral-700">
                                    <tr>
                                        {tableHeaderData?.map(
                                            (item: any, index: any) => {
                                                return (
                                                    <th
                                                        key={index}
                                                        scope="col"
                                                        className="px-6 py-3 text-start text-sm font-semibold  dark:text-neutral-400"
                                                    >
                                                        {item}
                                                    </th>
                                                );
                                            }
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {targetBody?.map(
                                        (item: any, index: any) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                        {item?.targetName}
                                                    </td>
                                                    <td className="px-6 w-[10rem] py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                        {item?.dataPoint}
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
    );
}
