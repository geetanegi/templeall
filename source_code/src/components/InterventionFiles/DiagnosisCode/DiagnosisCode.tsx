import React, { useCallback } from 'react';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import SelectComponent from '../../Generics/Inputs/Select';
import { useDispatch } from 'react-redux';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import SaveSecondaryDiagnosisCodeApi from '../../../api/services/Intervention/saveSecondaryDiagnosisCode';
import { useLocation } from 'react-router-dom';
import { getInterventionPlanById } from '../../../redux/slice/InterventionAll/InterventionSlice';

interface Values {
    insuranceSupported: any;
}

const DiagnosisCode = ({ code }: { code: any }): any => {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const isViewMode = location.pathname.includes('view');
    const initialValues: any = { insuranceSupported: '' };
    const primaryDiagnosisCode =
        code?.interventionPlanById?.primaryDiagnosisCode?.code +
        ' ' +
        code?.interventionPlanById?.primaryDiagnosisCode?.name;
    const getOptions = useCallback(() => {
        if (code?.secondaryDiagnosisCodes?.data?.length) {
            return code?.secondaryDiagnosisCodes?.data?.map((data: any) => ({
                label: data?.code + ' ' + data?.name,
                value: data?.id,
            }));
        }
        return [];
    }, [code?.secondaryDiagnosisCodes?.data]);
    const validationSchema = Yup.object().shape({
        // Add your validation rules here
    });
    const interventionId = location?.pathname?.split('/').pop();
    const SaveSecondaryDiagnosisCode = async (values: any): Promise<void> => {
        const data = {
            InterventionPlanId: code?.interventionPlanById?.id,
            diagnosisCodes: values?.insuranceSupported,
            clientId: code?.interventionPlanById?.clientId?.childId,
            therapyType: code?.interventionPlanById?.therapyType?.id,
        };

        try {
            const response =
                await SaveSecondaryDiagnosisCodeApi.SaveSecondary(data);
            if (response?.data?.error || response?.status !== 200) {
                dispatch(
                    openNotification({
                        success: false,
                        title: response?.data?.description || 'Error',
                        description: '',
                    })
                );
            } else {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Secondary diagnosis code saved successfully',
                        description: '',
                    })
                );
                dispatch(getInterventionPlanById({ id: interventionId }));
            }
        } catch (error) {
            dispatch(
                openNotification({
                    success: false,
                    title: 'Error',
                    description: 'Something went wrong',
                })
            );
        }
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
        SaveSecondaryDiagnosisCode(values);
    };
    const secDiagnosisOptions = code?.interventionPlanById
        ?.secondaryDiagnosisCodes
        ? code?.interventionPlanById?.secondaryDiagnosisCodes.map(
              (item: any) => ({
                  label: item?.code + item.name,
                  value: item.id,
              })
          )
        : null;
    const editValue: any = { insuranceSupported: secDiagnosisOptions };
    return (
        <div className="inputsForDiagnosis mt-5 shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
            <Formik
                initialValues={editValue ? editValue : initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                validateOnChange
                enableReinitialize
            >
                {(props: any) => {
                    const {
                        handleChange,
                        handleSubmit,
                        setFieldTouched,
                        touched,
                        errors,
                        resetForm,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit} className="w-auto h-auto">
                            <div className="w-full min-h-96 shadow-md p-5 mr-5 relative">
                                <div className="nameProgramBookLibrary w-1/2 border-[#A0A0A0]">
                                    <div className="border-b-2 border-gray-200 w-full bg-white rounded-none border-x-0 border-t-0 pb-1 outline-none">
                                        <label
                                            htmlFor="timePeriod"
                                            className="text-sm font-semibold flex items-center text-zinc-700 font-['Lato'] leading-tight"
                                        >
                                            Primary Diagnosis Code
                                        </label>
                                        <span className="text-sm w-full pointer-events-none bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none">
                                            {primaryDiagnosisCode
                                                ? primaryDiagnosisCode
                                                : ''}
                                        </span>
                                    </div>
                                </div>

                                <div className="DescriptionProgramBookLibrary w-1/2 mt-5 flex">
                                    <Field
                                        placeholder="Select..."
                                        onChange={(e: any) => {
                                            handleChange(e);
                                        }}
                                        label="Secondary Diagnosis Code"
                                        autoComplete="off"
                                        isRequired={true}
                                        id="insuranceSupported"
                                        name="insuranceSupported"
                                        className="border-b-2 border-gray-200 w-full bg-white rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                        as="select"
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <SelectComponent
                                                isDisabled={
                                                    isViewMode ? true : false
                                                }
                                                isMultiple={true}
                                                isRequired={false}
                                                isSearchable={false}
                                                label={
                                                    'Secondary Diagnosis Code'
                                                }
                                                form={{
                                                    touched,
                                                    errors,
                                                }}
                                                options={getOptions()}
                                                field={{
                                                    value: field.value,
                                                    name: field.name,
                                                    onChange: (value) => {
                                                        form.setFieldValue(
                                                            'insuranceSupported',
                                                            value
                                                        );
                                                    },
                                                }}
                                                handleBlur={setFieldTouched}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="absolute bottom-0 right-0 mr-5 mb-5 flex space-x-5">
                                    <button
                                        type="button"
                                        className="py-2 px-3 h-10 inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        onClick={resetForm}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        disabled={isViewMode ? true : false}
                                        type="submit"
                                        className="py-2 px-9 h-10 inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default DiagnosisCode;
