import React, { useState, useEffect } from 'react';
import add from '../../assets/img/addLocation.svg';
import editIcon from '../../assets/img/GridIcons/edit.svg'; // Add edit icon
import deleteIcon from '../../assets/img/GridIcons/delete.svg'; // Add delete icon
import Input from '../Generics/Inputs/Input';
import { useFormikContext, Field } from 'formik';
import Tooltip from '../Generics/Tooltip';

interface Target {
    id: number;
    name: string;
}

function AddBulkingTarget({
    formRefBulking,
    targets,
    setTargets,
    isFromTarget,
    errorMessage,
    setErrorMessage,
    showAddTargetForm,
    setShowAddTargetForm,
}: {
    formRefBulking: any;
    targets: Target[];
    setTargets: (targets: Target[]) => void;
    isFromTarget?: boolean;
    errorMessage: string;
    setErrorMessage: (message: string) => void;
    showAddTargetForm?: boolean;
    setShowAddTargetForm?: any;
}): React.JSX.Element {
    const [editingTargetId, setEditingTargetId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState<string>('');

    const {
        values,
        handleChange,
        handleBlur,
        setFieldTouched,
        handleSubmit,
        setFieldValue,
        errors,
    } = useFormikContext<any>();

    useEffect(() => {
        if (errorMessage && values.targetName.trim() !== '') {
            const isDuplicate = targets.some(
                (target: Target) => target.name === values.targetName.trim()
            );
            if (!isDuplicate) {
                setErrorMessage('');
            }
        }
    }, [values.targetName, targets, setErrorMessage, errorMessage]);

    const addTarget = (): void => {
        if (!errors?.targetName?.length) {
            if (values.targetName.trim() === '') return;

            const isDuplicate = targets.some(
                (target: Target) => target.name === values.targetName.trim()
            );
            if (isDuplicate) {
                setErrorMessage('Please provide a unique target name');
                return;
            }

            const newTarget: Target = {
                id: targets.length + 1,
                name: values.targetName.trim(),
            };

            setTargets([...targets, newTarget]);
            setFieldValue('targetName', '');
            setErrorMessage('');
        }
    };

    const clearInput = (): void => {
        setFieldValue('targetName', '');
        setErrorMessage('');
        setEditingTargetId(null);
        setEditedName('');
    };
    const updateTarget = (targetId: number): void => {
        if (editedName.trim() === '') return;

        const isDuplicate = targets.some(
            (target: Target) =>
                target.name === editedName.trim() && target.id !== targetId
        );
        if (isDuplicate) {
            setErrorMessage('Please provide a unique target name');
            return;
        }

        const updatedTargets = targets.map((target) =>
            target.id === targetId
                ? { ...target, name: editedName.trim() }
                : target
        );

        setTargets(updatedTargets);
        setEditingTargetId(null);
        setEditedName('');
        setErrorMessage('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && !errors?.targetName?.length) {
            e.preventDefault();
            if (editingTargetId !== null) {
                updateTarget(editingTargetId);
            } else {
                addTarget();
            }
        }
    };

    const handleDelete = (targetId: number): void => {
        const updatedTargets = targets.filter(
            (target) => target.id !== targetId
        );

        const reIndexedTargets = updatedTargets.map((target, index) => ({
            ...target,
            id: index + 1,
        }));

        setTargets(reIndexedTargets);
        clearInput();
    };

    const startEditing = (targetId: number): void => {
        setEditingTargetId(targetId);
        setEditedName(targets.find((t) => t.id === targetId)?.name || '');
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditedName(e.target.value);
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                ref={formRefBulking}
            >
                {!showAddTargetForm && (
                    <div className="flex space-x-4 mt-4">
                        <button
                            className="flex my-7"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowAddTargetForm(true);
                            }}
                        >
                            <img
                                src={add}
                                alt="Add"
                                className="h-[1.5rem] w-[1.5rem]"
                            />
                            <h1
                                className={`text-md ml-2 text-[#08627E] ${
                                    isFromTarget ? '' : 'px-3'
                                }`}
                            >
                                {isFromTarget
                                    ? 'Add Target'
                                    : 'Add Short Term Goal'}
                            </h1>
                        </button>
                    </div>
                )}
                {showAddTargetForm && (
                    <div>
                        <div className="flex mt-4">
                            <div className="w-2/4 h-56 bg-white border overflow-y-scroll shadow-md rounded-md">
                                <div className="mb-5 ml-5 mt-4 w-96">
                                    <span className="text-base font-semibold">
                                        {isFromTarget
                                            ? 'Add Target'
                                            : 'Add Short Term Goal'}
                                    </span>
                                    <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                </div>
                                <div className="mb-5 ml-5 mt-10 w-96">
                                    <Field
                                        label={'Name'}
                                        name={'targetName'}
                                        id={'targetName'}
                                        value={values.targetName}
                                        component={Input}
                                        className={
                                            'peer pe-0 ps-3 block pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-1 border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                                        }
                                        placeholder={
                                            isFromTarget
                                                ? 'Please enter Target Name'
                                                : 'Please enter Short Term Goal Name'
                                        }
                                        isRequired={false}
                                        onChange={(e: any) => {
                                            e.preventDefault();
                                            setFieldTouched('targetName');
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        onKeyDown={handleKeyDown}
                                    />
                                    {errorMessage && (
                                        <div className="text-red-500 text-sm mt-2">
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-5">
                                    <div className="mt-2 mb-2 mr-4">
                                        <div className="flex justify-end items-center gap-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    clearInput();
                                                }}
                                                type="button"
                                                className="py-2 px-7 w-[100px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                className="py-2 px-4 w-[120px] flex justify-center items-center text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (
                                                        editingTargetId !== null
                                                    ) {
                                                        updateTarget(
                                                            editingTargetId
                                                        );
                                                    } else {
                                                        addTarget();
                                                    }
                                                }}
                                                disabled={
                                                    errors?.targetName?.length
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {'Save'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {targets?.length > 0 && (
                                <div className="ml-5 bg-white border w-full max-h-56 overflow-y-scroll shadow-md rounded-md">
                                    {targets.map((target) => (
                                        <>
                                            <div key={target.id}>
                                                <div className="flex justify-between p-2">
                                                    <div className="flex w-full">
                                                        <div
                                                            className={`text-sm font-bold mt-2 flex-shrink-0 
                                                                
                                                            `}
                                                        >
                                                            {isFromTarget
                                                                ? `Target ${target.id}`
                                                                : `Goal ${target.id}`}
                                                        </div>
                                                        <div
                                                            className="ps-2 item-start items-center text-sm flex w-full
                                                        "
                                                        >
                                                            {editingTargetId ===
                                                            target.id ? (
                                                                <div className="flex flex-col w-full">
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            editedName
                                                                        }
                                                                        onChange={
                                                                            handleEditChange
                                                                        }
                                                                        onBlur={() =>
                                                                            updateTarget(
                                                                                target.id
                                                                            )
                                                                        }
                                                                        onKeyDown={(
                                                                            e
                                                                        ) => {
                                                                            if (
                                                                                e.key ===
                                                                                'Enter'
                                                                            ) {
                                                                                updateTarget(
                                                                                    target.id
                                                                                );
                                                                            }
                                                                        }}
                                                                        className="border border-gray-500 rounded p-1"
                                                                        autoFocus
                                                                    />
                                                                    <div className="text-sm text-gray-500 mt-2">
                                                                        {editingTargetId ===
                                                                        target.id
                                                                            ? ' Press Enter to save'
                                                                            : ''}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <Tooltip
                                                                        title={
                                                                            target.name
                                                                        }
                                                                        placement="bottom"
                                                                    >
                                                                        <div className="mt-2">
                                                                            {
                                                                                target.name
                                                                            }
                                                                        </div>
                                                                    </Tooltip>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end space-x-4 ml-2 items-start mt-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (
                                                                    editingTargetId !==
                                                                    target.id
                                                                ) {
                                                                    startEditing(
                                                                        target.id
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            <img
                                                                src={editIcon}
                                                                alt="Edit"
                                                                className="h-4 w-4"
                                                            />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDelete(
                                                                    target.id
                                                                );
                                                            }}
                                                        >
                                                            <img
                                                                src={deleteIcon}
                                                                alt="Delete"
                                                                className="h-4 w-4"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="bg-[#3b3b3b] h-[0.1rem] mx-2"></div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </form>
        </>
    );
}

export default AddBulkingTarget;
