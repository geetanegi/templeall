import React, { useEffect } from "react";
import Adminpanel from "../components/AdminPanel/Adminpanel";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../reducers/loader/loader";

import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/routesPath";
import PlayerHomePage from "../components/PlayerHomePage/PlayerHomePage";
import AdminHomePage from "../components/PlayerHomePage/AdminHomePage";
import { decryptData, secretKey } from "../utils/encrypt";


const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  
  const userPermissionAvailable = useSelector((state: RootState) => state?.auth?.userPermissions)
 
  const userPermisions = userPermissionAvailable && JSON.parse(
    decryptData(
      userPermissionAvailable,
      secretKey,
    ),
  );

  useEffect(() => {
    if (!userPermisions?.data?.permission) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, []);

  if (location.pathname === ROUTES.USERS) {
    if (userPermisions?.permission?.["is_super_admin"]) {
      return <Adminpanel />;
    } else if (userPermisions?.permission?.["is_course_admin"]) {
      return <Adminpanel isCourseAdmin={false} />;
    }
  }

  if (userPermisions && userPermisions?.permission?.["is_course_admin"]) {
    return <Navigate to={ROUTES.CONTESTS} replace />;
  }

  return (
    <div>
    <AdminHomePage />
      {userPermisions?.permission?.["is_player"] && <PlayerHomePage />}
      {userPermisions?.permission?.["is_super_admin"] && <AdminHomePage />}
      {userPermisions?.permission?.["is_course_admin"] && <AdminHomePage />}
    </div>
  );
};
export default Dashboard;
