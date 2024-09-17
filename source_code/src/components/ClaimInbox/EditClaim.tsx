import React from 'react';
import SideInboxClaim from './SideInboxClaim';
import ProviderSignature from './ProviderSignature';
import BillingFormSection from './BillingSection';
import { ROUTES } from '../../constants';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
export default function EditClaims(): React.JSX.Element {
    const [activeButton, setActiveButton] = React.useState('Provider');
    return (
        <div className="p-4">
            <div className="w-1/2">
                <ol
                    className="flex items-center whitespace-nowrap mb-1"
                    aria-label="Breadcrumb"
                    data-testid="bread-crumb"
                >
                    <li className="inline-flex items-center cursor-pointer">
                        <Link to={`${ROUTES.inboxGrid}`}>
                            <label className="cursor-pointer flex items-center text-sm ">
                                Claim Inbox
                            </label>
                        </Link>
                    </li>
                    <li
                        className="inline-flex pl-1 items-center text-lg font-semibold text-gray-800 truncate"
                        aria-current="page"
                    >
                        / {activeButton}
                    </li>
                </ol>
                <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.15rem] rounded-md"></div>
            </div>
            <div className="flex">
                {/* Sidebar */}
                <SideInboxClaim
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                />
                {/* Main Content */}
                <div className="flex-1 flex-col">
                    {/* Progress Steps */}
                    <div className="flex justify-between items-center">
                        <NavigationBar />
                    </div>
                    <div className="p-6 space-y-8 h-[45rem] overflow-y-scroll">
                        <BillingFormSection />
                        <ProviderSignature />
                    </div>
                    {/* Form Section */}
                </div>
            </div>
        </div>
    );
}
