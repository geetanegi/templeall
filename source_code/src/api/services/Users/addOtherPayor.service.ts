import { URLS } from '../../../constants';
import apiClient from '../../client';
const addOtherPayorAPI = {
    addOtherPayor: ({
        id,
        organizationId,
        userChildId,
        name,
        useParentDetails,
        subscriberFirstName,
        subscriberLastName,
        subscriberAddressLine1,
        subscriberAddressLine2,
        subscriberState,
        subscriberCity,
        subscriberPostalCode,
        cellPhone,
    }: {
        id: string;
        organizationId: string;
        userChildId: string;
        name: string;
        useParentDetails: boolean;
        subscriberFirstName: string;
        subscriberLastName: string;
        subscriberAddressLine1: string;
        subscriberAddressLine2: string;
        subscriberState: string;
        subscriberCity: string;
        subscriberPostalCode: string;
        cellPhone: string;
    }) =>
        apiClient.post(URLS.addOtherPayor, {
            data: {
                id,
                organizationId,
                userChildId,
                name,
                useParentDetails,
                subscriberFirstName,
                subscriberLastName,
                subscriberAddressLine1,
                subscriberAddressLine2,
                subscriberState,
                subscriberCity,
                subscriberPostalCode,
                cellPhone,
            },
        }),
};
export default addOtherPayorAPI;
