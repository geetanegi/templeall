import * as React from 'react';
import ErrorMessage from '../Inputs/ErrorMessage';
import ErrorIcon from '../Inputs/ErrorIcon';
export default function TextArea({
    field,
    id,
    className,
    placeholder,
    form: { touched, errors },
    handleChange,
    props,
    value,
    rows,
    hideLabel,
    isRequired,
    label,
}: {
    field: any;
    name: any;
    id: any;
    className: any;
    placeholder: any;
    form: { touched: any; errors: any };
    handleChange: any;
    props: any;
    value: any;
    hideLabel: any;
    isRequired: boolean;
    label: any;
    rows: any;
}): React.JSX.Element {
    return (
        <div data-testid="text-area">
            {hideLabel ? null : (
                <label className="block text-sm">
                    {isRequired ? (
                        <span className="text-red-500 mr-1">*</span>
                    ) : null}
                    {label}
                </label>
            )}
            <div className="relative">
                <textarea
                    autoComplete="off"
                    type="text"
                    {...field}
                    {...props}
                    value={value}
                    rows={rows}
                    className={`overflow-y-auto py-3 px-4 block w-80% border border-gray-200 rounded-md text-sm focus:border-primary-600 focus:ring-primary-600 disabled:opacity-50 disabled:pointer-events-none ${className}`}
                    placeholder={placeholder}
                    onChange={handleChange}
                    aria-describedby={`${id}-error`}
                    data-testid={`textarea-onchange`}
                />
                <ErrorIcon touched={touched} errors={errors} field={field} />
            </div>
            <ErrorMessage touched={touched} errors={errors} field={field} />
        </div>
    );
}
