import * as React from 'react';

export default function ErrorIcon({
    touched,
    errors,
    field,
    select,
}: {
    select?: boolean;
    touched: any;
    errors: any;
    field: any;
}): React.JSX.Element {
    return (
        <>
            {touched[field.name] && errors[field.name] && (
                <div
                    className={`absolute inset-y-0 end-0 flex items-center pointer-events-none  pe-3 text-red-600 ${select ? '-rotate-90 mb-5 mr-2' : ''} `}
                >
                    <svg
                        className="h-5 w-5 text-red-600"
                        width="16"
                        height="16"
                        fill="red"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                    </svg>
                </div>
            )}
        </>
    );
}
