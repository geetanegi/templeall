import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getTargetByIdCall } from '../../redux/slice/getTarget/getTargetByProgramId';
import { useParams } from 'react-router-dom';
export default function TargetDetailsModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const targetDetails = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    React.useEffect(() => {
        dispatch(
            getTargetByIdCall({
                targetId: params?.targetId || targetDetails?.id,
            })
        );
    }, [dispatch, params?.targetId, targetDetails?.id]);
    const domainName = useSelector(
        ({ getProgramsByDomainId }: any) =>
            getProgramsByDomainId?.domainData?.data
    );
    const programName = useSelector(({ renameProgram }: any) => renameProgram);
    const targetData = [
        { label: 'Domain', value: domainName?.name },
        { label: 'Program', value: programName?.programName },
        { label: 'Target', value: targetDetails?.name },
        { label: 'Target Goal', value: targetDetails?.targetGoal },
        {
            label: 'Date Initiated',
            value:
                targetDetails?.initiatedDate === null
                    ? ''
                    : moment(targetDetails?.initiatedDate).format('MM/DD/YYYY'),
        },
        { label: 'Maximum Trial', value: targetDetails?.maxTrials },
        {
            label: 'Comments',
            value: targetDetails?.commentsAllowed ? 'ON' : 'OFF',
        },
        {
            label: 'Auto Progress Targets',
            value: targetDetails?.autoProgressAllowed ? 'ON' : 'OFF',
        },
        { label: 'Target Type', value: targetDetails?.targetType },
        { label: 'Target Location', value: targetDetails?.targetLocation },
        {
            label: 'Guideline Template',
            value: targetDetails?.guidelineTemplateId?.name,
        },
        {
            label: 'Mastery Criteria Template',
            value: targetDetails?.templateForMasteryCriteria?.name,
        },
    ];
    return (
        <Modal open={open} id={'target-details-modal'} expandModal={false}>
            <ModalHeader
                title={'Target Details'}
                onClose={onClose}
                closeIcon={true}
            />
            <ModalBody expandModal={false}>
                <div className="md:px-2 w-[50rem]">
                    {targetData?.map((item, index) => {
                        return (
                            <div
                                className="flex space-x-2 items-baseline mb-2"
                                key={index}
                            >
                                <label className="text-medium font-medium text-[#394148]">
                                    {`${item?.label}: `}
                                </label>
                                <label className="text-medium font-light text-gray-500">
                                    {item?.value}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </ModalBody>
        </Modal>
    );
}
