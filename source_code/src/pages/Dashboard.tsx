import React, { useEffect } from "react";
import Adminpanel from "../components/AdminPanel/Adminpanel";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../reducers/loader/loader";
import { API_URL } from "../services/enums";
import apiService from "../services/apiService";
import {
  updateProfile,
  updateProfileImage,
} from "../reducers/Profiler/profiler";
import { ToastInfo } from "../components/Toast";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/routesPath";
import PlayerHomePage from "../components/PlayerHomePage/PlayerHomePage";
import AdminHomePage from "../components/PlayerHomePage/AdminHomePage";

const Dashboard: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const location = useLocation();

  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );
  useEffect(() => {
    if (!userPermisions?.data?.permission) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
    fetchUserInformation();
  }, []);

  const fetchUserInformation = async () => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.fetchUserProfile,
        {
          data: {
            loginUserId:
              typeof userInfo === "object" ? userInfo.userId : undefined,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        const profileImage = data?.data?.userProfile?.imageBase64;
        dispatch(updateProfileImage({ profileImage }));
        dispatch(updateProfile({ profiler: data.data }));
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (location.pathname === ROUTES.USERS) {
    if (userPermisions?.data?.permission["is_super_admin"]) {
      return <Adminpanel />;
    } else if (userPermisions?.data?.permission["is_course_admin"]) {
      return <Adminpanel isCourseAdmin={true} />;
    }
  }

  if (userPermisions && userPermisions?.data?.permission["is_course_admin"]) {
    return <Navigate to={ROUTES.CONTESTS} replace />;
  }

  console.log("userPermisions", userPermisions);

  return (
    <div>
      {userPermisions?.data?.permission["is_player"] && <PlayerHomePage />}
      {userPermisions?.data?.permission["is_super_admin"] && <AdminHomePage />}
      {userPermisions?.data?.permission["is_course_admin"] && <AdminHomePage />}
    </div>
  );
};
export default Dashboard;
