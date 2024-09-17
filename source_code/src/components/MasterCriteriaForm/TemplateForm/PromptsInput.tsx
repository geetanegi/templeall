import { Field } from 'formik';
import React from 'react';
import Input from '../../Generics/Inputs/Input';

function PromptsInput({
    badges,
    setBadges,
    handleOpenModal,
    phase,
    criteriaData,
    fromProgram,
}: {
    badges?: any;
    setBadges?: any;
    handleOpenModal?: any;
    phase?: any;
    criteriaData?: any;
    fromProgram?: any;
}): React.JSX.Element {
    const handleInputBadge = (e: any): any => {
        if (e.key == 'Enter') {
            e?.preventDefault();
            if (e.target.value?.length !== 0) {
                setBadges([...badges, e.target.value]);
                e.target.value = '';
            }
        }
    };

    return (
        <div
            className="relative promptInput flex space-x-1 items-center mb-2"
            data-testid="input-change"
        >
            {!fromProgram ? (
                <label className="text-sm font-medium">Prompts:</label>
            ) : null}
            {phase === 'Intervention' && (
                <span className="text-red-500 mr-1">*</span>
            )}

            <div className="w-full">
                <Field
                    id="promptsName"
                    name="promptsName"
                    disabled={criteriaData?.onViewCriteria ? true : false}
                    className="w-full border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-0 ps-0 pb-1 outline-none"
                    component={Input}
                    value={null}
                    onKeyDown={(e: any) => {
                        handleInputBadge(e);
                    }}
                    // data-testid="input-change"
                    placeholder="Type your prompt here"
                    autoComplete="off"
                />
            </div>
            <label
                onClick={handleOpenModal}
                className={`${criteriaData?.onViewCriteria ? 'pointer-events-none' : 'cursor-pointer  hover:underline'} text-sm text-theme-lightBlue1  absolute end-0 font-medium`}
            >
                Select Prompts
            </label>
        </div>
    );
}

export default PromptsInput;
