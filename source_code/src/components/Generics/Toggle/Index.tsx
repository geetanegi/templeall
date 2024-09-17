import React from 'react';
interface ToggleSwitchProps {
    enabled: boolean;
    onToggle: () => any;
    enabledColor?: string;
    disabledColor?: string;
    circleColor?: string;
    checkIconColor?: string;
    crossIconColor?: string;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    enabled,
    onToggle,
    enabledColor = 'bg-gray-600',
    disabledColor = 'bg-gray-400',
    circleColor = 'bg-gray-200',
    checkIconColor = 'text-green-600',
    crossIconColor = 'text-red-600',
}) => {
    return (
        <div
            className="flex items-center justify-center bg-gray-100 ml-3"
            data-testid="toggle-index"
        >
            <label
                htmlFor="custom-toggle"
                className="flex items-center cursor-pointer"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id="custom-toggle"
                        className="sr-only"
                        checked={enabled}
                        onChange={onToggle}
                        data-testid="input-on-change"
                    />
                    <div
                        className={`block w-10 h-5 rounded-full transition-colors ${
                            enabled ? enabledColor : disabledColor
                        }`}
                    ></div>
                    <div
                        className={`absolute top-[-1px] left-0 flex items-center justify-center w-6 h-6 rounded-full ${circleColor} border-2 transition-transform ${
                            enabled ? 'transform translate-x-full' : ''
                        }`}
                        style={{ border: '1px solid #ccc' }}
                    >
                        {enabled ? (
                            <svg
                                className={`w-3 h-3 ${checkIconColor}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                className={`w-3 h-3 ${crossIconColor}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        )}
                    </div>
                </div>
            </label>
        </div>
    );
};
export default ToggleSwitch;
