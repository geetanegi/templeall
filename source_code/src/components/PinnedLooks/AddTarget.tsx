import * as React from 'react';
import Modal, {
    AddTargetQuickLookModalFooter,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import DomainMenu from '../DomainMenu';
import QuickLook from './QuickLook';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import saveTargetsQuickLookAPI from '../../api/services/QuickLook/saveTargetsQuickLook.service';
import getAllQuickLooksTargetsAPI from '../../api/services/QuickLook/getAllQuickLooksTargets.service';
import { getDomainByIdCall } from '../../redux/slice/GetDomainById/getDomainById';
import { getQuickLookCall } from '../../redux/slice/QuickLook/quickLook';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { ToastContext } from '../../contexts/ToastContext';
export default function AddTarget({
    open,
    onClose,
}: {
    open?: boolean;
    onClose?: any;
}): React.JSX.Element {
    const header = useSelector(({ quickLook }: any) => quickLook?.value?.data);
    const targetPinned = useSelector(({ quickLook }: any) => quickLook);
    const dispatch = useDispatch<any>();
    const [configuration, setConfiguration] = useState<any>({});
    const params = useParams();
    const { addToast } = React.useContext(ToastContext);
    const updateConfiguration = (target: any, quickLookId: string): void => {
        const config = { ...configuration };
        if (config[quickLookId]) {
            if (config[quickLookId].targetData) {
                const targetExists = config[quickLookId].targetData?.some(
                    (data: any) => data.id === target.id
                );
                if (config[quickLookId].targetData.length > 0) {
                    addToast({
                        type: 'error',
                        message: `Cannot add more than one target in a ${config[quickLookId]?.name}, remove one to add another.`,
                    });
                    return;
                } else if (!targetExists) {
                    config[quickLookId].targetData = [
                        ...config[quickLookId].targetData,
                        {
                            id: target.id,
                            name: target.name,
                            orderCount: config[quickLookId].targetData.length,
                        },
                    ];
                }
            } else {
                config[quickLookId]['targetData'] = [
                    {
                        id: target.id,
                        name: target.name,
                        orderCount: 0,
                    },
                ];
            }
        } else {
            config[quickLookId] = {
                quickLookId,
                targetData: [
                    {
                        id: target.id,
                        name: target.name,
                        orderCount: 0,
                    },
                ],
            };
        }
        setConfiguration(config);
    };
    const removeTarget = (targetId: string, quickLookId: string): void => {
        const config = { ...configuration };
        config[quickLookId].targetData = config[quickLookId].targetData.filter(
            (target: any) => target.id !== targetId
        );
        setConfiguration(config);
    };
    const handleSave = async (): Promise<any> => {
        const quickLookData = Object.values(configuration);
        const data = {
            programBookUUID: params?.id,
            quickLookData: quickLookData,
        };
        const res = await saveTargetsQuickLookAPI.saveTargetsQuickLook(data);
        if (!res?.data?.error) {
            const payloadData = {
                programBookUUID: params?.id,
            };
            dispatch(getQuickLookCall(payloadData));
            if (targetPinned?.addQuickLook) {
                const domainData = {
                    phase: '',
                    programBookUUID: params?.id,
                    isTargetPinned: targetPinned?.addQuickLook,
                    quickLookId: targetPinned?.clickedQuickLook,
                };
                dispatch(getDomainByIdCall(domainData));
            }
            setTimeout(() => {
                onClose();
            }, 2000);
            dispatch(
                openNotification({
                    success: true,
                    title: 'Targets pinned successfully.',
                    description: '',
                })
            );
        } else {
            return res;
        }
    };
    const handleOnCancel = async (): Promise<any> => {
        if (targetPinned?.addQuickLook) {
            const domainData = {
                phase: '',
                programBookUUID: params?.id,
                isTargetPinned: targetPinned?.addQuickLook,
                quickLookId: targetPinned?.clickedQuickLook,
            };
            dispatch(getDomainByIdCall(domainData));
        }
        setTimeout(() => {
            onClose();
        }, 2000);
    };
    const handleEdit = async (): Promise<any> => {
        const data = {
            programBookUUID: params?.id,
        };
        const res =
            await getAllQuickLooksTargetsAPI.getAllQuickLooksTarget(data);
        if (!res?.data?.error) {
            const transformedData = res?.data?.data?.quickLookData?.reduce(
                (acc: any, item: any) => {
                    acc[item.quickLookId] = item;
                    return acc;
                },
                {}
            );
            setConfiguration(transformedData);
        } else {
            return res;
        }
    };
    React.useEffect(() => {
        handleEdit();
    }, []);
    return (
        <Modal
            open={open}
            id={'add-target-quickLook-modal'}
            expandModal={false}
        >
            <ModalHeader
                title={'Add Targets to Quick Look'}
                onClose={onClose}
                closeIcon={true}
            />
            <ModalBody expandModal={false}>
                <div
                    className="md:px-2 w-[98rem] flex space-x-5"
                    data-testid="add-target-page"
                >
                    <DomainMenu addTargetQuickLook={true} disableLinks />
                    <div className="flex flex-col w-full">
                        <div className="flex w-full h-[50rem]">
                            {header?.quickLookData?.map(
                                (item: any, index: number) => {
                                    return (
                                        <QuickLook
                                            key={item.quickLookId}
                                            name={item.name}
                                            quickLookId={item.quickLookId}
                                            isLastItem={
                                                index === header.length - 1
                                            }
                                            updateConfiguration={
                                                updateConfiguration
                                            }
                                            targets={
                                                configuration?.[
                                                    item.quickLookId
                                                ]?.targetData || []
                                            }
                                            removeTarget={removeTarget}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </ModalBody>
            <AddTargetQuickLookModalFooter
                onClose={() => {
                    handleOnCancel();
                }}
                handleSubmit={() => {
                    handleSave();
                }}
                isDisable={false}
            />
        </Modal>
    );
}
