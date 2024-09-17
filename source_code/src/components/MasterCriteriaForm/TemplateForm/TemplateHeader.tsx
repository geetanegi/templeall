import React from 'react';
import { useSelector } from 'react-redux';

function TemplateHeader({ title }: { title?: any }): React.JSX.Element {
    const cardNumber = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.cardIndex
    );
    if (title === 'Baseline') {
        return (
            <>
                <div className="Baseline text-[#7098E5] text-lg font-semibold font-['Lato'] leading-normal">
                    <div className="pb-1">{title}</div>
                    <div className="bg-gradient-to-r from-[#7098E5] from-60% to-transparent h-[0.2rem] rounded-t-md"></div>
                </div>
                <div className="count text-[#7098E5] text-lg font-semibold pt-3">
                    <label>#1</label>
                </div>
            </>
        );
    } else if (title === 'Intervention') {
        return (
            <>
                <div className="Baseline text-[#7BBC64] text-lg font-semibold font-['Lato'] leading-normal">
                    <div className="pb-1">{title}</div>
                    <div className="bg-gradient-to-r from-[#7BBC64] from-60% to-transparent h-[0.2rem] rounded-t-md"></div>
                </div>
                <div className="count text-[#7BBC64] text-lg font-semibold pt-3">
                    <label>#1</label>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="Baseline text-[#35ADB5] text-lg font-semibold font-['Lato'] leading-normal ">
                    <div className="pb-1">{title}</div>
                    <div className="bg-gradient-to-r from-[#35ADB5] from-60% to-transparent h-[0.2rem] rounded-t-md"></div>
                </div>
                <div className="count text-[#35ADB5] text-lg font-semibold pt-3">
                    <label>#{cardNumber}</label>
                </div>
            </>
        );
    }
}

export default TemplateHeader;
