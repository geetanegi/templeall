import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal, {
    CreateClientModalActions,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import Checkbox from '../Generics/Inputs/Checkbox';
import sessionApis from '../../api/services/session.service';
import { saveAddToSessionTarget } from '../../api/services/ProgramBook/saveAddToSession.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { CustomDateWithoutTime } from '../Generics/Grid/CommonFunction';
import { ToastContext } from '../../contexts/ToastContext';
export default function AddToSessionModal({
    open,
    onClose,
}: {
    open: any;
    onClose: any;
}): React.JSX.Element {
    const [check, setCheck] = React.useState<any>({});
    const [checkedValues, setCheckedValues] = React.useState<any>([]);
    const [responseValues, setResponseValues] = React.useState<any>([]);
    const { addToast } = React.useContext(ToastContext);
    const dispatch = useDispatch<any>();
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.SelectedTarget?.id
    );
    const handleCheckboxChange = (index: any): any => {
        setCheck((prevOpenListIndex: any) => ({
            ...prevOpenListIndex,
            [index]: !prevOpenListIndex[index],
        }));
        setCheckedValues([...checkedValues, index]);
    };
    const handleSubmitFrom = async (e: any): Promise<void> => {
        e.preventDefault();
        const res = await saveAddToSessionTarget.addToSession({
            targetId: targetDataByIdClicked,
            sessionIds: checkedValues,
        });
        if (!res?.data?.error) {
            onClose(false);
            dispatch(
                openNotification({
                    success: true,
                    title: 'Target added to the session successfully.',
                    description: '',
                })
            );
        } else if (res?.data?.error) {
            addToast({
                type: 'error',
                message: `Please add mastery criteria and guideline template to add this target to session`,
            });
        }
    };
    const getDetails = async (): Promise<void> => {
        const response = await sessionApis.fetchSessionsByClientId({
            clientId: programBookData?.userChildId?.id,
        });
        setResponseValues(response?.data?.data);
    };
    React.useEffect(() => {
        getDetails();
    }, [0]);
    return (
        <>
            <Modal open={open} id={'addLongTermGoal'} expandModal={false}>
                <ModalHeader
                    title={
                        'Session for ' +
                        programBookData?.userChildId?.firstName
                            .charAt(0)
                            .toUpperCase() +
                        programBookData?.userChildId?.firstName.slice(1) +
                        ' ' +
                        programBookData?.userChildId?.lastName
                            .charAt(0)
                            .toUpperCase() +
                        programBookData?.userChildId?.lastName.slice(1)
                    }
                    onExpand={undefined}
                    icon={false}
                />
                <ModalBody expandModal={false}>
                    <div className="flex py-3 px-5 space-x-5">
                        <div className="w-[22rem] ps-5">
                            <label className="text-sm font-medium">
                                Session
                            </label>
                        </div>
                        <div className="w-[22rem] ps-5">
                            <label className="text-sm font-medium">
                                Created By
                            </label>
                        </div>
                        <div className="w-[15rem]">
                            <label className="text-sm font-medium">
                                Created On
                            </label>
                        </div>
                    </div>
                    <div className="w-[60rem] h-96 space-x-5">
                        <div
                            id="users-accordion-sub-1-child"
                            className="droppable hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                        >
                            <div className="flex flex-col">
                                {responseValues?.map(
                                    (itemLongTerm: any, indexLongTerm: any) => {
                                        return (
                                            <div key={indexLongTerm}>
                                                <li
                                                    className={`flex items-start ps-[1.5rem] mt-2`}
                                                >
                                                    <div className="flex">
                                                        <Checkbox
                                                            checked={
                                                                check[
                                                                    itemLongTerm
                                                                ]
                                                            }
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    itemLongTerm?.id
                                                                )
                                                            }
                                                        />
                                                        <div className="flex ">
                                                            <div className="w-[22rem] text-sm">
                                                                <label>
                                                                    {
                                                                        itemLongTerm?.name
                                                                    }
                                                                </label>
                                                            </div>
                                                            <div className="w-[21rem] text-sm ">
                                                                <label>
                                                                    {
                                                                        itemLongTerm
                                                                            ?.createdBy
                                                                            ?.firstName
                                                                    }{' '}
                                                                    {
                                                                        itemLongTerm
                                                                            ?.createdBy
                                                                            ?.lastName
                                                                    }
                                                                </label>
                                                            </div>
                                                            <div className="w-[15rem] text-sm  ps-5">
                                                                <label>
                                                                    {CustomDateWithoutTime(
                                                                        itemLongTerm?.createdDate
                                                                    )}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <CreateClientModalActions
                    onClose={onClose}
                    isDisabled={false}
                    handleSubmit={handleSubmitFrom}
                />
            </Modal>
        </>
    );
}
