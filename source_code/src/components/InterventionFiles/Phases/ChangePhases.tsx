import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    getAllInterventionPlanDomainByInterventionId,
    getAllInterventionPlanLongTermByDomainId,
    getAllInterventionPlanShortTermLongTermById,
    getAllPhases,
    getInterventionPlanShortTermById,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Field, FieldProps, Formik } from 'formik';
import SelectComponent from '../../Generics/Inputs/Select';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import InterventionDataById from '../../../api/services/Intervention/Service/InterventionDataById.service';
import { useParams } from 'react-router-dom';
const CurrentPhase: React.FC<any> = ({
    id,
    defaultValue,
    term,
    interventionData,
    disableIntervention,
}: {
    id: any;
    defaultValue: any;
    term: any;
    interventionData: any;
    disableIntervention?: any;
}) => {
    const ref = useRef<any>(null);
    const isViewMode = window.location.href.includes('view');
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const formikRef: any = useRef<any>(null);
    const dispatch = useDispatch<any>();
    const [options, setOptions] = useState({
        phaseForIntervention: [],
    });
    const params = useParams<any>();
    const initialValues: any = {
        phase: {
            value: defaultValue?.id || '45',
            label: defaultValue?.name || 'Not Yet Started',
        },
    };
    const viewMode = useSelector(
        ({ ViewOnly }: any) => ViewOnly?.viewOnlyValue
    );
    const updateOptions = useCallback(
        (key: any): void => {
            if (key === 'phaseForIntervention') {
                const optionsData = interventionData?.allPhase?.data?.map(
                    (item: any) => ({
                        value: item?.id,
                        label: item?.name,
                    })
                );
                setOptions((prev: any) => ({
                    ...prev,
                    [key]: optionsData,
                }));
            }
        },
        [interventionData]
    );
    useEffect(() => {
        if (interventionData?.allPhase?.data?.length) {
            updateOptions('phaseForIntervention');
        }
    }, [interventionData?.allPhase?.data, updateOptions]);
    useEffect(() => {
        dispatch(
            getAllPhases({
                type: 'INTERVENTION_PLAN_OBJECT_STATUS',
            })
        );
    }, [dispatch]);
    const handleSubmitForm = async (name: any): Promise<void> => {
        const data = {
            id: id,
            type: term,
            phase: name?.label,
        };
        const res = await InterventionDataById.changeStatus(data);
        if (!res?.data?.error) {
            dispatch(
                getAllInterventionPlanDomainByInterventionId({
                    id: params.id ?? params.interventionId,
                    type: phaseType,
                })
            );
            dispatch(
                getAllInterventionPlanLongTermByDomainId({
                    id: params.domainId,
                    type: phaseType,
                })
            );
            dispatch(
                getAllInterventionPlanShortTermLongTermById({
                    id: params.longTermGoalId,
                })
            );
            dispatch(
                getInterventionPlanShortTermById({
                    id: params.shortTermGoalId,
                })
            );
            dispatch(
                openNotification({
                    success: true,
                    title: 'Status Changed successfully.',
                    description: '',
                })
            );
        }
    };
    const setShortTermGoalValue = (): void => {
        formikRef.current?.setFieldValue('interventionPlanDomainId', {
            label: defaultValue?.name,
            value: defaultValue?.id,
        });
    };
    const handleDisable = (): any => {
        if (isViewMode) {
            return true;
        } else {
            if (disableIntervention) {
                if (
                    interventionData?.interventionPlanShortTermById?.scoreType
                        ?.name === 'Traditional Goal Tracking'
                ) {
                    return (
                        interventionData?.interventionPlanShortTermById
                            ?.goalScore?.name?.length < 1
                    );
                } else if (
                    interventionData?.interventionPlanShortTermById?.scoreType
                        ?.name === 'Goal Attainment Scaling'
                ) {
                    const xyzData = JSON.parse(
                        interventionData?.interventionPlanShortTermById
                            ?.attainmentScalingData
                    );
                    if (xyzData && typeof xyzData === 'object') {
                        const keyData = Object.keys(xyzData);
                        return keyData?.length < 5;
                    }
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    };
    useEffect(() => {
        setShortTermGoalValue();
    }, []);
    return (
        <div className="phase mt-5">
            <Formik
                initialValues={initialValues}
                innerRef={ref}
                onSubmit={handleSubmitForm}
                validateOnChange
                enableReinitialize={true}
            >
                {(props: any) => {
                    const { handleSubmit, setFieldTouched, touched, errors } =
                        props;
                    return (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <div
                                        className={`px-2 w-52 ml-51 ${viewMode ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="phase"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <SelectComponent
                                                    isDisabled={handleDisable()}
                                                    isRequired={false}
                                                    isSearchable={false}
                                                    label={'Current Status :'}
                                                    options={
                                                        options?.phaseForIntervention
                                                    }
                                                    form={{
                                                        touched,
                                                        errors,
                                                    }}
                                                    field={{
                                                        value: field.value,
                                                        name: field.name,
                                                        onChange: (value) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                value
                                                            );
                                                            handleSubmitForm(
                                                                value
                                                            );
                                                        },
                                                    }}
                                                    handleBlur={setFieldTouched}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    {handleDisable() && !isViewMode ? (
                                        <span className="px-2 mt-2">
                                            Add score type in this goal to make
                                            it in progress.
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </form>
                        </>
                    );
                }}
            </Formik>
        </div>
    );
};
export default CurrentPhase;
