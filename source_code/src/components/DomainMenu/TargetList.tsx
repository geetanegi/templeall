import React, { useRef } from 'react';
import addComments from '../../assets/img/addComments.svg';
import TargetIcon from './TargetIcon';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ITEM_TYPES } from '../../constants/DraggableItems';
import { useDrag, useDrop } from 'react-dnd';
import target_2 from '../../assets/img/target_2.svg';
import setTargetIndexAPI from '../../api/services/setTargetIndex.service';
import { getTargetCall } from '../../redux/slice/getTarget/getTargetByProgramId';
import Checkbox from '../Generics/Inputs/Checkbox';
import deleteIcon from '../../assets/img/delete.svg';
import cancel from '../../assets/img/close.svg';
import save from '../../assets/img/Tick.svg';
import Spinner from '../Generics/Spinner';
let programId: any = '';
let newIndex = 0;
let value = false;
let data: any = '';
export default function TargetList({
    target,
    key,
    handleAddTarget,
    handleTargetCheckChange,
    isTargetChecked,
    fromLibrary,
    itemDomain,
    itemProgram,
    handlePreventRedirection,
    onDelete,
    handleMouseEnter,
    fromQuickLook,
    setOpenConfirmationModalForDelete,
    setModalValues,
    onEditTarget,
    setOnEditTarget,
    onEditTargetName,
    setOnEditTargetName,
    handleRename,
    handleSaveRename,
    checkClickedId,
}: {
    target: any;
    key: any;
    handleAddTarget: any;
    handleTargetCheckChange: any;
    isTargetChecked: any;
    fromLibrary: any;
    itemDomain: any;
    itemProgram: any;
    handlePreventRedirection: any;
    onDelete: any;
    handleMouseEnter: any;
    setOpenConfirmationModalForDelete: any;
    setModalValues: any;
    fromQuickLook: any;
    onEditTarget: any;
    setOnEditTarget: any;
    onEditTargetName: any;
    setOnEditTargetName: any;
    handleRename: any;
    handleSaveRename: any;
    checkClickedId?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const openFolder = useSelector(({ getDomainById }: any) => getDomainById);
    const allTargets: any = useSelector(
        ({ getTarget }: any) => getTarget?.value?.[itemProgram.id].data
    );
    const params = useParams();
    const ref: any = useRef<HTMLDivElement>(null);
    const url = window.location.href;
    const moveListItem = async (
        dragIndex: any,
        hoverIndex: any,
        myValue: any,
        myData: any
    ): Promise<any> => {
        let sortedTargetData = [];
        if (value) {
            sortedTargetData = myData
                ? [...myData].sort((a, b) => a.indexCount - b.indexCount)
                : [];
        } else {
            sortedTargetData = allTargets
                ? [...allTargets].sort((a, b) => a.indexCount - b.indexCount)
                : [];
        }
        const _data = [...sortedTargetData];
        const draggedItemContent = _data[dragIndex];
        _data.splice(dragIndex, 1);
        _data.splice(hoverIndex, 0, draggedItemContent);
        const updatedItems = _data.map((item, index) => {
            return { ...item, indexCount: index + 1 };
        });
        const targetsData = updatedItems.map((item) => {
            return {
                name: item.name,
                id: item.id,
                indexCount: item.indexCount,
            };
        });
        data = updatedItems;
        const res = await setTargetIndexAPI.setTargetIndex({
            targets: targetsData,
        });
        if (!res?.data?.error) {
            dispatch(
                getTargetCall({
                    programId: itemProgram?.id,
                    isTargetPinned: pinnedData?.addQuickLook,
                    quickLookId: pinnedData?.clickedQuickLook,
                })
            );
            value = true;
            newIndex = 0;
            programId = itemProgram?.id;
        } else {
            return res;
        }
    };
    const [, drag] = useDrag(() => ({
        type: ITEM_TYPES.TARGET_ITEM,
        item: { ...target, action: 'move' },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                if (itemProgram?.id !== programId) {
                    value = false;
                }
                const dragIndex = item.indexCount - 1;
                const hoverIndex = newIndex;
                const myValue = value;
                const myData = data;
                if (!fromQuickLook) {
                    moveListItem(dragIndex, hoverIndex, myValue, myData);
                }
            }
        },
    }));
    const [, drop] = useDrop({
        accept: [ITEM_TYPES.TARGET_ITEM],
        hover: (item: any, monitor: any) => {
            const dragIndex = item.indexCount - 1;
            const hoverIndex = target.indexCount - 1;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY =
                monitor.getClientOffset().y - hoverBoundingRect.top;
            if (dragIndex === hoverIndex) {
                return;
            }
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) {
                return;
            }
            item.index = hoverIndex;
            newIndex = hoverIndex;
        },
    });
    drag(drop(ref));
    const moveItemClass = fromQuickLook ? 'pointer' : 'move';
    const handleTarget = (item: any): any => {
        setOpenConfirmationModalForDelete(true);
        setModalValues({
            id: item?.id,
            name: item?.name,
            value: 'target',
            parentId: itemProgram?.id,
        });
    };
    return (
        <>
            <div key={key} onClick={() => handleAddTarget(target)} ref={ref}>
                <li
                    onMouseEnter={() => {
                        handleMouseEnter(target?.id);
                    }}
                    onMouseLeave={() => {
                        handleMouseEnter(target?.id);
                    }}
                    onDoubleClick={() => {
                        handleRename(target, 'Target');
                    }}
                    style={{ cursor: moveItemClass }}
                    className={`${openFolder?.targetIndex !== target?.name ? ' hover:bg-[#f0eeee]' : 'bg-[#f0eeee]'} flex mb-1 items-start ps-6  justify-between `}
                >
                    <div className="flex space-x-2 items-center">
                        {fromLibrary ? (
                            <Checkbox
                                checked={isTargetChecked(target.id.toString())}
                                onChange={(e: any) =>
                                    handleTargetCheckChange(
                                        e,
                                        target.id.toString(),
                                        target.name,
                                        itemProgram.id.toString(),
                                        itemDomain.id.toString()
                                    )
                                }
                            />
                        ) : null}
                        <img src={target_2}></img>
                        {onEditTarget[target?.id] ? (
                            <div className="space-x-2 flex items-end">
                                <input
                                    onChange={(e) => {
                                        setOnEditTargetName(
                                            (prevState: any) => ({
                                                ...prevState,
                                                [target?.id]: e?.target?.value,
                                            })
                                        );
                                    }}
                                    type="text"
                                    value={onEditTargetName[target?.id]}
                                    className="peer text-[#394148] text-sm font-medium py-1 pe-0 ps-1 block w-full bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-gray-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-0"
                                />
                                <div className="flex w-[5rem] ml-3 space-x-1">
                                    <img
                                        onClick={() =>
                                            handleSaveRename(
                                                target,
                                                'Target',
                                                itemProgram?.id,
                                                itemDomain?.id
                                            )
                                        }
                                        src={save}
                                        className="cursor-pointer h-[1rem]"
                                    ></img>
                                    <img
                                        src={cancel}
                                        onClick={() => {
                                            setOnEditTargetName(
                                                (prevState: any) => ({
                                                    ...prevState,
                                                    [target?.id]: target?.name,
                                                })
                                            );
                                            setOnEditTarget(false);
                                        }}
                                        className="cursor-pointer h-[1rem] hover:bg-white px-0 rounded-full"
                                    ></img>
                                </div>
                            </div>
                        ) : (
                            <label className="text-[#333333] font-sm text-sm p-2 space-x-2 flex">
                                <Link
                                    onClick={handlePreventRedirection}
                                    to={`/program-book/${params?.id}/domain/${itemDomain?.id}/program/${itemProgram?.id}/target/${target?.id}`}
                                >
                                    <label className="font-light">
                                        {target?.name}
                                        {checkClickedId === target?.id ? (
                                            <Spinner />
                                        ) : null}
                                    </label>
                                </Link>
                                <TargetIcon targetType={target.targetType} />
                            </label>
                        )}
                        {url?.includes('create-session') ||
                        url?.includes('edit-session') ? null : (
                            <div
                                className={`w-2 h-2 ml-1 self-center rounded-full ${
                                    target?.targetStatus === 'Not Yet Started'
                                        ? 'bg-[#D8846A]'
                                        : target?.targetStatus === 'Started'
                                          ? 'bg-[#5D9614]'
                                          : target?.targetStatus ===
                                              'In Progress'
                                            ? 'bg-[#81C95F]'
                                            : target?.targetStatus === 'On Hold'
                                              ? 'bg-[#CF3939]'
                                              : target?.targetStatus ===
                                                  'Discontinued'
                                                ? 'bg-[#878787]'
                                                : target?.targetStatus ===
                                                    'Mastered'
                                                  ? 'bg-[#03018B]'
                                                  : ''
                                }`}
                            ></div>
                        )}
                        {onDelete[target?.id] && !target?.isTargetExecuted ? (
                            <img
                                src={deleteIcon}
                                onClick={() => handleTarget(target)}
                                className="h-[1.2rem] cursor-pointer"
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    {url?.includes('create-session') ||
                    url?.includes('edit-session')
                        ? null
                        : target?.unreadCommentCount > 0 && (
                              <div className="mr-3 pt-[0.4rem]">
                                  <button
                                      type="button"
                                      className="hover:-translate-y-1 hover:transition hover:duration-500 bg-[#48ABCA] relative inline-flex justify-center items-center h-[1.6rem] w-[1.6rem] text-sm font-semibold rounded-full border border-gray-200 text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none"
                                  >
                                      <img
                                          className="h-[12px]"
                                          src={addComments}
                                      />
                                      <span className="absolute top-0 end-0 inline-flex items-center h-[1rem] w-[1rem] pl-[5px] rounded-full text-[9px] font-medium transform -translate-y-[40%] translate-x-1/2 bg-red-500 text-white">
                                          {target?.unreadCommentCount}
                                      </span>
                                  </button>
                              </div>
                          )}
                </li>
            </div>
        </>
    );
}
