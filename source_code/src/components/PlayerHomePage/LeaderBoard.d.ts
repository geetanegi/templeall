export interface ContestInfo {
  contestType: string;
  courseName: string;
  clubName: string;
  holeNumber: string;
  teeName: string;
  par: number;
  yardage: number;
  activeStatus: string;
  entryFee: number;
  playerCount: number;
  totalPrize: number;
  playerPercentage: number;
  acecamPercentage: number;
  coursePercentage: number;
  charityPercentage: number;
  imageBase64: string;
  location: string;
  payout: string;
  totalRegistrationCount: number;
  teeYardage: number;
}

export interface LeaderboardEntry {
  position: number;
  username: string;
  proximity: number;
  prize: number;
}

export interface APIResLeaderBoardData {
  description: string | null;
  display: boolean;
  error: boolean;
  data: {
    contestInfo: ContestInfo;
    leaderboard: LeaderboardEntry[];
  };
}

export interface leaderBoard {
  clubName: string;
  courseName: string;
  holeNumber: number;
  scheduleContestId: number;
  teeName: string;
  yardage: number;
  par: number;
}
