export interface ContestInfo {
  contestType: string;
  courseName: string;
  club: string;
  holeNumber: string;
  tee: string;
  par: number;
  yardage: number;
  status: string;
  entryFee: number;
  playerCount: number;
  totalPrize: number;
  playerPercentage: number;
  acecamPercentage: number;
  coursePercentage: number;
  charityPercentage: number;
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
