import React, { ChangeEvent, useState } from 'react';
function Accuracy({
    field,
    isDisabled,
    form,
    value,
}: {
    field?: any;
    isDisabled?: any;
    form?: any;
    value?: any;
}): React.JSX.Element {
    const [quantity, setQuantity] = useState<any>(
        Number(field?.value) ? Number(field?.value) : value
    );
    const incrementQuantity = (): void => {
        if (
            (field?.name === 'durationMinutes' && quantity < 60) ||
            (field?.name === 'durationSeconds' && quantity < 60) ||
            (field?.name === 'latencyMinutes' && quantity < 60) ||
            (field?.name === 'latencySeconds' && quantity < 60) ||
            (field?.name === 'rateHour' && quantity < 60) ||
            (field?.name === 'rateMinutes' && quantity < 60) ||
            (field?.name === 'rateSeconds' && quantity < 60) ||
            field?.name === 'accuracyTerm' ||
            field?.name === 'timeSamplingInterval' ||
            field?.name === 'maximumTrails' ||
            field?.name === 'minimumTrails' ||
            field?.name === 'timeSamplingSeconds' ||
            field?.name === 'timeSamplingMinutes' ||
            field?.name === 'timeSamplingIntervals'
        ) {
            setQuantity(Number(quantity) + 1);
            form.setFieldValue(field?.name, Number(quantity) + 1);
        }
    };
    const decrementQuantity = (): void => {
        if (
            field?.name === 'accuracyTerm' ||
            field?.name === 'timeSamplingInterval'
        ) {
            if (Number(quantity > 1)) {
                setQuantity(Number(quantity) - 1);
                form.setFieldValue(field?.name, Number(quantity) - 1);
            }
        } else if (quantity > 0) {
            setQuantity(Number(quantity) - 1);
            form.setFieldValue(field?.name, Number(quantity) - 1);
        }
    };
    const setValue = (): any => {
        if (
            field?.name === 'accuracyTerm' ||
            field?.name === 'timeSamplingInterval'
        ) {
            return quantity;
        } else {
            return quantity < 10 ? `0${quantity}` : quantity;
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputValue = parseInt(e.target.value, 10);
        const numberRegex = /^\d+$/;
        const handleGeneralCase = (): void => {
            if (numberRegex.test(e.target.value)) {
                if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 99) {
                    setQuantity(Number(e.target.value));
                    form.setFieldValue(field?.name, Number(e.target.value));
                } else if (e.target.value === '') {
                    setQuantity('');
                    form.setFieldValue(field?.name, '');
                }
            } else {
                setQuantity('');
                form.setFieldValue(field?.name, '');
            }
        };
        if (
            field?.name === 'accuracyTerm' ||
            field?.name === 'timeSamplingInterval'
        ) {
            if (!isNaN(inputValue) && inputValue >= 0) {
                setQuantity(inputValue);
                form.setFieldValue(field?.name, inputValue);
            } else if (e.target.value === '') {
                setQuantity('');
                form.setFieldValue(field?.name, '');
            }
        } else {
            handleGeneralCase();
        }
    };
    return (
        <div
            className="flex items-center "
            // data-testid="master-criteria-accuracy"
        >
            <button
                type="button"
                id="decrement-button"
                onClick={decrementQuantity}
                data-testid="master-criteria-accuracy-dec"
                disabled={isDisabled ? true : false}
                data-input-counter-decrement="quantity-input"
                className={`bg-[#F9F9F9] shadow-md hover:bg-gray-200 border border-gray-300 rounded-s-lg px-4 py-3 focus:ring-gray-100 focus:ring-2 focus:outline-none`}
            >
                <svg
                    className="w-2 h-2 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                    />
                </svg>
            </button>
            <input
                type="text"
                id="quantity-input"
                data-input-counter
                value={setValue()}
                disabled={isDisabled ? true : false}
                onChange={handleChange}
                data-testid="master-criteria-accuracy-handleChange"
                autoComplete="off"
                aria-describedby="helper-text-explanation"
                className={`bg-white shadow-md   border-x-0 border-y-[1px] border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[4rem] py-1.5 px-3`}
                required
            />
            <button
                type="button"
                id="increment-button"
                disabled={isDisabled ? true : false}
                onClick={incrementQuantity}
                data-testid="master-criteria-accuracy-inc"
                data-input-counter-increment="quantity-input"
                className={`bg-[#F9F9F9]  shadow-md hover:bg-gray-200 border border-gray-300 rounded-e-lg px-4 py-3  focus:ring-gray-100 focus:ring-2 focus:outline-none`}
            >
                <svg
                    className="w-2 h-2 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                    />
                </svg>
            </button>
            {(field?.name === 'accuracyTerm' ||
                field?.name === 'timeSamplingInterval') && (
                <div className="ml-2">%</div>
            )}
        </div>
    );
}
export default Accuracy;
