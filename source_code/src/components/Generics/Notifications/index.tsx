import * as React from 'react';
import Modal, { ModalBody } from '../Modal';
import checkIcon from '../../../assets/img/checkIcon.svg';
import cancelIcon from '../../../assets/img/cancelIcon.svg';
export default function Notifications({
    open,
    title,
    success,
    onClose,
}: {
    open: boolean;
    onClose?: any;
    title: any;
    success: boolean;
}): React.JSX.Element {
    React.useEffect(() => {
        setTimeout(() => {
            onClose();
        }, 3000);
    }, []);
    return (
        <Modal open={open} id={'notification-modal'} expandModal={false}>
            <ModalBody expandModal={false}>
                <div
                    className="py-14 overflow-y-auto mx-[2.5rem] z-50"
                    data-testid="notifications"
                >
                    <div className="flex">
                        <div className="mr-2">
                            {success ? (
                                <img src={checkIcon}></img>
                            ) : (
                                <img src={cancelIcon}></img>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="hs-validation-name-error"
                                className="block text-xl text-[#394148] font-medium mb-2"
                            >
                                {title}
                            </label>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
