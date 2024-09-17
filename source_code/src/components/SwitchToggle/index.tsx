import React, { useState } from 'react';
import { updateElement } from '../../redux/slice/template/templateSlice';
import { useDispatch } from 'react-redux';
export default function SwitchToggle({
    isAttainment,
}: {
    isAttainment: any;
}): React.JSX.Element {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(
        isAttainment?.attainmentScale || false
    );
    const removeFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.blur();
    };
    const handleToggleChange = (): void => {
        setIsChecked(!isChecked);
        dispatch(
            updateElement({
                id: isAttainment?.id,
                data: { attainmentScale: !isChecked },
            })
        );
    };
    return (
        <div className="relative" data-testid="switch-toggle">
            <input
                type="checkbox"
                className="toggle-checkbox relative block appearance-none peer  w-[4.5rem] h-9 p-px
                bg-[#E5EFFB] border-0 text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200
                disabled:opacity-50 disabled:pointer-events-none
               checked:bg-none checked:text-none checked:border-theme-lightBlue1 focus:checked:border-theme-lightBlue1
before:inline-block before:w-[2.2rem] before:h-[2.2rem] before:bg-white shadow-md checked:before:bg-white checked:bg-theme-lightBlue1
before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0
before:transition before:ease-in-out before:duration-200"
                checked={isChecked}
                onChange={handleToggleChange}
                onFocus={removeFocus}
                data-testid="switch-toggle-field"
            />
            <label htmlFor="hs-default-switch-with-icons" className="sr-only">
                switch
            </label>
            <span className="peer-checked:text-white text-white w-[2.2rem] h-[2.2rem] absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
                <label className="text-[0.8rem] justify-center">On</label>
            </span>
            <span className="peer-checked:text-white text-gray-500 w-[2.2rem] h-[2.2rem] absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
                <label className="text-[0.8rem] justify-center">Off</label>
            </span>
        </div>
    );
}
