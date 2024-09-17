import React, { useEffect, useRef, useState } from 'react';
import { getAllPhases } from '../../../redux/slice/InterventionAll/InterventionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Field, FieldProps, Formik } from 'formik';
import Select from '../../Generics/Select';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import InterventionDataById from '../../../api/services/Intervention/Service/InterventionDataById.service';
const CurrentPhase: React.FC<any> = ({
    id,
    defaultValue,
    term,
    interventionData,
}: {
    id: any;
    defaultValue: any;
    term: any;
    interventionData: any;
}) => {
    const ref = useRef<any>(null);
    const dispatch = useDispatch<any>();
    const [options, setOptions] = useState({
        phaseForIntervention: [],
    });
    const initialValues: any = {
        phase: {
            value: defaultValue?.id || '45',
            label: defaultValue?.name || 'Not Yet Started',
        },
    };
    const viewMode = useSelector(
        ({ ViewOnly }: any) => ViewOnly?.viewOnlyValue
    );
    const updateOptions = (phaseVal: any, key: any): void => {
        if (key === 'phaseForIntervention') {
            const optionsData = phaseVal?.map((item: any) => ({
                value: item?.id,
                label: item?.name,
            }));
            setOptions((prev: any) => ({
                ...prev,
                [key]: optionsData,
            }));
        }
    };
    useEffect(() => {
        updateOptions(interventionData?.allPhase?.data, 'phaseForIntervention');
    }, [interventionData?.allPhase?.data]);
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
                openNotification({
                    success: true,
                    title: 'Status Changed successfully.',
                    description: '',
                })
            );
        }
    };
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
                    const { handleSubmit } = props;
                    return (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="flex">
                                    <div
                                        className={`px-2 w-52 ml-51 ${viewMode ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="phase"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    label={'Current Status :'}
                                                    icon={false}
                                                    options={
                                                        options?.phaseForIntervention
                                                    }
                                                    onChange={(value: any) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            value
                                                        );
                                                        handleSubmitForm(value);
                                                    }}
                                                    value={field.value}
                                                    placeholder={''}
                                                    name={field.name}
                                                />
                                            )}
                                        </Field>
                                    </div>
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
