/* eslint-disable max-len */
import * as React from 'react';
import Grid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../assets/img/editIcon.svg';
import ConstColumnDiv, {
    CustomDateWithoutTime,
    CustomName,
    CustomNameForModifier,
} from '../Generics/Grid/CommonFunction';
import { getActiveAsync } from '../../redux/slice/MineSlice/getMine';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import { useLocation } from 'react-router-dom';
import Tooltip from '../Generics/Tooltip';
import AddDefaultRate from '../Rate/Modal/addDefaultRate';
import { feeScheduleCall } from '../../redux/slice/FeeSchedule/getFeeSchedule';
import { getDefaultRateByIdCall } from '../../redux/slice/DefaultRate/getDefaultRateById';
import { getAllServicePlacesCall } from '../../redux/slice/ServicePlaces/getAllServicePlaces';
export default function RateGrid(): React.JSX.Element {
    const location = useLocation();
    const [openDefault, setOpenDefault] = React.useState(false);
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
            type: getGridData?.tab || 'Custom Rate',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        dispatch(getActiveAsync(data));
    }, [
        dispatch,
        userPermission?.userRoles?.data?.roleId,
        state?.id,
        getGridData?.tab,
        userPermission?.value?.data?.userId,
    ]);
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Client ', getGridData, ''),
            body: (e: any) =>
                CustomName(e?.clientId?.firstName, e?.clientId?.lastName),
        },
        {
            header: ConstColumnDiv('Rate', getGridData, ''),
            body: (e: any) => CustomName(e?.clientRate, ''),
        },
        {
            header: ConstColumnDiv('Employee  ', getGridData, ''),
            body: (e: any) =>
                CustomName(e?.employeeId?.firstName, e?.employeeId?.lastName),
        },
        {
            header: ConstColumnDiv('Rate', getGridData, ''),
            body: (e: any) => CustomName(e?.employeeRate, ''),
        },
    ];
    const Action = (e: any): any => {
        const editDefaultRate = (): void => {
            dispatch(getDefaultRateByIdCall({ id: e?.id }));
            dispatch(getAllServicePlacesCall());
            dispatch(feeScheduleCall());
            setOpenDefault(true);
        };
        return (
            <div className="flex ml-[-2rem] justify-evenly items-center">
                <Tooltip title="Edit">
                    <img onClick={editDefaultRate} src={edit} alt="edit" />
                </Tooltip>
            </div>
        );
    };
    const columnDefinitionsTemplateGrid1 = [
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
            body: (e: any) => CustomName(e?.feeSchedule?.name, ''),
        },
        {
            header: ConstColumnDiv('Modifier Name', getGridData, ''),
            body: (e: any) => CustomName(e?.modifierName, ''),
        },
        {
            header: ConstColumnDiv('Location ', getGridData, 'location.code'),
            body: (e: any) =>
                CustomName(e?.location?.code, e?.location?.service),
        },
        {
            header: ConstColumnDiv('Modifiers ', getGridData, ''),
            body: (e: any) =>
                CustomNameForModifier(
                    e?.modifier1,
                    e?.modifier2,
                    e?.modifier3,
                    e?.modifier4
                ),
        },
        {
            header: ConstColumnDiv('Starts', getGridData, 'startDate'),
            body: (e: any) => CustomDateWithoutTime(e?.startDate),
        },
        {
            header: ConstColumnDiv('Ends', getGridData, 'endDate'),
            body: (e: any) => CustomDateWithoutTime(e?.endDate),
        },
        {
            header: ConstColumnDiv('Billed Rate', getGridData, ''),
            body: (e: any) => CustomName(e?.billedRate, ''),
        },
        {
            header: ConstColumnDiv('Agreed Rate', getGridData, ''),
            body: (e: any) => CustomName(e?.agreedRate, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            body: (e: any) => Action(e),
        },
    ];
    return (
        <>
            <CommonSubHeader title={title} />
            <Grid
                getGridData={getGridData}
                columnOfGrid={
                    getGridData?.tab === 'Default Rate'
                        ? columnDefinitionsTemplateGrid1
                        : columnDefinitionsTemplateGrid
                }
            />
            {openDefault && (
                <AddDefaultRate
                    open={openDefault}
                    onClose={() => setOpenDefault(false)}
                />
            )}
        </>
    );
}
