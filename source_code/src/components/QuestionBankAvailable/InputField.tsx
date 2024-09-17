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
}: any): JSX.Element => (
    <div className="mb-4">
        <Field
            data-testid={'questionStatement12'}
            label={label}
            isRequired={isRequired}
            id={name}
            name={name}
            type={type}
            component={Input}
            placeholder={placeholder}
            onChange={onChange}
            value={value || ''} // Ensure value is a string or empty string
            className=" border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
            // className={`py-2 px-3 block border-b-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${type === 'date' ? 'w-[10rem]' : 'w-full'} border-b`}
        />
    </div>
);
