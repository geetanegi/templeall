// types.interface.ts

export interface Headers {
  id: number;
  field: string;
}

export interface Tee {
  id: number;
  teeName: string;
  teePosition: string;
  yardage: number;
}

export interface Hole {
  id: number;
  holeNumber: number;
  par: number;
  yardage: number;
  teeList: Tee[];
}

export interface Course {
  id: number;
  courseName: string;
  location: string;
  description: string;
  holeList: Hole[] | null;
}

export interface Club {
  id: number;
  name: string;
  location: string;
  description: string;
  courseList: Course[];
}

export interface ApiResponse {
  description: string | null;
  display: boolean;
  error: boolean;
  data: Club[];
}

export interface CourseApiResponse {
  description: string | null;
  display: boolean;
  error: boolean;
  data: Course[];
}

// holeList.interface.ts

export interface Hole {
  id: number;
  holeNumber: number;
  par: number;
  yardage: number;
  teeList: Tee[];
}

export interface HoleListResponse {
  description: string | null;
  display: boolean;
  error: boolean;
  data: Hole[];
}
