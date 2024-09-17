import React from 'react';
import Count from '../../../../assets/img/LandingPageIcons/SessionCount.svg';
export default function SessionCount(): React.JSX.Element {
    return (
        <div className="sessionCount py-3 mx-3">
            <div className="flex  py-1 px-5 ">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img className="p-1.5 align-middle" src={Count} alt="" />
                </div>
                <h1 className="font-[lato] mx-6 font-semibold p-1">
                    Session Count
                </h1>
            </div>

            <div className="overflow-hidden">
                <div className="">
                    <div className="flex flex-col">
                        <div className="p-1 min-w-full inline-block align-middle">
                            <div className="flex justify-between my-2 border-b-2 border-neutral-300 mx-14 text-neutral-500 text-sm h-7 font-normal font-[lato]">
                                <h1 className="text-black text-base font-medium font-['Lato']">
                                    <span className=" text-neutral-500 text-xs font-normal font-['lato'] mr-3">
                                        Total Session
                                    </span>
                                    15
                                </h1>
                                <h1 className="text-black text-base font-medium font-['Lato']">
                                    <span className=" text-neutral-500 text-xs font-normal font-['lato'] mr-3 ">
                                        Cancelled
                                    </span>
                                    03
                                </h1>
                                <h1 className="text-black text-base font-medium font-['Lato']">
                                    <span className=" text-neutral-500 text-xs font-normal font-['lato'] mr-3">
                                        Rescheduled Session
                                    </span>
                                    05
                                </h1>
                            </div>
                            <table className="min-w-full mx-14">
                                <thead className="h-6 text-left">
                                    <tr>
                                        <th className="text-neutral-500 text-sm font-normal font-['Lato']">
                                            Rescheduled Session
                                        </th>
                                        <th className="text-neutral-500 text-sm font-normal font-['Lato']">
                                            Rescheduled to
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" whitespace-nowrap text-sm ">
                                    <tr className="hover:bg-gray-100">
                                        <td className=" pr-8 py-1 text-black text-base font-medium font-['Lato']">
                                            SLP Evaluation : Sharp ABA Therapy
                                            <h1 className="my-1 text-neutral-400 text-xs font-normal font-['Lato']">
                                                23/02/2024
                                            </h1>
                                        </td>
                                        <td className="py-2 text-black text-base font-medium font-['Lato'] align-top my-1">
                                            22/03/2024
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className=" pr-8 py-1 text-black text-base font-medium font-['Lato']">
                                            Speech Therapy LP Evaluation
                                            <h1 className="my-1 text-neutral-400 text-xs font-normal font-['Lato']">
                                                23/02/2024
                                            </h1>
                                        </td>
                                        <td className="py-2 text-black text-base font-medium font-['Lato'] align-top my-1">
                                            29/03/2024
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className=" pr-8 py-1 text-black text-base font-medium font-['Lato']">
                                            Mental Health Counselling Session
                                            <h1 className="my-1 text-neutral-400 text-xs font-normal font-['Lato']">
                                                30/02/2024
                                            </h1>
                                        </td>
                                        <td className="py-2 text-black text-base font-medium font-['Lato'] align-top my-1">
                                            01/04/2024
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
