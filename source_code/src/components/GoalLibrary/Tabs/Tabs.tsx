import * as React from 'react';

export default function TabsForIntervention(): React.JSX.Element {
    const [activeTab, setActiveTab] = React.useState('current');
    const tabs: Array<string> = ['Current', 'Mastered', 'Discontinued'];
    return (
        <div>
            {tabs.map((tab, index) => {
                return (
                    <span
                        key={index}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={
                            tab.toLowerCase() === activeTab
                                ? 'text-primary-800 cursor-pointer font-semibold'
                                : 'cursor-pointer'
                        }
                    >
                        {tab}
                        {index !== tabs.length - 1 ? (
                            <span>&nbsp;|&nbsp;</span>
                        ) : (
                            ''
                        )}
                    </span>
                );
            })}
        </div>
    );
}
