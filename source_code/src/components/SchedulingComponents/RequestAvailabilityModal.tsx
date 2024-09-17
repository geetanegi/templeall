import * as React from 'react';
import Modal, {
    RequestAvailabilityModalFooter,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import Select from '../Generics/Select';
import crossIcon from '../../assets/img/crossBadge.svg';
import { Field, Formik, FormikProps } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Datepicker from 'react-tailwindcss-datepicker';
import { eventColors } from '../../constants/HoursCal';
import groupApi from '../../api/services/Groups/saveGroup.service';
import moment from 'moment';
import saveTechnicianAvailabilityAPI from '../../api/services/Scheduling/saveTechnicianAvailability.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { AppDispatch } from '../../redux/store';
interface Values {
    validFrom: any;
    validTo: any;
    member: any;
}
export default function RequestAvailabilityModal({
    open,
    onClose,
}: {
    open?: boolean;
    onClose?: any;
}): React.JSX.Element {
    const names = useSelector(
        ({ getServices }: any) => getServices?.getUserAndGroupNames
    );
    const formikRef: any = React.useRef<HTMLFormElement>(null);
    const [users, setUsers] = React.useState<any>([]);
    const dispatch = useDispatch<AppDispatch>();
    const getSearchMembers = (): string => {
        return names
            ?.filter(
                (item: { groupId?: number; roleName?: string }) =>
                    item?.groupId || item?.roleName === 'Technician'
            )
            .map(
                (item: {
                    firstName: string;
                    lastName?: string;
                    id?: number;
                    groupId?: number;
                    childId?: number;
                    roleName?: string;
                }) => ({
                    label: `${item?.firstName || ''} ${item?.lastName || ''}`.trim(),
                    value: item?.id
                        ? `${item?.id}-${item?.roleName}`
                        : `${item?.groupId}`,
                })
            );
    };
    const getAllValues = (): Values => {
        return {
            validFrom: '',
            validTo: '',
            member: '',
        };
    };
    const handleSubmitSave = async (values: Values): Promise<any> => {
        const payload = {
            fromDate: moment(values?.validFrom?.startDate).format('YYYY-MM-DD'),
            toDate: moment(values?.validTo?.startDate).format('YYYY-MM-DD'),
            technicianData: users?.map(
                (user: { id: any; groupId: any }) => user.id || user.groupId
            ),
        };
        const res =
            await saveTechnicianAvailabilityAPI.saveTechnicianAvailability(
                payload
            );
        if (!res?.data?.error) {
            onClose();
            dispatch(
                openNotification({
                    success: true,
                    title: res?.data?.data?.message,
                    description: '',
                })
            );
        } else {
            return res;
        }
    };
    const handleOptionClick = async (id: string): Promise<any> => {
        const [idPart, rolePart] = id?.includes('-')
            ? id?.split('-')
            : [id, null];
        // Find the selected item based on the id or groupId
        const selectedItem = names.find(
            (item: { id: any; groupId: any }) =>
                rolePart
                    ? item.id === parseInt(idPart) // If there's a role, compare idPart with item.id
                    : item.groupId === parseInt(id) // If no role, compare id with item.groupId
        );
        if (!selectedItem?.roleName && selectedItem?.roleName === undefined) {
            const groupData = {
                groupId: id,
            };
            const res = await groupApi?.getGroupByID(groupData);
            res?.data?.data?.groupUser?.forEach(
                (itemUser: { roleName: string; id: any }) => {
                    if (itemUser.roleName === 'Technician') {
                        setUsers((prevUsers: any[]) => {
                            const isAlreadyAdded = prevUsers.some(
                                (user: { id: any }) =>
                                    parseInt(user.id) === parseInt(itemUser.id)
                            );
                            if (!isAlreadyAdded) {
                                return [...prevUsers, itemUser];
                            } else {
                                return prevUsers;
                            }
                        });
                    }
                }
            );
        } else if (selectedItem) {
            setUsers((prevUsers: any[]) => {
                const isAlreadyAdded = prevUsers.some(
                    (user) => parseInt(user.id) === parseInt(id)
                );
                if (!isAlreadyAdded) {
                    return [...prevUsers, selectedItem];
                } else {
                    return prevUsers;
                }
            });
        }
        formikRef?.current?.setFieldValue('member', '');
    };
    const handleRemoveItem = (id: number): void => {
        setUsers((prevUsers: any[]) =>
            prevUsers.filter((user) => user.id !== id && user.groupId !== id)
        );
    };
    const handleDisable = (values: Values): boolean => {
        return (
            !values?.validFrom?.startDate ||
            !values?.validFrom?.startDate ||
            !users?.length
        );
    };
    return (
        <Modal open={open} id={'request-modal'} expandModal={false}>
            <ModalHeader
                title={`Request Technician Availability`}
                onClose={onClose}
                closeIcon={false}
            />
            <ModalBody expandModal={false}>
                <div className="w-[70rem]">
                    <Formik
                        initialValues={getAllValues()}
                        onSubmit={handleSubmitSave}
                        enableReinitialize={true}
                        innerRef={formikRef}
                    >
                        {(props: FormikProps<Values>) => {
                            const {
                                values,
                                handleChange,
                                handleSubmit,
                                setFieldValue,
                            } = props;
                            return (
                                <form
                                    onSubmit={() => {
                                        handleSubmit();
                                    }}
                                >
                                    <div className="flex flex-col space-y-5">
                                        <div className="mx-7 rounded-lg border shadow-md px-5 py-3 h-[25rem] space-y-5">
                                            <div className="w-full">
                                                <Field
                                                    label={'Search Member'}
                                                    id="member"
                                                    name="member"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    isSearchable={true}
                                                    value={values?.member}
                                                    component={Select}
                                                    inputClassName={
                                                        'border-0 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                    }
                                                    options={getSearchMembers()}
                                                    onChange={(
                                                        selectedOption: string
                                                    ) => {
                                                        setFieldValue(
                                                            'member',
                                                            ''
                                                        );
                                                        if (
                                                            selectedOption?.[0]
                                                        ) {
                                                            handleOptionClick(
                                                                selectedOption?.[0]
                                                            );
                                                        }
                                                    }}
                                                    placeholder={
                                                        'Type the name of the member'
                                                    }
                                                    showSearch={true}
                                                    NotShowValue={true}
                                                />
                                            </div>
                                            <div className="flex space-x-5">
                                                {Array(
                                                    Math.ceil(users.length / 5)
                                                ) // This will create the required number of columns.
                                                    .fill('')
                                                    .map((_, colIndex) => (
                                                        <div
                                                            key={colIndex}
                                                            className="flex flex-col gap-4 w-1/3"
                                                        >
                                                            {users
                                                                .slice(
                                                                    colIndex *
                                                                        5,
                                                                    colIndex *
                                                                        5 +
                                                                        5
                                                                ) // Slicing users to create groups of 5
                                                                .map(
                                                                    (
                                                                        item: any,
                                                                        index: any
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className={`flex border-l-[12px] w-full justify-between items-center shadow-md rounded-lg px-2 py-[0.6rem]`}
                                                                            style={{
                                                                                borderColor:
                                                                                    eventColors?.[
                                                                                        index +
                                                                                            colIndex *
                                                                                                5 +
                                                                                            1
                                                                                    ], // Adjust color for each user
                                                                            }}
                                                                        >
                                                                            <label className="font-light text-[12px]">
                                                                                {`${item?.firstName} ${item?.lastName}`}
                                                                            </label>
                                                                            <div
                                                                                className="cursor-pointer mr-2"
                                                                                onClick={() =>
                                                                                    handleRemoveItem(
                                                                                        item?.id ||
                                                                                            item?.groupId
                                                                                    )
                                                                                }
                                                                                data-testid="remove-user"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        crossIcon
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                        <div className="mx-7 rounded-lg border shadow-md px-5 py-3">
                                            <div className="flex flex-col">
                                                <div className="mb-4">
                                                    <label className="text-base font-semibold">
                                                        Select Dates to Request
                                                        Availability
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-zinc-700 font-[lato]">
                                                        Select Date
                                                        <span className="text-red-500 ml-1">
                                                            *
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="flex space-x-10 mt-2 items-center mb-2">
                                                    <div className="flex flex-col space-y-1">
                                                        <Field
                                                            name="validFrom"
                                                            autoComplete="off"
                                                            isRequired={true}
                                                            value={{
                                                                startDate:
                                                                    values?.validFrom,
                                                            }}
                                                            onChange={(
                                                                e: string
                                                            ) => {
                                                                handleChange(e);
                                                            }}
                                                            className="w-full"
                                                        >
                                                            {({
                                                                field,
                                                                form,
                                                            }: {
                                                                field: any;
                                                                form: any;
                                                            }) => (
                                                                <Datepicker
                                                                    id="validFrom"
                                                                    {...field}
                                                                    selected={
                                                                        field?.value
                                                                    }
                                                                    useRange={
                                                                        false
                                                                    }
                                                                    asSingle={
                                                                        true
                                                                    }
                                                                    inputClassName="py-[0.5rem] px-3 w-[15rem] border-1 border-[#E5E5E5]-800 rounded-md text-sm "
                                                                    onChange={(
                                                                        date: string
                                                                    ) => {
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            date
                                                                        );
                                                                    }}
                                                                    popoverDirection="up"
                                                                />
                                                            )}
                                                        </Field>
                                                    </div>
                                                    <label className="text-sm font-[lato]">
                                                        To
                                                    </label>
                                                    <div className="flex flex-col space-y-1">
                                                        <Field
                                                            name="validTo"
                                                            autoComplete="off"
                                                            isRequired={false}
                                                            value={{
                                                                startDate:
                                                                    values?.validTo,
                                                            }}
                                                            onChange={(
                                                                e: string
                                                            ) => {
                                                                handleChange(e);
                                                            }}
                                                            className="w-full"
                                                        >
                                                            {({
                                                                field,
                                                                form,
                                                            }: {
                                                                field: any;
                                                                form: any;
                                                            }) => (
                                                                <Datepicker
                                                                    id="validTo"
                                                                    {...field}
                                                                    selected={
                                                                        field.value
                                                                    }
                                                                    useRange={
                                                                        false
                                                                    }
                                                                    asSingle={
                                                                        true
                                                                    }
                                                                    inputClassName="py-[0.5rem] px-3 w-[15rem] border-1 border-[#E5E5E5]-800 rounded-md text-sm "
                                                                    onChange={(
                                                                        date: string
                                                                    ) => {
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            date
                                                                        );
                                                                    }}
                                                                    minDate={
                                                                        values
                                                                            ?.validFrom
                                                                            ?.startDate
                                                                    }
                                                                    popoverDirection="up"
                                                                />
                                                            )}
                                                        </Field>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <RequestAvailabilityModalFooter
                                            onClose={onClose}
                                            handleSubmit={handleSubmit}
                                            isDisable={handleDisable(values)}
                                        />
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
}
