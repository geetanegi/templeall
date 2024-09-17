import React from 'react';

export default function Accordion({
    addRole,
    children,
    open,
    handleToggle,
    title,
    headerClassName,
    labelClass,
    fromLibrary,
}: {
    addRole: any;
    title: any;
    children: any;
    open: boolean;
    headerClassName?: string;
    handleToggle: any;
    labelClass?: string;
    fromLibrary?: any;
}): React.JSX.Element {
    return (
        <div className="hs-accordion-group m-1 rounded-sm">
            <div
                className="hs-accordion active"
                id="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
                <button
                    className={`px-6 ${open ? (fromLibrary || addRole ? '' : 'bg-[#47AAC9]') : 'bg-[#D9D9D9]'} py-1 rounded-sm w-full flex justify-between items-center ${headerClassName}`}
                    aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    onClick={handleToggle}
                    type="button"
                >
                    <label
                        className={`flex-none  font-sm text-sm ${open ? (addRole ? '' : 'text-white') : 'text-black'} capitalize w-[95%] ${labelClass}`}
                    >
                        {title}
                    </label>
                    <svg
                        className={`${open ? 'hidden' : 'block'} size-6`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                    <svg
                        className={`${open ? 'block' : 'hidden'} size-6`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m18 15-6-6-6 6" />
                    </svg>
                </button>
                <div
                    id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    className={`${open ? 'h-full' : 'hidden'} hs-accordion-content w-full overflow-y-scroll transition-[height] duration-300`}
                    aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
