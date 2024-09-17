import * as React from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import Graphs from '../GraphMenu/GraphComponent';
import { Field, FieldProps, Formik } from 'formik';
import SelectComponent from '../Generics/Inputs/Select';
import { useSelector, useDispatch } from 'react-redux';
import changeStatus from '../../api/services/changeStatus.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getProgramsByDomainIdCall } from '../../redux/slice/GetProgramsByDomainId/getProgramsByDomainId';
export default function ProgramGraphMenu(): React.JSX.Element {
    const [selectedTab, setSelectedTab] = React.useState<number>(1);
    const dispatch = useDispatch<any>();
    const params = useParams();
    const ref = React.useRef<any>(null);
    const [dateValue, setDateValue] = React.useState<DateValueType>({
        startDate: null,
        endDate: null,
    });
    const [options, setOptions] = React.useState({
        phase: [],
    });
    const activeTab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const Menu: Array<string> = ['Targets'];
    const updateIndicator = (): void => {
        const tab = document.getElementById(`tab-${selectedTab}`);
        const indicator = document.querySelector('.indicator') as HTMLElement;
        if (tab && indicator) {
            indicator.style.width = `${tab.getBoundingClientRect().width}px`;
            indicator.style.left = `${
                tab.getBoundingClientRect().left -
                (tab.parentElement?.getBoundingClientRect().left || 0)
            }px`;
        }
    };
    const phaseData = useSelector(
        ({ savePhaseForProgram }: any) => savePhaseForProgram?.value?.data
    );
    const ProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram?.programData
    );
    const viewMode = useSelector(
        ({ ViewOnly }: any) => ViewOnly?.viewOnlyValue
    );
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const handleValueChange = (newValue: any): void => {
        setDateValue(newValue);
    };
    React.useEffect((): (() => void) => {
        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return (): void => {
            window.removeEventListener('resize', updateIndicator);
        };
    }, [selectedTab]);
    const handleTabClick = (tabIndex: number): void => {
        setSelectedTab(tabIndex);
    };
    const initialValues: any = {
        phase: '',
    };
    const handleSubmitForm = async (name: any): Promise<void> => {
        const data = {
            id: ProgramData?.id,
            type: 'program',
            status: name?.value,
        };
        const res = await changeStatus.changeStatus(data);
        if (!res?.data?.error) {
            const data1: any = {
                domainId: params?.domainId,
                phase: activeTab,
                isTargetPinned: pinnedData?.addQuickLook,
                quickLookId: pinnedData?.clickedQuickLook,
            };
            dispatch(getProgramsByDomainIdCall(data1));
            dispatch(
                openNotification({
                    success: true,
                    title: 'Phase Changed successfully.',
                    description: '',
                })
            );
        }
    };
    const updateOptions = React.useCallback(
        (key: any): void => {
            const optionsData = phaseData?.map((item: any) => ({
                value: item?.name,
                label: item?.name,
            }));
            setOptions((prev: any) => ({
                ...prev,
                [key]: optionsData,
            }));
        },
        [phaseData]
    );
    React.useEffect(() => {
        if (ref.current && ProgramData?.programStatus?.length) {
            ref?.current?.setFieldValue('phase', {
                label: ProgramData?.programStatus,
                value: ProgramData?.programStatus,
            });
        } else {
            ref?.current?.setFieldValue('phase', {
                label: 'select',
                value: 'select',
            });
        }
    }, [ProgramData?.programStatus]);
    React.useEffect(() => {
        if (phaseData?.length) {
            updateOptions('phase');
        }
    }, [phaseData, updateOptions]);
    React.useEffect(() => {
        if (ProgramData?.startDate) {
            setDateValue({
                startDate: ProgramData?.startDate,
                endDate: new Date(
                    moment(ProgramData?.startDate, 'YYYY-MM-DD')
                        .add(7, 'days')
                        .format('YYYY-MM-DD')
                ),
            });
        } else {
            setDateValue({
                startDate: null,
                endDate: null,
            });
        }
    }, [ProgramData]);
    return (
        <div className="mt-5 bg-[#FAFBFF] rounded-md w-full h-[80vh] py-6">
            <div className="flex justify-between px-6 items-center">
                <div className="flex sm:w-full pb-[0.5rem] justify-between rounded-md bg-gradient-to-r from-[#48ABCA] from-0% to-transparent mr-40">
                    <div
                        role="tablist"
                        aria-label="tabs"
                        className="w-[6rem]  relative h-9 grid items-center pl-0 pr-2 rounded-full bg-[#E5EFFB] overflow-hidden tab-list ml-4 mt-[0.5rem] shadow-lg"
                    >
                        {Menu.map((tabName, index) => (
                            <button
                                key={`tab-${index + 1}`}
                                role="tab"
                                aria-selected={selectedTab === index + 1}
                                aria-controls={`panel-${index + 1}`}
                                id={`tab-${index + 1}`}
                                tabIndex={selectedTab === index + 1 ? 0 : -1}
                                className={`relative flex-1 tab rounded-full items-center justify-center h-9 px-6 cursor-pointer ${selectedTab === index + 1 ? 'bg-white text-gray-800' : 'bg-[#E5EFFB] relative z-10 text-gray-800'}`}
                                onClick={() => handleTabClick(index + 1)}
                                data-testid={`program-graph-menu-tab-${index + 1}`}
                            >
                                <span className="text-gray-800 text-sm">
                                    {tabName}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex bg-[#FAFBFF] justify-between px-7 mt-2 py-4">
                    <div>
                        <Datepicker
                            toggleClassName="absolute bg-theme-lightBlue1 rounded-r-lg text-white
                    right-0 h-full px-3 text-gray-400 focus:outline-none
                     disabled:opacity-40 disabled:cursor-not-allowed"
                            placeholder="From Date - To Date"
                            value={dateValue}
                            onChange={handleValueChange}
                            popoverDirection="down"
                            inputClassName="py-[0.5rem] px-3 w-[17rem] border-2 border-[#E5E5E5]-800 rounded-md text-sm"
                        />
                    </div>
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                innerRef={ref}
                onSubmit={handleSubmitForm}
                validateOnChange
            >
                {(props: any) => {
                    const { handleSubmit, setFieldTouched, touched, errors } =
                        props;
                    return (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="flex">
                                    <div
                                        className={`px-2 w-52 ml-51 ${viewMode ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="phase"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <SelectComponent
                                                    isRequired={false}
                                                    isSearchable={false}
                                                    label={'Current Phase :'}
                                                    options={options?.phase}
                                                    form={{
                                                        touched,
                                                        errors,
                                                    }}
                                                    field={{
                                                        value: field.value,
                                                        name: field.name,
                                                        onChange: (value) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                value
                                                            );
                                                            handleSubmitForm(
                                                                value
                                                            );
                                                        },
                                                    }}
                                                    handleBlur={setFieldTouched}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>
                            </form>
                        </>
                    );
                }}
            </Formik>
            <div className="mt-4 px-14">
                <Graphs
                    itemType={selectedTab === 1 ? 'target' : 'program'}
                    id={params?.programId || ''}
                    fromDate={dateValue?.startDate || ''}
                    toDate={dateValue?.endDate || ''}
                    idType={'program'}
                />
            </div>
        </div>
    );
}
