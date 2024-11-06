import apiService from "./apiService";
import { API_URL } from "./enums";
import { store, persistor } from "../store";
import { ToastError } from "../components/Toast";
import moment from "moment";
import { logout } from "../reducers/login/login";
import { resetCourseState } from "../reducers/Courses_data/courses";

export const refreshTokenAPI = async () => {
  const dispatch = store.dispatch;
  try {
    const state = store.getState();
    const token = state?.auth?.token;
    const { data, status } = await apiService.post<any>(API_URL.refreshToken, {
      data: {
        token: token,
      },
    });

    if (status === 200 && data?.data != null && !data?.error) {
      const expirationTime = moment()
        .add(8, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      localStorage.setItem("expirationTime", expirationTime);
      if (data?.data?.token) {
        store.dispatch({
          type: "auth/saveToken",
          payload: data?.data?.token,
        });
      }
    } else {
      dispatch(logout());
      dispatch(resetCourseState());
      ToastError(data?.description);
    }
  } catch (error) {
    dispatch(logout());
    dispatch(resetCourseState());
    ToastError("Something went wrong");
  } finally {
  }
};

export const validateTokenAPI = async () => {
  try {
    const state = store.getState();
    const token = state?.auth?.token;
    const { data, status } = await apiService.post<any>(API_URL.validateToken, {
      data: {
        token: token,
      },
    });

    if (status === 200 && data?.data != null && !data?.error) {
      if (data?.data?.isValid === true && token) {
        refreshTokenAPI();
      } else {
        persistor.purge();
        window.location.reload();
      }
    } else if (status === 200 && data?.error && data?.description) {
      ToastError(data?.description);
    }
  } catch (error) {
    ToastError("Something went wrong");
  } finally {
  }
};
