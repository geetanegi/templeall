import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { taskAnalysis } from '../../api/services/TaskAnalysis/TaskAnalysisApi';
import { useSelector } from 'react-redux';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import edit from '../../assets/img/editIcon.svg';
interface StepsComponentProps {
    stepData: any[];
    setCurrentData: (data?: any) => void;
    setBadges: (badges: any[]) => void;
    setStepName: (name: string) => void;
    setOrderStep: (order: number | null) => void;
    setIsEdit: (isEdit: boolean) => void;
    setStepData: (data: any[]) => void;
    setCount: (count: number) => void;
    count: number;
}
interface StepItemProps {
    index: number;
    item?: any;
    moveStep: (dragIndex: number, hoverIndex: number) => void;
    editStep: (data: any) => void;
    handleDeleteStep: (item: any) => void;
}
const StepsComponent: React.FC<StepsComponentProps> = ({
    stepData,
    setCurrentData,
    setBadges,
    setStepName,
    setOrderStep,
    setIsEdit,
    setStepData,
    setCount,
    count,
}) => {
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const StepItem: React.FC<StepItemProps> = ({
        index,
        item,
        moveStep,
        editStep,
        handleDeleteStep,
    }) => {
        const [{ isDragging }, drag, preview] = useDrag({
            type: 'STEP',
            item: { index },
            collect: (monitor: any) => ({
                isDragging: monitor.isDragging(),
            }),
        });
        const dragRef = useRef<HTMLDivElement>(null);
        const [, drop] = useDrop({
            accept: 'STEP',
            hover(item1: any, monitor: DropTargetMonitor) {
                if (!dragRef.current) {
                    return;
                }
                const dragIndex = item1.index;
                const hoverIndex = index;
                if (dragIndex === hoverIndex) {
                    return;
                }
                const hoverBoundingRect =
                    dragRef.current?.getBoundingClientRect();
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY =
                    (clientOffset as any).y - hoverBoundingRect.top;
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                moveStep(dragIndex, hoverIndex);
                item1.index = hoverIndex;
            },
        });
        drag(drop(dragRef));
        preview(drop(dragRef));
        return (
            <div ref={dragRef}>
                <div className={`flex p-2 ${isDragging ? 'opacity-50' : ''}`}>
                    <div className="text-sm font-bold">Step {item.order}</div>
                    <div className="ps-2 item-start items-center text-sm flex w-64">
                        {item.stepDescription}
                    </div>
                    <div className="flex">
                        <span className="mr-4" onClick={() => editStep(item)}>
                            <img src={edit} alt="Edit" />
                        </span>
                        <span onClick={() => handleDeleteStep(item)}>
                            <img src={deleteIcon} alt="Delete" />
                        </span>
                    </div>
                </div>
                <div className="bg-[#3b3b3b] h-[0.1rem] mr-2 ml-2"></div>
            </div>
        );
    };
    const editStep = (data: any): void => {
        setCurrentData(data);
        setBadges(data?.stepPrompts);
        setStepName(data?.stepDescription);
        setOrderStep(data?.order);
        setIsEdit(true);
    };
    const handleCancel = (): void => {
        setStepName('');
        setIsEdit(false);
        setOrderStep(null);
        setCurrentData({});
    };
    const handleDeleteStep = async (item: any): Promise<void> => {
        const updatedSteps = stepData.filter(
            (step: any) => step.order !== item.order
        );
        const updatedStepsWithCorrectOrder = updatedSteps.map(
            (step: any, index: number) => ({
                ...step,
                order: index + 1,
            })
        );
        setStepData(updatedStepsWithCorrectOrder);
        setCount(count - 1);
        try {
            if (editProgramData?.programData?.id || targetDataByIdClicked?.id) {
                const payloadData = { id: item.id };
                await taskAnalysis.deleteSteps(payloadData);
                const data = {
                    stepData: updatedStepsWithCorrectOrder.map(
                        (dataItem: any) => ({
                            ...dataItem,
                            stepPrompts: JSON.stringify(dataItem.stepPrompts),
                        })
                    ),
                };
                await taskAnalysis.setStepOrder(data);
            }
            handleCancel();
        } catch (error) {}
    };
    const moveStep = async (
        dragIndex: number,
        hoverIndex: number
    ): Promise<void> => {
        const dragStep = stepData[dragIndex];
        const updatedSteps = [...stepData];
        updatedSteps.splice(dragIndex, 1);
        updatedSteps.splice(hoverIndex, 0, dragStep);
        const updatedStepsWithCorrectOrder = updatedSteps.map(
            (step: any, index: number) => ({
                ...step,
                order: index + 1,
            })
        );
        setStepData(updatedStepsWithCorrectOrder);
        try {
            if (editProgramData?.programData?.id) {
                const data = { stepData: updatedStepsWithCorrectOrder };
                await taskAnalysis.setStepOrder(data);
            }
        } catch (error) {}
    };
    return (
        <div
            className="w-full h-56 bg-white border overflow-x-scroll shadow-md rounded-md ml-2 min-w-[25rem]"
            data-testid="program-step-modal"
        >
            {stepData.map((item: any, index: number) => (
                <StepItem
                    key={index}
                    index={index}
                    item={item}
                    moveStep={moveStep}
                    editStep={editStep}
                    handleDeleteStep={handleDeleteStep}
                />
            ))}
        </div>
    );
};
export default StepsComponent;
