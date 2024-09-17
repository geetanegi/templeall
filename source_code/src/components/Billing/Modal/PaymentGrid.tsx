import * as React from 'react';
import CommonSubHeader from '../../SubHeader/CommonSubHeader';
import ConstColumnDiv, { CustomName } from '../../Generics/Grid/CommonFunction';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '../../Generics/Tooltip';
import { Link } from 'react-router-dom';
// import { usePermission } from '../../../hooks/usePermission';
import Grid from '../../Generics/Grid';
import { AppDispatch } from '../../../redux/store';
import moment from 'moment';
import VoidPaymentModal from './VoidPaymentModal';
import { getActiveAsyncHistory } from '../../../redux/slice/MineSlice/getOtherGridData';
export default function PaymentGrid({
    currentRecord,
    fetchRecord,
}: {
    currentRecord?: any;
    fetchRecord?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const title = 'Previous Rates';
    const getGridData = useSelector(({ getHistory }: any) => getHistory);
    const [event, setEvent] = React.useState('');
    const [openVoidModal, setOpenVoidModal] = React.useState(false);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const data = {
        billingId: currentRecord?.id,
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'Billing Amount',
        assignedTo: userPermission?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: 'DESC',
        name: 'createdDate',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    React.useEffect(() => {
        dispatch(getActiveAsyncHistory(data));
    }, [dispatch]);
    const ActionTemplateGrid = (e: any): any => {
        const handleVoidClick = (): any => {
            setEvent(e?.id);
            setOpenVoidModal(true);
        };
        return (
            <div className="flex items-center">
                <Tooltip title="Void">
                    <Link
                        to={''}
                        className={`${e?.paymentMarkedVoid ? 'pointer-events-none' : 'cursor-pointer'}`}
                        onClick={handleVoidClick}
                    >
                        <label
                            className={`${e?.paymentMarkedVoid ? 'pointer-events-none text-secondary-300' : 'cursor-pointer hover:underline text-primary-700'} font-medium`}
                        >
                            Void
                        </label>
                    </Link>
                </Tooltip>
            </div>
        );
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('Date ', getGridData, 'date'),
            width: '12rem',
            body: (e: any) =>
                CustomName(moment(e?.paymentDate).format('MM/DD/YYYY'), ''),
        },
        {
            header: ConstColumnDiv('Payor', getGridData, 'payor'),
            width: '12rem',
            body: (e: any) => CustomName(e?.payor?.name, ''),
        },
        {
            header: ConstColumnDiv('Payment Type', getGridData, 'paymentType'),
            width: '12rem',
            body: (e: any) => CustomName(e?.paymentType?.name, ''),
        },
        {
            header: ConstColumnDiv('Applied By', getGridData, 'appliedBy'),
            width: '12rem',
            body: (e: any) =>
                CustomName(e?.appliedBy?.firstName, e?.appliedBy?.lastName),
        },
        {
            header: ConstColumnDiv('Resource', getGridData, 'resource'),
            width: '12rem',
            body: (e: any) => CustomName(e?.resource, ''),
        },
        {
            header: ConstColumnDiv('ERA Number', getGridData, 'eraNumber'),
            width: '12rem',
            body: (e: any) => CustomName(e?.eraNumber, ''),
        },
        {
            header: ConstColumnDiv('Amount', getGridData, 'amount'),
            width: '12rem',
            body: (e: any) => CustomName(e?.amount, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '12rem',
            body: (e: any) => ActionTemplateGrid(e),
        },
    ];
    return (
        <>
            <CommonSubHeader title={title} />
            <Grid
                id={currentRecord?.id}
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {openVoidModal && (
                <VoidPaymentModal
                    data={event}
                    currentRecord={currentRecord}
                    open={openVoidModal}
                    onClose={() => setOpenVoidModal(false)}
                    fetchRecord={fetchRecord}
                />
            )}
        </>
    );
}
