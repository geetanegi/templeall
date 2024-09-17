/* eslint-disable max-lines */
/* eslint-disable max-len */
import React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    ProgramBookModalFooter,
} from '../Generics/Modal';
import { Field, Formik, FormikHelpers, FieldProps } from 'formik';
import Input from '../Generics/Inputs/Input';
import * as Yup from 'yup';
import Select from 'react-tailwindcss-select';
import Datepicker from 'react-tailwindcss-datepicker';
interface Values {
    frequency: string;
    frequencyType: string;
    frequencyDays: any;
    endsOn: string;
    endsAfter: string;
    endType: string;
}
export default function CustomRecurrence({
    onClose,
    first,
    customSubmit,
}: {
    first?: any;
    onClose?: any;
    customSubmit?: any;
}): React.JSX.Element {
    const initialValues: any = {
        frequency: '1',
        frequencyType: {
            label: 'Weeks',
            value: 'weeks',
        },
        frequencyDays: [],
        endType: 'never',
        endsOn: 'never',
        endsAfter: '',
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
        if (customSubmit) {
            customSubmit(values);
        }
    };
    const validationSchema = Yup.object().shape({
        frequency: Yup.string(),
    });
    const DayButton = ({
        label,
        onClick,
        selected,
    }: {
        label: string;
        onClick: any;
        selected: boolean;
    }): any => (
        <div className="Group3264 w-10 h-10 relative" onClick={onClick}>
            <div
                className={`${selected ? 'bg-primary-600' : 'bg-zinc-300'} Ellipse59 w-10 h-10 left-0 top-0 absolute  rounded-full `}
            />
            <div className="M left-[14px] top-[12px] absolute text-center text-zinc-700 text-xs font-semibold font-Lato leading-none">
                {label}
            </div>
        </div>
    );
    const setFrequencyDays = (
        frequencyDays: any,
        value: any,
        setFieldValue: any
    ): void => {
        if (frequencyDays.indexOf(value) === -1) {
            setFieldValue('frequencyDays', [...frequencyDays, value]);
        } else {
            setFieldValue(
                'frequencyDays',
                frequencyDays.filter((item: any) => item !== value)
            );
        }
    };
    const DaysOfWeek = (frequencyDays: any, setFieldValue: any): any => {
        const days = [
            {
                label: 'S',
                value: '0',
            },
            {
                label: 'M',
                value: '1',
            },
            {
                label: 'T',
                value: '2',
            },
            {
                label: 'W',
                value: '3',
            },
            {
                label: 'T',
                value: '4',
            },
            {
                label: 'F',
                value: '5',
            },
            {
                label: 'S',
                value: '6',
            },
        ];
        return (
            <div className="2div w-4/5 flex items-center justify-between">
                {days.map((day, index) => (
                    <DayButton
                        key={index}
                        label={day.label}
                        selected={frequencyDays.indexOf(day.value) !== -1}
                        onClick={() =>
                            setFrequencyDays(
                                frequencyDays,
                                day.value,
                                setFieldValue
                            )
                        }
                    />
                ))}
            </div>
        );
    };
    return (
        <Modal open={first} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'Custom Recurrence'}
                icon={false}
                onExpand={undefined}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                validateOnChange
            >
                {(props: any) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        isValid,
                        dirty,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit} className="w-auto h-auto">
                            <ModalBody expandModal={false}>
                                <div
                                    className="w-[60rem] h-[20rem] flex flex-col justify-evenly"
                                    data-testid="custom-recurrence"
                                >
                                    <div className="nameProgramBookLibrary flex items-center w-3/4">
                                        <label className="text-xsm w-40">
                                            Repeat every
                                        </label>
                                        <div className="flex items-center justify-between ">
                                            <Field
                                                className="text-[16px] py-3 px-1 block w-full border-gray-200 rounded-lg outline-none text-xsm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                label=""
                                                isRequired={false}
                                                id="frequency"
                                                name="frequency"
                                                component={Input}
                                                type={'number'}
                                                min={0}
                                                value={values?.frequency}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                placeholder="Frequency"
                                            />
                                            <div className="select w-[10rem] ml-5">
                                                <Field
                                                    name="frequencyType"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: FieldProps) => (
                                                        <Select
                                                            value={field.value}
                                                            primaryColor={
                                                                'indigo'
                                                            }
                                                            options={[
                                                                {
                                                                    label: 'Days',
                                                                    value: 'days',
                                                                },
                                                                {
                                                                    label: 'Weeks',
                                                                    value: 'weeks',
                                                                },
                                                                {
                                                                    label: 'Months',
                                                                    value: 'months',
                                                                },
                                                            ]}
                                                            onChange={(
                                                                value
                                                            ) => {
                                                                form.setFieldValue(
                                                                    'frequencyType',
                                                                    value
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                    {values.frequencyType === '' ||
                                    values.frequencyType.value === 'weeks' ? (
                                        <div className="nameProgramBookLibrary flex w-4/5">
                                            <label className="text-xsm w-40">
                                                Repeat on
                                            </label>
                                            {DaysOfWeek(
                                                values.frequencyDays,
                                                setFieldValue
                                            )}
                                        </div>
                                    ) : values.frequencyType.value ===
                                      'months' ? (
                                        <div className="select flex">
                                            <label className="text-xsm w-40">
                                                Repeat on
                                            </label>
                                            <div className="w-[10rem]">
                                                <Field
                                                    name="monthDay"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: FieldProps) => (
                                                        <Select
                                                            value={field.value}
                                                            primaryColor={
                                                                'indigo'
                                                            }
                                                            options={Array.from(
                                                                { length: 31 },
                                                                (_, i) => i + 1
                                                            ).map((item) => ({
                                                                label: item.toString(),
                                                                value: item.toString(),
                                                            }))}
                                                            onChange={(
                                                                value
                                                            ) => {
                                                                form.setFieldValue(
                                                                    'monthDay',
                                                                    value
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                    ) : null}
                                    <div className="nameProgramBookLibrary flex  items-center">
                                        <label className="text-xsm w-40">
                                            Ends
                                        </label>
                                        <div className="2div  flex items-center justify-between w-4/5">
                                            <div className="flex">
                                                <label
                                                    className=" pr-5 mt-2 text-sm
                                             text-gray-500 ms-2"
                                                >
                                                    <Field
                                                        className="mr-2"
                                                        type="radio"
                                                        name="endType"
                                                        value={'never'}
                                                    />
                                                    Never
                                                </label>
                                            </div>
                                            <div className="border border-1 h-[3rem]"></div>
                                            <div className="flex">
                                                <label className="pr-5 flex items-center mt-2 text-sm text-gray-500 ms-2">
                                                    <Field
                                                        className="mr-2"
                                                        type="radio"
                                                        name="endType"
                                                        value="on"
                                                    />
                                                    <span>On</span>
                                                    <Field
                                                        name="endsOn"
                                                        autoComplete="off"
                                                        isRequired={true}
                                                        value={{
                                                            startDate:
                                                                values?.endsOn,
                                                        }}
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                        className="w-full"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Datepicker
                                                                id="endsOn"
                                                                {...field}
                                                                selected={
                                                                    field.value
                                                                }
                                                                useRange={false}
                                                                asSingle={true}
                                                                disabled={
                                                                    values.endType !==
                                                                    'on'
                                                                }
                                                                inputClassName="ml-4 py-[0.5rem] px-3 w-[10rem] border-2 border-[#E5E5E5]-800 rounded-md text-sm"
                                                                onChange={(
                                                                    date
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        date
                                                                    );
                                                                }}
                                                                popoverProps={{
                                                                    placement:
                                                                        'top',
                                                                }}
                                                                popoverDirection="down"
                                                            />
                                                        )}
                                                    </Field>
                                                </label>
                                            </div>
                                            <div className="border border-1 h-[3rem]"></div>
                                            <div className="flex">
                                                <label
                                                    className="text-sm pr-5 text-gray-500 ms-2
                                                  mt-2 flex items-center"
                                                >
                                                    <Field
                                                        className="mr-2"
                                                        type="radio"
                                                        name="endType"
                                                        value={'after'}
                                                    />
                                                    <span>After</span>
                                                    <div className="flex justify-between items-center">
                                                        <Field
                                                            className="mx-4 py-3 px-1 block w-[20rem] border-gray-200 rounded-lg outline-none text-xsm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                            label=""
                                                            isRequired={false}
                                                            id="endsAfter"
                                                            name="endsAfter"
                                                            disabled={
                                                                values.endType !==
                                                                'after'
                                                            }
                                                            component={Input}
                                                            value={
                                                                values?.endsAfter
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="Ends After"
                                                        />
                                                        <span>Occurences</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ProgramBookModalFooter
                                saveDisabled={!isValid && dirty}
                                onClose={onClose}
                                handleSubmit={handleSubmit}
                            />
                        </form>
                    );
                }}
            </Formik>
        </Modal>
    );
}
