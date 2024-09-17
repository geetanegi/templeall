import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
export default function TargetModal({
    open,
    onClose,
    data,
}: {
    open: boolean;
    onClose: any;
    data: any;
}): React.JSX.Element {
    const targetData = [
        { label: 'Domain', value: data?.domainId?.name },
        { label: 'Program', value: data?.programId?.name },
        { label: 'Target', value: data?.name },
        { label: 'Target Goal', value: data?.targetGoal },
        { label: 'Maximum Trial', value: data?.maxTrials },
        { label: 'Minimum Trial', value: data?.minTrials },
        { label: 'Target Type', value: data?.targetType },
        { label: 'Target Location', value: data?.targetLocation },
        {
            label: 'Guideline Template',
            value: data?.guidelineTemplateId?.templateId?.name,
        },
    ];
    return (
        <Modal open={open} id={'target-modal'} expandModal={false}>
            <ModalHeader
                title={data?.name}
                onClose={onClose}
                closeIcon={true}
            />
            <ModalBody expandModal={false}>
                <div className="md:px-9 md:pt-5 md:pb-10 w-[50rem]">
                    {targetData?.map((item, index) => {
                        return (
                            <div
                                className="flex space-x-2 items-baseline"
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
