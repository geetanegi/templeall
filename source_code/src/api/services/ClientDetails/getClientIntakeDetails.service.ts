import { URLS } from '../../../constants';
import apiClient from '../../client';

const getClientIntakeDetailsApi = {
    getClientIntakeDetails: ({
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
    }: {
        heading: string;
        roleId?: string;
        type: string;
        assignedTo: string;
        pagination: any;
        order: any;
        name: any;
        filterValue: any;
    }) =>
        apiClient.post(URLS.ClientIntakeDetails, {
            data: {
                heading,
                roleId,
                type:
                    type === 'CLIENT_INTAKE_DETAILS'
                        ? 'Under Inquiry'
                        : type === 'New Inquiry'
                          ? 'Under Inquiry'
                          : type === 'Waitlist'
                            ? 'Waitlist'
                            : 'Sent For Information',
                pagination,
                filter: [
                    {
                        filterKey: 'name',
                        filterValue: filterValue || '',
                    },
                ],
                assignedTo,
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
    getClientIntakeDetailsWaitlist: ({
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
        isAvailabilityFilter,
        availabilityFilterList,
    }: {
        heading: string;
        roleId?: string;
        type: string;
        assignedTo: string;
        pagination: any;
        order: any;
        name: any;
        filterValue: any;
        isAvailabilityFilter?: any;
        availabilityFilterList?: any;
    }) =>
        apiClient.post(URLS.wailistGridApi, {
            data: {
                heading,
                roleId,
                type: type === 'Waitlist' ? 'Waitlist' : 'Sent For Information',
                pagination,
                isAvailabilityFilter,
                availabilityFilterList,
                filter: [
                    {
                        filterKey: 'name',
                        filterValue: filterValue || '',
                    },
                ],
                assignedTo,
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
    getWaitListDropdown: () =>
        apiClient.post(URLS.clientIntakeDetailsById, {
            data: {},
        }),
    getClientIntakeDetailById: ({ id }: { id: string | number }) =>
        apiClient.post(URLS.clientIntakeDetailsById, {
            data: {
                id,
            },
        }),
    availabilityDropdown: () =>
        apiClient.post(URLS.availabilityDropdown, {
            data: {},
        }),
};
export default getClientIntakeDetailsApi;
