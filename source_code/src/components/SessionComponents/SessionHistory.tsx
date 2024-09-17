/* eslint-disable max-len */
import * as React from 'react';
import CommonGrid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
//Icons Import
import edit from '../../assets/img/GridIcons/edit.svg';
import run from '../../assets/img/run.svg';
import print from '../../assets/img/print.svg';
import view from '../../assets/img/GridIcons/view.svg';
import history from '../../assets/img/GridIcons/historyIcon.svg';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import { ROUTES } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { savingTabData } from '../../redux/slice/MineSlice/getMine';
import { reInitSessionData } from '../../redux/slice/session/sessionSlice';
import { usePermission } from '../../hooks/usePermission';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
} from '../Generics/Grid/CommonFunction';
export default function SessionHistoryGrid(): React.JSX.Element {
    const title = 'Session History';
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const { permissions } = usePermission({
        itemsToCheck: ['create_session', 'run_session', 'view_session'],
    });
    React.useEffect(() => {
        dispatch(savingTabData({ tab: 'SESSION_HISTORY' }));
    }, [dispatch]);
    const ActionTemplateGrid = (e: any): any => {
        const editSession = (): void => {
            if (permissions?.create_session) {
                dispatch(reInitSessionData());
                navigate(`${ROUTES.editSession}/${e.id}`);
            }
        };
        const runSession = (): void => {
            if (permissions?.run_session) {
                navigate(`${ROUTES.runSession}/${e.id}`);
            }
        };
        const viewSession = (): void => {
            if (permissions?.view_session) {
                navigate(`${ROUTES.viewSession}/${e.id}`);
            }
        };
        return (
            <div className="flex ml-[-2rem] justify-evenly items-start">
                <Tooltip title="View" placement="middle">
                    <img
                        onClick={viewSession}
                        src={view}
                        alt="view"
                        className={`${!permissions?.view_session ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
                <Tooltip title="Session History" placement="middle">
                    <img onClick={viewSession} src={history} alt="view" />
                </Tooltip>
                <Tooltip title="Edit" placement="middle">
                    <img
                        src={edit}
                        onClick={editSession}
                        alt="edit"
                        className={`${!permissions?.create_session || e?.isSystemGenerated ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
                <Tooltip title="Run" placement="middle">
                    <img
                        src={run}
                        onClick={runSession}
                        alt="run"
                        className={`${!permissions?.run_session || e?.isSystemGenerated ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
                <Tooltip title="Print" placement="middle">
                    <img
                        src={print}
                        alt="print"
                        className={`${e?.isSystemGenerated ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
            </div>
        );
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            headerName: '',
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Session Name', getGridData, 'name'),
            headerName: 'Session Name',
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Created For',
                getGridData,
                'clientId.firstName'
            ),
            body: (e: any) =>
                CustomName(e?.clientId?.firstName, e?.clientId?.lastName),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            body: (e: any) =>
                CustomName(e?.createdBy?.firstName, e?.createdBy?.lastName),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: any) => ActionTemplateGrid(e),
        },
        {
            header: ConstColumnDiv('', getGridData, ''),
            headerName: '',
            width: '40px',
            body: () => CustomName('', ''),
        },
    ];
    return (
        <>
            <CommonSubHeader title={title} />
            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
        </>
    );
}
