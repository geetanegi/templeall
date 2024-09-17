import React, { useState } from 'react';
import SortIcon from '../../assets/img/sort.svg';
import ABCDataModal from './ABCDataModal';

export default function SessionTypeTabs({
    activeTab,
    setActiveTab,
}: {
    activeTab: string;
    setActiveTab: any;
}): React.JSX.Element {
    const [showModal, setShowModal] = useState(false);
    const activeClass = 'bg-primary-700 text-white hover:bg-primary-600';
    const inActiveClass = 'text-gray-800 bg-white';
    const tabs = ['Baseline', 'Intervention', 'Maintenance'];
    return (
        <div className="flex justify-between items-center">
            <nav
                className="flex space-x-2 mt-4"
                aria-label="Tabs"
                role="tablist"
            >
                {tabs.map((tab, index) => {
                    return (
                        <span
                            key={index}
                            onClick={() => setActiveTab(tab)}
                            className={`${activeTab == tab ? activeClass : inActiveClass} hover:bg-gray-50 cursor-pointer inline-flex items-center gap-x-1.5 py-3 px-8 rounded-full text-xs font-medium border border-gray-100`}
                        >
                            {tab}
                        </span>
                    );
                })}
            </nav>
            <div className="cursor-pointer hover:underline">
                <span
                    className="text-[#0E4B5D] font-semibold flex items-center"
                    onClick={() => setShowModal(true)}
                    data-testid="session-abc-link"
                >
                    Antecedent Behavior Consequence Data
                    <img src={SortIcon} alt="icon" className="ml-4" />
                </span>
            </div>
            {showModal ? (
                <ABCDataModal hideModal={() => setShowModal(false)} />
            ) : null}
        </div>
    );
}
