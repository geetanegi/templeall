import { URLS } from '../../constants';
import apiClient from '../client';

export const saveAuthorizationCode = {
    saveAuthorizationCodeApi: ({
        authorizationCodeId,
        name,
        groupId,
        code,
        description,
        codeType,
        therapy,
        enforceRate,
        calculationType,
        defaultUnits,
        defaultServiceLocation,
        minutesPerUnit,
        roundAtHalfway,
        defaultMinutes,
        modifiers,
        visitVerification,
        serviceLocation,
        serviceAddress,
        procedureInformation,
        driveTimeAndMiles,
        serviceNotes,
        adminNotes,
        providerSignature,
        clientSignature,
        clientSignatureFrom,
        requiresAuthorization,
        enforceSingleTimesheetConversion,
        requireScheduleConversion,
        basedOnStartTime,
        basedOnEndTime,
        clientRate,
        lockGracePeriod,
    }: {
        authorizationCodeId: string;
        name: any;
        groupId: any;
        code: any;
        description: any;
        codeType: any;
        therapy: any;
        enforceRate: any;
        calculationType: any;
        defaultUnits: any;
        defaultServiceLocation: any;
        minutesPerUnit: any;
        roundAtHalfway: any;
        defaultMinutes: any;
        modifiers: any;
        visitVerification: false;
        serviceLocation: any;
        serviceAddress: any;
        procedureInformation: any;
        driveTimeAndMiles: any;
        serviceNotes: any;
        adminNotes: any;
        providerSignature: any;
        clientSignature: any;
        clientSignatureFrom: any;
        requiresAuthorization: any;
        enforceSingleTimesheetConversion: false;
        requireScheduleConversion: false;
        basedOnStartTime: false;
        basedOnEndTime: false;
        clientRate: false;
        lockGracePeriod: any;
    }) =>
        apiClient.post(URLS.saveAuthorizationCode, {
            data: {
                authorizationCodeId,
                name,
                groupId,
                code,
                description,
                codeType,
                therapy,
                enforceRate,
                calculationType,
                defaultUnits,
                defaultServiceLocation,
                minutesPerUnit,
                roundAtHalfway,
                defaultMinutes,
                modifiers,
                visitVerification,
                serviceLocation,
                serviceAddress,
                procedureInformation,
                driveTimeAndMiles,
                serviceNotes,
                adminNotes,
                providerSignature,
                clientSignature,
                clientSignatureFrom,
                requiresAuthorization,
                enforceSingleTimesheetConversion,
                requireScheduleConversion,
                basedOnStartTime,
                basedOnEndTime,
                clientRate,
                lockGracePeriod,
            },
        }),
};
export const editAuthorizationCode = {
    editAuthorizationCodeApi: ({
        authorizationCodeId,
    }: {
        authorizationCodeId: string;
    }) =>
        apiClient.post(URLS.editAuthorizationCode, {
            data: { authorizationCodeId },
        }),
};
