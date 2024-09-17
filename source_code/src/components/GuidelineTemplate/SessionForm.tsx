import React, { useState, useEffect, useRef } from 'react';
import { Field, FieldProps, FormikContextType, useFormikContext } from 'formik';
import Input from '../Generics/Inputs/Input';
import SelectComponent from '../Generics/Inputs/Select';
import { useSelector } from 'react-redux';
import upload from '../../assets/img/uploadDoc.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
interface FormValues {
    description: string;
    name: string;
    authorizationCode: any;
}
export default function SessionForm({
    isError,
    setIsError,
    isErrorName,
    setIsErrorName,
}: {
    isErrorName: any;
    isError: any;
    setIsError: any;
    setIsErrorName: any;
}): React.JSX.Element {
    const authorizationCode = useSelector(
        (state: any) => state.template?.authorizationCode
    );
    const template = useSelector((state: any) => state.template);
    const [options, setOptions] = useState({
        authorizationCode: [],
    });
    const [logoError, setLogoError] = useState<string>('');
    const [logoPreview, setLogoPreview] = useState<string>('');
    const [logoPreviewAfterEditing, setLogoPreviewAfterEditing] =
        useState<string>(
            template?.fullData?.instructionTemplate?.templateId
                ?.organizationLogo
        );

    const {
        values,
        handleChange,
        setFieldTouched,
        touched,
        handleSubmit,
        setFieldValue,
    }: FormikContextType<FormValues> = useFormikContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        values.name = '';
        values.description = '';

        if (template?.isEditing) {
            values.name = template?.name || template?.fullData?.template?.name;
            values.description =
                template?.description ||
                template?.fullData?.template?.description;
        }
    }, [
        template?.name,
        template?.fullData?.template,

        // getCode(),
    ]);

    useEffect(() => {
        values.authorizationCode = '';
        const getCode = (): any => {
            if (template?.isEditing) {
                const data = authorizationCode?.data?.find(
                    (item: any) =>
                        item.code ===
                        template?.fullData?.instructionTemplate
                            ?.authorizationCode
                );
                return { value: data?.id, label: data?.code };
            }
        };
        if (template?.isEditing) {
            values.authorizationCode = getCode();
        }
    }, [
        template?.name,
        template?.fullData?.instructionTemplate?.authorizationCode,
    ]);
    useEffect(() => {
        if (template?.isEditing) {
            setLogoPreviewAfterEditing(
                template?.fullData?.instructionTemplate?.templateId
                    ?.organizationLogo
            );
        }
    }, [template?.fullData?.instructionTemplate?.templateId?.organizationLogo]);

    const updateOptions = (key: any): void => {
        const optionsData = authorizationCode?.data?.map((item: any) => ({
            value: item?.id,
            label: item?.code || item?.codeType,
        }));

        setOptions((prev: any) => ({
            ...prev,
            [key]: optionsData,
        }));
    };
    useEffect(() => {
        updateOptions('authorizationCode');
    }, [authorizationCode]);
    // const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>): any => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         if (file.size > 15 * 1024 * 1024) {
    //             setLogoError('Logo size cannot be more than 15 MB');
    //             setLogoPreview(null);
    //         } else {
    //             setLogoError(null);
    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //                 setLogoPreview(reader.result as string);
    //                 setFieldValue('logo', file);
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     }
    // };
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 15 * 1024 * 1024) {
                setLogoError('Logo size cannot be more than 15 MB');
                setLogoPreview('');
            } else {
                setLogoError('');
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setLogoPreview(base64String);
                    setFieldValue('logo', base64String); // Store base64 string in form values
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleLogoDelete = (): any => {
        setLogoPreview('');
        setLogoPreviewAfterEditing('');
        setFieldValue('logo', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-4 px-4">
                {logoError && (
                    <span className="text-[red] text-sm">{logoError}</span>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                    ref={fileInputRef}
                />
                <div className="flex ">
                    <label
                        htmlFor="logo-upload"
                        className="cursor-pointer w-2/3"
                    >
                        <div className="border-2 border-dashed p-4 text-center">
                            {logoPreview || logoPreviewAfterEditing ? (
                                <img
                                    src={
                                        template?.isEditing
                                            ? logoPreviewAfterEditing?.length
                                                ? logoPreviewAfterEditing
                                                : logoPreview
                                            : logoPreview
                                    }
                                    alt="Logo Preview"
                                    className="w-32 h-32 object-contain"
                                />
                            ) : (
                                <div className="flex justify-center">
                                    <img
                                        src={upload}
                                        alt="Upload Icon"
                                        className="w-5 h-5 mr-5"
                                    />
                                    <p>Upload your organization logo here</p>
                                </div>
                            )}
                        </div>
                    </label>

                    {(logoPreview || logoPreviewAfterEditing) && (
                        <button
                            type="button"
                            onClick={handleLogoDelete}
                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 ml-10"
                        >
                            <img className="mr-1" src={deleteIcon} />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex py-4 px-4 space-x-20">
                <div className="items-baseline w-1/2">
                    <div className="flex">
                        <label className="block text-sm font-medium">
                            Name
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    <div className=" bg-white relative flex">
                        <Field
                            hideLabel={true}
                            autoFocus={true}
                            label="Name"
                            isRequired={true}
                            id="sessionName"
                            name="name"
                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-5 pb-1 outline-none "
                            component={Input}
                            onChange={(e: any) => {
                                handleChange(e);
                                setIsErrorName(false);
                            }}
                            value={values?.name}
                            placeholder="Name"
                        />
                    </div>
                    {isErrorName && (
                        <span className="text-[red] text-sm">
                            Name already exists, please try with another Name.
                        </span>
                    )}
                </div>
                <div className="items-baseline w-1/2">
                    <div className="flex">
                        <label className="block text-sm font-medium">
                            Description
                        </label>
                    </div>
                    <div className=" bg-gray-100relative flex">
                        <Field
                            hideLabel={true}
                            isRequired={false}
                            id="sessionDescription"
                            name="description"
                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                            component={Input}
                            onChange={handleChange}
                            value={values?.description}
                            placeholder="Description"
                        />
                    </div>
                </div>
            </div>
            <div className="flex  py-4 pl-4 flex-row  ">
                <div className="items-baseline w-[40rem]">
                    <div className="select w-[45rem] relative flex flex-col">
                        <Field
                            autoComplete="off"
                            isRequired={true}
                            id="authorizationCode"
                            name="authorizationCode"
                            value={values?.authorizationCode?.label}
                        >
                            {({ field, form }: FieldProps) => (
                                <SelectComponent
                                    isSearchable={false}
                                    isRequired={true}
                                    label=" Billing Code"
                                    options={options?.authorizationCode}
                                    form={{
                                        touched,
                                        errors: !field?.value?.label
                                            ? {
                                                  authorizationCode: {
                                                      label: 'Please select valid Billing code',
                                                  },
                                              }
                                            : {},
                                    }}
                                    handleBlur={setFieldTouched}
                                    field={{
                                        value: field.value,
                                        name: field.name,
                                        onChange: (value) => {
                                            form.setFieldValue(
                                                field.name,
                                                value
                                            );
                                            setTimeout(() => {
                                                form.setFieldError(
                                                    field.name,
                                                    ''
                                                );
                                            }, 0);
                                            setIsError(false);
                                        },
                                    }}
                                />
                            )}
                        </Field>
                        {isError && (
                            <span className="text-[red] text-sm">
                                Session note already exists for given Billing
                                code, please try with another code.
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
