import React from 'react';
import Button from '../Generics/Button';
import { FormikErrors, useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
interface FormValues {
    name: string;
    // Add other fields if necessary
}
export default function GuidelineTemplateHeader({
    readOnly,
}: {
    readOnly: any;
}): React.JSX.Element {
    const { submitForm, values, errors } = useFormikContext<FormValues>();
    const navigate = useNavigate();
    const handleCancelClick = (): void => {
        navigate(-1);
    };
    function hasErrors(errorVal: FormikErrors<FormValues>): boolean {
        return Object.values(errorVal).some(
            (error) => typeof error === 'string' && error.length > 0
        );
    }
    const shouldDisable = hasErrors(errors);
    return (
        <div className="bg-white flex justify-between items-center px-4 py-3 border-b border-b-gray-200">
            <h4 className="text-xl font-medium">Guideline Templates</h4>
            <div className="flex">
                <div className="mr-8">
                    <Button
                        className="w-[104px] flex justify-center"
                        type={'secondary'}
                        onClick={handleCancelClick}
                        disabled={false}
                    >
                        Cancel
                    </Button>
                    {!readOnly && (
                        <Button
                            className="w-[104px] flex justify-center"
                            type={'primary'}
                            onClick={submitForm}
                            disabled={!values?.name?.length || shouldDisable}
                        >
                            Save
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
