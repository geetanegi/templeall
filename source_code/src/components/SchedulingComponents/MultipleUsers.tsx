/* eslint-disable max-len */
import * as React from 'react';
import crossIcon from '../../assets/img/crossBadge.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
    deleteUser,
    getScheduleEventCall,
    deleteUserEvent,
    savingClickedUser,
    deleteColorUsers,
    deleteColorMapMonth,
    deleteSearchedUser,
    deleteClickedUser,
    deleteColorMapWeek,
    deleteHeights,
} from '../../redux/slice/Scheduling/getServices';
export default function MultipleUsers(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const users = useSelector(({ getServices }: any) => getServices);
    const usersColor1 = useSelector(
        ({ getServices }: any) => getServices?.colorUsers
    );
    const userSearch = useSelector(
        ({ getServices }: any) => getServices?.searchedUsers
    );
    const colorFromTimeline = useSelector(
        ({ getServices }: any) => getServices?.colorMapMonth
    );
    const margin = useSelector(({ getServices }: any) => getServices?.heights);
    const plannerView = useSelector(
        ({ scheduling }: any) => scheduling?.plannerView
    );
    const deleteUserName = (id: any, groupId: any, childId: any): any => {
        const deleteId: any = parseInt(id || groupId || childId);
        dispatch(deleteUser(deleteId));
        dispatch(deleteColorUsers(deleteId));
        dispatch(deleteUserEvent(deleteId));
        dispatch(deleteColorMapMonth(deleteId));
        dispatch(deleteSearchedUser(deleteId));
        dispatch(deleteClickedUser(deleteId));
        dispatch(deleteColorMapWeek(deleteId));
        dispatch(deleteHeights(deleteId));
    };
    const handleChange = (itemId: any, groupId: any, childId: any): void => {
        dispatch(savingClickedUser(itemId || groupId || childId));
    };
    const handleEventsCall = (
        id: any,
        groupId: any,
        childId: any,
        e: any
    ): any => {
        if (e?.target?.checked) {
            const data: any = {
                providerId: id,
                groupId: groupId,
                childId: childId,
            };
            dispatch(getScheduleEventCall(data));
        } else {
            const deleteId: any = parseInt(id || groupId || childId);
            dispatch(deleteUserEvent(deleteId));
        }
    };
    return (
        <>
            <div
                className={`${!plannerView ? 'h-[24rem] mt-4 space-y-2 overflow-y-scroll' : 'mt-[4rem]'}`}
            >
                {userSearch?.map((item: any, index: any) => {
                    return (
                        <div
                            key={index}
                            className={`flex border-l-[10px] justify-between shadow-md rounded-lg px-2 py-[0.6rem]`}
                            style={{
                                borderColor: item?.id
                                    ? colorFromTimeline?.[item?.id]
                                    : usersColor1?.[
                                          item?.groupId || item?.childId
                                      ],
                                marginBottom: plannerView
                                    ? margin[item?.id || item?.childId] - 50
                                    : '',
                            }}
                        >
                            <div className="flex space-x-2 items-center">
                                <input
                                    type="checkbox"
                                    data-testid="check-uncheck-user"
                                    onClick={(e) =>
                                        handleEventsCall(
                                            item?.id,
                                            item?.groupId,
                                            item?.childId,
                                            e
                                        )
                                    }
                                    checked={
                                        users?.clickedUser[
                                            item?.id ||
                                                item?.groupId ||
                                                item?.childId
                                        ] || false
                                    }
                                    onChange={() =>
                                        handleChange(
                                            item?.id,
                                            item?.groupId,
                                            item?.childId
                                        )
                                    }
                                    style={{
                                        backgroundColor: users?.clickedUser[
                                            item?.id ||
                                                item?.groupId ||
                                                item?.childId
                                        ]
                                            ? item?.id
                                                ? colorFromTimeline?.[
                                                      item?.id || item?.childId
                                                  ]
                                                : usersColor1?.[
                                                      item?.groupId ||
                                                          item?.childId
                                                  ]
                                            : '',
                                    }}
                                    className={`rounded-full h-[1.3rem] w-[1.3rem]
                                    focus:ring-0 focus:ring-offset-0 checked:border-transparent border-gray-300 border-1`}
                                />
                                <label className="font-sm text-sm">
                                    {`${item.firstName} ${item.lastName === undefined ? '' : item.lastName}`}
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="font-light text-[12px]">
                                    {item?.roleName}
                                </label>
                                <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                        deleteUserName(
                                            item?.id,
                                            item?.groupId,
                                            item?.childId
                                        )
                                    }
                                    data-testid="remove-user"
                                >
                                    <img src={crossIcon} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
