/* eslint-disable max-len */
import * as React from 'react';
import CommonGrid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
//Icons Import
import edit from '../../assets/img/GridIcons/edit.svg';
import run from '../../assets/img/run.svg';
import view from '../../assets/img/GridIcons/view.svg';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import { ROUTES } from '../../constants';
import { useNavigate } from 'react-router-dom';
import history from '../../assets/img/GridIcons/history.svg';
import { savingTabData } from '../../redux/slice/MineSlice/getMine';
import {
    getHistoryById,
    reInitSessionData,
} from '../../redux/slice/session/sessionSlice';
import { usePermission } from '../../hooks/usePermission';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import SessionHistoryModal from './SessionHistoryModal';
export default function SessionGrid(): React.JSX.Element {
    const title = 'Session';
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const { permissions } = usePermission({
        itemsToCheck: ['create_session', 'run_session', 'view_session'],
    });
    const [event, setEvent] = React.useState(false);
    const [
        openConfirmationModalForActivateCode,
        setOpenConfirmationModalForActivateCode,
    ] = React.useState(false);
    React.useEffect(() => {
        dispatch(savingTabData({ tab: 'Mine' }));
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
        const watchHistory = (): any => {
            dispatch(
                getHistoryById({
                    sessionId: e?.id,
                })
            );
            setOpenConfirmationModalForActivateCode(true);
            setEvent(e);
        };
        return (
            <div className="flex ml-[-2rem] justify-evenly items-start">
                <Tooltip title="View" placement="middle">
                    <img
                        data-testid="view-goal-mode-button"
                        onClick={viewSession}
                        src={view}
                        alt="view"
                        className={`${!permissions?.view_session ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
                <Tooltip title="Edit" placement="middle">
                    <img
                        data-testid="edit-goal-mode-button"
                        src={edit}
                        onClick={editSession}
                        alt="edit"
                        className={`${!permissions?.create_session || e?.isSystemGenerated || getGridData?.tab === 'Discontinued' ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
                <Tooltip title="Run" placement="middle">
                    <img
                        data-testid="run-goal-mode-button"
                        src={run}
                        onClick={runSession}
                        alt="run"
                        className={`${!permissions?.run_session || e?.isSystemGenerated || getGridData?.tab === 'Discontinued' ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
                <Tooltip title="History">
                    <img
                        data-testid="history-goal-mode-button"
                        src={history}
                        onClick={watchHistory}
                        alt="history"
                        className="ml-2"
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
            body: (e: any) => CustomName(e?.createdBy, ''),
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
            {openConfirmationModalForActivateCode && (
                <SessionHistoryModal
                    open={openConfirmationModalForActivateCode}
                    onClose={() =>
                        setOpenConfirmationModalForActivateCode(false)
                    }
                    data={event}
                />
            )}
        </>
    );
}
