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
import { ToastError } from "../components/Toast";

const Dashboard: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();

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
        dispatch(updateProfile(data.data));
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      {userPermisions?.data?.permission["is_player"] && (<h1>Player User</h1>)}
      {userPermisions?.data?.permission["is_super_admin"] && (<Adminpanel />)}
      {userPermisions?.data?.permission["is_course_admin"] && (
        <Adminpanel isCourseAdmin={true} />
      )}
    </div>
  );
};
export default Dashboard;
