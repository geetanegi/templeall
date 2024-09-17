/* eslint-disable max-len */
import * as React from 'react';
import Breadcrumb from './Breadcrumb';
import SaveCriteria from './SaveCriteria';
import DataCollectionButtonTypes from './DataCollectionButtonTypes';
import Baseline from './Phase/Baseline';
import Intervention from './Phase/Intervention';
import Maintenance from './Phase/Maintenance';
import { useSelector, useDispatch } from 'react-redux';
import { getTemplateCall } from '../../redux/slice/GetTemplate/getTemplate';
import { savingProgramTemplateId } from '../../redux/slice/CreateProgram/createProgram';
import { setDataType } from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
export default function MasterCriteriaLandingPageComponents({
    editTarget,
    isFromGeneralCriteria,
    setIsFromGeneralCriteria,
}: {
    editTarget?: any;
    isFromGeneralCriteria?: any;
    setIsFromGeneralCriteria?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const isProgramModal = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria?.isFromModal
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    React.useEffect(() => {
        if (editData?.id) {
            const data = {
                id: editData?.id,
            };
            dispatch(getTemplateCall(data));
        }
    }, [editData?.id]);
    React.useEffect(() => {
        if (
            editProgramData?.onRename &&
            editProgramData?.programData?.addMasteryTemplateToChild
        ) {
            dispatch(
                savingProgramTemplateId(
                    editProgramData?.programData?.templateForMasteryCriteria?.id
                )
            );
        }
    }, [editProgramData?.onRename]);
    React.useEffect(() => {
        const targetId = editTarget?.id;
        if (targetId?.length != 0) {
            if (editTarget?.targetType) {
                dispatch(setDataType(editTarget?.targetType));
            }
        }
    }, [editTarget]);
    return (
        <>
            <div className="px-5 py-2" data-testid="master-criteria">
                {!isProgramModal &&
                    !criteriaData?.isFormVisible &&
                    !isFromGeneralCriteria && (
                        <>
                            <Breadcrumb
                                name={
                                    editData?.id
                                        ? editData?.name
                                        : criteriaData?.value?.name
                                }
                            />
                            <SaveCriteria />
                            <DataCollectionButtonTypes />
                        </>
                    )}
                <div
                    className={`${criteriaData?.value?.id || criteriaData?.onEditCriteria || isProgramModal || isFromGeneralCriteria ? '' : 'opacity-20 cursor-not-allowed pointer-events-none'} ${targetDataByIdClicked?.targetStatus === 'Mastered' ? 'cursor-not-allowed' : ''} cards flex pl-6 pr-8 pt-4 w-full'} cards flex pl-6 pr-8 pt-4 w-full`}
                >
                    <Baseline
                        isFromGeneralCriteria={isFromGeneralCriteria}
                        setIsFromGeneralCriteria={setIsFromGeneralCriteria}
                    />
                    <Intervention
                        isFromGeneralCriteria={isFromGeneralCriteria}
                        setIsFromGeneralCriteria={setIsFromGeneralCriteria}
                    />
                    <Maintenance
                        isFromGeneralCriteria={isFromGeneralCriteria}
                        setIsFromGeneralCriteria={setIsFromGeneralCriteria}
                    />
                </div>
            </div>
        </>
    );
}
