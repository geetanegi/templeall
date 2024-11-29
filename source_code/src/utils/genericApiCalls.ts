import apiService from "../services/apiService";
import { API_URL } from "../services/enums";
import { decryptData, secretKey } from "./encrypt";

export const getFilters = async(category:string, setFilters:(value: any)=>void) =>{
    let payLoad = {}
    let endPoints = API_URL.getPlayerVideoFilter
    if(category){
        payLoad = {
            category : category
        }
        endPoints = API_URL.getFilter
    }
    
    const res = await apiService.post<any>(endPoints, {
        data: payLoad,
      });

      if (res.status === 200 && res.data && !res.data.error) {

        setFilters(res.data.data)
      }
}

export interface Permission {
  [key: string]: boolean;
}

export interface Role {
  roleId: number;
  name: string;
}

export interface Menu {
  name: string;
  type: string;
  icon: string;
  routeUrl: string;
  subMenus?: any; // Define a proper type if subMenus has a specific structure
}

//   userPermissions: string,
// ): { permission: any; roleList: any; menuList: any } => {
//   const permissions = decryptData(userPermissions, secretKey);

//   const extractData = (key: string, input: string): string | null => {
//     const regex = new RegExp(`${key}=({.*?}|\\[.*?\\])`);
//     const match = input.match(regex);
//     return match && match[1] ? match[1] : null;
//   };

//   try {
//     const permissionString = extractData("permission", permissions);
//     const roleListString = extractData("roleList", permissions);
//     const menuListString = extractData("menuList", permissions);

//     console.log("Permission Stringhhhhhhhhhhhhh:", permissionString);
//     console.log("Role List String:", roleListString);
//     console.log("Menu List String:", menuListString);

//     const permission = permissionString ? JSON.parse(permissionString) : null;
//     // const roleList = roleListString ? JSON.parse(roleListString) : null;
//     // const menuList = menuListString ? JSON.parse(menuListString) : null;
//     const roleList = roleListString
//       ? JSON.parse(roleListString.replace(/RoleDTO/g, ""))
//       : null;
//     // const menuList = menuListString
//     //   ? JSON.parse(menuListString.replace(/MenuDTO/g, ""))
//     //   : null;
//     const menuList = {}

//     console.log("Parsed Permission:",permission);
//     console.log("Parsed Role List:", roleList);
//     // console.log("Parsed Menu List:", menuList);

//     return { permission, roleList,  menuList};
//   } catch (error) {
//     console.error("Error parsing user permissions:", error);
//     return { permission: null, roleList: null, menuList: null };
//   }
// };