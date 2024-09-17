import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/login/loginSlice';
import getInterventionAssignToo from '../redux/slice/Intervention/getAllAssign';
import getMine from './slice/MineSlice/getMine';
import getDomainById from './slice/GetDomainById/getDomainById';
import getProgramsByDomainId from './slice/GetProgramsByDomainId/getProgramsByDomainId';
import createDomain from './slice/CreateDomain/createDomain';
import createProgram from './slice/CreateProgram/createProgram';
import notifications from './slice/Notification/notifications';
import getFiles from './slice/GetFiles/getFiles';
import editDomain from './slice/EditDomain/editDomain';
import templateReducer from './slice/template/templateSlice';
import renameProgram from './slice/RenameProgram/renameProgram';
import editProgram from './slice/EditProgram/editProgram';
import getAllDocument from './slice/GetDocumentById/getAllDocument';
import saveDocument from './slice/SaveClientDocument/saveClientDcument';
import getClientDocument from './slice/GetClientDocument/getClientDocument';
import getProgramBookDataById from './slice/GetProgramBookDataById/getProgramBookDataById';
import getAllClientInquiryDetailsCall from './slice/GetClientInquiryDetails/getClientInquiryDetails';
import saveProgramBookLibrary from './slice/ProgramBookLibrarySlice/saveProgramBookLibrarySlice';
import saveMasterCriteria from './slice/MasterCriteriaSave/masterCriteriaSave';
import getMasteryCriteriaTemplate from './slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import getMasteryCriteriaTemplateById from './slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import getTemplate from './slice/GetTemplate/getTemplate';
import saveProgramBookLibraryDomainFolderData from './slice/ProgramBookLibrarySlice/getProgramBookDomainFolderByUUID';
import clientIntakeDetails from './slice/ClientIntakeDetails/clientIntakeDetails';
import saveProgramBookLibraryDataByID from './slice/ProgramBookLibrarySlice/getProgramBookLibraryDataById';
import addTarget from './slice/saveTarget/saveTarget';
import usersSlice from './slice/users/usersSlice';
import getTarget from './slice/getTarget/getTargetByProgramId';
import getUserByOrganiationId from './slice/getUser/getUserByOrganizationId';
import sessionSlice from './slice/session/sessionSlice';
import runSessionSlice from './slice/runSession/runSessionSlice';
import getPhaseReducer from './slice/SavePhase/getPhaseReducer';
import getStatusReducer from './slice/SaveStatus/getStatusReducer';
import userProfileDataSlice from './slice/UserProfileData/userProfileDataSlice';
import getUserPermission from './slice/getUserPermission/getUserPermissionSlice';
import getComment from './slice/Comments/getComments';
import programBookLibrarySlice from './slice/programBookLibrary/programBookLibrarySlice';
import addFromLibrarySlice from './slice/addFromLibrary/addFromLibrarySlice';
import schedulingSlice from './slice/SchedulingRedux/Scheduling';
import getAllRoles from './slice/GetAllRoles/getAllRolesSlice';
import getServices from './slice/Scheduling/getServices';
import ViewOnly from './slice/ViewOnlyComponent/ViewOnly';
import appointmentSlice from './slice/appointment/appointmentSlice';
import SignatureRedex from './slice/Signature/Signature';
import renameProgramEntity from './slice/RenameEntity/index';
import savePhaseForProgram from './slice/programPhase/getPhaseForProgram';
import organizationByIdSliceReducer from './slice/organizations/organizationByIdSlice';
import EditRoleCallReducer from './slice/EditRole/getRoleById';
import programBookForUserSlice from './slice/ProgramBookByUserChildID/programBookByUserChildID';
import groupSlice from './slice/Group/groupSlice';
import getEmployeeById from './slice/GetEmployeeById/getEmployeeById';
import editAuthorizationCode from './slice/EditAuthorizationCode/editAuthorizationCode';
import metaDataAuthorization from './slice/EditAuthorizationCode/getMetaData';
import serviceTypeByInterventionSlice from './slice/ServiceTypeByInterventionType/serviceTypeByIntervention';
import servicePlacesSlice from './slice/ServicePlaces/getAllServicePlaces';
import getShortTermGoalSlice from './slice/Intervention/getShortTermGoalById';
import getPhasesForIntervention from './slice/Intervention/getAllPhasesForIntervention';
import getDomainsByType from './slice/Intervention/DomainsByUserType';
import allInProgressGoals from './slice/Intervention/InProgressShortTermLongTerm';
import feeScheduleSlice from './slice/FeeSchedule/getFeeSchedule';
import allShotTermGoalSlice from './slice/Intervention/AllNotShortTermGoals';
import customRateSlice from './slice/Rate/customRateSlice';
import LongTermGoalByUserTypeSlice from './slice/Intervention/LongTermGoalsByUserType';
import allDiagnosisCodesSlice from './slice/Intervention/DiagnosisCodeData';
import insurance from './slice/Insurance/insurance';
import authorization from './slice/Authorizations/authorization';
import clientInsuranceSlice from './slice/ClientInsurance/ClientInsurance';
import quickLook from './slice/QuickLook/quickLook';
import InterventionSlice from './slice/InterventionAll/InterventionSlice';
import EditDefaultRate from './slice/DefaultRate/getDefaultRateById';
import GoalLibrarySlice from './slice/GoalLibrary/GoalLibraryData';
import addFromGoalLibrarySlice from './slice/addFromGoalLibrary/addFromGoalLibrarySlice';
import metaData from './slice/MetaDataManagement/metaData';
import getActiveAsyncHistoryReducer from './slice/MineSlice/getOtherGridData';
import userDashboard from './slice/UserDashboardData/userDashboard';
import userDetailsSlice from './slice/userDetails/userDetailsSlice';
import organization from './slice/organizationName/organization';
import questionBankManementSlice from './slice/questionBankManement/questionBankManementSlice';
import intakeEditorSlice from './slice/IntakeEditor/intakeEditor';
import userAccount from './slice/UserAccount/UserAccount';
import mergeClaims from './slice/MergeClaims/mergeClaims';
export const store = configureStore({
    reducer: {
        questionBankManementSlice: questionBankManementSlice,
        getHistory: getActiveAsyncHistoryReducer,
        GoalLibrarySlice: GoalLibrarySlice,
        interventionSlice: InterventionSlice,
        allDiagnosisCodesSlice: allDiagnosisCodesSlice,
        login: loginReducer,
        getMine: getMine,
        getDomainById: getDomainById,
        getProgramsByDomainId: getProgramsByDomainId,
        createDomain: createDomain,
        createProgram: createProgram,
        notifications: notifications,
        getFiles: getFiles,
        editDomain: editDomain,
        template: templateReducer,
        renameProgram: renameProgram,
        editProgram: editProgram,
        getAllDocument: getAllDocument,
        saveDocument: saveDocument,
        getClientDocument: getClientDocument,
        getProgramBookDataById: getProgramBookDataById,
        getAllClientInquiryDetailsCall: getAllClientInquiryDetailsCall,
        saveProgramBookLibrary: saveProgramBookLibrary,
        saveMasterCriteria: saveMasterCriteria,
        getMasteryCriteriaTemplate: getMasteryCriteriaTemplate,
        getMasteryCriteriaTemplateById: getMasteryCriteriaTemplateById,
        saveProgramBookLibraryDomainFolderData:
            saveProgramBookLibraryDomainFolderData,
        clientIntakeDetails: clientIntakeDetails,
        saveProgramBookLibraryDataByID: saveProgramBookLibraryDataByID,
        addTarget: addTarget,
        getTemplate: getTemplate,
        users: usersSlice,
        getTarget: getTarget,
        getUser: getUserByOrganiationId,
        session: sessionSlice,
        runSession: runSessionSlice,
        getPhaseReducer: getPhaseReducer,
        getStatusReducer: getStatusReducer,
        userProfileData: userProfileDataSlice,
        getUserPermission: getUserPermission,
        getComment: getComment,
        programBookLibraries: programBookLibrarySlice,
        addFromLibrary: addFromLibrarySlice,
        scheduling: schedulingSlice,
        getAllRoles: getAllRoles,
        getServices: getServices,
        ViewOnly: ViewOnly,
        appointment: appointmentSlice,
        SignatureRedex: SignatureRedex,
        renameProgramEntity: renameProgramEntity,
        savePhaseForProgram: savePhaseForProgram,
        organizationByIdSlice: organizationByIdSliceReducer,
        EditRole: EditRoleCallReducer,
        programBookForUser: programBookForUserSlice,
        groupOfEmployee: groupSlice,
        getEmployeeById: getEmployeeById,
        editAuthorizationCode: editAuthorizationCode,
        metaDataAuthorization: metaDataAuthorization,
        serviceTypeByInterventionType: serviceTypeByInterventionSlice,
        servicePlacesSlice: servicePlacesSlice,
        getShortTermGoalById: getShortTermGoalSlice,
        interventionPhases: getPhasesForIntervention,
        getInterventionAssignToo: getInterventionAssignToo,
        DomainsByUserType: getDomainsByType,
        allInProgressGoals: allInProgressGoals,
        feeSchedule: feeScheduleSlice,
        allNotInprogressGoals: allShotTermGoalSlice,
        customRateSlice: customRateSlice,
        LongTermGoalByUserType: LongTermGoalByUserTypeSlice,
        insurance: insurance,
        authorization: authorization,
        clientInsurance: clientInsuranceSlice,
        quickLook: quickLook,
        EditDefaultRate: EditDefaultRate,
        addFromGoalLibraries: addFromGoalLibrarySlice,
        metaData: metaData,
        userDashboard: userDashboard,
        userDetails: userDetailsSlice,
        mergeClaims: mergeClaims,
        organization: organization,
        intakeEditor: intakeEditorSlice,
        userAccount: userAccount,
    },
});
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
