import * as React from 'react';
import pinned from '../../assets/img/pinned.svg';
import edit from '../../assets/img/editWhite.svg';
import add from '../../assets/img/addLooks.svg';
import cancel from '../../assets/img/crossIconWhite.svg';
import save from '../../assets/img/checkIconWhite.svg';
import durationIcon from '../../assets/img/sessionScreen/durationIcon.svg';
import percentageIcon from '../../assets/img/sessionScreen/percentageIcon.svg';
import frequencyIcon from '../../assets/img/sessionScreen/Frequency.svg';
import latencyIcon from '../../assets/img/latency.svg';
import ratingScaleIcon from '../../assets/img/ratingScale.svg';
import scoreIcon from '../../assets/img/score.svg';
import rateIcon from '../../assets/img/sessionScreen/rate.svg';
import firstProbeIcon from '../../assets/img/sessionScreen/firstprobe.svg';
import timeSamplingIcon from '../../assets/img/sessionScreen/timesampling.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllTargetsByQuickLookCall,
    getQuickLookCall,
    savingQuickLookId,
} from '../../redux/slice/QuickLook/quickLook';
import AddTarget from './AddTarget';
import { useParams } from 'react-router-dom';
import renameQuickLookAPI from '../../api/services/QuickLook/renameQucikLook.service';
import CardData from './cardData';
export default function PinnedLooks(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const quickLookData = useSelector(
        ({ quickLook }: any) => quickLook?.value?.data?.quickLookData
    );
    const params = useParams();
    const [openAddTargetModal, setOpenAddTargetModal] =
        React.useState<any>(false);
    const [onHover, setOnHover] = React.useState<any>(false);
    const [onEdit, setOnEdit] = React.useState<any>({});
    const [onEditName, setOnEditName] = React.useState<any>({});
    const onClickCard = (id: any): any => {
        const data = {
            quickLookId: id,
        };
        dispatch(getAllTargetsByQuickLookCall(data));
        dispatch(savingQuickLookId(id));
        setOnHover(true);
    };
    const handleEdit = async (item: any): Promise<any> => {
        setOnEdit((prevState: any) => ({
            ...prevState,
            [item?.quickLookId]: !prevState[item?.quickLookId],
        }));
        setOnEditName((prevState: any) => ({
            ...prevState,
            [item?.quickLookId]: item?.name,
        }));
    };
    const handleRename = (id: any, value: any): any => {
        setOnEditName((prevState: any) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const handleAddTarget = (): any => {
        setOpenAddTargetModal(true);
    };
    const handleSaveEdit = async (item: any): Promise<any> => {
        const data = {
            programBookUUID: params?.id,
            quickLookId: item?.quickLookId,
            modifiedQuickLookName: onEditName[item?.quickLookId],
        };
        const res = await renameQuickLookAPI.renameQuickLook(data);
        if (!res?.data?.error) {
            const payloadData = {
                programBookUUID: params?.id,
            };
            dispatch(getQuickLookCall(payloadData));
            setOnEdit((prevState: any) => ({
                ...prevState,
                [item?.quickLookId]: !prevState[item?.quickLookId],
            }));
        } else {
            return res;
        }
    };
    const onEditCancel = (item: any): any => {
        setOnEditName((prevState: any) => ({
            ...prevState,
            [item?.quickLookId]: item?.name,
        }));
        setOnEdit(false);
    };
    React.useEffect(() => {
        const data = {
            programBookUUID: params?.id,
        };
        dispatch(getQuickLookCall(data));
    }, []);
    return (
        <>
            <div className="flex mt-[2rem] justify-between w-full space-x-3">
                {quickLookData?.map((item: any, index: any) => {
                    return (
                        <div
                            key={index}
                            className="flex w-1/5 flex-col bg-gray-200 rounded-md hover:-translate-y-1 hover:transition hover:duration-500 hover:shadow-md"
                        >
                            <div className="flex justify-between mt-[-12px] items-end">
                                <div className="flex bg-primary-700 rounded-full w-[16rem] h-[2rem]">
                                    <div className="">
                                        <img src={pinned}></img>
                                    </div>
                                    <div className="pl-[10px] flex justify-between">
                                        {onEdit[item?.quickLookId] ? (
                                            <div className="flex items-center">
                                                <input
                                                    onChange={(e) =>
                                                        handleRename(
                                                            item?.quickLookId,
                                                            e?.target?.value
                                                        )
                                                    }
                                                    type="text"
                                                    value={
                                                        onEditName[
                                                            item?.quickLookId
                                                        ]
                                                    }
                                                    className="peer text-white text-sm font-medium py-1 pe-0 ps-1 block w-full bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-whiite disabled:opacity-50 disabled:pointer-events-none focus:outline-0"
                                                />
                                                <div className="flex ml-[-2.5rem] space-x-2">
                                                    <img
                                                        onClick={() =>
                                                            handleSaveEdit(item)
                                                        }
                                                        src={save}
                                                        className="cursor-pointer h-[0.8rem]"
                                                    ></img>
                                                    <img
                                                        src={cancel}
                                                        onClick={() => {
                                                            onEditCancel(item);
                                                        }}
                                                        className="cursor-pointer h-[0.8rem]"
                                                    ></img>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-x-2 flex items-center">
                                                <label className="text-white font-light text-sm">
                                                    {onEditName[
                                                        item?.quickLookId
                                                    ]
                                                        ? onEditName[
                                                              item?.quickLookId
                                                          ]
                                                        : item?.name}
                                                </label>
                                                <img
                                                    src={edit}
                                                    className="h-[1rem] cursor-pointer"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="pl-2">
                                    <img
                                        onClick={() => {
                                            handleAddTarget();
                                        }}
                                        src={add}
                                        className="h-[1.2rem] cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div
                                className="flex flex-col cursor-pointer px-3 py-2"
                                onMouseEnter={() => {
                                    onClickCard(item?.quickLookId);
                                }}
                                onMouseLeave={() => {
                                    setOnHover(false);
                                }}
                            >
                                <div className="pb-3 flex space-x-2">
                                    <div className="text-sm capitalize">
                                        {item?.targetData?.targetType ===
                                        'Percentage' ? (
                                            <img
                                                src={percentageIcon}
                                                alt="Percentage"
                                            />
                                        ) : item?.targetData?.targetType ===
                                          'Duration' ? (
                                            <img
                                                src={durationIcon}
                                                alt="Duration"
                                            />
                                        ) : item?.targetData?.targetType ===
                                          'Latency' ? (
                                            <img
                                                src={latencyIcon}
                                                alt="Latency"
                                                className="w-4 h-4"
                                            />
                                        ) : item?.targetData?.targetType ===
                                          'Rating Scale' ? (
                                            <img
                                                src={ratingScaleIcon}
                                                alt="Rating Scale Icon"
                                                className="w-4 h-4"
                                            />
                                        ) : item?.targetData?.targetType ===
                                          'Score' ? (
                                            <img
                                                src={scoreIcon}
                                                alt="Score Icon"
                                                className="w-4 h-4"
                                            />
                                        ) : item?.targetData?.targetType ===
                                          'Frequency' ? (
                                            <img
                                                src={frequencyIcon}
                                                alt="Frequency"
                                            />
                                        ) : item?.targetData?.targetType ===
                                          'Rate' ? (
                                            <img
                                                src={rateIcon}
                                                alt="rate"
                                                className="w-4 h-4"
                                            />
                                        ) : item?.targetData?.targetType ===
                                          'First Probe' ? (
                                            <img
                                                src={firstProbeIcon}
                                                alt="first probe"
                                                className="w-4 h-4"
                                            />
                                        ) : item?.targetData?.targetType ===
                                          'Time Sampling' ? (
                                            <img
                                                src={timeSamplingIcon}
                                                alt="time sampling"
                                                className="w-4 h-4"
                                            />
                                        ) : null}
                                    </div>
                                    <label className="text-primary-600 font-light text-xs font-semibold">
                                        {item?.targetData?.targetName}
                                    </label>
                                </div>
                                <div className="flex flex-col pb-3 space-y-3 w-full">
                                    <label className="text-sm font-normal text-gray-500">
                                        Last Three Data Points
                                    </label>
                                    <div className="flex">
                                        {item?.targetData?.sessionTargetData?.map(
                                            (item1: any, index1: any) => {
                                                return (
                                                    <div
                                                        key={index1}
                                                        className={`w-1/3 ${index1 === item?.targetData?.sessionTargetData?.length - 1 ? '' : 'border-r-2 border-gray-500 mr-2'}`}
                                                    >
                                                        <label className="text-sm text-gray-500 font-normal">
                                                            {`${item1?.dataPoint}`}
                                                        </label>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {openAddTargetModal && (
                <AddTarget
                    open={openAddTargetModal}
                    onClose={() => {
                        setOpenAddTargetModal(false);
                    }}
                />
            )}
            {onHover && <CardData />}
        </>
    );
}
