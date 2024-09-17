import * as React from 'react';
import Modal, {
    ModalBody,
    PromptModalFooter,
    PromptModalHeader,
} from '../Generics/Modal';

import Badge from '../../assets/img/badge.svg';
import { badgeItems, headers } from '../../constants/MasterCriteriaTemplate';

export default function PromptModal({
    open,
    badges,
    setBadges,
    setOpenDomainModal,
    handleBadgeClick,
}: {
    open?: boolean;
    badges?: any;
    setBadges?: any;
    setOpenDomainModal?: any;
    handleBadgeClick?: any;
}): React.JSX.Element {
    const [selectedBadges, setSelectedBadges] =
        React.useState<string[]>(badges);
    const [activeTab, setActiveTab] = React.useState('All');
    const [searchTerm, setSearchTerm] = React.useState('');

    const onClose = (): void => {
        setOpenDomainModal(false);
    };
    const handleSubmit = (): void => {
        setBadges(selectedBadges);
        setOpenDomainModal(false);
    };

    const handleTabChange = (tab: string): void => {
        setActiveTab(tab);
    };
    const handleClearSearch = (): void => {
        setSearchTerm('');
    };

    const filterBadges = (header: string): any => {
        if (activeTab === 'All') {
            return badgeItems[header].filter((badge: any) =>
                selectedBadges.includes(badge)
            );
        } else if (activeTab === 'Selected') {
            return selectedBadges.filter((badge) =>
                badgeItems[header].includes(badge)
            );
        }

        return [];
    };
    const filterHeaders = (): any => {
        if (searchTerm) {
            return headers.filter((header: any) =>
                header.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return headers;
    };

    return (
        <Modal open={open} id={'add-prompt-modal'} expandModal={false}>
            <div className="px-5 py-3 w-[70rem]">
                <PromptModalHeader
                    handleTabChange={handleTabChange}
                    activeTab={activeTab}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClearSearch={handleClearSearch}
                />
            </div>
            <ModalBody expandModal={false}>
                <div
                    className="px-5 py-1 w-[70rem] h-[20rem]"
                    data-testid="master-criteria-prompt-modal"
                >
                    <div className="sticky top-0 bg-white z-10"></div>
                    <div className="">
                        {filterHeaders()?.map((header: any) => (
                            <div key={header} className={`mb-4 `}>
                                {activeTab !== 'Selected' && (
                                    <label className="text-sm font-semibold pb-6">
                                        {header}
                                    </label>
                                )}
                                <div className="w-full flex gap-x-3 mt-2">
                                    {activeTab === 'All' &&
                                        badgeItems[header].map(
                                            (badge: any, index: any) => (
                                                <span
                                                    key={index}
                                                    onClick={() =>
                                                        handleBadgeClick(
                                                            badge,
                                                            selectedBadges,
                                                            setSelectedBadges
                                                        )
                                                    }
                                                    className={`inline-flex items-center gap-x-1.5 py-2 px-6 rounded-full text-xs font-medium 
                      ${
                          selectedBadges?.includes(badge)
                              ? 'bg-[#48ABCA] text-white cursor-pointer'
                              : 'bg-[#EAEAEA] text-gray-800 cursor-pointer'
                      }`}
                                                >
                                                    {badge}
                                                    {selectedBadges?.includes(
                                                        badge
                                                    ) && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleBadgeClick(
                                                                    badge,
                                                                    selectedBadges,
                                                                    setSelectedBadges
                                                                )
                                                            }
                                                            className="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500"
                                                        >
                                                            <span className="sr-only">
                                                                Remove badge
                                                            </span>
                                                            <img
                                                                className="flex-shrink-0"
                                                                src={Badge}
                                                                alt="clear search"
                                                            />
                                                        </button>
                                                    )}
                                                </span>
                                            )
                                        )}
                                    {activeTab === 'Selected' &&
                                        filterBadges(header)?.map(
                                            (badge: any, index: any) => (
                                                <span
                                                    key={index}
                                                    onClick={() =>
                                                        handleBadgeClick(badge)
                                                    }
                                                    className={`inline-flex items-center gap-x-1.5 py-1.5 px-6 rounded-full text-xs font-medium 
                      ${
                          selectedBadges?.includes(badge)
                              ? 'bg-[#48ABCA] text-white cursor-pointer'
                              : 'bg-[#EAEAEA] text-gray-800 cursor-pointer'
                      }`}
                                                >
                                                    {badge}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleBadgeClick(
                                                                badge
                                                            )
                                                        }
                                                        className="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500"
                                                    >
                                                        <span className="sr-only">
                                                            Remove badge
                                                        </span>
                                                        <img
                                                            className="flex-shrink-0"
                                                            src={Badge}
                                                            alt="clear search"
                                                        />
                                                    </button>
                                                </span>
                                            )
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ModalBody>
            <PromptModalFooter onClose={onClose} handleSubmit={handleSubmit} />
        </Modal>
    );
}
