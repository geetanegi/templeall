import * as React from 'react';
import AddMore from '../../assets/img/addMore.svg';
import Delete from '../../assets/img/delete.svg';
import { deleteOption } from '../../redux/slice/template/templateSlice';
import { useDispatch } from 'react-redux';

export default function DropDown({
    id,
    className,
    options,
    handleEnterKeyPress,
    activeEl,
}: {
    id: any;
    className: any;
    options: any;
    handleEnterKeyPress: any;
    activeEl: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [inputCount, setInputCount] = React.useState(0);
    const [optionsValue, setOptionsValue] = React.useState(options);

    const handleAddMoreClick = (): void => {
        setInputCount((prevCount) => prevCount + 1);
    };
    const handleOptionsValue = (e: any, index: number): void => {
        setOptionsValue((prev: any) => {
            const newOptionsValue = [...prev];
            newOptionsValue[index] = e.target.value;
            return newOptionsValue;
        });
    };
    const deleteIcon = (index: number): void => {
        const updatedOptionsValue = [
            ...optionsValue.slice(0, index),
            ...optionsValue.slice(index + 1),
        ];
        setOptionsValue(updatedOptionsValue);
        setInputCount((prevCount) => prevCount - 1);
        dispatch(deleteOption({ updatedOptionsValue, activeEl }));
    };
    React.useEffect(() => {
        setOptionsValue(options);
        setInputCount(options?.length);
    }, [options]);

    return (
        <div>
            <div className="relative ">
                {[...Array(inputCount)].map((_, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex items-center">
                            <input
                                autoComplete="off"
                                type="text"
                                onKeyDown={(e) =>
                                    handleEnterKeyPress(e, optionsValue)
                                }
                                value={optionsValue[index]}
                                onChange={(e) => handleOptionsValue(e, index)}
                                className={`py-3 px-4 block w-80% border border-gray-200 rounded-lg text-sm focus:border-primary-600 focus:ring-primary-600 disabled:opacity-50 disabled:pointer-events-none ${className}`}
                                required
                                aria-describedby={`${id}-error`}
                            />
                            <img
                                src={Delete}
                                alt="Delete Icon"
                                onClick={() => deleteIcon(index)}
                                className="cursor-pointer ml-2"
                            />
                        </div>
                        <div className="mt-2 font-normal text-xs text-gray-600">
                            Press enter to save
                        </div>
                    </div>
                ))}

                <img
                    src={AddMore}
                    alt="Add More"
                    onClick={handleAddMoreClick}
                    className="cursor-pointer"
                ></img>
            </div>
        </div>
    );
}
