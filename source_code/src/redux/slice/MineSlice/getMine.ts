/* eslint-disable max-lines */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getMineAPI from '../../../api/services/ProgramBook/getMine.service';
import programBookLibraryApi from '../../../api/services/ProgramBookLibrary/programBookLibraryApi.service';
import guidelineTemplateGridApi from '../../../api/services/GuidelineTemplateGrid/guidelineTemplateGridApi';
import masterCriteriaTemplateGridApi from '../../../api/services/masterCriteriaTemplateGridApi.service';
import getSessionGridApi from '../../../api/services/Session/getSessionGridApi.service';
import getClientIntakeDetailsApi from '../../../api/services/ClientDetails/getClientIntakeDetails.service';
import getSessionNoteGrid from '../../../api/services/Session/getSessionNoteGrid.service';
import getContactGridApi from '../../../api/services/getContactGrid.service';
import getSessionExistingNote from '../../../api/services/Session/getSessionExistingNote.service';
import getAllRolesApi from '../../../api/services/getAllRoles.service';
import OrganizationsGridApi from '../../../api/services/OrganizationsApi/OrganizationsGridApi.service';
import AuthorizedCodeGrid from '../../../api/services/AuthorizationCode/AuthorizationCodeGridApi.service';
import GroupsGridApi from '../../../api/services/Groups/GroupsGridApi.service';
import InterventionGrids from '../../../api/services/Intervention/InterventionGrid.service';
import sessionApis from '../../../api/services/session.service';
import DefaultRateGridApi from '../../../api/services/Rate/DefualtRateGrid.service';
import CustomRateGridApi from '../../../api/services/Rate/CustomRateGrid.service';
import BillingGrids from '../../../api/services/Billing/BillingGrid.service';
import GoalLibrary from '../../../api/services/GoalLibrary/goalLibrary.service';
import InsuranceGridApi from '../../../api/services/Insurance/InsuranceGrid.service';
import diagnosisCodeGridApi from '../../../api/services/MetaDataManagement/diagnosisCodeGrid.service';
import servicesGridApi from '../../../api/services/MetaDataManagement/serivesGrid.service';
import InterventionDataById from '../../../api/services/Intervention/Service/InterventionDataById.service';
import ClaimInboxGridApi from '../../../api/services/ClaimInbox/inboxGrid.service';
import dictionaryGrid from '../../../api/services/Dictionary/dictionaryGrid.service';
import dictionaryOfSessionNote from '../../../api/services/DictionaryOfSessionNote';
import QuestionBankManagementApi from '../../../api/services/QuestionBankManagement/QuestionBankManagementApi.service';
import IntakeEditorApi from '../../../api/services/IntakeEditor/IntakeEditorApi';

