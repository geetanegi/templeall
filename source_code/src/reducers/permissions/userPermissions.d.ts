export interface Data {
  description?: string | null;
  display?: boolean;
  error?: boolean;
  data?: {
    permission?: {
      view_home?: boolean;
      edit_home?: boolean;
      view_communities?: boolean;
      edit_communities?: boolean;
      generate_QR_code?: boolean;
      view_courses?: boolean;
      edit_courses?: boolean;
      delete_coure?: boolean;
      view_contest?: boolean;
      edit_contest?: boolean;
      delete_contest?: boolean;
      create_media?: boolean;
      view_media?: boolean;
      view_reports?: boolean;
      view_users?: boolean;
      edit_users?: boolean;
      deactivate_user?: boolean;
    };
    roleList?: Array<{
      roleId?: number;
      name?: string;
    }>;
    menuList?: Array<{
      name?: string;
      type?: string;
      icon?: string;
      subMenus?: Array<{
        name?: string;
        type?: string;
        icon?: string;
        subMenus?: Array<{
          name?: string;
          type?: string;
          icon?: string;
          subMenus?: Array<{
            name?: string;
            type?: string;
            icon?: string;
            subMenus?: Array<any>; // Optionally, you can define this more strictly
          }>;
        }>;
      }> | null;
    }>;
  };
}
