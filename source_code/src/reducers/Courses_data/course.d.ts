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
  imageBase64?: null;
  imageUrl?: null;
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

//  courseList

export interface courseListCourse {
  holeList: null;
  id: number;
  courseName: string;
  location: string;
  description: string;
  imageUrl: string | null;
  imageBase64: string | null;
}
export interface CourseListApiRes {
  description: string | null;
  display: boolean;
  error: boolean;
  data: courseListCourse[];
}

// tee api res

interface Hole {
  id: number;
  yardage: number;
  holeNumber: number;
  imageBase64: string | null;
  imageUrl: string | null;
  par: number;
  teeList: null;
}
export interface HoleListApiRes {
  description: string | null;
  display: boolean;
  error: boolean;
  data: Hole[];
}

// tee api interface

interface TeeListApiRes {
  description: string | null;
  display: boolean;
  error: boolean;
  data: Tee[];
}
