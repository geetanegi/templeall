import { URLS } from '../../../constants';
import apiClient from '../../client';

const GoalLibraryDataApi = {
    getGoalLibraryDataById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getGoalLibraryDataByIdUrl, {
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
    getGoalLibraryDomains: ({ id }: { id: any }) =>
        apiClient.post(URLS.getAllGoalLibraryDomainsUrl, {
            data: {
                interventionLibraryId: id,
            },
        }),
    getInterventionDomainLongTerms: ({ id }: { id: any }) =>
        apiClient.post(URLS.getAllInterventionDomainLongTermGoalUrl, {
            data: {
                interventionPlanDomainId: id,
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
    saveDomainApi: ({
        interventionLibraryId,
        name,
    }: {
        interventionLibraryId: any;
        name: any;
    }) =>
        apiClient.post(URLS.addDomainForIntervention, {
            data: {
                interventionLibraryId,
                name,
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
        interventionLibraryId,
        interventionPlanDomainId,
        name,
        description,
    }: {
        interventionPlanLongTermGoalId: any;
        interventionLibraryId: any;
        interventionPlanDomainId: any;
        description: any;
        name: any;
    }) =>
        apiClient.post(URLS.saveLongTermGoal, {
            data: {
                interventionPlanLongTermGoalId,
                interventionLibraryId,
                interventionPlanDomainId,
                name,
                description,
            },
        }),
    createGoalShortTerm: ({
        interventionPlanShortTermGoalId,
        interventionLibraryId,
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
        interventionLibraryId: any;
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
                interventionLibraryId,
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
    RenameEntitiesIntervention: ({
        type,
        id,
        name,
        interventionPlanDomainId,
        interventionPlanLongTermGoalId,
        interventionLibraryId,
    }: {
        type:
            | 'INTERVENTION'
            | 'DOMAIN'
            | 'LONG_TERM_GOAL'
            | 'SHORT_TERM_GOAL'
            | 'GOAL_LIBRARY';
        id: number;
        name: string;
        interventionLibraryId: number | undefined;
        interventionPlanDomainId: number | undefined;
        interventionPlanLongTermGoalId: number | undefined;
    }) =>
        apiClient.post(URLS.renameEntitiesUrl, {
            data: {
                type,
                id,
                name,
                interventionPlanDomainId,
                interventionPlanLongTermGoalId,
                interventionLibraryId,
            },
        }),

    deleteGoalLibrary: (id: any) =>
        apiClient.post(URLS.goalLibraryDelete, {
            data: {
                id,
            },
        }),
};

export default GoalLibraryDataApi;
