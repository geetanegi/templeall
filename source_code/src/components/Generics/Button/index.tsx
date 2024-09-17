import React from 'react';

const buttonTypes: any = {
    primary:
        'py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-md border border-transparent bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none',
    secondary:
        'px-4 inline-flex items-center gap-x-2 text-sm rounded-md border border-transparent text-secondary-700 hover:text-secondary-400 disabled:opacity-50 disabled:pointer-events-none',
};

export default function Button({
    children,
    type = 'primary',
    className,
    onClick,
    disabled,
    loading,
    ...props
}: {
    children?: any;
    className?: string;
    type?: string;
    onClick?: any;
    disabled?: boolean;
    loading?: boolean;
    props?: any;
}): React.JSX.Element {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`${buttonTypes[type]} ${className}`}
            {...props}
        >
            <span className="flex items-center justify-center flex-1">
                {loading ? (
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                ) : null}
                {children}
            </span>
        </button>
    );
}
