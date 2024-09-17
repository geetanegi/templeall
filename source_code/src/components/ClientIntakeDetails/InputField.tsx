import React from 'react';
import { Field } from 'formik';
import Input from '../Generics/Inputs/Input';

export const InputField = ({
    name,
    label,
    type = 'text',
    placeholder,
    onChange,
    value,
    isRequired,
}: any): JSX.Element => {
    const isSpecificViewPresent = window.location.href.includes('view');
    console.log(isSpecificViewPresent, 'isSpecificViewPresent');
    return (
        <div className="mb-4">
            <Field
                disabled={isSpecificViewPresent}
                label={label}
                isRequired={isRequired}
                id={name}
                name={name}
                type={type}
                component={Input}
                placeholder={placeholder}
                onChange={onChange}
                value={value || ''} // Ensure value is a string or empty string
                className={`py-2 px-3 block  border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${type === 'date' ? 'w-[10rem]' : 'w-full'}`}
            />
        </div>
    );
};
