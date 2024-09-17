import React from 'react';
import Select from 'react-tailwindcss-select';
import ErrorMessage from './ErrorMessage';
import ErrorIcon from './ErrorIcon';

function SelectComponent({
    isMultiple,
    icon,
    label,
    options,
    field,
    isRequired,
    isSearchable,
    handleBlur,
    isDisabled,
    form: { touched, errors },
}: {
    isMultiple?: any;
    icon?: any;
    label?: string;
    options?: any;
    isRequired?: boolean;
    isSearchable?: boolean;
    handleBlur?: any;
    isDisabled?: boolean;
    form: { touched?: any; errors?: any };
    field: {
        name?: any;
        value: any;
        onChange: (value: any) => any;
    };
}): React.JSX.Element {
    return (
        <div className="w-full">
            <label
                htmlFor="timePeriod"
                className="text-sm font-semibold flex items-center  text-zinc-700 font-['Lato'] leading-tight"
            >
                {icon ? icon : null}
                {label}
                {isRequired ? (
                    <span className="text-red-500 ml-1">*</span>
                ) : null}
            </label>
            <div
                className={`select relative w-full`}
                onClick={() => handleBlur(field.name)}
            >
                <Select
                    placeholder="Select..."
                    isMultiple={isMultiple}
                    isDisabled={isDisabled}
                    isSearchable={isSearchable}
                    options={options}
                    primaryColor="text-gray-600"
                    value={field.value}
                    onChange={(value) => {
                        field.onChange(value);
                    }}
                />

                <ErrorIcon
                    select={true}
                    touched={touched}
                    errors={errors}
                    field={field}
                />
            </div>
            <ErrorMessage touched={touched} errors={errors} field={field} />
        </div>
    );
}

export default SelectComponent;
