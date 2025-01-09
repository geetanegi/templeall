import apiService from "../../../services/apiService";
import { API_URL } from "../../../services/enums";
import { ToastInfo, ToastSuccess } from "../../Toast";

export const computeMediaHeaders = (tab: number, renderFor?: string) => {
  if (renderFor === "courseAdmin") {
    return [
      { id: 1, key: "player", field: "Player Username", isSort: true },
      { id: 3, key: "contestType", field: "Contest Name", isSort: true },
      { id: 4, key: "clubName", field: "Club", isSort: true },
      { id: 5, key: "courseName", field: "Course", isSort: true },
      { id: 6, key: "holeNumbers", field: "Hole", isSort: true },
      { id: 7, key: "teeName", field: "Tee", isSort: true },
      { id: 2, key: "startTime", field: "Date", isSort: true },
      { id: 11, key: "view", field: "View", isSort: false },
    ];
  } else if (tab === 1) {
    return [
      { id: 1, key: "contestType", field: "Contest Name", isSort: true },
      { id: 2, key: "clubName", field: "Club", isSort: true },
      { id: 3, key: "courseName", field: "Course", isSort: true },
      { id: 4, key: "holeNumbers", field: "Hole", isSort: true },
      { id: 5, key: "teeName", field: "Tee", isSort: true },
      { id: 6, key: "player", field: "Player Username", isSort: true },
      { id: 7, key: "dateTime", field: "Date", isSort: true },
      { id: 9, key: "uploade", field: "Upload", isSort: false },
    ];
  } else if (tab === 2) {
    return [
      { id: 3, key: "contestType", field: "Contest Name", isSort: true },
      { id: 4, key: "clubName", field: "Club", isSort: true },
      { id: 5, key: "courseName", field: "Course", isSort: true },
      { id: 6, key: "holeNumbers", field: "Hole", isSort: true },
      { id: 7, key: "teeName", field: "Tee", isSort: true },
      { id: 1, key: "player", field: "Player Username", isSort: true },
      { id: 2, key: "dateTime", field: "Request Date", isSort: true },
      // { id: 9, key: "requestTime", field: "Time", isSort: true },
      { id: 12, key: "videoCategory", field: "Category", isSort: true },
      { id: 10, key: "status", field: "Status", isSort: true },
      { id: 11, key: "uploade", field: "Upload", isSort: false },
    ];
  } else if (tab === 3) {
    return [
      { id: 1, key: "contestName", field: "Contest Type", isSort: true },
      { id: 2, key: "clubName", field: "Club", isSort: true },
      { id: 3, key: "courseName", field: "Course", isSort: true },
      { id: 4, key: "holeNumbers", field: "Hole", isSort: true },
      { id: 5, key: "teeName", field: "Tee", isSort: true },
      { id: 6, key: "player", field: "Player Username", isSort: true },
      { id: 7, key: "dateTime", field: "Date", isSort: true },
      { id: 9, key: "actions", field: "Actions", isSort: false },
    ];
  } else {
    return [];
  }
};

export const deleteVideos = async (
  type: string,
  reqId: string | number,
  getVideosList?: (sortDir:string | null, sortBy:string | null) => void,
  userRole?: string,
) => {
  try {
    let endPoint = API_URL.deleteVideo;

    if (userRole === "superAdmin") {
      endPoint = API_URL.deleteSaVideo;
    }
    const res = await apiService.post<any>(endPoint, {
      data: {
        requestType: type,
        requestId: reqId,
      },
    });
    if (res.status === 200 && !res.data.error) {
      ToastSuccess(res.data.data.message);
      getVideosList?.(null, null);
    } else if (res.data.error) {
      ToastInfo(res.data.description || "");
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
      { id: 2, key: "ACE_CAM_JACKPOT", name: "AceCam Jackpot" },
      { id: 2, key: "CLOSEST_TO_THE_PIN", name: "Closest to the Pin" },
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
      ToastInfo(data.description);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateViewCount = async (id: string | number) => {
  await apiService.post<any>(API_URL.updatevideoViewCount, {
    data: {
      videoId: id,
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
      ToastInfo(data.description);
    }
  } catch (error) {
    console.error(error);
  }
};


export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
};