import { useSelector } from 'react-redux';

export const usePermission = ({
    itemsToCheck,
    checkUserDetailsPermission = false,
}: {
    itemsToCheck: string[];
    checkUserDetailsPermission?: boolean;
}): any => {
    const permissions = useSelector((state: any) =>
        checkUserDetailsPermission
            ? state?.userDetails?.userRoles?.data
            : state?.getUserPermission?.userRoles?.data
    );
    const megaPermission = {
        ...permissions?.permission,
        ...permissions?.menu,
        ...permissions?.megaMenu,
    };
    const checkPermission = (item: string): boolean => {
        return megaPermission[item];
    };
    const getPermissionItems = (): any => {
        if (permissions) {
            const permissionObj: any = {};
            itemsToCheck.forEach((item: string) => {
                permissionObj[item] = checkPermission(item);
            });
            return permissionObj;
        }
    };
    return {
        permissions: getPermissionItems(),
    };
};
