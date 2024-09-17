import * as React from 'react';
import ErrorMessage from './ErrorMessage';
import ErrorIcon from './ErrorIcon';
import { FieldProps } from 'formik';

interface DecimalProps extends FieldProps {
    id: string;
    className: string;
    type?: string;
}

const isDecimal = (value: string): boolean => {
    // Regular expression to check if the value is a valid decimal
    const decimalRegex = /^\d*\.?\d*$/;
    return decimalRegex.test(value);
};

const Decimal: React.FC<DecimalProps> = ({
    field,
    id,
    className,
    type,
    form: { touched, errors },
    ...props
}) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (!isDecimal(e.target.value)) {
            field.onBlur(e);
            field.onChange({ ...e, target: { ...e.target, value: '' } });
        }
    };

    return (
        <div>
            <div className="relative">
                <input
                    autoComplete="off"
                    title=""
                    type={type || 'text'} // Use 'text' type to allow decimal input
                    id={id}
                    {...field}
                    {...props}
                    onBlur={handleBlur}
                    className={`py-2 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-primary-600 focus:ring-primary-600 disabled:opacity-50 disabled:pointer-events-none ${className}`}
                    required
                    aria-describedby={`${id}-error`}
                />
                <ErrorIcon touched={touched} errors={errors} field={field} />
            </div>
            <ErrorMessage touched={touched} errors={errors} field={field} />
        </div>
    );
};

export default Decimal;
