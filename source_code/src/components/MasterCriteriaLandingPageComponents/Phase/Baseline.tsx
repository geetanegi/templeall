/* eslint-disable max-len */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getFormData,
    getMasteryCriteriaTemplateCall,
} from '../../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import { Link, useParams } from 'react-router-dom';
import {
    getMasteryCriteriaTemplateByIdCall,
    savingGetMasteryCriteriaTemplateDataById,
} from '../../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import {
    savingTemplateData,
    setAutoProgress,
    setAutoRegress,
    setIsModalClick,
    setPhaseValue,
} from '../../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
export default function Baseline({
    isFromGeneralCriteria,
    setIsFromGeneralCriteria,
}: {
    isFromGeneralCriteria?: any;
    setIsFromGeneralCriteria?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const criteriaTemplateData = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.value?.data
    );
    const baselineData = Array.isArray(criteriaTemplateData)
        ? criteriaTemplateData?.find(
              (item: any) => item?.phase?.name === 'Baseline'
          )
        : null;
    const templateId = useSelector(
        ({ createProgram }: any) => createProgram?.templateId
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const onClickCard = (): any => {
        const data = {
            id: baselineData?.id,
        };
        dispatch(getMasteryCriteriaTemplateByIdCall(data));
        dispatch(getFormData(baselineData));
        dispatch(setIsModalClick(false));
        if (isFromGeneralCriteria) {
            setIsFromGeneralCriteria(false);
        }
        dispatch(setPhaseValue('Baseline'));
    };
    const clearingData = (): any => {
        dispatch(savingTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(setIsModalClick(false));
        if (isFromGeneralCriteria) {
            setIsFromGeneralCriteria(false);
        }
    };
    const params = useParams();
    React.useEffect(() => {
        const data = {
            templateId:
                criteriaData?.value?.id ||
                editData?.id ||
                templateId ||
                editProgramData?.programData?.templateForMasteryCriteria?.id ||
                targetData?.clickedTarget?.data?.templateForMasteryCriteria?.id,
            dataType:
                criteriaData?.dataType ||
                targetData?.clickedTarget?.data?.targetType ||
                editProgramData?.programData?.programType,
            isProgram: criteriaData?.isProgram ? true : false,
            temporaryId: criteriaData?.templateData?.temporaryId || '',
            addNew:
                criteriaData?.value?.id || editData?.id || templateId?.length
                    ? false
                    : true,
            isTarget: targetData?.isFromTarget ? true : false,
            programId: targetData?.isFromTarget
                ? editProgramData?.programData?.id ||
                  targetData?.clickedTarget?.data?.programId ||
                  ''
                : params?.programId || '',
            targetId: targetData?.clickedTarget?.data?.id,
        };
        if (
            criteriaData?.templateData?.temporaryId ||
            criteriaData?.value?.id ||
            editData?.id ||
            templateId ||
            (editProgramData?.programData?.templateForMasteryCriteria?.id &&
                editProgramData?.programData?.addMasteryTemplateToChild) ||
            targetData?.clickedTarget?.data?.templateForMasteryCriteria?.id
        ) {
            dispatch(setAutoProgress(''));
            dispatch(setAutoRegress(''));
            dispatch(getMasteryCriteriaTemplateCall(data));
        }
    }, []);
    const isDisabled =
        (targetDataByIdClicked?.targetStatus === 'Intervention' ||
            targetDataByIdClicked?.targetStatus === 'Maintenance' ||
            targetDataByIdClicked?.targetStatus === 'Mastered') &&
        !targetDataByIdClicked?.isEditable;
    return (
        <>
            <div
                className={`Baseline text-[#7098E5] text-lg font-semibold font-['Lato'] leading-normal mt-5 ml-3 w-1/3 ${
                    isDisabled ? 'cursor-not-allowed pointer-events-none' : ''
                } `}
            >
                {'Baseline'}
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-[#7098E5] from-60% to-transparent w-full h-[0.2rem] rounded-t-md"></div>
                </div>
                <div className="Rectangle2533 h-[30rem] px-6 pt-6 bg-gradient-to-b from-zinc-100 to-transparent">
                    <Link
                        to={`${criteriaData?.isFromModal || isFromGeneralCriteria ? '' : '/master-criteria-template/Baseline'}`}
                        onClick={() => onClickCard()}
                        data-testid="baseline-card"
                    >
                        <div className="hover:-translate-y-1 hover:transition hover:duration-500 hover:border-3 hover:border-[#7098E5] bg-white border shadow-lg rounded-xl">
                            <div className="p-2 md:px-4 md:py-3">
                                <div>
                                    <label className="text-[#7098E5] text-xl font-semibold">
                                        #1
                                    </label>
                                </div>
                                {baselineData?.id ? (
                                    <div
                                        className={`py-3 pb-4 space-y-1 ${
                                            isDisabled
                                                ? 'cursor-not-allowed pointer-events-none'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                Time Frame:
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {baselineData?.timeFrame?.name}
                                            </label>
                                        </div>
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                Time Peroid:
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {baselineData?.timePeriod}
                                            </label>
                                        </div>
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                Operation Type:
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {baselineData?.operationType}
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
                                                        ? baselineData?.accuracy
                                                            ? baselineData?.accuracy
                                                            : ''
                                                        : baselineData?.durationMinutes ||
                                                            baselineData?.durationSeconds
                                                          ? `${baselineData?.durationMinutes} minutes ${baselineData?.durationSeconds} seconds`
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
                                                    {baselineData?.frequency
                                                        ? baselineData?.frequency
                                                        : ''}
                                                </label>
                                            </div>
                                        )}
                                        {criteriaData?.dataType === 'Score' && (
                                            <div className="flex space-x-2">
                                                <label className="text-sm text-[#394148]">
                                                    Score:
                                                </label>
                                                <label className="text-sm font-light text-gray-500">
                                                    {baselineData?.score
                                                        ? baselineData?.score
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
                                                    {baselineData?.timeSamplingInterval
                                                        ? baselineData?.timeSamplingInterval
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
                                                    {baselineData?.latencyMinutes ||
                                                    baselineData?.latencySeconds
                                                        ? `${baselineData?.latencyMinutes} minutes ${baselineData?.latencySeconds} seconds`
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
                                                    {`${baselineData?.rateHour ? baselineData?.rateHour : 0} hour ${baselineData?.rateMinutes ? baselineData?.rateMinutes : 0} minutes ${baselineData?.rateSeconds ? baselineData?.rateSeconds : 0} seconds`}
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
                                                    {baselineData?.ratingScale
                                                        ? baselineData?.ratingScale
                                                        : ''}
                                                </label>
                                            </div>
                                        )}
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                {baselineData?.autoProgress
                                                    ?.name !==
                                                    'Remove from session' &&
                                                baselineData?.autoProgress
                                                    ?.name !==
                                                    'Mark as goal mastered' &&
                                                baselineData?.autoRegress
                                                    ?.name !== undefined
                                                    ? 'Auto Progress:'
                                                    : ''}
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {baselineData?.autoProgress
                                                    ?.name !==
                                                    'Remove from session' &&
                                                baselineData?.autoProgress
                                                    ?.name !==
                                                    'Mark as goal mastered'
                                                    ? baselineData?.autoProgress
                                                          ?.name ===
                                                      'Maintenance'
                                                        ? `${baselineData?.autoProgress?.name} - ${baselineData?.autoProgress?.indexCount}  else  ${baselineData?.autoRegress?.name}`
                                                        : `${baselineData?.autoRegress?.name ? baselineData?.autoRegress?.name : ''}`
                                                    : ''}
                                            </label>
                                        </div>
                                        <div className="flex space-x-2">
                                            <label className="text-sm text-[#394148]">
                                                {baselineData?.autoProgressPhase
                                                    ?.name ===
                                                'Remove from session'
                                                    ? 'Remove from session:'
                                                    : baselineData?.autoProgressPhase ===
                                                        true
                                                      ? 'Mark as goal mastered:'
                                                      : ''}
                                            </label>
                                            <label className="text-sm font-light text-gray-500">
                                                {baselineData?.autoProgressPhase
                                                    ?.name ===
                                                'Remove from session'
                                                    ? 'Yes'
                                                    : baselineData?.autoProgressPhase ===
                                                        true
                                                      ? 'Yes'
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
                                            to={`${criteriaData?.isFromModal || isFromGeneralCriteria ? '' : '/master-criteria-template/Baseline'}`}
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
