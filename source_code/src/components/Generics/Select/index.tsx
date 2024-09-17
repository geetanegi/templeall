import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { useClickAway } from '@uidotdev/usehooks';
export default function Select({
    isRequired,
    label,
    options,
    className,
    onChange,
    value,
    name,
    showSearch,
    multi,
    placeholder,
    isDisabled,
    inputClassName,
    icon,
    iconSrc,
    hideLabel,
    NotShowValue,
    dropdownClass,
    ...props
}: {
    isRequired?: boolean;
    label?: string;
    options: Array<any | string>;
    className?: string;
    onChange: any;
    value: Array<any | string>;
    name?: string;
    showSearch?: boolean;
    multi?: boolean;
    placeholder?: string;
    isDisabled?: boolean;
    inputClassName?: string;
    icon?: any;
    iconSrc?: any;
    props?: any;
    hideLabel?: boolean;
    NotShowValue?: boolean;
    dropdownClass?: string;
}): React.JSX.Element {
    const [searchString, setSearchString] = React.useState('');
    const [showMenu, setShowMenu] = React.useState(false);
    const [values, setValues] = React.useState<Array<string>>(value);
    const ref = useClickAway<HTMLDivElement>(() => {
        setShowMenu(false);
        setSearchString('');
    });
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchString(e.target.value);
    };
    const handleCheckChange = (e: any): void => {
        if (e.target.checked) {
            if (e.target.value === 'Show All') {
                setValues([e.target.value]);
            } else {
                setValues((prev: any) => [
                    ...prev.filter((item: string) => item !== 'Show All'),
                    e.target.value,
                ]);
            }
        } else {
            setValues((prev: any) =>
                prev.filter((item: string) => item !== e.target.value)
            );
        }
    };
    const handleSelect = (valueString: any): void => {
        setValues([valueString]);
        setShowMenu(false);
        setSearchString('');
        if (NotShowValue) {
            setTimeout(() => {
                setValues([]);
            }, 1000);
        }
    };
    const getOptions = (): Array<any | string> => {
        let filteredOptions = [...options];
        if (searchString) {
            filteredOptions = options.filter((item: any | string) =>
                item?.label?.toLowerCase().includes(searchString.toLowerCase())
            );
        }
        const result = [...filteredOptions];
        return result;
    };
    React.useEffect(() => {
        if (JSON.stringify(value) !== JSON.stringify(values)) {
            setValues(value ? (Array.isArray(value) ? value : [value]) : []);
        }
    }, [value]);
    React.useEffect(() => {
        onChange(values);
    }, [values]);
    const getPlaceholder = (): any => {
        if (!showSearch) {
            if (values?.length) {
                return multi
                    ? `${values.length} selected`
                    : (options?.find(
                          (option: any) => option.value === values[0]
                      )?.label ?? '');
            } else return `Select ${label ? label : ''}`;
        }
        if (showMenu) {
            return '';
        } else if (Array.isArray(values) && values.indexOf('Show All') !== -1) {
            return 'Show All';
        } else if (values?.length) {
            return multi
                ? `${values.length} selected`
                : (options?.find((option: any) => option.value === values[0])
                      ?.label ?? '');
        } else return placeholder;
    };
    const handleClearAll = (): void => {
        setValues([]);
    };
    return (
        <div ref={ref} className={className}>
            {!hideLabel && (
                <label
                    htmlFor={name}
                    className="flex items-center  mb-1  relative text-base font-bold text-zinc-700 font-[lato] "
                >
                    {icon ? (
                        <img
                            className="w-3 mr-2"
                            src={iconSrc}
                            alt="CreatedFor"
                        />
                    ) : null}
                    <span>{label}</span>
                    {isRequired ? <span className="text-red-600">*</span> : ''}
                </label>
            )}
            <div className="relative">
                {showSearch ? (
                    <>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="default-search"
                            className={`py-2.5 px-4 pe-4   block bg-white border border-gray-200 rounded-[4px] text-sm placeholder:text-primary text-primary hover:border-gray-300 focus:border-gray-300 focus:ring-gray-300 disabled:opacity-50 disabled:pointer-events-none focus-visible:border-gray-300 focus-visible:ring-gray-300 w-full ${inputClassName} ps-10`}
                            placeholder={getPlaceholder()}
                            onChange={handleSearch}
                            value={searchString}
                            autoComplete="off"
                            onClick={() => setShowMenu(true)}
                            name={name}
                            disabled={isDisabled}
                            {...props}
                        />
                    </>
                ) : (
                    <input
                        type="text"
                        id="default-search"
                        readOnly
                        className={`py-2.5 px-4 pe-4   block bg-white border border-gray-200 rounded-[4px] text-sm placeholder:text-primary text-primary hover:border-gray-300 focus:border-gray-300 focus:ring-gray-300 disabled:opacity-50 disabled:pointer-events-none focus-visible:border-gray-300 focus-visible:ring-gray-300 w-full ${inputClassName} ps-10`}
                        placeholder={getPlaceholder()}
                        onClick={() => setShowMenu(true)}
                        name={name}
                        autoComplete="off"
                        disabled={isDisabled}
                        {...props}
                    />
                )}
                <button
                    onClick={(e: any) => {
                        e.preventDefault();
                        setShowMenu(!showMenu);
                    }}
                    disabled={isDisabled}
                    className="text-gray-400 absolute end-2.5 bottom-1.5 font-medium rounded-lg text-xs hover:text-gray-600 disabled:pointer-events-none"
                >
                    <ChevronDown />
                </button>
                {showMenu ? (
                    <div
                        className={`${dropdownClass ? 'max-h-20' : 'max-h-64'} absolute top-11 text-sm font-light w-full rounded p-2 bg-white border border-gray-200 z-10   overflow-y-scroll`}
                    >
                        {multi ? (
                            <>
                                <a
                                    className="text-xs text-primary underline font-semibold cursor-pointer hover:text-primary-600"
                                    onClick={handleClearAll}
                                >
                                    Clear All
                                </a>
                                <br />
                                <span className="inline-block font-semibold mt-2">
                                    Selected{' '}
                                    {`${label || placeholder ? label || placeholder : ''}`}
                                </span>
                                <ul>
                                    {values.map((optionItem: any | string) => {
                                        return (
                                            <li
                                                key={`selected-${optionItem?.value || optionItem}`}
                                                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                onClick={() =>
                                                    handleCheckChange({
                                                        target: {
                                                            value:
                                                                optionItem?.value ||
                                                                optionItem,
                                                            checked:
                                                                values.indexOf(
                                                                    optionItem?.value ||
                                                                        optionItem
                                                                ) === -1,
                                                        },
                                                    })
                                                }
                                            >
                                                <input
                                                    type="checkbox"
                                                    data-testid="checkbox-input"
                                                    checked={
                                                        values.indexOf(
                                                            optionItem?.value ||
                                                                optionItem
                                                        ) !== -1
                                                    }
                                                    value={
                                                        optionItem?.value ||
                                                        optionItem
                                                    }
                                                    className="shrink-0 mt-0.5 border-gray-200 rounded text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none mr-2"
                                                />
                                                <span className="mt-0.5">
                                                    {optionItem?.label ||
                                                        optionItem}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <hr className="mt-2" />
                            </>
                        ) : null}
                        <span className="inline-block font-semibold mt-2">
                            {`${label}`}
                        </span>
                        <ul>
                            {getOptions()?.map((optionItem: any | string) => {
                                return (
                                    <li
                                        data-testid="select-option-item"
                                        tabIndex={0}
                                        key={optionItem?.value}
                                        className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                        onClick={() =>
                                            multi
                                                ? handleCheckChange({
                                                      target: {
                                                          value:
                                                              optionItem?.value ||
                                                              optionItem,
                                                          checked:
                                                              values.indexOf(
                                                                  optionItem?.value ||
                                                                      optionItem
                                                              ) === -1,
                                                      },
                                                  })
                                                : handleSelect(
                                                      optionItem?.value
                                                  )
                                        }
                                    >
                                        {multi ? (
                                            <input
                                                type="checkbox"
                                                checked={
                                                    values.indexOf(
                                                        optionItem?.value ||
                                                            optionItem
                                                    ) !== -1
                                                }
                                                value={
                                                    optionItem?.value ||
                                                    optionItem
                                                }
                                                className="shrink-0 mt-0.5 border-gray-200 rounded text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none mr-2"
                                            />
                                        ) : null}
                                        <span className="mt-0.5">
                                            {optionItem?.label || optionItem}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
