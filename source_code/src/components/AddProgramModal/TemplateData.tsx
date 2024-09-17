/* eslint-disable max-lines */
import React, { useEffect, useRef, useState } from 'react';
import Information from '../../assets/img/information.svg';
import Tooltip from '../Generics/Tooltip';
import Input from '../Generics/Inputs/Input';
import { Field, useFormikContext } from 'formik';
import ErrorMessage from '../Generics/Inputs/ErrorMessage';
import { hint } from '../../constants/DraggableItems';
import SignatureCanvas from 'react-signature-canvas';
import Datepicker from 'react-tailwindcss-datepicker';
import Decimal from '../Generics/Inputs/Decimal';
import JoditReact from 'jodit-react-ts';
import 'jodit/build/jodit.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { signDataTemplate } from '../../redux/slice/Signature/Signature';
import SummaryIcon from '../../assets/img/selectSummary.svg';
import SessionSummaryGrid from '../AddNewNote/SessionSummary';
import RenderSelectedSession from '../AddNewNote/RenderSelectedSession';
import LongTermGoal from '../GuidelineTemplate/LongTermGoal';
import ShortTermGoal from '../GuidelineTemplate/ShortTermGoal';
import {
    setSelectedRow,
    selectedSessionSummary,
} from '../../redux/slice/session/sessionSlice';
import {
    callLongInProgressGoals,
    callShortInProgressGoals,
} from '../../redux/slice/Intervention/InProgressShortTermLongTerm';
import { resetData } from '../../redux/slice/MineSlice/getMine';
import Select from '../Generics/Select';
export default function TemplateData({
    preventSubmit,
    index,
    name,
    label,
    instruction,
    isRequired,
    options,
    type,
    setGuidelineValues,
    mode,
}: {
    preventSubmit: any;
    index: any;
    name: any;
    label: any;
    instruction: any;
    isRequired: boolean;
    htmlType: any;
    options: any;
    type: any;
    setGuidelineValues?: any;
    mode?: any;
}): React.JSX.Element {
    const signatureRef = useRef<any>(null);
    const dispatch = useDispatch<any>();
    const clearSignature = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        if (signatureRef.current) {
            signatureRef.current.clear();
            e.preventDefault();
        }
    };
    if (signatureRef.current) {
        const data = signatureRef.current.toDataURL('image/png');
        dispatch(signDataTemplate(data));
    }
    const {
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        touched,
        errors,
        submitForm,
    }: {
        values: any;
        handleChange: any;
        handleBlur: any;
        handleSubmit: any;
        setFieldValue: any;
        touched: any;
        errors: any;
        submitForm: any;
    } = useFormikContext();
    const hints: any = hint;
    const template = useSelector((state: any) => state.template.newNote);
    const appointment = useSelector((state: any) => state?.appointment?.value);
    const [isSelectSummary, showSelectSummaryModal] = useState(false);
    const dynamicValue = useSelector(
        (state: any) => state.template.clientProviderDetails
    );
    const targetBody = useSelector(
        (state: any) => state.session.selectedSummary
    );
    useEffect(() => {
        if (setGuidelineValues) {
            setGuidelineValues(values);
        }
    }, [values]);
    useEffect(() => {
        const selectSummaryData = template?.filter(
            (item: any) => item?.name === 'selectSummary'
        );
        if (
            selectSummaryData?.length > 0 &&
            selectSummaryData[index]?.value?.length
        ) {
            const updatedTargetBody = JSON.parse(
                selectSummaryData[index]?.value
            );
            dispatch(
                selectedSessionSummary({ update: true, updatedTargetBody })
            );
        }
    }, [template]);
    useEffect(() => {
        const long = template?.filter(
            (item: any) => item?.name === 'longTermGoal'
        );
        const short = template?.filter(
            (item: any) => item?.name === 'shortTermGoal'
        );
        if (long?.length > 0 || short?.length > 0) {
            const payload = {
                providerId: appointment?.primaryProvider?.id || '',
                clientId: appointment?.appointmentWith?.id || '',
            };
            dispatch(callLongInProgressGoals(payload));
            dispatch(callShortInProgressGoals(payload));
        }
    }, []);
    useEffect(() => {
        if (!dynamicValue || !dynamicValue.data) {
            // If dynamicValue or dynamicValue.data is not defined, exit early
            return;
        }
        const replaceElements = document.querySelectorAll('.replace');
        replaceElements.forEach((html) => {
            const value = html.getAttribute('value');
            if (value) {
                const [identifier, key] = value.split('.');
                // Check if the necessary properties exist
                if (
                    dynamicValue.data[identifier] &&
                    key in dynamicValue.data[identifier] &&
                    dynamicValue.data[identifier][key] !== null
                ) {
                    html.innerHTML = dynamicValue.data[identifier][key];
                }
            }
        });
    }, [dynamicValue]);
    const findValue = (i: any): any => {
        const data = template.filter((e: any) => e.index === i);
        return data;
    };
    const handlesubmition = (): void => {
        return preventSubmit ? null : submitForm();
    };
    const renderContent = (): React.JSX.Element | null => {
        if (type === 'text' && name === 'smallText') {
            return (
                <div className="flex flex-col w-full">
                    <Field
                        autoComplete="off"
                        isRequired={false}
                        component={Input}
                        value={values[`${name}-${index}`]}
                        name={`${name}-${index}`}
                        type={type}
                        onChange={(e: any) => {
                            handleChange(e);
                            handlesubmition();
                        }}
                        onBlur={handleBlur}
                        className="w-full"
                    />
                    <span className="text-sm font-thin">{hints[name]}</span>
                </div>
            );
        } else if (name === 'dropdown') {
            return (
                <>
                    <Field
                        name={`${name}-${index}`}
                        autoComplete="off"
                        isRequired={false}
                        value={values[`${name}-${index}`]}
                    >
                        {({ field }: { field: any }) => (
                            <Select
                                label={''}
                                options={options?.map((data: any) => ({
                                    label: data,
                                    value: data,
                                }))}
                                onChange={(selectedOption: any) => {
                                    if (selectedOption?.length) {
                                        setFieldValue(
                                            `${name}-${index}`,
                                            selectedOption
                                        );
                                        handlesubmition();
                                    }
                                }}
                                value={field.value}
                                placeholder={'Select'}
                            />
                        )}
                    </Field>
                    <span className="text-sm font-thin">{hints[name]}</span>
                    <ErrorMessage
                        touched={touched}
                        errors={errors}
                        field={{ name }}
                    />
                </>
            );
        } else if (name === 'multiselect') {
            return (
                <div className="flex flex-col w-full">
                    <Field
                        name={`${name}-${index}`}
                        autoComplete="off"
                        isRequired={false}
                        value={values[`${name}-${index}`]}
                    >
                        {({ field }: { field: any }) => (
                            <Select
                                label={''}
                                options={options?.map((data: any) => {
                                    return { label: data, value: data };
                                })}
                                onChange={(selectedOptions: any) => {
                                    if (selectedOptions?.length) {
                                        setFieldValue(
                                            `${name}-${index}`,
                                            selectedOptions
                                        );
                                        handlesubmition();
                                    }
                                }}
                                value={field.value}
                                showSearch={false}
                                multi={true}
                            />
                        )}
                    </Field>
                    <span className="text-sm font-thin">{hints[name]}</span>
                </div>
            );
        } else if (type === 'number') {
            return (
                <div className="flex flex-col w-full">
                    <Field
                        autoComplete="off"
                        isRequired={false}
                        component={Input}
                        value={values[`${name}-${index}`]}
                        name={`${name}-${index}`}
                        type={type}
                        onChange={(e: any) => {
                            handleChange(e);
                            handlesubmition();
                        }}
                        onBlur={handleBlur}
                        className="w-full"
                    />
                    <span className="text-sm font-thin">{hints[name]}</span>
                </div>
            );
        } else if (type === 'decimal') {
            return (
                <div className="flex flex-col w-full">
                    <Field
                        autoComplete="off"
                        isRequired={false}
                        component={Decimal}
                        value={values[`${name}-${index}`]}
                        name={`${name}-${index}`}
                        type={type}
                        onChange={(e: any) => {
                            handleChange(e);
                            handlesubmition();
                        }}
                        onBlur={handleBlur}
                        className="w-full"
                    />
                    <span className="text-sm font-thin">{hints[name]}</span>
                </div>
            );
        } else if (type === 'date') {
            return (
                <div className="flex flex-col w-full">
                    <Field
                        autoComplete="off"
                        isRequired={false}
                        type={type}
                        value={{
                            startDate: values?.date?.startDate,
                        }}
                        name={`${name}-${index}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full"
                    >
                        {({ field, form }: { field: any; form: any }) => (
                            <Datepicker
                                id="date"
                                {...field}
                                selected={field.value}
                                useRange={false}
                                asSingle={true}
                                onChange={(date) => {
                                    form.setFieldValue(field.name, date);
                                    handlesubmition();
                                }}
                            />
                        )}
                    </Field>
                    <span className="text-sm font-thin">{hints[name]}</span>
                </div>
            );
        } else if (type === 'text' && name === 'largeText') {
            return (
                <div className="flex flex-col w-full">
                    <Field
                        as={'textarea'}
                        autoComplete="off"
                        rows={2}
                        isRequired={false}
                        className={
                            'peer pe-0 ps-3 block pt-1 w-full px-4 pb-1 pr-0 bg-transparent border border-gray-300 text-sm focus:border-t-gray focus:border-x-gray focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                        }
                        value={values[`${name}-${index}`]}
                        name={`${name}-${index}`}
                        type={type}
                        onChange={(e: any) => {
                            handleChange(e);
                            handlesubmition();
                        }}
                        onBlur={handleBlur}
                    />
                    <span className="text-sm font-thin">{hints[name]}</span>
                </div>
            );
        } else if (name === 'editor') {
            return (
                <div className="flex flex-col w-full">
                    <Field
                        name={`${name}-${index}`}
                        autoComplete="off"
                        isRequired={false}
                        type={type}
                        value={values[`${name}-${index}`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full"
                    >
                        {({ field, form }: { field: any; form: any }) => (
                            <JoditReact
                                onChange={(editor) => {
                                    form.setFieldValue(field.name, editor);
                                    handlesubmition();
                                }}
                                config={{
                                    readonly: false, // Set other configuration options as needed
                                    defaultMode: '1', // Set the initial content
                                    inline: true,
                                    enter: 'br',
                                }}
                                defaultValue={findValue(index)[0].value}
                            />
                        )}
                    </Field>
                    <span className="text-sm font-thin">{hints[name]}</span>
                </div>
            );
        } else if (name === 'signature') {
            return (
                <div className="ml-3 mt-5">
                    {mode === 'view' ? (
                        <div className="viewimg w-96 h-96">
                            <img src={values?.signature} alt="" />
                        </div>
                    ) : (
                        <>
                            <Field
                                name="signature"
                                id="signature"
                                required={true}
                            >
                                {({ form }: { form: any }) => (
                                    <div className="border-2">
                                        <SignatureCanvas
                                            ref={signatureRef}
                                            penColor="green"
                                            canvasProps={{
                                                width: 1110,
                                                height: 280,
                                                className: 'signature-canvas',
                                            }}
                                            onEnd={() => {
                                                form.setFieldValue(
                                                    'signature',
                                                    signatureRef.current.toDataURL()
                                                );
                                            }}
                                        />
                                        {form.errors.Signature &&
                                            form.touched.Signature && (
                                                <div>
                                                    {form.errors.Signature}
                                                </div>
                                            )}
                                    </div>
                                )}
                            </Field>
                            <div className="signature flex justify-end text-[#086886]">
                                <button
                                    className="text-blue"
                                    onClick={clearSignature}
                                >
                                    Clear
                                </button>
                            </div>
                        </>
                    )}
                </div>
            );
        } else if (name === 'goal') {
            return (
                <div className="ml-3 mt-5">
                    <div className="parent">
                        <div className="goalData">
                            <div className="head">
                                <span>Long Term Goal 1</span>
                                <span>delete icon</span>
                            </div>
                            <div className="left">
                                <div className="leftHead">
                                    <p>score</p>
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        component={Input}
                                        value={values[name]}
                                        name={name}
                                        type={type}
                                        onChange={(e: any) => {
                                            handleChange(e);
                                            handlesubmition();
                                        }}
                                        onBlur={handleBlur}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <div className="rightHead">
                                    <p>Comment</p>
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        component={Input}
                                        value={values[name]}
                                        name={name}
                                        type={type}
                                        onChange={(e: any) => {
                                            handleChange(e);
                                            handlesubmition();
                                        }}
                                        onBlur={handleBlur}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (name === 'selectSummary') {
            return (
                <>
                    <div>
                        <span
                            className="flex py-2 w-[15rem] bg-white shadow-[0_2px_8px_rgb(0,0,0,0.2)] rounded-md mr-6 justify-around"
                            onClick={(e) => {
                                e.preventDefault();
                                showSelectSummaryModal(true);
                                dispatch(setSelectedRow(index));
                                dispatch(resetData());
                            }}
                        >
                            <button className="text-[#394148] font-normal">
                                Select Session Summary
                            </button>
                            <img
                                src={SummaryIcon}
                                alt="summary"
                                className="w-[1rem]"
                            />
                        </span>
                    </div>
                    {Object.keys(targetBody)?.length > 0 && (
                        <RenderSelectedSession indexVal={index} />
                    )}
                </>
            );
        } else if (name === 'longTermGoal') {
            return <LongTermGoal mode={mode} />;
        } else if (name === 'shortTermGoal') {
            return <ShortTermGoal mode={mode} />;
        } else {
            return null;
        }
    };
    return (
        <div
            className={` ${mode === 'view' ? 'pointer-events-none ' : ''} flex items-center`}
            data-testId="template-data"
        >
            <div className="w-3">
                <span className="text-red-500 mr-1">
                    {isRequired ? '*' : ' '}
                </span>
            </div>
            <div className="w-full">
                <div className="border border-gray-300 rounded-md px-4 py-2 w-full mt-3 mb-5">
                    <div className="flex items-center border-b-2 border-b-gray-200 w-full">
                        <label className="text-sm font-light">{label}</label>
                        {instruction?.length > 0 && (
                            <Tooltip title={instruction}>
                                <img
                                    className="pl-2 w-[1.4rem]"
                                    src={Information}
                                    alt="Information icon"
                                />
                            </Tooltip>
                        )}
                    </div>
                    <div className=" flex flex-col justify-between mt-3 ">
                        {renderContent()}
                    </div>
                </div>
            </div>
            {isSelectSummary && (
                <SessionSummaryGrid
                    onClose={() => showSelectSummaryModal(false)}
                    first={isSelectSummary}
                />
            )}
        </div>
    );
}
