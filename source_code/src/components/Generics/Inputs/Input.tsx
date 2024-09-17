import * as React from 'react';
import ErrorMessage from './ErrorMessage';
import ErrorIcon from './ErrorIcon';
import dropdown from '../../../assets/img/arrowDown.svg';
export default function Input({
    field,
    label,
    icon,
    id,
    hideLabel,
    className,
    placeholder,
    isRequired,
    type,
    isDropdown,
    openDropdownList,
    form: { touched, errors },
    hideError,
    isExtracted,
    prefixIcon,
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
    props?: any;
    isDropdown?: any;
    openDropdownList?: any;
    type: any;
    hideError?: any;
    isExtracted?: string;
    prefixIcon?: any;
}): React.JSX.Element {
    const getLabel = (): any => {
        if (hideLabel) {
            return '';
        } else {
            return (
                <label
                    className={`${label === 'Question Statement' ? 'text-sm' : 'text-base ms-2'}  font-bold  text-zinc-700 font-[lato] flex`}
                >
                    {icon ? icon : null}
                    {label}
                    {isRequired ? (
                        <span className="text-red-500 ml-1">*</span>
                    ) : null}
                </label>
            );
        }
    };
    const widthMap: { [key: string]: string } = {
        criteriaDescription: 'w-[23.2rem]',
        criteriaName: 'w-[23.2rem]',
        sessionDescription: 'w-[25rem]',
        sessionName: 'w-[25rem]',
        hours: 'w-[3.8rem]',
        endsAfter: 'w-[7rem]',
    };
    const widthClass = widthMap[id] || 'w-full';
    const finalClassName = `block p-2 ${widthClass} border border-gray-200 rounded-md text-sm focus:border-primary-600 focus:ring-primary-600 disabled:opacity-30 disabled:pointer-events-none ${className}`;
    return (
        <div className="space-y-1 w-full">
            {getLabel()}
            <div className="relative">
                {prefixIcon && (
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <span className="w-4 h-4 text-gray-500">
                            {prefixIcon}
                        </span>
                    </div>
                )}
                <input
                    autoComplete="off"
                    title=""
                    type={type}
                    {...field}
                    {...props}
                    id={id}
                    className={`${prefixIcon && 'ps-10 '} ${finalClassName}`}
                    required={isRequired}
                    placeholder={placeholder}
                    aria-describedby={`${id}-error`}
                />
                {isDropdown && (
                    <img
                        src={dropdown}
                        onClick={openDropdownList}
                        className={`absolute inset-y-2 h-[1.2rem] end-0 flex items-center pe-3 cursor-pointer`}
                    />
                )}
                {!hideError && (
                    <ErrorIcon
                        touched={touched}
                        errors={errors}
                        field={field}
                    />
                )}
            </div>
            {!hideError && (
                <ErrorMessage
                    touched={touched}
                    errors={errors}
                    field={field}
                    isExtracted={isExtracted}
                />
            )}
        </div>
    );
}
