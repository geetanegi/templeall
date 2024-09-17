import * as React from 'react';
// import Input from '../Inputs/Input';
import TextArea from '../Generics/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateElement,
    updateOption,
} from '../../redux/slice/IntakeEditor/intakeEditor';
import DropDown from '../Dropdown';
import SwitchToggle from '../SwitchToggle/index';

export default function IntakeFormOption({
    activeEl,

    selectedTab,
    setSelectedTab,
    textAreaVal,
    setTextAreaVal,
    readOnly,
}: {
    activeEl: string;

    selectedTab: number;
    setSelectedTab: any;
    textAreaVal: any;
    setTextAreaVal: any;
    readOnly: any;
}): React.JSX.Element {
    const dispatch = useDispatch();

    const Menu: Array<string> = ['Mandatory', 'Optional'];
    const template = useSelector((state: any) => state.intakeEditor);

    const [isType, setIstype] = React.useState<any>(null);

    React.useEffect(() => {
        setIstype(template?.value?.filter(({ id }: any) => id == activeEl)[0]);
    }, [activeEl]);

    const handleTabClick = (tabIndex: number): void => {
        setSelectedTab(tabIndex);
        dispatch(
            updateElement({
                id: activeEl,
                data: {
                    validations: { required: tabIndex === 1 ? true : false },
                },
            })
        );
    };
    const handleChange = (event: any): void => {
        const { value } = event.target;
        setTextAreaVal(value);
        dispatch(
            updateElement({
                id: activeEl,
                data: {
                    instructions: value,
                },
            })
        );
    };

    // Event handler for Enter key press
    const handleEnterKeyPress = (event: any, optionData: any): void => {
        if (event.key === 'Enter') {
            const { value } = event.target;
            if (isType?.htmlType === 'select') {
                dispatch(
                    updateOption({
                        id: activeEl,
                        data: value,
                        optionData,
                    })
                );
            }
        }
    };

    return (
        <div
            className={`w-1/5 pt-12 overflow-y-scroll mb-1 ${readOnly ? 'pointer-events-none' : ''}`}
            data-testid="FormOption-conatiner"
        >
            {activeEl ? (
                <>
                    <div className="flex flex-col mx-8">
                        <h1 className="mb-2 font-normal text-12  text-gray-600">
                            Questions Type
                        </h1>
                        <div
                            role="tablist"
                            aria-label="tabs"
                            className="bg-[#E5EFFB] flex relative w-[12rem] h-11 grid-cols-2
                        items-center px-[3px] rounded-full  overflow-hidden tab-list shadow-md"
                        >
                            {Menu.map((tabName, index) => (
                                <button
                                    key={`tab-${index + 1}`}
                                    role="tab"
                                    aria-selected={selectedTab === index + 1}
                                    aria-controls={`panel-${index + 1}`}
                                    id={`tab-${index + 1}`}
                                    tabIndex={
                                        selectedTab === index + 1 ? 0 : -1
                                    }
                                    className={`relative flex-1 tab rounded-full items-center justify-center h-10  cursor-pointer ${selectedTab === index + 1 ? 'bg-white text-gray-800' : 'bg-[#E5EFFB] relative z-10 text-gray-800'}`}
                                    onClick={() => {
                                        handleTabClick(index + 1);
                                        // setMandatory(tabName);
                                    }}
                                >
                                    <span className="text-gray-800 text-sm">
                                        {tabName}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col ml-6 ">
                        <h1 className="pt-16 mb-2 font-normal text-12  text-gray-600">
                            Instructions
                        </h1>
                        <TextArea
                            field={{}}
                            name={'Instructions'}
                            id={'Instructions'}
                            className={'w-[16rem]'}
                            placeholder={'Instructions'}
                            isRequired={false}
                            form={{
                                touched: {},
                                errors: {},
                            }}
                            props={{}}
                            value={textAreaVal}
                            handleChange={handleChange}
                            hideLabel={undefined}
                            label={undefined}
                            rows={undefined}
                        />
                    </div>

                    {isType?.htmlType === 'select' && (
                        <div className="flex flex-col ml-6 ">
                            <h1 className="pt-16 mb-2 font-normal text-12  text-gray-600">
                                Options
                            </h1>

                            <DropDown
                                id={''}
                                className={''}
                                options={isType?.options}
                                handleEnterKeyPress={handleEnterKeyPress}
                                activeEl={activeEl}
                            />
                        </div>
                    )}
                    {isType?.name === 'shortTermGoal' && (
                        <div className="flex flex-row ml-6 pt-16 space-x-4">
                            <h1 className=" mb-2 font-normal text-12 mt-4  text-gray-600 justify-center">
                                View Attainment Scale
                            </h1>
                            <SwitchToggle isAttainment={isType} />
                        </div>
                    )}
                </>
            ) : null}
        </div>
    );
}
