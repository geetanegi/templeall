/* eslint-disable max-lines */
/* eslint-disable max-len */
import * as React from 'react';
import {
    getAuthorizationAndNonBillable,
    savingAuthCodes,
} from '../../../redux/slice/SchedulingRedux/Scheduling';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
export default function Codes({
    setAuthCode,
    setDelete,
    clientId,
    primryProId,
    activeTab,
    setActiveTab,
    setDisableUseCode,
}: {
    setAuthCode?: any;
    setDelete?: any;
    clientId?: any;
    primryProId?: any;
    activeTab?: any;
    setActiveTab?: any;
    setDisableUseCode?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const getAuth = useSelector(
        (state: any) => state.scheduling.getAuthAndNonBillable
    );
    const authCodebutton = useSelector(
        (state: any) => state.scheduling.authCodeButton
    );
    const handleTabClick = (tabNumber: number): void => {
        setActiveTab(tabNumber);
        const payload = {
            codeType: tabNumber === 1 ? 'Billable' : 'Non-Billable',
            clientId: clientId,
            serviceProviderId: primryProId,
        };
        dispatch(getAuthorizationAndNonBillable(payload));
    };
    const handleCodeSelection = (item: any): any => {
        dispatch(savingAuthCodes(item));
        if (setDisableUseCode) {
            setDisableUseCode(false);
        }
    };
    return (
        <>
            <div className="mt-9" data-testid="show-codes">
                <div className="flex space-x-4 border-b-2 border-gray-300">
                    <button
                        className={`px-4 py-2 ${activeTab === 1 ? ' border-b-4 rounded-sm border-theme-lightBlue1' : 'text-gray-600'}`}
                        onClick={(event: any) => {
                            event.preventDefault();
                            handleTabClick(1);
                        }}
                    >
                        Billing Codes
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 2 ? ' border-b-4 rounded-sm border-theme-lightBlue1' : 'text-gray-600'}`}
                        onClick={(item: any) => {
                            item.preventDefault();
                            handleTabClick(2);
                        }}
                    >
                        Non-Billable Codes
                    </button>
                </div>
                {activeTab === 1 && (
                    <div>
                        {getAuth?.map((item: any) => (
                            <div
                                key={item?.id}
                                className="flex justify-between items-center mt-5"
                            >
                                <div className="left flex flex-col">
                                    <span>
                                        {item.code}:{item.name ? item.name : ''}
                                    </span>
                                    <span className="text-sm text-secondary-400">{`${moment(item?.startDate).format('MM/DD/YYYY')} to ${moment(item?.expiryDate).format('MM/DD/YYYY')}`}</span>
                                    <span className="text-sm text-secondary-400">
                                        {item?.payor}
                                    </span>
                                </div>
                                <div className="right">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAuthCode(item);
                                            handleCodeSelection(item);
                                            setDelete(true);
                                        }}
                                        disabled={
                                            authCodebutton !== null &&
                                            authCodebutton?.id !== item?.id
                                        }
                                        className=" relative h-[2.5rem] w-32   flex justify-evenly items-center font-normal text-sm rounded border border-transparent bg-[#47AAC9] text-white hover:bg-[#47AAC9] disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        Use This Code
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 2 && (
                    <div>
                        {getAuth?.map((item: any) => (
                            <div
                                key={item?.id}
                                className="flex justify-between items-center mt-5"
                            >
                                <div className="left flex flex-col">
                                    <span>
                                        {item.code}:{' '}
                                        {item.name ? item.name : ''}
                                    </span>
                                </div>
                                <div className="right">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAuthCode(item);
                                        }}
                                        className=" relative h-[2.5rem] w-32   flex justify-evenly items-center font-normal text-sm rounded border border-transparent bg-[#47AAC9] text-white hover:bg-[#47AAC9] disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        Use This Code
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
