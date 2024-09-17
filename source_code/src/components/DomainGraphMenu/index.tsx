import * as React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import Graphs from '../GraphMenu/GraphComponent';
import { useParams } from 'react-router-dom';

export default function DomainGraphMenu(): React.JSX.Element {
    const [selectedTab, setSelectedTab] = React.useState<number>(1);
    const params = useParams();
    const [value, setValue] = React.useState({
        startDate: null,
        endDate: null,
    });
    const Menu: Array<string> = ['Targets', 'Programs'];
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

    const handleValueChange = (newValue: any): void => {
        setValue(newValue);
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

    return (
        <div className="mt-5 bg-[#FAFBFF] rounded-md w-full h-[80vh] py-6">
            <div className="flex justify-between px-6 items-center">
                <div className="flex sm:w-full pb-[0.5rem] justify-between rounded-md bg-gradient-to-r from-[#48ABCA] from-0% to-transparent mr-40">
                    <div
                        role="tablist"
                        aria-label="tabs"
                        className="w-[12rem]  relative h-9 grid grid-cols-2 items-center pl-0 pr-2 rounded-full bg-[#E5EFFB] overflow-hidden tab-list ml-4 mt-[0.5rem] shadow-lg"
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
                            value={value}
                            onChange={handleValueChange}
                            popoverDirection="down"
                            inputClassName="py-[0.5rem] px-3 w-[17rem] border-2 border-[#E5E5E5]-800 rounded-md text-sm "
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 px-14">
                <Graphs
                    itemType={selectedTab === 1 ? 'target' : 'program'}
                    id={params?.domainId || ''}
                    fromDate={value.startDate || ''}
                    toDate={value.endDate || ''}
                    idType={'domain'}
                />
            </div>
        </div>
    );
}
