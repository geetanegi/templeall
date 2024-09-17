/* eslint-disable max-lines */
/* eslint-disable max-len */
import * as React from 'react';
import expand from '../../../assets/img/expand.svg';
import ClearSearch from '../../../assets/img/clearBadge.svg';
import cancel from '../../../assets/img/close.svg';
import Dictionary from '../../../assets/img/Dictionary.svg';
import { usePermission } from '../../../hooks/usePermission';
import Button from '../Button';
interface ModalProps {
    children: React.ReactNode;
    open: any;
    id: string;
    className?: string;
    expandModal: boolean;
    onClose?: () => void; // Optional onClose handler
    onExpand?: () => void; // Optional onExpand handler
}
const Modal = ({
    children,
    open,
    expandModal,
    className,
    id = 'modal',
}: ModalProps): React.JSX.Element => {
    return (
        <div
            id={id}
            className={
                open
                    ? `opacity-100 duration-500 rounded-md w-full fixed top-0 h-full bg-opacity-50 start-0 z-[60] overflow-x-hidden transition-all disabled:pointer-events-none backdrop-blur-0  bg-gray-600 overflow-y-hidden`
                    : 'hidden'
            }
        >
            <div
                className={`${expandModal ? 'sm:w-[96%]' : 'sm:w-fit'} m-3 mx-auto my-auto rounded-md fixed inset-0 transition-all duration-900 delay-900 grid ${className ? className : 'items-center'}`}
            >
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-md pointer-events-auto"
                    onClick={(e) => e.stopPropagation()} // Prevent bubbling up to close modal
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
export const ModalHeader = ({
    title,
    icon,
    onExpand,
    onClose,
    closeIcon,
    titleIcon,
    titleImg,
    actions,
    isGradientNotVisible,
    downloadIcon,
    downloadIconImg,
    downloadNote,
    showLogo,
    showLogoImage,
    showDictionary,
    redirectionTodictionary,
}: {
    title: string | React.ReactNode;
    onExpand?: () => void;
    icon?: boolean;
    onClose?: () => void;
    closeIcon?: boolean;
    titleIcon?: boolean;
    titleImg?: any;
    actions?: React.JSX.Element;
    isGradientNotVisible?: any;
    downloadIcon?: any;
    downloadIconImg?: any;
    downloadNote?: any;
    showLogo?: boolean;
    showLogoImage?: string;
    showDictionary?: boolean;
    redirectionTodictionary?: any;
}): React.JSX.Element => {
    return (
        <>
            <div className="flex justify-between items-center pt-7 pb-1 pl-9 pr-3">
                <div className="flex space-x-2">
                    {titleIcon && <img src={titleImg} />}
                    <h3 className="font-semibold text-gray-800 w-full">
                        {title}
                    </h3>
                </div>
                {icon && (
                    <button
                        onClick={onExpand ? onExpand : undefined}
                        type="button"
                        className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <span className="sr-only">Expand</span>
                        <img src={expand}></img>
                    </button>
                )}
                {showLogo && (
                    <div className="flex items-center flex-grow justify-center mr-[10rem]">
                        <button
                            type="button"
                            className="flex justify-center items-center w-[15rem] h-14 text-sm font-semibold rounded-md  disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <img
                                src={showLogoImage}
                                alt="logo"
                                className="w-[7rem] h-[7rem]"
                            />
                        </button>
                    </div>
                )}
                {closeIcon && (
                    <>
                        <div className="flex justify-end items-center">
                            {downloadIcon && (
                                <button
                                    onClick={downloadNote}
                                    type="button"
                                    className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    <img
                                        src={downloadIconImg}
                                        className="mr-2"
                                    />
                                </button>
                            )}
                            <button
                                onClick={onClose ? onClose : undefined}
                                type="button"
                                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-md border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <span className="sr-only">close</span>
                                <img src={cancel} alt="close icon"></img>
                            </button>
                        </div>
                    </>
                )}
                {showDictionary && (
                    <div className="flex justify-end items-center">
                        <button
                            onClick={redirectionTodictionary}
                            type="button"
                            className="flex justify-center mr-8 items-center w-full h-7 text-sm font-semibold rounded-md border border-transparent text-gray-800  disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <span className="text-[#48ABCA]">Dictionary</span>
                            <img
                                src={Dictionary}
                                className="ml-2 "
                                alt="close icon"
                            ></img>
                        </button>
                    </div>
                )}
                {actions ? actions : null}
            </div>
            {!isGradientNotVisible ? (
                <div className="ml-8 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-md"></div>
            ) : null}
        </>
    );
};
export const ModalFooter = ({
    onClose,
}: {
    onClose?: () => void;
    icon?: boolean;
}): React.JSX.Element => {
    const handleSaveClick = (): void => {
        if (onClose) {
            onClose();
        }
    };
    return (
        <div className="flex justify-end items-center gap-x-2 bg-[#FAFBFF] py-3 px-4 border-t">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-slide-down-animation-modal"
            >
                Cancel
            </button>
            <button
                onClick={handleSaveClick}
                type="button"
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
export const ModalBody = ({
    children,
    className,
}: {
    children: React.ReactNode;
    expandModal: boolean;
    className?: string;
}): React.JSX.Element => {
    return (
        <div
            className={`relative overflow-y-auto overflow-x-hidden max-h-[98vh] p-7 ${className}`}
        >
            {children}
        </div>
    );
};
export const ModalBodyForDocument = ({
    children,
}: {
    children: React.ReactNode;
    expandModal: boolean;
}): React.JSX.Element => {
    return (
        <div className="overflow-y-auto overflow-x-hidden  p-7">{children}</div>
    );
};
export const CreateDomainModalActions = ({
    onClose,
    isSubmitting,
    isValid,
    handleSubmit,
    value,
}: {
    onClose?: () => void;
    isSubmitting: boolean;
    isValid: boolean;
    handleSubmit: any;
    value: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isSubmitting || !isValid || value}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
export const CreateProgramModalActions = ({
    onClose,
    handleSubmit,
    onSubmitDisable,
    expandModal,
}: {
    onClose?: () => void;
    handleSubmit?: () => void;
    checkDuplicateKey?: boolean;
    onSubmitDisable?: any;
    expandModal: boolean;
}): React.JSX.Element => {
    return (
        <div
            className={`${expandModal ? 'bottom-[2rem] right-[3rem]' : 'bottom-[5rem] right-[14rem]'} flex justify-end items-center gap-x-2 py-3 px-4`}
        >
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                disabled={onSubmitDisable}
                type="button"
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
export const ProgramBookModalFooter = ({
    onClose,
    handleSubmit,
    saveDisabled,
}: {
    onClose?: () => void;
    handleSubmit: any;
    saveDisabled?: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                disabled={saveDisabled ? saveDisabled : false}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
                data-testid="question-modal-save"
            >
                Save
            </button>
        </div>
    );
};
export const AddInterventionModalFooter = ({
    onClose,
    handleSubmit,
    saveDisabled,
}: {
    onClose?: () => void;
    handleSubmit: any;
    saveDisabled?: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                data-testid="onClose-btn"
                type="button"
                className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                data-testid="submit-btn"
                type="button"
                disabled={saveDisabled ? saveDisabled : false}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};
export const AssigneeModalFooter = ({
    onClose,
    handleSubmit,
    saveDisabled,
}: {
    onClose?: () => void;
    handleSubmit: any;
    saveDisabled?: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                disabled={saveDisabled ? saveDisabled : false}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};
export const DischargeModalFooter = ({
    onClose,
    handleSubmit,
    saveDisabled,
}: {
    onClose?: () => void;
    handleSubmit: any;
    saveDisabled?: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                disabled={saveDisabled ? saveDisabled : false}
                className="py-2 px-5 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Discharge
            </button>
        </div>
    );
};
export const SignatureFooter = ({
    onClose,
    handleSubmit,
    isValid,
}: {
    onClose?: () => void;
    handleSubmit: any;
    isValid: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                disabled={!isValid}
                type="button"
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};
export const CreateClientModalActions = ({
    onClose,
    isDisabled,
    handleSubmit,
}: {
    onClose?: () => void;
    isDisabled?: any;
    handleSubmit?: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2  py-3 px-4">
            <button
                data-testid="onCloseBtn"
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                data-testid="submit-btn"
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
export const VoidPaymentModalActions = ({
    onClose,
    isDisabled,
    handleSubmit,
}: {
    onClose?: () => void;
    isDisabled?: any;
    handleSubmit: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2  py-3 px-4">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                data-testid="submit-btn-void-payment"
                disabled={isDisabled}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
export const AppointmentDetailsFooter = ({
    onClose,
    handleSubmit,
    handleRun,
    runLoading,
}: {
    onClose?: () => void;
    handleSubmit: any;
    handleRun: any;
    runLoading: boolean;
}): React.JSX.Element => {
    const { permissions } = usePermission({
        itemsToCheck: ['edit_self_created_appointment_details', 'run_session'],
    });
    return (
        <div className="flex justify-end items-center gap-x-2  py-3 px-4">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={!permissions?.edit_self_created_appointment_details}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Save
            </button>
            <Button
                type="submit"
                loading={runLoading}
                disabled={!permissions?.run_session || runLoading}
                onClick={handleRun}
                className="py-2 justify-center w-[140px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Run Session
            </Button>
        </div>
    );
};
export const OrganizationsFormFooter = ({
    onClose,
    isDisabled,
    handleSubmit,
}: {
    onClose?: () => void;
    isDisabled?: any;
    handleSubmit: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2  py-3 px-4">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={!isDisabled}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
export const CreateClientInquiryModalAction = ({
    handleSubmit,
    isDisabled,
}: {
    handleSubmit: any;
    isDisabled: boolean;
}): React.JSX.Element => {
    return (
        <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="py-2 px-9 w-32 text-sm font-normal  rounded-md border
             border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50
             disabled:bg-secondary-200 disabled:cursor-not-allowed "
        >
            Submit
        </button>
    );
};
export default Modal;
export const PromptModalFooter = ({
    onClose,
    handleSubmit,
}: {
    onClose?: () => void;
    handleSubmit: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};
export const PromptModalHeader = ({
    handleTabChange,
    activeTab,
    searchTerm,
    setSearchTerm,
    handleClearSearch,
}: {
    handleTabChange: any;
    activeTab: any;
    searchTerm: any;
    setSearchTerm: any;
    handleClearSearch: any;
}): React.JSX.Element => {
    return (
        <>
            <div className="flex justify-between mt-2 pl-2">
                <div className="flex gap-x-10">
                    <button
                        className={`font-sm text-sm ${activeTab === 'All' ? 'text-theme-lightBlue1' : ''}`}
                        onClick={() => handleTabChange('All')}
                    >
                        All Prompts
                    </button>
                    <button
                        className={`font-sm text-sm ${activeTab === 'Selected' ? 'text-theme-lightBlue1' : ''}`}
                        onClick={() => handleTabChange('Selected')}
                    >
                        Selected Prompts
                    </button>
                </div>
                <div className="mb-4 relative">
                    <div className="flex relative items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 border ps-4 py-[0.4rem] text-sm rounded-3xl focus:outline-none w-[21rem]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-2 end-3">
                            {searchTerm && (
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={handleClearSearch}
                                >
                                    <img
                                        className="fill-current h-4 w-4"
                                        src={ClearSearch}
                                        alt="clear search"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300" />
        </>
    );
};
export const ConfirmationModalFooter = ({
    onClose,
    handleSubmit,
    yesButtonText,
    noButtonText,
    isNoButtonPrimary,
}: {
    onClose?: () => void;
    handleSubmit?: any;
    yesButtonText?: string;
    noButtonText?: string;
    isNoButtonPrimary?: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center">
            <button
                type="button"
                className={
                    isNoButtonPrimary
                        ? 'py-2 px-9 w-[110px] inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed justify-center mr-4'
                        : 'py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'
                }
                onClick={onClose}
                data-testid="no-confirmation-button"
            >
                {noButtonText || 'No'}
            </button>
            <button
                type="button"
                className="py-2 px-9 w-[110px] inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed justify-center"
                onClick={handleSubmit}
                data-testid="yes-confirmation-button"
            >
                {yesButtonText || 'Yes'}
            </button>
        </div>
    );
};
export const CancelAppointmentModalFooter = ({
    onClose,
    handleSubmit,
}: {
    onClose?: () => void;
    handleSubmit: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-center items-center">
            <button
                type="button"
                className="py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Discard
            </button>
            <button
                type="button"
                className="py-2 px-9 inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Cancel Appointment
            </button>
        </div>
    );
};
export const DragEventModalFooter = ({
    onClose,
    handleSubmit,
    isDisable,
}: {
    onClose?: () => void;
    handleSubmit: any;
    isDisable: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end mt-5">
            <button
                type="button"
                className="py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                disabled={isDisable}
                className="py-2 px-9 inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};
export const RequestAvailabilityModalFooter = ({
    onClose,
    handleSubmit,
    isDisable,
}: {
    onClose?: () => void;
    handleSubmit: any;
    isDisable: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end mt-5">
            <button
                type="button"
                className="py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                disabled={isDisable}
                className="py-2 px-9 inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Request Availability
            </button>
        </div>
    );
};
export const ConfirmationCopyModalFooter = ({
    onClose,
    handleSubmit,
}: {
    onClose?: () => void;
    handleSubmit: any;
}): React.JSX.Element => {
    return (
        <div className="items-center mt-4">
            <button
                type="button"
                className="py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                className="py-2 px-9 w-[110px] inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};
export const AddTargetQuickLookModalFooter = ({
    onClose,
    handleSubmit,
    isDisable,
}: {
    onClose?: () => void;
    handleSubmit: any;
    isDisable: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end m-5">
            <button
                type="button"
                className="py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                className="py-2 px-9 w-[110px] inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isDisable}
            >
                Save
            </button>
        </div>
    );
};
export const AddFromLibraryModalFooter = ({
    onClose,
    handleSubmit,
    submitDisabled,
}: {
    onClose?: () => void;
    handleSubmit: any;
    submitDisabled: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center bottom-[2.7rem] bg-white w-[90vw] p-4 mb-0">
            <button
                data-testid="onCloseBtn"
                type="button"
                className="py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                disabled={submitDisabled}
                className="py-2 px-9 w-[110px] inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};
export const UnsendMessageAction = ({
    onClose,
    handleSubmit,
}: {
    onClose?: () => void;
    handleSubmit?: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-center items-center gap-x-3  py-3 px-4">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Unsend
            </button>
        </div>
    );
};
export const EmployeeOnboardingFormActionModal = ({
    handleSubmit,
    onClose,
    isDisabled,
}: {
    handleSubmit: any;
    onClose: any;
    isDisabled: boolean;
}): React.JSX.Element => {
    return (
        <>
            <button
                type="button"
                onClick={onClose}
                className=" mx-2 py-2 px-9 w-32 text-sm font-normal  rounded-md border
          border-transparent bg-white text-black hover:bg-[#48ABCA]-700 disabled:opacity-50
          disabled:bg-secondary-200 disabled:cursor-not-allowed"
                data-testid="modal-cancel-button"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isDisabled}
                className="py-2 px-9 w-32 text-sm font-normal  rounded-md border
             border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50
             disabled:bg-secondary-200 disabled:cursor-not-allowed "
                data-testid="modal-save-button"
            >
                Save
            </button>
        </>
    );
};
export const AddAuthorizationActionFooter = ({
    onClose,
    handleSubmit,
    isDisabled,
}: {
    onClose?: () => void;
    handleSubmit?: any;
    isDisabled?: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
export const AddOtherPayorActionFooter = ({
    onClose,
    handleSubmit,
    isDisabled,
}: {
    onClose?: () => void;
    handleSubmit?: any;
    isDisabled?: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
export const ABCDataModalFooter = ({
    onClose,
    handleSubmit,
    saveDisabled,
    saveLoading,
}: {
    onClose?: () => void;
    handleSubmit?: any;
    saveDisabled?: boolean;
    saveLoading?: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={saveDisabled || saveLoading}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                {saveLoading ? 'Saving' : 'Save'}
            </button>
        </div>
    );
};
export const TaskAnalysisModalFooter = ({
    onClose,
    handleSubmit,
    saveDisabled,
    saveLoading,
}: {
    onClose?: () => void;
    handleSubmit?: any;
    saveDisabled?: boolean;
    saveLoading?: boolean;
}): React.JSX.Element => {
    return (
        <div className="flex absolute w-full bottom-0 justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={saveDisabled || saveLoading}
                onClick={handleSubmit}
                data-testid="task-analysis-save"
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                {saveLoading ? 'Saving' : 'Save'}
            </button>
        </div>
    );
};
export const SetAvailabilityModalFooter = ({
    onClose,
    handleSubmit,
    isDisabled,
}: {
    onClose?: () => void;
    handleSubmit?: any;
    isDisabled?: any;
}): React.JSX.Element => {
    return (
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
                type="button"
                onClick={onClose ? onClose : undefined}
                className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md  bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmit}
                className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                Save
            </button>
        </div>
    );
};
