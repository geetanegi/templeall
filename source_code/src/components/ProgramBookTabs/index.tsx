import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
    savingCurrentTab,
    clearProgramBookTree,
} from '../../redux/slice/GetDomainById/getDomainById';
export default function ProgramBookTabs(): React.JSX.Element {
    const activeTab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const tabs: Array<string> = ['Current', 'Mastered', 'Discontinued'];
    const params = useParams();
    const dispatch = useDispatch();
    const onClickTab = (tab: any): any => {
        const currentTab = tab;
        dispatch(clearProgramBookTree({}));
        dispatch(savingCurrentTab(currentTab));
    };
    const handleRedirection = (tab: any): any => {
        if (tab === 'current') {
            return `/program-book/${params?.id}`;
        } else if (tab === 'discontinued') {
            return `/program-book/${params?.id}/discontinued`;
        } else {
            return `/program-book/${params?.id}/mastered`;
        }
    };
    return (
        <div>
            {tabs.map((tab, index) => {
                return (
                    <span
                        key={index}
                        data-testid={`program-book-tab-${index}`}
                        onClick={() => onClickTab(tab)}
                        className={
                            tab === activeTab
                                ? 'text-primary-800 cursor-pointer font-semibold'
                                : 'cursor-pointer'
                        }
                    >
                        <Link to={handleRedirection(tab?.toLowerCase())}>
                            {tab}
                            {index !== tabs.length - 1 ? (
                                <span>&nbsp;|&nbsp;</span>
                            ) : (
                                ''
                            )}
                        </Link>
                    </span>
                );
            })}
        </div>
    );
}
