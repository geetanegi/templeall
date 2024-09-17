import React from 'react';
import ErrorIcon from './ErrorIcon';
import ErrorMessage from './ErrorMessage';
import Datepicker from 'react-tailwindcss-datepicker';

export default function DatepickerComponent({
    field,
    label,
    icon,
    id,
    hideLabel,
    placeholder,
    isRequired,
    form: { touched, errors },
    ...props
}: {
    icon?: any;
    field: any;
    label: any;
    name: any;
    id: any;
    value: any;
    hideLabel: any;
    className: any;
    placeholder: any;
    isRequired: boolean;
    form: { touched: any; errors: any };
    props: any;
    type: any;
}): React.JSX.Element {
    return (
        <div className="space-y-1">
            {hideLabel ? null : (
                <label className="text-sm font-medium flex">
                    {icon ? icon : null}
                    {label}
                    {isRequired ? (
                        <span className="text-red-500 ml-1">*</span>
                    ) : null}
                </label>
            )}
            <div className="relative">
                <Datepicker
                    id={id}
                    toggleClassName="absolute rounded-r-lg text-blue-300
                                                        left-0 h-full px-3 focus:outline-none
                                                         disabled:opacity-40 disabled:cursor-not-allowed"
                    inputClassName="outline-none py-[0.5rem] px-[2rem] px-3 w-96 border-2 h-8 border-neutral-300 rounded-lg text-xs"
                    placeholder={placeholder}
                    popoverDirection="down"
                    {...field}
                    {...props}
                />
                <ErrorIcon touched={touched} errors={errors} field={field} />
            </div>
            <ErrorMessage touched={touched} errors={errors} field={field} />
        </div>
    );
}
