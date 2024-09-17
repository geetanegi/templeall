/* eslint-disable max-len */
import * as React from 'react';
import Grid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import ConstColumnDiv, { CustomName } from '../Generics/Grid/CommonFunction';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import { useLocation } from 'react-router-dom';
export default function RateGrid(): React.JSX.Element {
    const location = useLocation();
    const { state } = location;
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const dispatch = useDispatch<any>();
    const title = 'Rate';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    React.useEffect(() => {
        const data = {
            heading: '',
            authorizationCodeId: state?.id,
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'Default Rate',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'Default Rate' }));
    }, [
        dispatch,
        state?.id,
        userPermission?.userRoles?.data?.roleId,
        userPermission?.value?.data?.userId,
    ]);
    React.useEffect(() => {
        dispatch(savingTabData({ tab: 'Default Rate' }));
    }, [dispatch]);
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv(
                'Fee Schedule',
                getGridData,
                'feeSchedule.name'
            ),
            body: (e: any) => CustomName(e?.feeSchedule.name, ''),
        },
        {
            header: ConstColumnDiv('Modifier Name', getGridData, ''),
            body: (e: any) => CustomName(e?.clientRate, ''),
        },
        {
            header: ConstColumnDiv('Employee ', getGridData, ''),
            body: (e: any) =>
                CustomName(e?.employeeId?.firstName, e?.employeeId?.lastName),
        },
        {
            header: ConstColumnDiv('Rate', getGridData, ''),
            body: (e: any) => CustomName(e?.employeeRate, ''),
        },
    ];
    return (
        <>
            <CommonSubHeader title={title} />
            <Grid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
        </>
    );
}
