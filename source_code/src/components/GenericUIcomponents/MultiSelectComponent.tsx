import React, { useState, useEffect, useRef } from 'react';
import { Checkbox, IconButton } from '@mui/material';
// import { ExpandMore, ExpandLess } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


interface MultiSelectDropdownProps {
    options: Array<any>;
    labelKey: string;
    valueKey: string;
    selectedValues: any;
    label: string;
    disabled: boolean;
    onChange: (selected: any) => void;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    options = [],
    labelKey,
    valueKey,
    selectedValues,
    label,
    onChange,
    disabled,
}) => {
    const [selected, setSelected] = useState<any>(selectedValues);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false); // Track if "Select All" is selected
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOption = (option: any) => {
        const isSelected = selected.some(
            (item: any) => item[valueKey] === option[valueKey]
        );

        let newSelected;
        if (isSelected) {
            newSelected = selected.filter(
                (item: any) => item[valueKey] !== option[valueKey]
            );
        } else {
            newSelected = [...selected, option];
        }

        setSelected(newSelected);
        onChange(newSelected);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            // Deselect all
            setSelected([]);
            onChange([]);
        } else {
            // Select all
            setSelected(options);
            onChange(options);
        }
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (option: any) => {
        toggleOption(option);
    };

    useEffect(() => {
        setSelected(selectedValues); // Sync selected state with prop
    }, [selectedValues]);

    useEffect(() => {
        // Update "Select All" state based on the selected values
        if (selected.length === options.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selected, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const hasValue = selected.length > 0;

    return (
        <div className="multi-select-dropdown" style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
            <div
                className="dropdown-container"
                style={{
                    position: 'relative',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    height: '48px',
                    padding: '8px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: '#FAFAFA',
                    transition: 'box-shadow 0.3s ease',
                }}
                onClick={() => {
                    if (!disabled) {
                        setDropdownOpen(!dropdownOpen);
                    }
                }}
            >
                <label
                    style={{
                        position: 'absolute',
                        top: hasValue || dropdownOpen ? '-8px' : '30%',
                        left: '11px',
                        fontSize: hasValue || dropdownOpen ? '11px' : '14px',
                        color: hasValue || dropdownOpen ? '#1976d2' : 'gray',
                        background: hasValue || dropdownOpen ? '#FAFAFA' : 'transparent',
                        transition: 'all 0.2s ease',
                        pointerEvents: 'none',
                    }}
                >
                    {label}
                </label>

                {/* Selected Items */}
                <div className="pl-2" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selected.length > 0
                        ? selected.map((item: any) => item[labelKey]).join(', ')
                        : ''}
                </div>

                <IconButton size="small" disabled={disabled}>
                    {dropdownOpen ? <ArrowDropUpIcon />: <ArrowDropDownIcon /> }
                </IconButton>
            </div>

            {dropdownOpen && (
                <div
                    className="dropdown-menu w-full"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: '#fff',
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        transform: 'translateY(5px)',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                >
                    {/* "Select All" Option */}
                    <div
                        onClick={handleSelectAll}
                        style={{
                            padding: '8px',
                            cursor: 'pointer',
                            background: selectAll ? '#e6f7ff' : 'transparent',
                            transition: 'background 0.3s ease',
                        }}
                        className="w-full flex items-center"
                    >
                        <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAll}
                            disabled={disabled}
                            style={{ marginRight: '10px' }}
                        />
                        {'Select All'}
                    </div>

                    {/* Dropdown Options */}
                    {options.map((option) => {
                        const isSelected = selected.some(
                            (item: any) => item[valueKey] === option[valueKey]
                        );
                        return (
                            <div
                                key={String(option[valueKey])}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    background: isSelected ? '#e6f7ff' : 'transparent',
                                    transition: 'background 0.3s ease',
                                }}
                                onClick={() => handleCheckboxChange(option)}
                                className="w-full flex items-center"
                            >
                                <Checkbox
                                    checked={isSelected}
                                    onChange={() => handleCheckboxChange(option)}
                                    disabled={disabled}
                                    style={{ marginRight: '10px' }}
                                />
                                {option[labelKey]}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
