import React, { useEffect, useRef, useState } from 'react';
import RoutesComponent from './routes';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import Notifications from './components/Generics/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { closeNotification } from './redux/slice/Notification/notifications';
import {
    getUserPermissionCall,
    savingOrgId,
    savingUserId,
    savingOrgName,
    setFirstTimeUserValue,
    savingLoggedUserDetails,
} from './redux/slice/getUserPermission/getUserPermissionSlice';
import LoaderComponent from './components/LoaderComponent';
import { getUserProfileDataCall } from './redux/slice/UserProfileData/userProfileDataSlice';
import { useAuth } from './hooks/useAuth';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContextProvider } from './contexts/ToastContext';
// import { getUserProfileDataCall } from './redux/slice/UserProfileData/userProfileDataSlice';

function App(): React.JSX.Element {
    const [loading, setLoading] = useState(true);
    const { login } = useAuth();
    const notifications = useSelector((state: any) => state.notifications);
    const userProfileData = useSelector(
        (state: any) => state.userProfileData.value
    );
    const dispatch = useDispatch<any>();
    const access_token =
        localStorage?.access_token != undefined
            ? JSON.parse(localStorage?.access_token)
            : '';
    const userExist = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const initializer = useRef(false);

    useEffect(() => {
        if (!initializer.current) {
            initializer.current = true;
            if (!access_token) {
                setLoading(false);
            } else if (
                access_token?.userId &&
                access_token?.orgId &&
                !userExist?.value?.data?.userId
            ) {
                dispatch(getUserProfileDataCall());
                dispatch(getUserPermissionCall()).then(() => {
                    setLoading(false);
                });
                dispatch(savingUserId(access_token?.userId));
                dispatch(savingOrgId(access_token?.orgId));
                dispatch(savingOrgName(access_token?.organizations));
                dispatch(
                    savingLoggedUserDetails({
                        username: access_token?.username,
                    })
                );
            } else if (
                userExist?.value?.data?.userId &&
                userProfileData?.data?.hasOwnProperty('isResetPassword')
            ) {
                dispatch(
                    setFirstTimeUserValue(
                        userProfileData?.data?.isResetPassword
                    )
                );
                // dispatch(SavingLoginData(access_token));
                login({
                    userId:
                        userExist?.value?.data?.userId || access_token?.userId,
                    orgId: userExist?.value?.data?.orgId || access_token?.orgId,
                }).then(() => {
                    setLoading(false);
                });
            }
        }
    }, []);
    return (
        <DndProvider backend={HTML5Backend}>
            <ToastContextProvider>
                <PrimeReactProvider>
                    {notifications.isOpen ? (
                        <Notifications
                            title={notifications.title}
                            open={notifications.isOpen}
                            onClose={() => dispatch(closeNotification())}
                            success={notifications.success} // description={notifications.description}
                        />
                    ) : null}
                    {loading ? <LoaderComponent /> : <RoutesComponent />}
                </PrimeReactProvider>
            </ToastContextProvider>
        </DndProvider>
    );
}

export default App;
