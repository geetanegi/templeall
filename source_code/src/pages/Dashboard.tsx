import React, { useEffect } from "react";

import Adminpanel from "../components/AdminPanel/Adminpanel";
import apiService from "../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { API_URL } from "../services/enums";
import { loginUserDetails } from "../reducers/login/login";
import { setLoading } from "../reducers/loader/loader";

interface data {
  permission: any;
  roleList: any;
  menuList: any;
}
interface ApiUserPermission {
  description: string;
  display: boolean;
  error: boolean;
  data: data;
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );

  const getUserRole = async () => {
    try {
      dispatch(setLoading(true));
      const data = await apiService.post<ApiUserPermission>(
        API_URL.getUserRole,
        {
          data: {
            profileUserId:
              typeof userInfo === "object" ? userInfo.userId : undefined,
          },
        },
      );
      if (data.status === 200 && !data.data.error) {
        dispatch(loginUserDetails(data.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
  useEffect(() => {
    getUserRole();
  }, []);

  if (
    userPermisions?.data?.roleList?.some(
      (role: any) => role.name === "Player User",
    )
  ) {
    return (
      <div>
        <h1>Player User</h1>
      </div>
    );
  }
  if (
    userPermisions?.data?.roleList?.some(
      (role: any) => role.name === "Super Admin",
    )
  ) {
    return (
      <div>
        <Adminpanel />
      </div>
    );
  } else {
    return <div>
    <h1>Course Admin</h1>
  </div>;
  }

  // return <Adminpanel />;
};

export default Dashboard;
