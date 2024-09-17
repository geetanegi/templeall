import React from 'react';
import Invoice from '../../../assets/img/LandingPageIcons/Invoice.svg';
export default function ClientInvoice(): React.JSX.Element {
    return (
        <div className="py-3 mx-3">
            <div className="flex py-3 px-3">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img
                        className="py-1 px-1.5 align-middle"
                        src={Invoice}
                        alt=""
                    />
                </div>
                <h1 className="font-[lato] mx-4 font-semibold p-1">Invoices</h1>
            </div>
            <div className="my-3 mx-4 text-neutral-500 text-xs font-normal font-['lato']">
                No Invoices yet, Will be uploaded soon
            </div>
            <div className="h-1.5 mx-4 my-5 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
            <div className="h-1.5 mx-4 my-5 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
            <div className="h-1.5 mx-4 my-5 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
            <div className="h-1.5 mx-4 my-5 bg-gradient-to-r from-[#F0F0F0] to-transparent0 rounded-full"></div>
        </div>
    );
}
