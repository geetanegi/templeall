interface Contest {
  contestId: number;
  name: string;
  contestType: string;
  startTime: string; // ISO 8601 date string (e.g., "2024-10-09T12:00:00")
  endTime: string;
  registrationStartTime: string;
  registrationEndTime: string;
  entryFee: number;
  scheduleContestId: number;
  activeStatus: string;
  acecamPercentage: number;
  charityPercentage: number;
  playerPercentage: number;
  coursePercentage: number;
  payout: string | null;
  note: string | null;
}

export interface CourseData {
  clubName: string;
  courseName: string;
  holeNumber: number;
  teeName: string;
  clubId: number;
  courseId: number;
  holeId: number;
  teeId: number;
  par: number;
  yardage: number;
  teePosition: string;
  allDailyActiveContestDTOS: Contest[];
}

export interface APIResContestData {
  description: string | null;
  display: boolean;
  error: boolean;
  data: CourseData[];
}

export interface jackpot {
  contestType: string;
  jackpotAmount: null;
  clubName: string;
  courseName: string;
  holeNumber: 7;
  par: 3;
  yardage: 123000;
  teeName: string;
  teePosition: string;
  teeYardage: number;
}
