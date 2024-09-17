import React from 'react';
import todoList from '../../../../assets/img/LandingPageIcons/TodoList.svg';
export default function ClinicianTodoList(): React.JSX.Element {
    return (
        <div className="sessionCount my-2 mx-2">
            <div className="flex p-1.5">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img
                        className="py-2 px-1.5 align-middle"
                        src={todoList}
                        alt=""
                    />
                </div>
                <h1 className="font-[lato] font-semibold mx-4 p-1">
                    To-Do List
                </h1>
            </div>
            <div className="mt-9">
                <div className="flex flex-col">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full mx-4">
                                <tbody className=" whitespace-nowrap text-sm ">
                                    <tr className="hover:bg-gray-100">
                                        <td className=" pr-8 py-1 text-black text-base font-medium font-['Lato']">
                                            Speech Therapy LP Evaluation
                                            <h1 className="my-1 text-neutral-400 text-xs font-normal font-['Lato']">
                                                23/02/2024
                                            </h1>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className=" pr-8 py-1 text-black text-base font-medium font-['Lato']">
                                            SLP Evaluation
                                            <h1 className="my-1 text-neutral-400 text-xs font-normal font-['Lato']">
                                                23/02/2024
                                            </h1>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className=" pr-8 py-1 text-black text-base font-medium font-['Lato']">
                                            Counselling Session
                                            <h1 className="my-1 text-neutral-400 text-xs font-normal font-['Lato']">
                                                23/02/2024
                                            </h1>
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
