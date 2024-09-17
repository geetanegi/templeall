/* eslint-disable max-len */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import SelectionGrid from '../Generics/Grid/SelectionGrid';
import moment from 'moment';
import { getActiveAsync } from '../../redux/slice/MineSlice/getMine';
export default function SessionSummaryGrid({
    onClose,
    first,
}: {
    first?: any;
    onClose?: any;
}): React.JSX.Element {
    const [isDateChange, setIsDateChange] = React.useState(true);
    const title = 'Session Summary';
    const appointment = useSelector((state: any) => state.appointment.value);
    const [dateValue, setDateValue] = React.useState<DateValueType>({
        startDate: new Date(moment().format('YYYY-MM-DD')),
        endDate: new Date(moment().format('YYYY-MM-DD')),
    });
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const dispatch = useDispatch<any>();
    const handleDateChange = (newValue: any): void => {
        const data = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'SUMMARY',
            assignedTo: userPermission?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
            clientId: appointment?.appointmentWith?.id,
            date: newValue?.startDate,
            providerId: appointment?.primaryProvider?.id,
            organizationId: '',
        };
        setIsDateChange(!isDateChange);
        setDateValue(newValue);
        dispatch(getActiveAsync(data));
    };
    return (
        <>
            <Modal open={first} id={'add-comments-modal'} expandModal={false}>
                <ModalHeader
                    title={title}
                    onClose={onClose}
                    closeIcon={false}
                />
                <div className="px-7 pt-4 text-right absolute end-[3rem]">
                    <Datepicker
                        toggleClassName="absolute bg-theme-lightBlue1 rounded-r-lg text-white
                    h-full px-3 text-gray-400 focus:outline-none
                     disabled:opacity-40 disabled:cursor-not-allowed"
                        placeholder="Select Date"
                        value={dateValue as DateValueType}
                        onChange={handleDateChange}
                        popoverDirection="down"
                        useRange={false}
                        asSingle={true}
                        inputClassName="py-[0.5rem] px-3 border-2 border-[#E5E5E5]-800 rounded-l-lg text-sm disabled:opacity-30"
                    />
                </div>
                <ModalBody expandModal={false}>
                    <div
                        className="grid w-3/4 min-w-[100rem]"
                        data-testid="session-summary"
                    >
                        <SelectionGrid
                            dateValue={dateValue}
                            isDateChange={isDateChange}
                            onClose={onClose}
                        />
                    </div>
                </ModalBody>
            </Modal>
            <CommonSubHeader title={title} />
        </>
    );
}
