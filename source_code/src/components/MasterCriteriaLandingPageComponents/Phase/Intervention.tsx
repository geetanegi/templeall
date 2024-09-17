/* eslint-disable max-len */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getMasteryCriteriaTemplateByIdCall,
    savingGetMasteryCriteriaTemplateDataById,
} from '../../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import { getFormData } from '../../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import {
    savingTemplateData,
    setIsModalClick,
    setPhaseValue,
} from '../../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
export default function Intervention({
    isFromGeneralCriteria,
    setIsFromGeneralCriteria,
}: {
    isFromGeneralCriteria?: any;
    setIsFromGeneralCriteria?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const criteriaTemplateData = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.value?.data
    );
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const interventionData = Array.isArray(criteriaTemplateData)
        ? criteriaTemplateData?.find(
              (item: any) => item?.phase?.name === 'Intervention'
          )
        : null;
    const onClickCard = (): any => {
        const data = {
            id: interventionData?.id,
        };
        dispatch(getMasteryCriteriaTemplateByIdCall(data));
        dispatch(getFormData(interventionData));
        dispatch(setIsModalClick(false));
        if (isFromGeneralCriteria) {
            setIsFromGeneralCriteria(false);
        }
        dispatch(setPhaseValue('Intervention'));
    };
    const clearingData = (): any => {
        dispatch(savingTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
    };
    const isDisabled =
        (targetDataByIdClicked?.targetStatus === 'Maintenance' ||
            targetDataByIdClicked?.targetStatus === 'Mastered') &&
        !targetDataByIdClicked?.isEditable;
    return (
        <>
            <div
                className={` Baseline w-1/3 text-[#7BBC64] text-lg font-semibold font-['Lato'] leading-normal mt-5 ml-3 ${
                    isDisabled ? 'cursor-not-allowed pointer-events-none' : ''
                }`}
            >
                {'Intervention'}
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-[#7BBC64] from-60% to-transparent w-full h-[0.2rem] rounded-t-md"></div>
                </div>
                <div className="Rectangle2533 h-[30rem] px-6 pt-6 bg-gradient-to-b from-zinc-100 to-transparent">
                    <Link
                        to={`${criteriaData?.isFromModal || isFromGeneralCriteria ? '' : '/master-criteria-template/Intervention'}`}
                        onClick={() => onClickCard()}
                        data-testid="intervention-card"
                    >
                        <div className="hover:-translate-y-1 hover:transition hover:duration-500 hover:border-3 hover:border-[#7BBC64] bg-white border shadow-lg rounded-xl">
                            <div className="p-2 md:px-4 md:py-3">
                                <div>
                                    <label className="text-[#7BBC64] text-xl font-semibold">
                                        #1
                                    </label>
                                </div>
                                {interventionData?.id ? (
                                    <div
                                        className={`py-3 pb-4 space-y-1 ${
                                            isDisabled
                                                ? 'cursor-not-allowed'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                Time Frame:
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {
                                                    interventionData?.timeFrame
                                                        ?.name
                                                }
                                            </label>
                                        </div>
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                Time Peroid:
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {interventionData?.timePeriod}
                                            </label>
                                        </div>
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                Operation Type:
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {interventionData.operationType}
                                            </label>
                                        </div>
                                        {(criteriaData?.dataType ===
                                            'Percent' ||
                                            criteriaData?.dataType ===
                                                'Duration' ||
                                            criteriaData?.dataType ===
                                                'First Probe' ||
                                            criteriaData?.dataType ===
                                                'Task Analysis') && (
                                            <div className="flex space-x-2">
                                                <label className="text-sm text-[#394148]">
                                                    {criteriaData?.dataType ===
                                                        'Percent' ||
                                                    criteriaData?.dataType ===
                                                        'First Probe' ||
                                                    criteriaData?.dataType ===
                                                        'Task Analysis'
                                                        ? 'Accuracy Threshold:'
                                                        : 'Duration Requirment:'}
                                                </label>
                                                <label className="text-sm font-light text-gray-500">
                                                    {criteriaData?.dataType ===
                                                        'Percent' ||
                                                    criteriaData?.dataType ===
                                                        'First Probe' ||
                                                    criteriaData?.dataType ===
                                                        'Task Analysis'
                                                        ? interventionData?.accuracy
                                                            ? interventionData?.accuracy
                                                            : ''
                                                        : interventionData?.durationMinutes ||
                                                            interventionData?.durationSeconds
                                                          ? `${interventionData?.durationMinutes} minutes ${interventionData?.durationSeconds} seconds`
                                                          : ''}
                                                </label>
                                            </div>
                                        )}
                                        {criteriaData?.dataType ===
                                            'Latency' && (
                                            <div className="flex space-x-2">
                                                <label className="text-sm text-[#394148]">
                                                    Latency:
                                                </label>
                                                <label className="text-sm font-light text-gray-500">
                                                    {interventionData?.latencyMinutes ||
                                                    interventionData?.latencySeconds
                                                        ? `${interventionData?.latencyMinutes} minutes ${interventionData?.latencySeconds} seconds`
                                                        : ''}
                                                </label>
                                            </div>
                                        )}
                                        {criteriaData?.dataType ===
                                            'Time Sampling' && (
                                            <div className="flex space-x-2">
                                                <label className="text-sm text-[#394148]">
                                                    Percent of Intervals:
                                                </label>
                                                <label className="text-sm font-light text-gray-500">
                                                    {interventionData?.timeSamplingInterval
                                                        ? interventionData?.timeSamplingInterval
                                                        : ''}
                                                </label>
                                            </div>
                                        )}
                                        {(criteriaData?.dataType ===
                                            'Frequency' ||
                                            criteriaData?.dataType ===
                                                'Rate') && (
                                            <div className="flex space-x-2">
                                                <label className="text-sm text-[#394148]">
                                                    Frequency:
                                                </label>
                                                <label className="text-sm font-light text-gray-500">
                                                    {interventionData?.frequency
                                                        ? interventionData?.frequency
                                                        : ''}
                                                </label>
                                            </div>
                                        )}
                                        {criteriaData?.dataType === 'Rate' && (
                                            <div className="flex space-x-2">
                                                <label className="text-sm text-[#394148]">
                                                    Time:
                                                </label>
                                                <label className="text-sm font-light text-gray-500">
                                                    {`${interventionData?.rateHour ? interventionData?.rateHour : 0} hour ${interventionData?.rateMinutes ? interventionData?.rateMinutes : 0} minutes ${interventionData?.rateSeconds ? interventionData?.rateSeconds : 0} seconds`}
                                                </label>
                                            </div>
                                        )}
                                        {criteriaData?.dataType === 'Score' && (
                                            <div className="flex space-x-2">
                                                <label className="text-sm text-[#394148]">
                                                    Score:
                                                </label>
                                                <label className="text-sm font-light text-gray-500">
                                                    {interventionData?.score
                                                        ? interventionData?.score
                                                        : ''}
                                                </label>
                                            </div>
                                        )}
                                        {criteriaData?.dataType ===
                                            'Rating Scale' && (
                                            <div className="flex space-x-2">
                                                <label className="text-sm text-[#394148]">
                                                    Rating:
                                                </label>
                                                <label className="text-sm font-light text-gray-500">
                                                    {interventionData?.ratingScale
                                                        ? interventionData?.ratingScale
                                                        : ''}
                                                </label>
                                            </div>
                                        )}
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                {interventionData?.autoProgress
                                                    ?.name === undefined
                                                    ? ''
                                                    : 'Auto Progress:'}
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {interventionData?.autoProgress
                                                    ?.name === undefined
                                                    ? ''
                                                    : interventionData
                                                            ?.autoProgress?.name
                                                      ? `${interventionData?.autoProgress?.name} -
                                                     1`
                                                      : ''}
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <div className=" flex flex-col text-center md:pt-4 md:pb-10">
                                        <label className="text-lg font-medium text-gray-800">
                                            No values here
                                        </label>
                                        <Link
                                            to={`${criteriaData?.isFromModal || isFromGeneralCriteria ? '' : '/master-criteria-template/Intervention'}`}
                                            onClick={() => clearingData()}
                                        >
                                            <label className="mt-1 cursor-pointer text-theme-lightBlue1 font-medium hover:underline">
                                                Start Adding Criteria
                                            </label>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
