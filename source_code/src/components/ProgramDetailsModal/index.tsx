import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getProgramById } from '../../redux/slice/RenameProgram/renameProgram';

export default function ProgramDetailsModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const programDetails = useSelector(
        ({ renameProgram }: any) => renameProgram?.programData
    );
    const domainName = useSelector(
        ({ getProgramsByDomainId }: any) =>
            getProgramsByDomainId?.domainData?.data
    );
    const programData = [
        { label: 'Domain', value: domainName?.name },
        { label: 'Program', value: programDetails?.name },
        { label: 'Program Goal', value: programDetails?.programGoal },
        {
            label: 'Start Date',
            value:
                programDetails?.startDate === null ||
                programDetails?.startDate === undefined
                    ? ''
                    : moment(programDetails?.startDate).format('MM/DD/YYYY'),
        },
        {
            label: 'Comments',
            value: programDetails?.commentsAllowed ? 'ON' : 'OFF',
        },
        {
            label: 'Auto Progress Targets',
            value: programDetails?.autoProgressAllowed ? 'ON' : 'OFF',
        },
        { label: 'Program Type', value: programDetails?.programType },
        {
            label: 'Guideline Template',
            value: programDetails?.templateId?.name,
        },
        {
            label: 'Mastery Criteria Template',
            value: programDetails?.templateForMasteryCriteria?.name,
        },
    ];
    React.useEffect(() => {
        const data = {
            id: programDetails?.id,
            isTarget: false,
        };
        dispatch(getProgramById(data));
    }, []);
    return (
        <Modal open={open} id={'program-details-modal'} expandModal={false}>
            <ModalHeader
                title={'Program Details'}
                onClose={onClose}
                closeIcon={true}
            />
            <ModalBody expandModal={false}>
                <div className="md:px-2 w-[50rem]">
                    {programData?.map((item, index) => {
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
