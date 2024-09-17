import { Field, useFormikContext } from 'formik';
import React, { useRef } from 'react';
import Input from '../Generics/Inputs/Input';
import { useSelector, useDispatch } from 'react-redux';
import { savingParticipants } from '../../redux/slice/SchedulingRedux/Scheduling';
export default function AdditionalParticipant(): React.JSX.Element {
    const {
        values,
        // handleChange,
        setFieldValue,
        // handleBlur,
        // handleSubmit,
        // submitForm,
        // setFieldTouched,
    }: {
        values: any;
        handleChange: any;
        handleBlur: any;
        handleSubmit: any;
        submitForm: any;
        setFieldTouched: any;
        setFieldValue: any;
    } = useFormikContext();
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch = useDispatch<any>();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [emailAddresses, setEmailAddresses] = React.useState<any>([]);
    const providerList = useSelector(
        (state: any) => state.scheduling.getPrimaryProvider
    );
    const [, setInputValue] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const mapData = providerList?.map((item: any) => item.username);
    const [filteredOptions, setFilteredOptions] = React.useState([]);
    const handleOptionClick = (option: any): void => {
        setEmailAddresses([...emailAddresses, option]);
        dispatch(savingParticipants(option));
        setInputValue('');
        setIsOpen(false);
    };
    const handleKeyPress = async (e: any): Promise<any> => {
        const filteredData = mapData.filter((username: string) =>
            username.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setIsError(false);
        setFilteredOptions(filteredData);
        setInputValue(e.target.value);
        if (e.key == 'Enter') {
            if (e.target.value?.length !== 0) {
                const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailRegex.test(e.target.value)) {
                    setEmailAddresses((prev: any) => {
                        return [...prev, e.target.value];
                    });
                    dispatch(savingParticipants(e.target.value));
                    setFieldValue('additionalParticipant', '');
                    setIsError(false);
                } else {
                    setIsError(true);
                }
            }
        }
    };
    React.useEffect(() => {
        setFilteredOptions(mapData);
    }, [providerList]);
    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): any => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <>
            <div className="right mt-8">
                <p className="text-sm font-medium">Additional Participants</p>
                <Field
                    autoComplete="off"
                    id="additionalParticipant"
                    name="additionalParticipant"
                    className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0  pb-1 outline-none "
                    component={Input}
                    value={values.additionalParticipant}
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={(e: any) => {
                        handleKeyPress(e);
                    }}
                    data-testid="additional-participant-feild"
                    placeholder="Type here"
                />
                {isError && (
                    <p className="flex text-xs text-red-600">
                        Please provide vaild mail address
                    </p>
                )}
                {isOpen && filteredOptions.length > 0 && (
                    <div
                        ref={dropdownRef}
                        className="absolute bg-white border border-gray-300 rounded-sm mt-1 w-64 cursor-pointer p-2 h-[40rem] overflow-y-scroll"
                    >
                        {filteredOptions.map((option: any, index: any) => (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="mt-2 text-gray-700 hover:bg-primary-600 hover:text-white"
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex flex-col">
                    {emailAddresses.map((email: any, index: any) => (
                        <span
                            key={index}
                            className={`mt-${index === 0 ? '4' : '0'} text-theme-lightBlue1`}
                        >
                            {email}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
