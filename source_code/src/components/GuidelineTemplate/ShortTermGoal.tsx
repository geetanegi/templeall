/* eslint-disable max-lines */
import * as React from 'react';
import { Field, Formik } from 'formik';
import { getDomainByUserTypeCall } from '../../redux/slice/Intervention/DomainsByUserType';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhases } from '../../redux/slice/Intervention/getAllPhasesForIntervention';
import Notifications from '../Generics/Notifications';
import AddShortTermGoalModal from '../InterventionFiles/Modal/AddShortTermGoal';
import { clearShortTermGoal } from '../../redux/slice/Intervention/getShortTermGoalById';
import changeStatusPhase from '../../api/services/Intervention/saveChangeStatusPhase.service';
import AddShortTermGoalModalInSessionNote from './Modal/AddShortTermGoalModalInSessionNote';
import {
    getGoalScore,
    getGoalType,
    setShortTermGoalData,
} from '../../redux/slice/InterventionAll/InterventionSlice';

export default function ShortTermGoal({
    mode,
}: {
    mode: any;
}): React.JSX.Element {
    const [error, setError] = React.useState<any>({});
    const dispatch = useDispatch<any>();
    const appointment = useSelector((state: any) => state.appointment.value);
    const [openShortGoal, setOpenShortGoal] = React.useState(false);
    const [openGoal, setOpenGoal] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<{
        [key: string]: string;
    }>({});
    const [scoreValues, SetScoreValues] = React.useState<any>([]);
    const phaseData = useSelector(
        (state: any) => state?.interventionPhases?.value?.data
    );
    const shortGoalData = useSelector(
        (state: any) => state?.allInProgressGoals?.inProgressShortTerm
    );

    const showNotification = useSelector(
        (state: any) => state?.getShortTermGoalById?.shortStatus
    );
    const showAddNotification = useSelector(
        (state: any) => state?.getShortTermGoalById?.checkShortStatus
    );
    const template = useSelector((state: any) => state.template.newNote);
    const isAttainmentScale = template?.find(
        (i: any) => i?.name === 'shortTermGoal' && i?.attainmentScale
    );

    const handleAddShortTermGoal = (data: boolean): void => {
        const payload = {
            providerId: appointment?.primaryProvider?.id,
            clientId: appointment?.appointmentWith?.id,
        };
        dispatch(getDomainByUserTypeCall(payload));
        const data1 = {};
        dispatch(getGoalScore({ data: data1 }));
        dispatch(getGoalType({ data: data1 }));
        setTimeout(() => {
            setOpenShortGoal(data);
        }, 1500);
    };
    const handleShortTermGoalModal = (data: boolean): void => {
        const payload = {
            providerId: appointment?.primaryProvider?.id,
            clientId: appointment?.appointmentWith?.id,
        };
        dispatch(getDomainByUserTypeCall(payload));
        setTimeout(() => {
            setOpenGoal(data);
        }, 2000);
    };
    React.useEffect(() => {
        dispatch(
            getAllPhases({
                type: 'INTERVENTION_PLAN_OBJECT_STATUS',
            })
        );
    }, []);
    const initialValues: any = {
        domainName: '',
        Score: '',
        comments: scoreValues?.xyz,
    };
    const closeNotification = (): any => {
        setTimeout(() => {
            dispatch(clearShortTermGoal());
        }, 2000);
    };
    React.useEffect(() => {
        dispatch(setShortTermGoalData(scoreValues));
    }, [scoreValues]);

    const changeStatus = async (id: any, data: any): Promise<void> => {
        setSelectedValue((prevSelectedValues: any) => ({
            ...prevSelectedValues,
            [id]: data.target.value,
        }));
        const phaseValue = phaseData.filter(
            (item: any) => item.id == data.target.value
        );
        const payload = {
            id: id,
            type: 'shortTermGoal',
            phase: phaseValue?.[0]?.name,
        };
        const res = await changeStatusPhase.changeStatus(payload);
        if (!res?.data?.error) {
        }
    };
    React.useEffect(() => {
        const initialSelectedValues = shortGoalData?.reduce(
            (acc: any, item: any) => {
                acc[item.id] = item?.shortTermGoalStatus?.id;
                return acc;
            },
            {}
        );
        setSelectedValue(initialSelectedValues);
    }, [shortGoalData]);
    const labels = ['-2', '-1', '0', '+1', '+2'];
    const errDur = (index: any, type: any): any => {
        const parse = error[index] ? error[index] : false;
        if (!parse) return '';

        return parse[type];
    };

    const handleScore = async (
        itemData: any,
        e: any,
        key?: any
    ): Promise<any> => {
        SetScoreValues((prevScore: any) => {
            const updatedScore = { ...prevScore };
            updatedScore[itemData.id] = {
                ...updatedScore[itemData.id],
                [key]: e.target.value,
                type: itemData?.goalScore?.name || itemData?.scoreType?.name,
            };
            return updatedScore;
        });
    };
    return (
        <>
            <div className="w-full">
                <div className="flex py-3 px-5 bg-primary-300 justify-between space-x-5">
                    <div className="w-[10rem]">
                        <label className="text-sm font-medium">Domain</label>
                    </div>
                    <div className="w-[10rem]">
                        <label className="text-sm font-medium">Goal</label>
                    </div>
                    <div className="w-[10rem]">
                        <label className="text-sm font-medium">Status</label>
                    </div>
                    <div className="w-[15rem] pl-1">
                        <label className="text-sm font-medium">Score</label>
                    </div>
                    <div className="w-[10rem] pl-1">
                        <label className="text-sm font-medium">Comment</label>
                    </div>
                </div>
                <div className="mt-3 p-3 space-y-3">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={() => {}}
                        enableReinitialize={true}
                    >
                        {(props: any) => {
                            const { values, handleChange } = props;
                            return (
                                <form>
                                    {shortGoalData?.map(
                                        (item: any, index: any) => {
                                            return (
                                                <>
                                                    <div
                                                        className="flex justify-between mb-8  mt-9 space-x-5"
                                                        key={index}
                                                    >
                                                        <div className="w-[10rem]">
                                                            <label className="text-sm font-sm w-[40rem]">
                                                                {
                                                                    item
                                                                        ?.interventionPlanDomainId
                                                                        ?.name
                                                                }
                                                            </label>
                                                        </div>
                                                        <div className="w-[10rem]">
                                                            <label className="text-sm font-sm">
                                                                {item?.name}
                                                            </label>
                                                        </div>

                                                        <div
                                                            className="w-[10rem]"
                                                            key={index}
                                                        >
                                                            <div className="w-[10rem]">
                                                                <Field
                                                                    as="select"
                                                                    label={
                                                                        'Select Status'
                                                                    }
                                                                    name={`status_${index}`}
                                                                    id={
                                                                        'selectStatus'
                                                                    }
                                                                    value={
                                                                        selectedValue
                                                                            ? selectedValue[
                                                                                  item
                                                                                      ?.id
                                                                              ]
                                                                            : ''
                                                                    }
                                                                    className="py-2 text-sm font-sm ps-4 rounded-md w-full border-1 border-gray-300  outline-none"
                                                                    placeholder={
                                                                        'Select Status'
                                                                    }
                                                                    isRequired={
                                                                        true
                                                                    }
                                                                    onChange={(
                                                                        e: any
                                                                    ) => {
                                                                        changeStatus(
                                                                            item.id,
                                                                            e
                                                                        );
                                                                    }}
                                                                >
                                                                    <option
                                                                        value=""
                                                                        disabled
                                                                        selected
                                                                    >
                                                                        Select a
                                                                        program
                                                                    </option>
                                                                    {phaseData?.map(
                                                                        (
                                                                            item1: any
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    item1?.id
                                                                                }
                                                                                value={
                                                                                    item1?.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    item1?.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </Field>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                'w-[15rem]'
                                                            }
                                                        >
                                                            {item?.goalScore
                                                                ?.name ===
                                                            'Frequency' ? (
                                                                <>
                                                                    <Field
                                                                        type="number"
                                                                        className="rounded-md text-sm font-sm w-full border-1 border-gray-300 outline-none"
                                                                        hideLabel={
                                                                            true
                                                                        }
                                                                        id=""
                                                                        name={`score_${index}`}
                                                                        value={
                                                                            values[
                                                                                `score_${index}`
                                                                            ]
                                                                        }
                                                                        onChange={(
                                                                            e: any
                                                                        ) => {
                                                                            const wholeNumberRegex: any =
                                                                                /^\d+$/;

                                                                            if (
                                                                                !wholeNumberRegex.test(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            ) {
                                                                                setError(
                                                                                    (
                                                                                        prev: any
                                                                                    ) => {
                                                                                        return {
                                                                                            ...prev,
                                                                                            [index]:
                                                                                                'only numeric values allowed',
                                                                                        };
                                                                                    }
                                                                                );
                                                                            } else {
                                                                                setError(
                                                                                    (
                                                                                        prev: any
                                                                                    ) => {
                                                                                        return {
                                                                                            ...prev,
                                                                                            [index]:
                                                                                                '',
                                                                                        };
                                                                                    }
                                                                                );
                                                                            }
                                                                            handleChange(
                                                                                e
                                                                            );
                                                                            handleScore(
                                                                                item,
                                                                                e,
                                                                                'score'
                                                                            );
                                                                        }}
                                                                        placeholder="Score"
                                                                    />
                                                                    <span className="text-red-500 text-xs mt-2">
                                                                        {
                                                                            error[
                                                                                index
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </>
                                                            ) : item?.goalScore
                                                                  ?.name ===
                                                              'Duration' ? (
                                                                <div className="items-center">
                                                                    <div className="flex space-x-1">
                                                                        <div className="inputforSec">
                                                                            <div className="flex space-x-1">
                                                                                <Field
                                                                                    className="rounded-md text-sm font-sm w-full border-1 border-gray-300 outline-none"
                                                                                    hideLabel={
                                                                                        true
                                                                                    }
                                                                                    isRequired={
                                                                                        false
                                                                                    }
                                                                                    id=""
                                                                                    type="number"
                                                                                    name={`score_min_${index}`}
                                                                                    value={
                                                                                        values[
                                                                                            `score_min_${index}`
                                                                                        ]
                                                                                    }
                                                                                    onChange={(
                                                                                        e: any
                                                                                    ) => {
                                                                                        const regex: any =
                                                                                            /^(0?[0-9]|[1-5][0-9])$/;

                                                                                        if (
                                                                                            !regex.test(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        ) {
                                                                                            setError(
                                                                                                (
                                                                                                    prev: any
                                                                                                ) => {
                                                                                                    const parseData =
                                                                                                        {
                                                                                                            ...prev[
                                                                                                                index
                                                                                                            ],
                                                                                                            min: 'only minutes are allowed',
                                                                                                        };

                                                                                                    return {
                                                                                                        ...prev,
                                                                                                        [index]:
                                                                                                            parseData,
                                                                                                    };
                                                                                                }
                                                                                            );
                                                                                        } else {
                                                                                            setError(
                                                                                                (
                                                                                                    prev: any
                                                                                                ) => {
                                                                                                    const parseData =
                                                                                                        {
                                                                                                            ...prev[
                                                                                                                index
                                                                                                            ],
                                                                                                            min: '',
                                                                                                        };

                                                                                                    return {
                                                                                                        ...prev,
                                                                                                        [index]:
                                                                                                            parseData,
                                                                                                    };
                                                                                                }
                                                                                            );
                                                                                        }
                                                                                        handleChange(
                                                                                            e
                                                                                        );
                                                                                        handleScore(
                                                                                            item,
                                                                                            e,
                                                                                            'min'
                                                                                        );
                                                                                    }}
                                                                                    placeholder="Mins"
                                                                                />
                                                                                <label className="text-sm mt-2">
                                                                                    Mins
                                                                                </label>
                                                                            </div>
                                                                            <span className="text-red-500 text-xs mt-2">
                                                                                {errDur(
                                                                                    index,
                                                                                    'min'
                                                                                )}
                                                                            </span>
                                                                        </div>

                                                                        <div className="formin">
                                                                            <div className="flex space-x-1 ">
                                                                                <Field
                                                                                    className="rounded-md text-sm font-sm w-full border-1 border-gray-300 outline-none"
                                                                                    hideLabel={
                                                                                        true
                                                                                    }
                                                                                    isRequired={
                                                                                        false
                                                                                    }
                                                                                    id=""
                                                                                    type="number"
                                                                                    name={`score_sec_${index}`}
                                                                                    value={
                                                                                        values[
                                                                                            `score_sec_${index}`
                                                                                        ]
                                                                                    }
                                                                                    onChange={(
                                                                                        e: any
                                                                                    ) => {
                                                                                        const regex: any =
                                                                                            /^(0?[0-9]|[1-5][0-9])$/;

                                                                                        if (
                                                                                            !regex.test(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        ) {
                                                                                            setError(
                                                                                                (
                                                                                                    prev: any
                                                                                                ) => {
                                                                                                    const parseData =
                                                                                                        {
                                                                                                            ...prev[
                                                                                                                index
                                                                                                            ],
                                                                                                            sec: 'only seconds are allowed',
                                                                                                        };

                                                                                                    return {
                                                                                                        ...prev,
                                                                                                        [index]:
                                                                                                            parseData,
                                                                                                    };
                                                                                                }
                                                                                            );
                                                                                        } else {
                                                                                            setError(
                                                                                                (
                                                                                                    prev: any
                                                                                                ) => {
                                                                                                    const parseData =
                                                                                                        {
                                                                                                            ...prev[
                                                                                                                index
                                                                                                            ],
                                                                                                            sec: '',
                                                                                                        };

                                                                                                    return {
                                                                                                        ...prev,
                                                                                                        [index]:
                                                                                                            parseData,
                                                                                                    };
                                                                                                }
                                                                                            );
                                                                                        }
                                                                                        handleChange(
                                                                                            e
                                                                                        );
                                                                                        handleScore(
                                                                                            item,
                                                                                            e,
                                                                                            'sec'
                                                                                        );
                                                                                    }}
                                                                                    placeholder="Sec"
                                                                                />
                                                                                <label className="text-sm  mt-2">
                                                                                    Sec
                                                                                </label>
                                                                            </div>
                                                                            <span className="text-red-500 text-xs mt-2">
                                                                                {errDur(
                                                                                    index,
                                                                                    'sec'
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : item?.goalScore
                                                                  ?.name ===
                                                                  'Percent Accuracy' ||
                                                              item?.goalScore
                                                                  ?.name ===
                                                                  'Percent of Opportunities' ? (
                                                                <>
                                                                    <div className="flex space-x-1 items-center">
                                                                        <Field
                                                                            className="rounded-md text-sm font-sm w-full border-1 border-gray-300 outline-none"
                                                                            hideLabel={
                                                                                true
                                                                            }
                                                                            isRequired={
                                                                                false
                                                                            }
                                                                            id={`score_${index}`}
                                                                            type="number"
                                                                            name={`score_${index}`}
                                                                            value={
                                                                                values[
                                                                                    `score_${index}`
                                                                                ]
                                                                            }
                                                                            onChange={(
                                                                                e: any
                                                                            ) => {
                                                                                const regex =
                                                                                    /^\d+(\.\d+)?$/;

                                                                                if (
                                                                                    !regex.test(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                ) {
                                                                                    setError(
                                                                                        (
                                                                                            prev: any
                                                                                        ) => {
                                                                                            return {
                                                                                                ...prev,
                                                                                                [index]:
                                                                                                    'only numeric values are allowed',
                                                                                            };
                                                                                        }
                                                                                    );
                                                                                } else {
                                                                                    setError(
                                                                                        (
                                                                                            prev: any
                                                                                        ) => {
                                                                                            return {
                                                                                                ...prev,
                                                                                                [index]:
                                                                                                    '',
                                                                                            };
                                                                                        }
                                                                                    );
                                                                                }
                                                                                handleChange(
                                                                                    e
                                                                                );
                                                                                handleScore(
                                                                                    item,
                                                                                    e,
                                                                                    'score'
                                                                                );
                                                                            }}
                                                                            placeholder="Score"
                                                                        />
                                                                        <span>
                                                                            %
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-red-500 text-xs mt-2">
                                                                        {
                                                                            error[
                                                                                index
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="flex space-x-1 items-center">
                                                                        <Field
                                                                            className="rounded-md text-sm font-sm w-full border-1 border-gray-300 outline-none"
                                                                            hideLabel={
                                                                                true
                                                                            }
                                                                            isRequired={
                                                                                false
                                                                            }
                                                                            id={`score_${index}`}
                                                                            type="number"
                                                                            name={`score_${index}`}
                                                                            value={
                                                                                values[
                                                                                    `score_${index}`
                                                                                ]
                                                                            }
                                                                            onChange={(
                                                                                e: any
                                                                            ) => {
                                                                                const regex: any =
                                                                                    /^([+-]?[0-2])$/;

                                                                                if (
                                                                                    !regex.test(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                ) {
                                                                                    setError(
                                                                                        (
                                                                                            prev: any
                                                                                        ) => {
                                                                                            return {
                                                                                                ...prev,
                                                                                                [index]:
                                                                                                    'only -2 to +2 are allowed',
                                                                                            };
                                                                                        }
                                                                                    );
                                                                                } else {
                                                                                    setError(
                                                                                        (
                                                                                            prev: any
                                                                                        ) => {
                                                                                            return {
                                                                                                ...prev,
                                                                                                [index]:
                                                                                                    '',
                                                                                            };
                                                                                        }
                                                                                    );
                                                                                }
                                                                                handleChange(
                                                                                    e
                                                                                );
                                                                                handleScore(
                                                                                    item,
                                                                                    e,
                                                                                    'score'
                                                                                );
                                                                            }}
                                                                            placeholder="Score"
                                                                        />
                                                                    </div>

                                                                    <span className="text-red-500 text-xs mt-2">
                                                                        {
                                                                            error[
                                                                                index
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>

                                                        <div className="w-[10rem]">
                                                            <Field
                                                                as="textarea"
                                                                isRequired={
                                                                    false
                                                                }
                                                                id=""
                                                                name={`comments_${index}`}
                                                                rows={2}
                                                                className="rounded-md w-full text-sm font-sm border-1 border-gray-300 outline-none"
                                                                value={
                                                                    values[
                                                                        `comments_${index}`
                                                                    ]
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) => {
                                                                    handleChange(
                                                                        e
                                                                    );
                                                                    handleScore(
                                                                        item,
                                                                        e,
                                                                        'comment'
                                                                    );
                                                                }}
                                                                placeholder="Please enter comment"
                                                            />
                                                        </div>
                                                    </div>
                                                    {isAttainmentScale &&
                                                        item?.scoreType
                                                            ?.name ===
                                                            'Goal Attainment Scaling' && (
                                                            <div className="flex border rounded-lg mt-4 mb-2  border-1 border-gray-300  outline-none">
                                                                {labels?.map(
                                                                    (
                                                                        val,
                                                                        ind
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                className="flex-col  p-4 border-r-2 mb-4 justify-center  border-1 border-gray-300  outline-none w-1/5"
                                                                                key={
                                                                                    ind
                                                                                }
                                                                            >
                                                                                <label className="text-sm font-medium">
                                                                                    {
                                                                                        val
                                                                                    }
                                                                                </label>

                                                                                <div className="input">
                                                                                    <Field
                                                                                        className="border-b-2 border-neutral-400  w-28 border-x-0 border-t-0 border-b-1 outline-0 h-6 p-0
                                                             rounded-none"
                                                                                        label=""
                                                                                        type=""
                                                                                        autoComplete="off"
                                                                                        isRequired={
                                                                                            false
                                                                                        }
                                                                                        id={
                                                                                            val
                                                                                        }
                                                                                        name={
                                                                                            val
                                                                                        }
                                                                                        value={
                                                                                            item.attainmentScalingData
                                                                                                ? JSON.parse(
                                                                                                      item.attainmentScalingData
                                                                                                  )[
                                                                                                      val
                                                                                                  ]
                                                                                                : ''
                                                                                        }
                                                                                        placeholder={
                                                                                            'Enter'
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        )}
                                                </>
                                            );
                                        }
                                    )}
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
            <div className="space-x-5 text-right mt-2">
                {mode === 'view' ? null : (
                    <>
                        <button
                            type="button"
                            className={`bg-theme-lightBlue1 h-[2rem] shadow-md text-white  rounded-md text-[12.5px] px-7`}
                            id="fill-and-justify-item-1"
                            data-hs-tab="#fill-and-justify-1"
                            aria-controls="fill-and-justify-1"
                            role="tab"
                            onClick={() => handleShortTermGoalModal(true)}
                        >
                            {'+ Add Goal'}
                        </button>
                        <button
                            type="button"
                            className={`bg-theme-lightBlue1 h-[2rem] shadow-md text-white  rounded-md text-[12.5px] px-7`}
                            id="fill-and-justify-item-1"
                            data-hs-tab="#fill-and-justify-1"
                            aria-controls="fill-and-justify-1"
                            role="tab"
                            onClick={() => handleAddShortTermGoal(true)}
                        >
                            {'+ Create New Goal'}
                        </button>
                    </>
                )}
            </div>
            {openGoal && (
                <AddShortTermGoalModalInSessionNote
                    open={openGoal}
                    onClose={() => setOpenGoal(false)}
                />
            )}
            {openShortGoal && (
                <AddShortTermGoalModal
                    open={openShortGoal}
                    onClose={() => setOpenShortGoal(false)}
                    isCreatedFromSessionNote={true}
                />
            )}
            {showNotification && (
                <Notifications
                    open={true}
                    title={'Short Term Goal Created Successfully.'}
                    success={true}
                    onClose={closeNotification}
                />
            )}
            {showAddNotification && (
                <Notifications
                    open={true}
                    title={'Short Term Goal Added Successfully.'}
                    success={true}
                    onClose={closeNotification}
                />
            )}
        </>
    );
}
