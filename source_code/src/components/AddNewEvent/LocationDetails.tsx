import { Field, useFormikContext } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';
import Select from '../Generics/Select';
export default function LocationDetails({
    mode,
    formRef,
}: {
    mode?: string;
    formRef: any;
}): React.JSX.Element {
    const placeOfService = useSelector(
        (state: any) => state?.scheduling?.getLocation
    );
    const location = useSelector(
        (state: any) => state.getAllClientInquiryDetailsCall?.location?.data
    );
    const getAllLocation = (locationArr: any): any => {
        return locationArr.map((item: any) => ({
            label: `${item.city}, ${item.zipCode} - ${item.state}`,
            value: item.id,
        }));
    };
    const getAllPlaces = (serviceArr: any): any => {
        return serviceArr.map((item: any) => ({
            label: item.service,
            value: item.id,
        }));
    };
    const {
        // values,
        // handleChange,
        // handleBlur,
        handleSubmit,
        submitForm,
        // setFieldTouched,
        setFieldValue,
    }: {
        values: any;
        handleChange: any;
        handleBlur: any;
        handleSubmit: any;
        submitForm: any;
        setFieldTouched: any;
        setFieldValue: any;
    } = useFormikContext();
    return (
        <div className={`${mode === 'view' ? 'pointer-events-none' : ''}`}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                ref={formRef}
            >
                <div className="mt-9 ">
                    <span className="text-base font-semibold">
                        Location Details
                    </span>
                    <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                    <div className="w-1/2 space-y-5 mt-7 ">
                        <div>
                            <label className="text-sm font-medium">
                                Place of Service
                            </label>
                            <label className="text-red-700 text-lg font-normal font-['Lato'] ml-[0.25rem]">
                                *
                            </label>
                            <div className=" w-[50rem]">
                                <Field
                                    name="placeOfService"
                                    autoComplete="off"
                                    isRequired={false}
                                >
                                    {({ field }: { field: any }) => (
                                        <Select
                                            label={''}
                                            options={
                                                placeOfService?.length
                                                    ? getAllPlaces(
                                                          placeOfService
                                                      )
                                                    : []
                                            }
                                            onChange={(selectedOption: any) => {
                                                setFieldValue(
                                                    field.name,
                                                    selectedOption?.[0]
                                                );
                                                submitForm();
                                            }}
                                            value={field.value}
                                            showSearch={false}
                                            multi={false}
                                            placeholder={'Place of Service'}
                                            isDisabled={mode ? true : false}
                                            inputClassName={
                                                'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                        />
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="">
                            <label className="text-sm font-medium">
                                Service Address
                            </label>
                            <label className="text-red-700 text-lg font-normal font-['Lato'] ml-[0.25rem]">
                                *
                            </label>
                            <div className=" w-[50rem]">
                                <Field
                                    name="locationAddress"
                                    autoComplete="off"
                                    isRequired={false}
                                >
                                    {({ field }: { field: any }) => (
                                        <Select
                                            label={''}
                                            options={
                                                location?.length
                                                    ? getAllLocation(location)
                                                    : []
                                            }
                                            onChange={(selectedOption: any) => {
                                                setFieldValue(
                                                    field.name,
                                                    selectedOption?.[0]
                                                );
                                                submitForm();
                                            }}
                                            value={field.value}
                                            showSearch={false}
                                            multi={false}
                                            placeholder={'Service Address'}
                                            isDisabled={mode ? true : false}
                                            inputClassName={
                                                'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                        />
                                    )}
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
