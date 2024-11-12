import apiService from "../../../services/apiService";
import { API_URL } from "../../../services/enums";
import { ToastError, ToastSuccess } from "../../Toast";

export const computeMediaHeaders = (tab: number, renderFor?: string) => {
  if (renderFor === "courseAdmin") {
    return [
      { id: 1, key: "playerUsername", field: "Player Username" },
      { id: 3, key: "contestName", field: "Contest Name" },
      { id: 4, key: "club", field: "Club" },
      { id: 5, key: "course", field: "Course" },
      { id: 6, key: "hole", field: "Hole" },
      { id: 7, key: "tee", field: "Tee" },
      { id: 9, key: "time", field: "Time" },
      { id: 2, key: "date", field: "Date" },
      { id: 11, key: "view", field: "View" },
    ];
  } else if (tab === 1) {
    return [
      { id: 1, key: "contestName", field: "Contest Name" },
      { id: 2, key: "club", field: "Club" },
      { id: 3, key: "course", field: "Course" },
      { id: 4, key: "hole", field: "Hole" },
      { id: 5, key: "tee", field: "Tee" },
      { id: 6, key: "playerUsername", field: "Player Username" },
      { id: 7, key: "date", field: "Date" },
      { id: 8, key: "time", field: "Time" },
      { id: 9, key: "uploade", field: "Upload" },
    ];
  } else if (tab === 2) {
    return [
      { id: 1, key: "playerUsername", field: "Player Username" },
      { id: 2, key: "requestDate", field: "Request Date" },
      { id: 3, key: "contestName", field: "Contest Name" },
      { id: 4, key: "club", field: "Club" },
      { id: 5, key: "course", field: "Course" },
      { id: 6, key: "hole", field: "Hole" },
      { id: 7, key: "tee", field: "Tee" },
      { id: 9, key: "time", field: "Time" },
      { id: 12, key: "category", field: "Category" },
      { id: 10, key: "status", field: "Status" },
      { id: 11, key: "uploade", field: "Upload" },
    ];
  } else if (tab === 3) {
    return [
      { id: 1, key: "contestName", field: "Contest Type" },
      { id: 2, key: "club", field: "Club" },
      { id: 3, key: "course", field: "Course" },
      { id: 4, key: "hole", field: "Hole" },
      { id: 5, key: "tee", field: "Tee" },
      { id: 6, key: "playerUsername", field: "Player Username" },
      { id: 7, key: "date", field: "Date" },
      { id: 8, key: "time", field: "Time" },
      { id: 9, key: "actions", field: "Actions" },
    ];
  } else {
    return [];
  }
};

export const deleteVideos = async (
  type: string,
  reqId: string | number,
  getVideosList?: () => void,
  userRole?: string,
) => {
  try {
    let endPoint = API_URL.deleteVideo;

    if (type === "REQUEST_VIDEO" && userRole === "superAdmin") {
      endPoint = API_URL.deleteRequestVideo;
    }
    const res = await apiService.post<any>(endPoint, {
      data: {
        requestType: type,
        requestId: reqId,
      },
    });
    if (res.status === 200 && !res.data.error) {
      ToastSuccess(res.data.data.message);
      getVideosList?.();
    } else if (res.data.error) {
      ToastError(res.data.description || "");
    }
  } catch (error) {
    console.error(error);
  }
};

export const computeFilterDropDown = (
  selectedTab: number | string,
  renderFor: string,
) => {
  if (selectedTab === 1 && renderFor === "SuperAdmin") {
    return [
      { id: 1, key: "", name: "All Videos" },
      { id: 2, key: "AceCam-Jackpot", name: "AceCam Jackpot" },
      { id: 2, key: "Closest-to-the-Pin", name: "Closest to the Pin" },
    ];
  } else if (selectedTab === 2 && renderFor === "SuperAdmin") {
    return [
      { id: 1, key: "", name: "All Request" },
      { id: 2, key: "PENDING", name: "Pending Request" },
      { id: 3, key: "APPROVED", name: "Approved Request" },
      { id: 4, key: "REJECT", name: "Rejected Request" },
    ];
  } else if (renderFor === "Player") {
    return [
      { id: 1, key: "", name: "All" },
      { id: 2, key: "BLOOPERS", name: "Blooper" },
      { id: 3, key: "TOP_SHOT", name: "Top Shot" },
      { id: 4, key: "NOT_TOP_SHOT", name: "Not Top Shot" },
      { id: 5, key: "SOTW", name: "Shot Of The Week" },
      { id: 5, key: "WIN", name: "Winning Shot" },
    ];
  }
};

export const createComment = async (
  id: string | number | null,
  videoId: string | number,
  userId: string | number,
  commentText: string,
  getComments: () => void,
) => {
  try {
    const { data, status } = await apiService.post<any>(API_URL.createComment, {
      data: {
        id: id,
        videoId: videoId,
        playerId: userId,
        commentText: commentText,
      },
    });
    if (status === 200 && data?.data != null && !data?.error) {
      getComments();
    } else if (data?.error && data.description) {
      ToastError(data.description);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateViewCount = async (id: string | number) => {
  await apiService.post<any>(API_URL.updatevideoViewCount, {
    data: {
      videosId: id,
      views: true,
    },
  });
};

export const makeVieoLiked = async (
  videoId: string | number,
  userId: number | string,
  islike: boolean,
) => {
  try {
    await apiService.post<any>(API_URL.likeVideo, {
      data: {
        videoId: videoId,
        userId: userId,
        liked: !islike,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const formatCount = (value: number | string) => {
  if (Number(value) < 1000) {
    return value.toString(); // Return as is for values less than 1000
  } else if (Number(value) < 1000000) {
    return (Number(value) / 1000).toFixed(1) + "K"; // Format as thousands
  } else {
    return (Number(value) / 1000000).toFixed(1) + "M"; // Format as millions
  }
};

export const deleteComment = async (
  videoId: string | number,
  commentId: string | number,
  userId: string | number,
  getComments: () => void,
) => {
  try {
    const { data, status } = await apiService.post<any>(API_URL.deleteComment, {
      data: {
        videoId: videoId,
        commentId: commentId,
        playerId: userId,
      },
    });
    if (status === 200 && data?.data != null && !data?.error) {
      getComments();
      ToastSuccess(data.data.message);
    } else if (data?.error && data.description) {
      ToastError(data.description);
    }
  } catch (error) {
    console.error(error);
  }
};
