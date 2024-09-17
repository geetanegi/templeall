import React, { useState, useEffect } from 'react';

interface TherapyOption {
    label: string;
    value: string;
}

interface TherapySelectorProps {
    setFilterCard: (selectedOptions: string[]) => void;
    therapyOptions: TherapyOption[];
}

const TherapySelector: React.FC<TherapySelectorProps> = ({
    setFilterCard,
    therapyOptions,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    // Set default selected options when component mounts
    useEffect(() => {
        const defaultSelectedOptions = therapyOptions.map(
            (option) => option.value
        );
        setSelectedOptions(defaultSelectedOptions);
        setFilterCard(defaultSelectedOptions);
    }, []); // This useEffect runs only once, when the component mounts

    const handleCheckboxChange = (value: string): void => {
        setSelectedOptions((prevSelected) => {
            const newSelected = prevSelected.includes(value)
                ? prevSelected.filter((v) => v !== value) // Uncheck option
                : [...prevSelected, value]; // Check option

            setFilterCard(newSelected);
            return newSelected;
        });
    };

    return (
        <div
            className="flex items-center space-x-4 border border-gray-300 rounded-lg p-4"
            data-testid="intake-therapy"
        >
            {therapyOptions.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center space-x-2"
                >
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        className="focus:ring-[#48ABCA] text-[#48ABCA]"
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
};

export default TherapySelector;
