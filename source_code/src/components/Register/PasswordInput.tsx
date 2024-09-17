import React from 'react';
import { Field } from 'formik';
import Input from '../Generics/Inputs/Input';
import view from '../../assets/img/GridIcons/view.svg';
import hide from '../../assets/img/crossEye.svg';
interface PasswordInputProps {
    id: string;
    name: string;
    placeholder: string;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
}
const PasswordInput: React.FC<PasswordInputProps> = ({
    id,
    name,
    placeholder,
    showPassword,
    setShowPassword,
}) => (
    <div className="flex relative items-center border border-black rounded-md w-full">
        <Field
            className="password w-[32rem] font-['Lato'] bg-transparent border-none text-lg p-3 py-4 focus:ring-transparent"
            autoComplete="off"
            id={id}
            name={name}
            component={Input}
            placeholder={placeholder}
            label=""
            hideLabel={true}
            type={showPassword ? 'text' : 'password'}
            hideError={true}
        />
        <img
            className="absolute end-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            data-testid={`password-field-${id}`}
            src={showPassword ? hide : view}
            alt="view"
        />
    </div>
);
export default PasswordInput;
