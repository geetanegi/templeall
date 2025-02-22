// src/types/userdetails.d.ts

export interface Permission {
  create_user: boolean;
  view_user: boolean;
  delete_user: boolean;
  create_jackpot: boolean;
  view_jackpot: boolean;
  delete_jackpot: boolean;
  view_coure: boolean;
  view_hole: boolean;
  view_tee: boolean;
  delete_coure: boolean;
  delete_hole: boolean;
  delete_tee: boolean;
  create_coure: boolean;
  create_hole: boolean;
  create_tee: boolean;
  create_leave: boolean;
  view_leave: boolean;
  create_attendance: boolean;
  view_attendance: boolean;
  create_report: boolean;
  view_report: boolean;
  create_event: boolean;
  view_event: boolean;
}

export interface Role {
  roleId: number;
  name: string;
}

export interface Menu {
  name: string;
  type: string;
  icon: string | null;
  subMenus: Menu[] | null;
}

export interface Data {
  permission: Permission;
  roleList: Role[];
  menuList: Menu[];
}

export interface UserPermissionState {
  description: string | null;
  display: boolean;
  error: boolean;
  data: Data;
}