const initialState = {
    value: [],
    valueHistory: [],
    loading: false,
    heading: '',
    tab: '',
    tabHistory: '',
    sortingData: {},
    searchValue1: '',
    authorizationCodeId: '',
};
interface MyData {
    id?: any;
    heading: string;
    roleId: any;
    type: any;
    appointmentId?: any;
    authorizationCodeId?: any;
    assignedTo: string | number | any;
    pagination: {
        startIndex: number;
        noOfRecords: number;
    };
    order: string;
    name: string;
    filterValue: any;
    appointmentWith: string;
    publishStatus: string;
    isNotPaginated?: any;
    clientId?: string;
    date?: any;
    providerId?: any;
    authorizationCode?: any;
    serviceProviderId?: any;
    isAvailabilityFilter?: any;
    availabilityFilterList?: any;
}
export const getActiveAsync = createAsyncThunk(
    'getActiveAsync',
    async (payload: MyData, { rejectWithValue }) => {
        switch (payload?.type) {
            case 'SUMMARY':
                try {
                    const res = await sessionApis.fetchSelectedSummary(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'mine':
            case 'all':
            case 'discharged':
                try {
                    const res = await getMineAPI.getMine(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'PROGRAMBOOK_LIBRARY':
                try {
                    const res =
                        await programBookLibraryApi.getProgramBookLibraryGridSliceGridData(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'GUIDELINE_TEMPLATE':
                try {
                    const res =
                        await guidelineTemplateGridApi.getGuidelineTemplateGridData(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'MASTERY_CRITERIA_TEMPLATE':
                try {
                    const res =
                        await masterCriteriaTemplateGridApi.masterCriteriaTemplateGridData(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'SESSION':
            case 'All':
            case 'Mine':
            case 'Discontinued':
                try {
                    const res =
                        await getSessionGridApi.getSessionGridSliceGridData(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'ClIENT_INTAKE_DETAILS':
            case 'New Inquiry':
            case 'Sent for Information':
                try {
                    const res =
                        await getClientIntakeDetailsApi.getClientIntakeDetails(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Waitlist':
                try {
                    const res =
                        await getClientIntakeDetailsApi.getClientIntakeDetailsWaitlist(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'All ':
            case 'allNote':
            case 'Published':
                try {
                    const res =
                        await getSessionNoteGrid.getSessionNoteGridApi(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'mine ':
            case 'all ':
            case 'discharged ':
                try {
                    const res =
                        await InterventionGrids.getInterventionGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Employee':
            case 'Client':
            case 'Users':
                try {
                    const res =
                        await getContactGridApi.getContactDetails(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'SESSION_EXISTING_NOTE':
                try {
                    const res =
                        await getSessionExistingNote.getSessionExistingNoteApi(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'ROLES':
            case 'Roles':
                try {
                    const res = await getAllRolesApi.getAllRoles(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'ORGANIZATIONS':
                try {
                    const res =
                        await OrganizationsGridApi.getOrganizationsGridApi(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'AUTHORIZED_CODE':
                try {
                    const res =
                        await AuthorizedCodeGrid.getAuthorizedGridApi(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'GROUPS':
                try {
                    const res = await GroupsGridApi.getGroupsGridApi(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Custom Rate':
                try {
                    const res =
                        await CustomRateGridApi.getCustomGridApi(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Default Rate':
                try {
                    const res =
                        await DefaultRateGridApi.getDefaultGridApi(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'BILLING':
                try {
                    const res = await BillingGrids.getBillingGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'GOAL_LIBRARY':
                try {
                    const res = await GoalLibrary.getGoalLibraryGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Diagnosis Codes':
                try {
                    const res =
                        await diagnosisCodeGridApi.diagnosisCodeGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Insurances':
                try {
                    const res =
                        await InsuranceGridApi.getInsuranceGridApi(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Services':
                try {
                    const res = await servicesGridApi.servicesGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Email Format':
                try {
                    const res = await servicesGridApi.emailGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'INTERVENTION_HISTORY':
                try {
                    const res =
                        await InterventionDataById.getInterventionPlanDataHistoryGrid(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Deleted':
                try {
                    const res = await ClaimInboxGridApi.deletedClaim(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Inbox':
            case 'Claims Inbox':
                try {
                    const res = await ClaimInboxGridApi.inboxGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Dictionary':
                try {
                    const res = await dictionaryGrid.getDictionaryGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Your Dictionary':
            case 'Organization Dictionary':
                try {
                    const res =
                        await dictionaryOfSessionNote.getAllWords(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Question Bank Management':
                try {
                    const res =
                        await QuestionBankManagementApi.QuestionBankManagementGrid(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Client Intake Forms':
                try {
                    const res = await IntakeEditorApi.getIntakeData(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;

            default:
                break;
        }
    }
);
const getMine = createSlice({
    name: 'getMine',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
        savingHeading: (state, action) => {
            state.heading = { ...action.payload };
        },
        savingTabData: (state, action) => {
            state.tab = action.payload.tab;
        },
        savingTabHistoryData: (state, action) => {
            state.tabHistory = action.payload.tabHistory;
        },
        savingSearchData: (state, action) => {
            state.searchValue1 = action.payload.searchValue1;
        },
        savingAuthCodeId: (state, action) => {
            state.authorizationCodeId = action.payload.authorizationCodeId;
        },
        savingSortingData: (state, action) => {
            state.sortingData = action.payload.sortingData;
        },
        resetData: (state) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getActiveAsync.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getActiveAsync.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(getActiveAsync.rejected, (state: any) => {
                state.loading = true;
            });
    },
});
// Action creators are generated for each case reducer function
export const {
    savingTabHistoryData,
    savingAuthCodeId,
    savingData,
    savingTabData,
    savingSortingData,
    savingHeading,
    savingSearchData,
    resetData,
} = getMine.actions;
export default getMine.reducer;
