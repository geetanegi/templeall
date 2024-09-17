import React from 'react';

export default function Checkbox({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: any;
}): React.JSX.Element {
    return (
        <div className="flex">
            <input
                type="checkbox"
                className="mr-5 shrink-0 mt-0.5 border-gray-200 rounded text-primary-600 focus:ring-primary-400 disabled:opacity-50 disabled:pointer-events-none  checked:bg-primary-600"
                id="checkbox"
                onChange={onChange}
                checked={checked}
            />
        </div>
    );
}
