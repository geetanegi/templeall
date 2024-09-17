import React, { useState } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { useDispatch, useSelector } from 'react-redux';
import {
    runSession,
    pauseSession,
    resumeSession,
    removeAllSessionData,
} from '../../redux/slice/runSession/runSessionSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Play from '../../assets/img/sessionScreen/play.svg';
import Push from '../../assets/img/sessionScreen/push.svg';
import Stop from '../../assets/img/sessionScreen/stop.svg';
import { utc } from 'moment';
import Tooltip from '../Generics/Tooltip';
import ConfirmationModal from '../Generics/ConfirmationModal';
import sessionApis from '../../api/services/session.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { ROUTES } from '../../constants';
export default function SessionTimer(): React.JSX.Element {
    const currentSession = useSelector(
        (state: any) => state.runSession.value.session
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const location = useLocation();
    const isViewMode = location.pathname.includes('view-session');
    const navigate = useNavigate();
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const sessionStarted = currentSession?.started;
    const dispatch = useDispatch<any>();
    const params = useParams();
    const { timer, startTimer, stopTimer } = useTimer();
    const handleStart = (): void => {
        if (!isViewMode) {
            if (!timer.started) {
                if (!currentSession?.id) {
                    dispatch(
                        runSession({
                            sessionId: params?.id || '',
                            createdBy: userPermission?.value?.data?.userId || 1,
                            modifiedBy:
                                userPermission?.value?.data?.userId || 1,
                            startTime: utc().format('YYYY-MM-DD HH:mm:ss'),
                        })
                    );
                } else {
                    dispatch(resumeSession());
                }
                startTimer();
            }
        }
    };
    const handleStop = (): void => {
        setOpenConfirmationModal(false);
        if (sessionStarted) {
            (async () => {
                try {
                    await sessionApis.endSession({
                        sessionRunId: `${currentSession?.id}`,
                        duration: `${timer.timeInSecond}`,
                        endTime: utc().format('YYYY-MM-DD HH:mm:ss'),
                    });
                    stopTimer();
                    dispatch(pauseSession());
                    dispatch(removeAllSessionData());
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Session ended successfully.',
                            description: '',
                        })
                    );
                    navigate(ROUTES.sessionGrid);
                } catch (err) {
                    stopTimer();
                    dispatch(pauseSession());
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Session ended successfully.',
                            description: '',
                        })
                    );
                    navigate(ROUTES.sessionGrid);
                }
            })();
        }
    };
    const handlePause = (): void => {
        if (sessionStarted) {
            stopTimer();
        }
    };
    return (
        <div className="w-1/4 flex justify-center items-center bg-[#0E4B5D] p-6 text-white">
            <div>
                <div className="text-[40px] font-thin flex justify-center">
                    <span>{timer.displayHour}</span>
                    <span>:{timer.displayMinutes}</span>
                    <span>:{timer.displaySeconds}</span>
                </div>
                <div className="flex justify-evenly items-center">
                    <div
                        className={`${timer.started || isViewMode ? 'cursor-not-allowed' : 'cursor-pointer'} px-4 border-r`}
                        onClick={handleStart}
                        data-testid="start-button"
                    >
                        <Tooltip title="Play" placement="middle">
                            <img src={Play} alt="Play" />
                        </Tooltip>
                    </div>
                    <div
                        className={`${!sessionStarted || isViewMode ? 'cursor-not-allowed' : 'cursor-pointer'} px-4 border-r`}
                        onClick={isViewMode ? () => null : handlePause}
                        data-testid="pause-button"
                    >
                        <Tooltip title="Pause" placement="middle">
                            <img src={Push} alt="Pause" />
                        </Tooltip>
                    </div>
                    <div
                        className={`${!sessionStarted || isViewMode ? 'cursor-not-allowed' : 'cursor-pointer'} px-4`}
                    >
                        <Tooltip title="Stop" placement="middle">
                            <img
                                src={Stop}
                                alt="Stop"
                                onClick={
                                    isViewMode
                                        ? () => null
                                        : () => {
                                              handlePause();
                                              setOpenConfirmationModal(true);
                                          }
                                }
                                data-testid="stop-button"
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
            {openConfirmationModal && (
                <ConfirmationModal
                    title={'Are you sure you want to stop that session ?'}
                    open={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)}
                    handleStop={handleStop}
                />
            )}
        </div>
    );
}
