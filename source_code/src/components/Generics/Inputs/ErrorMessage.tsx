import * as React from 'react';

export default function ErrorMessage({
    touched,
    errors,
    field,
    isExtracted,
}: {
    touched: any;
    errors: any;
    field: any;
    isExtracted?: string;
}): React.JSX.Element {
    const [extractError, setExtractError] = React.useState('');
    React.useEffect(() => {
        if (isExtracted && isExtracted?.length && errors) {
            const [errorObj, index, key] = isExtracted.split('.');

            if (errors[errorObj]?.length && errors[errorObj][index])
                setExtractError(errors[errorObj][Number(index)][key]);
            else setExtractError('');
        }
    }, [isExtracted, errors]);
    return (
        <>
            {isExtracted && isExtracted?.length ? (
                <p
                    className="flex text-xs text-red-600 mt-2"
                    id={`${isExtracted}-error`}
                >
                    {extractError}
                </p>
            ) : (
                touched[field.name] &&
                errors[field.name] && (
                    <p
                        className="flex text-xs text-red-600 mt-2"
                        id={`${field.name}-error`}
                    >
                        {typeof errors[field.name] === 'object'
                            ? errors[field.name].label
                            : errors[field.name]}
                    </p>
                )
            )}
        </>
    );
}
