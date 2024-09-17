import React, { useEffect } from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import Breadcrumb from '../components/Breadcrumb';
import { ROUTES } from '../constants';
import RunSessionComponent from '../components/RunSessionComponent';
import { getSession } from '../redux/slice/runSession/runSessionSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function RunSession(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const runSession = useSelector((state: any) => state.runSession);
    const params = useParams();
    useEffect(() => {
        dispatch(
            getSession({
                sessionId: params?.id || '',
            })
        );
    }, []);

    return (
        <div className="py-2 min-h-screen bg-gray-100">
            <Breadcrumb
                name={runSession?.value?.sessionData?.name || 'Session Name'}
                pageName={'Sessions'}
                routeName={ROUTES.sessionGrid}
            />
            <RunSessionComponent />
        </div>
    );
}

export default withLayout(RunSession);
