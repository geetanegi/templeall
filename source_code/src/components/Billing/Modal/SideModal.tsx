/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import Button from '../../Generics/Button';
import SideModalDataApi from '../../../api/services/Billing/SideModalDataApi.service';
import SavePrAmtApi from '../../../api/services/Billing/SavePrAmtApi.service';
import onEnter from '../../../assets/img/onEnter.svg';
interface ViewTargetInSummaryProps {
    openModalData?: any;
    onClose?: () => void;
}
const SideModal: React.FC<ViewTargetInSummaryProps> = ({
    openModalData,
    onClose,
}) => {
    const [resData, setResData] = React.useState<any | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SideModalDataApi.SideModalData({
                    billingId: openModalData?.id,
                });
                const data = response?.data?.data;
                setResData(data);
                setInputValue(data?.patientResponsibilityAmount || '');
            } catch (error) {}
        };
        fetchData();
    }, [openModalData]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const validFormat = /^\d{0,2}(\.\d{0,2})?$/; // Regex for 00.00 format
        if (validFormat.test(value)) {
            setInputValue(value);
        }
    };
    const handleSave = async () => {
        try {
            await SavePrAmtApi.PrAmtData({
                billingId: openModalData?.id,
                patientResponsibilityAmount: inputValue,
            });
        } catch (error) {}
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    };
    if (!resData) {
        return null; // or loading indicator
    }
    const providerName: string = resData?.providerId
        ? `${resData.providerId.firstName || ''} ${resData.providerId.lastName || ''}`.trim() ||
          '--'
        : '--';
    const clientName: string = resData?.clientId
        ? `${resData.clientId.firstName || ''} ${resData.clientId.lastName || ''}`.trim() ||
          '--'
        : '--';
    return (
        <div className="fixed inset-0  right-[2rem] z-50 flex items-center justify-end p-4">
            <div className="relative w-full max-w-2xl min-h-[85vh] bg-white shadow-md rounded-md border-2 overflow-y-auto">
                <div className="bg-[#47AAC9] text-white p-5 rounded-t-md">
                    <button
                        onClick={onClose}
                        data-testid="side-modal-btn"
                        type="button"
                        className="absolute top-4 right-4 text-xl"
                    >
                        X
                    </button>
                    <div className="flex flex-wrap items-center border-b-2 pb-4">
                        <div className="mr-5 flex items-center">
                            <span className="mr-2 font-normal">Client:</span>
                            <span>{clientName}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2 font-normal">Provider:</span>
                            <span>{providerName}</span>
                        </div>
                    </div>
                    <div className="pt-4">
                        <span className="font-normal text-xl">
                            {resData?.billingCode?.code || '--'}
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    <div className="mb-7">
                        <span className="font-normal text-sm">Payor</span>
                        <div className="w-1/5 h-1 bg-[#47AAC9]"></div>
                        <span className="font-normal mt-2 text-xl">
                            {resData?.payor?.name || '--'}
                        </span>
                    </div>
                    <div className="mb-7">
                        <span className="font-normal text-sm">Location</span>
                        <div className="w-1/5 h-1 bg-[#47AAC9]"></div>
                        <span className="font-normal mt-2 text-xl">
                            {resData?.servicePlaceId?.service || '--'}
                        </span>
                    </div>
                    <div className="mb-7">
                        <span className="font-normal text-sm">Rate</span>
                        <div className="w-1/5 h-1 bg-[#47AAC9]"></div>
                        <div className="flex flex-wrap">
                            <div className="mr-10">
                                <span className="font-normal">Billed</span>
                                <span className="font-normal mt-2 text-xl block">
                                    {resData?.billedRate || '--'}
                                </span>
                            </div>
                            <div>
                                <span className="font-normal">Agreed</span>
                                <span className="font-normal mt-2 text-xl block">
                                    {resData?.agreedRate || '--'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-7">
                        <span className="font-normal text-sm">Amounts</span>
                        <div className="w-1/5 h-1 bg-[#47AAC9]"></div>
                        <div className="flex flex-wrap">
                            <div className="mr-10">
                                <span className="font-normal">Calc Adj.</span>
                                <span className="font-normal mt-2 text-xl block">
                                    {resData?.calculatedAdjustment || '--'}
                                </span>
                            </div>
                            <div className="mr-10">
                                <span className="font-normal">PR Amt.</span>
                                <span className="font-normal mt-2 text-xl flex items-center">
                                    <input
                                        onChange={handleInputChange}
                                        value={inputValue}
                                        className="w-24 text-[1.5rem] font-normal border-b-2 border-gray-500"
                                        placeholder="00.00"
                                        type="text"
                                        onKeyDown={handleKeyDown}
                                    />
                                    <img
                                        src={onEnter}
                                        alt="Press Enter to save"
                                        className="ml-2"
                                    />
                                </span>
                            </div>
                            <div className="mr-10">
                                <span className="font-normal">Adj.</span>
                                <span className="font-normal mt-2 text-xl block">
                                    {resData?.adjustmentAmount || '--'}
                                </span>
                            </div>
                            <div className="mr-10">
                                <span className="font-normal">Paid</span>
                                <span className="font-normal mt-2 text-xl block">
                                    {resData?.paidAmount || '--'}
                                </span>
                            </div>
                            <div>
                                <span className="font-normal">Owned</span>
                                <span className="font-normal mt-2 text-xl block">
                                    {resData?.owedAmount || '--'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-14">
                        <Button
                            onClick={() => undefined}
                            className=""
                            type="primary"
                        >
                            Add Payment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SideModal;
