import React from 'react';
import { Field } from 'formik';
import Input from '../Generics/Inputs/Input';

interface InputProps {
    id: string;
    name: string;
    placeholder: string;
    type?: string;
}

const FormInput: React.FC<InputProps> = ({
    id,
    name,
    placeholder,
    type = 'text',
}) => (
    <Field
        className="email bg-[#FAFAFA] w-full border border-gray-800 font-['Lato'] text-md p-3 py-4 focus:ring-transparent"
        autoComplete="off"
        id={id}
        name={name}
        component={Input}
        placeholder={placeholder}
        type={type}
        hideLabel={true}
    />
);

export default FormInput;
