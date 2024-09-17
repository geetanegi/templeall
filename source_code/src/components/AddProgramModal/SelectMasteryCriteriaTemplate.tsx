import React from 'react';
import TempFolder from '../../assets/img/tempFolder.svg';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
import Blueinformation from '../../assets/img/blueInformation.svg';
import { Field, useFormikContext } from 'formik';
import {
    getMasteryCriteriaTemplateCall,
    savingGetMasteryCriteriaTemplateData,
} from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import {
    savingProgramTemplateId,
    setMasteryCriteria,
} from '../../redux/slice/CreateProgram/createProgram';
import {
    savingMasterData,
    savingTemplateData,
    setCardCount,
    setDataType,
    setMasteryCriteriaName,
    setCardCountDuration,
    setCardCountFrequency,
    returnInitialStateCard,
    setCardCountScore,
    setCardCountLat,
    setCardCountRating,
    setCardCountFirst,
    setCardCountRate,
    setCardCountTime,
    setCardCountTask,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { getTemplateCall } from '../../redux/slice/GetTemplate/getTemplate';
import { useParams } from 'react-router-dom';

export default function SelectMasteryCriteriaTemplate({
    disableSave,
    setIsChecked,
}: {
    disableSave: any;
    setIsChecked?: any;
}): React.JSX.Element {
    const tempName = useSelector(
        ({ createProgram }: any) => createProgram?.masteryCriteriaName?.data
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const hideAll = useSelector(
        ({ getTarget }: any) => getTarget?.hideAddToAll
    );
    const masteryName = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.name
    );
    const dispatch = useDispatch<any>();
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const isFromTarget = useSelector(
        ({ getTarget }: any) => getTarget?.isFromTarget
    );
    const desc = useSelector(
        ({ getTemplate }: any) => getTemplate?.value?.data?.description
    );
    const params = useParams();
    const domainNames = tempName;

    const tempData = async (id: any): Promise<any> => {
        const data = {
            dataType:
                criteriaData?.dataType ||
                targetData?.clickedTarget?.data?.targetType,
            templateId: id,
            isProgram: criteriaData?.isProgram ? true : false,
            temporaryId: criteriaData?.templateData?.temporaryId || '',
            addNew: id ? false : true,
            isTarget: targetData?.isFromTarget ? true : false,
            programId: targetData?.isFromTarget
                ? editProgramData?.programData?.id
                : params?.programId || '',
            targetId: targetData?.clickedTarget?.data?.id,
        };
        dispatch(getMasteryCriteriaTemplateCall(data));
        const payload = { id: id };
        dispatch(getTemplateCall(payload));
        dispatch(setDataType(criteriaData?.dataType));
        dispatch(savingProgramTemplateId(id));
        dispatch(setMasteryCriteriaName(id));
    };

    const onClickHandle = async (e: any): Promise<any> => {
        dispatch(returnInitialStateCard());
        if (e.target.value === '0912') {
            dispatch(savingTemplateData([]));
            dispatch(savingMasterData([]));
            dispatch(savingGetMasteryCriteriaTemplateData([]));
            if (disableSave) disableSave();
            dispatch(savingProgramTemplateId(e.target.value));
            dispatch(setMasteryCriteriaName(e.target.value));
        } else {
            await tempData(e.target.value);
            if (disableSave) disableSave();
        }
        setTimeout(() => {
            dispatch(setCardCount(3));
            dispatch(setCardCountDuration(3));
            dispatch(setCardCountFrequency(3));
            dispatch(setCardCountScore(3));
            dispatch(setCardCountLat(3));
            dispatch(setCardCountRating(3));
            dispatch(setCardCountFirst(3));
            dispatch(setCardCountRate(3));
            dispatch(setCardCountTime(3));
            dispatch(setCardCountTask(3));
        }, 500);
    };

    const { values, handleChange }: { values: any; handleChange: any } =
        useFormikContext();

    return (
        <div className="flex items-baseline">
            {(desc?.length ||
                editProgramData?.programData?.templateForMasteryCriteria
                    ?.description?.length) > 0 && (
                <div className="pr-2">
                    <Tooltip
                        title={
                            desc ||
                            editProgramData?.programData
                                ?.templateForMasteryCriteria?.description
                        }
                    >
                        <img
                            className="w-[1rem]"
                            src={Blueinformation}
                            alt="Information icon"
                        />
                    </Tooltip>
                </div>
            )}

            <div className="relative inline-block w-2/4">
                <div className="absolute top-2/3 transform -translate-y-1/2 ps-1">
                    <img
                        src={TempFolder}
                        alt="Folder"
                        className="mr-2 h-5 w-5"
                    />
                </div>
                <Field
                    as="select"
                    name={'masteryName'}
                    id={'masteryName'}
                    className={`mt-5 w-full border-b-2 border-gray-300 rounded px-3 py-1 pl-8 ${
                        targetDataByIdClicked?.isEditable === false
                            ? 'cursor-not-allowed'
                            : ''
                    }`}
                    placeholder={'Select Program Type'}
                    isRequired={false}
                    data-testid="select-mastery-criteria"
                    value={
                        masteryName ||
                        targetData?.clickedTarget?.data
                            ?.templateForMasteryCriteria?.id ||
                        editProgramData?.programData?.addMasteryTemplateToChild
                            ? editProgramData?.programData
                                  ?.templateForMasteryCriteria?.id
                            : '' || ''
                    }
                    disabled={targetDataByIdClicked?.isEditable === false}
                    onChange={onClickHandle}
                >
                    <option value="">Select a template</option>
                    <option value="0912">Create new +</option>
                    {domainNames?.map((itemDomain: any, index: any) => (
                        <option key={index} value={itemDomain?.id}>
                            {itemDomain?.name}
                        </option>
                    ))}
                </Field>
            </div>
            <div className="flex ml-12">
                {!isFromTarget && hideAll ? (
                    <>
                        <Field
                            type="checkbox"
                            name="addToMasteryCriteria"
                            id="addToMasteryCriteria"
                            checked={values?.addToMasteryCriteria}
                            onChange={(e: any) => {
                                handleChange(e);
                                dispatch(
                                    setMasteryCriteria(
                                        !values?.addToMasteryCriteria
                                    )
                                );
                                if (setIsChecked)
                                    setIsChecked(!values?.addToMasteryCriteria);
                            }}
                        />
                        <label
                            htmlFor="addToMasteryCriteria"
                            className="text-sm font-sm ms-2"
                        >
                            Add to all targets
                        </label>
                    </>
                ) : null}
            </div>
        </div>
    );
}
