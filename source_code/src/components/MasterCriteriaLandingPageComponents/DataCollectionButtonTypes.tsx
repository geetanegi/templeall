/* eslint-disable max-len */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setAutoProgress,
    setAutoRegress,
    setDataType,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { Link, useParams } from 'react-router-dom';
import {
    getFormData,
    getMasteryCriteriaTemplateCall,
    savingGetMasteryCriteriaTemplateData,
} from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import { savingGetMasteryCriteriaTemplateDataById } from '../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';

export default function DataCollectionButtonTypes(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria?.value?.id
    );
    const targetData = useSelector(({ getTarget }: any) => getTarget);

    const onEdit = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria?.onEditCriteria
    );
    const dataType = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria?.dataType
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const params = useParams();
    const tabs: Array<string> = [
        'Percent',
        'Duration',
        'Frequency',
        'Latency',
        'Score',
        'Rating Scale',
        'First Probe',
        'Rate',
        'Time Sampling',
        'Task Analysis',
    ];
    const onClickHandle = (item: any): any => {
        dispatch(getFormData([]));
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(setAutoProgress([]));
        dispatch(setAutoRegress([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(setDataType(item));
        const data = {
            templateId: criteriaData || editData?.id,
            dataType: item,
            isProgram: criteriaData?.isProgram ? true : false,
            temporaryId: criteriaData?.templateData?.temporaryId || '',
            addNew: criteriaData || editData?.id ? false : true,
            isTarget: targetData?.isFromTarget ? true : false,
            programId: targetData?.isFromTarget
                ? editProgramData?.programData?.id
                : params?.programId || '',
            targetId: targetData?.clickedTarget?.data?.id,
        };
        dispatch(getMasteryCriteriaTemplateCall(data));
    };

    return (
        <>
            <Link to={'/mastery-criteria-template'}>
                <nav
                    className="flex space-x-2"
                    aria-label="Tabs"
                    role="tablist"
                >
                    {tabs?.map((item, index) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                disabled={criteriaData || onEdit ? false : true}
                                onClick={(e) => {
                                    onClickHandle(item);
                                    e?.preventDefault();
                                }}
                                data-testid={`phase-button-${index}`}
                                className={`${dataType === item && (criteriaData || onEdit) ? 'active' : ''} hs-tab-active:bg-theme-lightBlue1 hs-tab-active:shadow-md hover:-translate-y-1 hover:transition hover:duration-500 hs-tab-active:shadow-gray-500/40 hs-tab-active:rounded-b-none hs-tab-active:border-b-2 hs-tab-active:border-black hs-tab-active:text-white text-black bg-[#48ABCA] bg-opacity-30 hs-tab-active:hover:text-white py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 text-sm font-sm hover:text-white hover:bg-theme-lightBlue1 rounded-md disabled:opacity-50 disabled:text-white disabled:bg-secondary-200 disabled:pointer-events-none`}
                                id="fill-and-justify-item-1"
                                data-hs-tab="#fill-and-justify-1"
                                aria-controls="fill-and-justify-1"
                                role="tab"
                            >
                                {item}
                            </button>
                        );
                    })}
                </nav>
            </Link>
        </>
    );
}
