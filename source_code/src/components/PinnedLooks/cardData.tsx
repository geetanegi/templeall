import * as React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
export default function CardData(): React.JSX.Element {
    const targetData = useSelector(
        ({ quickLook }: any) => quickLook?.targetData?.data
    );
    const tableHeading = ['Session', 'Ran On', 'Ran By', 'Phase', 'Data Point'];
    return (
        <div className="absolute top-[25rem] left-[60rem] flex flex-col space-y-3 h-[19rem] bg-white border shadow-xl rounded-xl mt-5 w-[50rem] overflow-y-auto">
            {targetData?.map((itemTarget: any, indexTarget: any) => {
                return (
                    <div
                        className="flex flex-col space-y-3 p-6 w-full"
                        key={indexTarget}
                    >
                        <div className="flex justify-between w-2/3">
                            <div className="flex space-x-1">
                                <label className="text-sm font-semibold">
                                    Target Name:
                                </label>
                                <label className="text-sm font-light">
                                    {itemTarget?.targetName}
                                </label>
                            </div>
                            <div className="flex space-x-1">
                                <label className="text-sm font-semibold">
                                    Type:
                                </label>
                                <label className="text-sm font-light">
                                    {itemTarget?.targetType}
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col border shadow-md">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200  dark:divide-neutral-700">
                                            <thead>
                                                <tr>
                                                    {tableHeading?.map(
                                                        (
                                                            itemTableHead,
                                                            indexTableHead
                                                        ) => {
                                                            return (
                                                                <th
                                                                    key={
                                                                        indexTableHead
                                                                    }
                                                                    scope="col"
                                                                    className="px-6 py-3 text-start text-sm font-semibold dark:text-neutral-500"
                                                                >
                                                                    {
                                                                        itemTableHead
                                                                    }
                                                                </th>
                                                            );
                                                        }
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-x divide-gray-200 dark:divide-neutral-700">
                                                {itemTarget?.sessionTargetData
                                                    ?.length ? (
                                                    itemTarget?.sessionTargetData?.map(
                                                        (
                                                            itemTableBody: any,
                                                            indexTableBody: any
                                                        ) => {
                                                            return (
                                                                <tr
                                                                    key={
                                                                        indexTableBody
                                                                    }
                                                                >
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sm text-gray-600 dark:text-neutral-200">
                                                                        {
                                                                            itemTableBody?.sessionName
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sm text-gray-600 dark:text-neutral-200">
                                                                        {moment(
                                                                            itemTableBody?.runOn
                                                                        ).format(
                                                                            'MM/DD/YYYY hh:mm A'
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sm text-gray-600 dark:text-neutral-200">
                                                                        {`
                                                                            ${itemTableBody?.runBy?.firstName} ${itemTableBody?.runBy?.lastName}
                                                                        `}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sm text-gray-600 dark:text-neutral-200">
                                                                        {
                                                                            itemTableBody?.phase
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sm text-gray-600 dark:text-neutral-200">
                                                                        {
                                                                            itemTableBody?.dataPoint
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div className="h-[10rem]">
                                                        <label className="text-lg font-light text-gray-400 absolute ml-[24rem] mt-[3rem]">
                                                            No records
                                                        </label>
                                                    </div>
                                                )}
                                            </tbody>
                                        </table>
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
