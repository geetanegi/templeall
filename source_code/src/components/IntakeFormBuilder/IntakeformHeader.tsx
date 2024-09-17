import React, { useState, useEffect, useRef } from 'react';
import { FormikContextType, useFormikContext } from 'formik';

import { useSelector, useDispatch } from 'react-redux';
import upload from '../../assets/img/uploadDoc.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';

import { useParams } from 'react-router-dom';
import { clearIntakeValues } from '../../redux/slice/IntakeEditor/intakeEditor';
interface FormValues {
    description: string;
    name: string;
    authorizationCode: any;
}
export default function IntakeformHeader({
    logoPreview,
    setLogoPreview,
}: {
    logoPreview: any;
    setLogoPreview: any;
}): React.JSX.Element {
    const template = useSelector((state: any) => state.intakeform);
    const dispatch = useDispatch();
    const params = useParams();
    const [logoError, setLogoError] = useState<string>('');
    const [logoPreviewAfterEditing, setLogoPreviewAfterEditing] =
        useState<string>(
            template?.fullData?.instructionTemplate?.templateId
                ?.organizationLogo
        );

    const { handleSubmit, setFieldValue }: FormikContextType<FormValues> =
        useFormikContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (template?.isEditing) {
            setLogoPreviewAfterEditing(
                template?.fullData?.instructionTemplate?.templateId
                    ?.organizationLogo
            );
        }
    }, [template?.fullData?.instructionTemplate?.templateId?.organizationLogo]);

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

        // Reset the file input value to allow re-uploading the same file
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    useEffect(() => {
        return () => {
            if (!params?.id && !template?.isEditing) {
                dispatch(clearIntakeValues());
            }
        };
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-5 px-8">
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
                <div className=" ">
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

                                        <p>
                                            Upload your organization logo here
                                        </p>
                                        <span className="text-red-500 mr-1 ml-1">
                                            *
                                        </span>
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
            </div>
        </form>
    );
}
