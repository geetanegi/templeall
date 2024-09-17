import { URLS } from '../../../../constants';
import apiClient from '../../../client';
const InterventionDataById = {
    saveDomainApi: ({
        interventionPlanId,
        name,
    }: {
        interventionPlanId: any;
        name: any;
    }) =>
        apiClient.post(URLS.addDomainForIntervention, {
            data: {
                interventionPlanId,
                name,
            },
        }),
    getInterventionPlanDataHistoryGrid: ({
        id,
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
    }: {
        id?: any;
        heading: string;
        roleId: string;
        type: string;
        assignedTo: string;
        pagination: {
            startIndex: number;
            noOfRecords: number;
        };
        name: string;
        order: string;
        filterValue: string;
    }) =>
        apiClient.post(URLS.getInterventionPlanDataHistoryUrl, {
            data: {
                id,
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filter: [
                    {
                        filterKey: 'name',
                        filterValue: filterValue || '',
                    },
                ],
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'executedOn',
                },
            },
        }),
    getInterventionPlanDataHistory: ({ id }: { id: any }) =>
        apiClient.post(URLS.getInterventionPlanDataHistoryUrl, {
            data: {
                id,
            },
        }),
    getInterventionPlanDataById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getInterventionPlanDataByIdUrl, {
            data: {
                id,
            },
        }),
    getInterventionDomainDataById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getDomainDataByIdUrl, {
            data: {
                interventionPlanDomainId: id,
            },
        }),
    getLongTermGoalDataById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getLongTermGoalDataByIdUrl, {
            data: {
                interventionPlanLongTermGoalId: id,
            },
        }),
    getShortTermGoalDataById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getShortTermGoalDataByIdUrl, {
            data: {
                interventionPlanShortTermGoalId: id,
            },
        }),
    getInterventionDomains: ({ id, type }: { id?: any; type?: any }) =>
        apiClient.post(URLS.getAllInterventionDomainsUrl, {
            data: {
                interventionPlanId: id,
                type: type,
            },
        }),
    getDomainByType: ({
        providerId,
        clientId,
    }: {
        providerId?: string;
        clientId?: string;
    }) =>
        apiClient.post(URLS.getDomainsByUserType, {
            data: {
                providerId,
                clientId,
            },
        }),
    getInterventionDomainLongTerms: ({ id, type }: { id: any; type: any }) =>
        apiClient.post(URLS.getAllInterventionDomainLongTermGoalUrl, {
            data: {
                interventionPlanDomainId: id,
                type: type,
            },
        }),
    getInterventionDomainLongTermsShortTerms: ({ id }: { id: any }) =>
        apiClient.post(URLS.getAllInterventionDomainLongTermGoalShortTermUrl, {
            data: {
                interventionPlanLongTermGoalId: id,
            },
        }),
    getPrimaryDiagnosisCodes: ({ id }: { id: any }) =>
        apiClient.post(URLS.PrimaryDiagnosisCode, {
            data: {
                clientId: id,
            },
        }),
    getDiagnosisCodes: ({ id }: { id: any }) =>
        apiClient.post(URLS.getAllDiagnosisCodesUrl, {
            data: {
                interventionId: id,
            },
        }),
    getGoalScore: ({ data }: { data: any }) =>
        apiClient.post(URLS.getGoalScoreUrl, { data }),
    getGoalType: ({ data }: { data: any }) =>
        apiClient.post(URLS.getGoalTypeUrl, { data }),
    getGetAllPhase: ({ type }: { type: any }) =>
        apiClient.post(URLS.getAllPhaseForIntervention, {
            data: {
                type,
            },
        }),
    changeStatus: ({ id, phase, type }: { id: any; phase: any; type: any }) =>
        apiClient.post(URLS.savePhaseOfIntervention, {
            data: {
                id,
                type,
                phase,
            },
        }),
    getInterventionPlanFileByInterventionBy: ({
        interventionPlanId,
    }: {
        interventionPlanId: any;
    }) =>
        apiClient.post(URLS.getInterventionPlanFileByInterventionId, {
            data: {
                interventionPlanId,
            },
        }),
    saveClientInterventionDoc: ({
        id,
        interventionPlanId,
        documentDate,
        type,
        name,
        intakeLocation,
        isUserCreated,
        description,
    }: {
        id: any;
        interventionPlanId: any;
        documentDate: any;
        type: any;
        name: any;
        intakeLocation: any;
        isUserCreated: any;
        description: any;
    }) =>
        apiClient.post(URLS.saveInterventionPlanDocument, {
            data: {
                id,
                interventionPlanId,
                documentDate,
                type,
                name,
                intakeLocation,
                isUserCreated,
                description,
            },
        }),
    getInterventionDocumentCall: ({ id }: { id: any }) =>
        apiClient.post(URLS.getInterventionDocument, {
            data: {
                id,
            },
        }),
    getInterventionByInterventionId: ({
        interventionPlanId,
    }: {
        interventionPlanId: any;
    }) =>
        apiClient.post(URLS.getInterventionByInterventionId, {
            data: {
                interventionPlanId,
            },
        }),
    createGoal: ({
        interventionPlanLongTermGoalId,
        interventionPlanDomainId,
        name,
        description,
        isCreatedFromSessionNote,
        shortTermGoalData,
    }: {
        interventionPlanLongTermGoalId: any;
        interventionPlanDomainId: any;
        description: any;
        name: any;
        isCreatedFromSessionNote: any;
        shortTermGoalData: any;
    }) =>
        apiClient.post(URLS.saveLongTermGoal, {
            data: {
                interventionPlanLongTermGoalId,
                interventionPlanDomainId,
                name,
                description,
                isCreatedFromSessionNote,
                shortTermGoalData,
            },
        }),
    createShortGoal: ({
        interventionPlanShortTermGoalId,
        interventionPlanDomainId,
        interventionPlanLongTermGoalId,
        name,
        description,
        isCreatedFromSessionNote,
        attainmentScalingData,
        scoreType,
        goalScore,
    }: {
        interventionPlanShortTermGoalId: any;
        interventionPlanDomainId: any;
        interventionPlanLongTermGoalId: any;
        description: any;
        name: any;
        isCreatedFromSessionNote: any;
        attainmentScalingData: any;
        scoreType: any;
        goalScore: any;
    }) =>
        apiClient.post(URLS.saveShortTermGoal, {
            data: {
                interventionPlanShortTermGoalId,
                interventionPlanDomainId,
                interventionPlanLongTermGoalId,
                name,
                description,
                isCreatedFromSessionNote,
                attainmentScalingData,
                scoreType,
                goalScore,
            },
        }),
    downloadInterventionFile: ({ id }: { id: any }) =>
        apiClient.post(URLS.downloadDocIntervention, {
            data: {
                id,
            },
        }),
    deleteInterventionFile: ({ id }: { id: any }) =>
        apiClient.post(URLS.deleteDocIntervention, {
            data: {
                id,
            },
        }),
    deleteIntervention: ({ type, id }: { type: any; id: any }) =>
        apiClient.post(URLS.deleteIntervention, {
            data: {
                type,
                id,
            },
        }),
};
export default InterventionDataById;
