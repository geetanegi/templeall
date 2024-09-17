/* eslint-disable max-lines */
export const ROUTES: any = {
    user: '/dashboard',
    home: '/',
    about: '/about',
    questionBankAvailablePage: '/questionBankAvailable',
    clientIntakeSentForInfo: 'client-intake-details-sentInfo/:id',
    programBookDetails: '/program-book',
    programBook: '/program-book/:id',
    programBookView: '/program-book/:id/view',
    clientDocument: '/program-book/:id/client-document',
    domains: '/program-book/:id/domain/:domainId',
    programs: '/program-book/:id/domain/:domainId/program/:programId',
    target: '/program-book/:id/domain/:domainId/program/:programId/target/:targetId',
    masterCriteriaTemplate: '/master-criteria-template-grid',
    ClientInquiryFormPage: '/clientInquiryFormPage',
    postSubmissionIntakeFormPage: '/post-submission-form-page',
    MasteryCriteriaLandingPageUrl: '/mastery-criteria-template',
    programBookMastered: '/program-book/:id/mastered',
    programBookDiscontinued: '/program-book/:id/discontinued',
    //Guideline Template
    guidelineGrid: '/guideline-grid',
    guidelineTemplate: '/guideline-template',
    guidelineTemplateEdit: '/guideline-template/:id',
    guidelineTemplateView: '/guideline-template/view/:id',
    ///Library
    programBookLibrary: '/program-book-library',
    programBookLibraryLanding: '/program-book-library-landing/:id',
    ClientIntakeDetailsPage: '/client-intake-details-grid',
    clinetIntakeDetails: '/client-intake-details',
    phase: '/master-criteria-template/:phase',
    masterCriteriaEdit: '/master-criteria-template/:name/:id',
    masterCriteriaView: '/master-criteria-template/:name/:id/:mode',
    //session
    sessionGrid: '/session-grid',
    sessionNoteGrid: '/session-note-grid',
    sessionCreateNote: '/session-note',
    editSessionNote: '/session-note/:id',
    createSession: '/create-session',
    runSession: '/run-session',
    editSession: '/edit-session',
    viewSession: '/view-session',
    //Login
    LoginPage: '/login',
    RegisterPage: '/register-client',
    OrganizationPage: '/select-organization',
    changePassword: '/change-password',
    changePasswordWithLayout: '/changePassword',
    ForgotPassword: '/forgot-password',
    sendEmail: '/send-email',
    SignUp: '/signUp',
    //LandingPage
    LandingPage: '/landing-page',
    sessionNote: '/session-note',
    addNewEvent: '/add-new-event',
    //Scheduling
    scheduling: '/scheduling',
    appointmentDetails: '/appointment-details',
    //Roles
    RolesGrid: '/roles-grid',
    AddNewRoles: '/add-roles',
    editRole: '/edit-role',
    /// Organizations
    organizationsGrid: '/organizationsGrid',
    organizationsForm: '/organizationsForm',
    organizationsView: '/organizationsView',
    //Authorization Code
    authorizationCodeGrid: '/authorizationCodeGrid',
    AuthorizationCodePage: '/authorization-code-page',
    //Groups
    groupsGrid: '/groupsGrid',
    addNewGroup: '/add-new-group',
    viewGroup: '/view-group',
    // INTERVENTION
    interventionGrid: '/interventionGrid',
    interventionLanding: '/interventionLanding',
    interventionLandingClientDoc:
        '/interventionLanding/:interventionId/clientDoc',
    interventionLandingClientDocView:
        '/interventionLanding/:interventionId/view/clientDoc',
    interventionDomainScreen:
        '/interventionLanding/:interventionId/domain-screen/:domainId',
    interventionDomainScreenView:
        '/interventionLanding/:interventionId/view/domain-screen/:domainId',
    longTermGoal:
        '/interventionLanding/:interventionId/domain-screen/:domainId/longTermGoal/:longTermGoalId',
    longTermGoalScreenView:
        '/interventionLanding/:interventionId/view/domain-screen/:domainId/longTermGoal/:longTermGoalId',
    shortTermGoal:
        '/interventionLanding/:interventionId/domain-screen/:domainId/longTermGoal/:longTermGoalId/shortTermGoal/:shortTermGoalId',
    shortTermGoalScreenView:
        '/interventionLanding/:interventionId/view/domain-screen/:domainId/longTermGoal/:longTermGoalId/shortTermGoal/:shortTermGoalId',
    //Rate
    RateGrid: '/rate-grid',
    DefaultRateGrid: '/DefaultRateGrid',
    //users onboarding
    addInsurance: '/add-insurance',
    viewInsurance: '/view-insurance',
    contactGrid: '/contact-grid',
    addUser: '/add-user',
    viewUser: '/view-user',
    payor: '/payor-setting',
    authorization: '/authorization-setting',
    //billing
    BillingGrid: '/billing',
    bulkClaims: '/bulk-merge-claims',
    //goal library
    goalLibraryPageGrid: '/GoalLibraryGridPage',
    goalLibraryLandingPage: '/GoalLibraryLanding',
    goalLibraryClientDocScreen: '/GoalLibraryLanding/:goalLibraryId/clientDoc',
    goalLibraryLongTermGoalScreen:
        '/GoalLibraryLanding/:goalLibraryId/domain-screen/:domainId/longTermGoal/:longTermGoalId',
    goalLibraryShortTermGoalScreen:
        '/GoalLibraryLanding/:goalLibraryId/domain-screen/:domainId/longTermGoal/:longTermGoalId/shortTermGoal/:shortTermGoalId',
    goalLibraryDomainScreen:
        '/GoalLibraryLanding/:goalLibraryId/domain-screen/:domainId',
    // session History
    sessionHistory: '/sessionHistory',
    // meta data management
    diagnosisCodeGrid: '/diagnosisCode-Grid',
    emailFormattingById: '/emailFormat-by-id/:id',
    // Error
    error404: '/404',
    //claim-inbox
    inboxGrid: '/inbox',
    //intakeForm
    intakeForm: '/organizationsForm/intakeFormBuilder',
    //Dictionary
    DictionaryPage: '/dictionary-grid',
    clientIntakeForm: '/client-intake-grid',
    bulkPayment: '/bulk-payment',
};
export const ENV_URL = process.env.REACT_APP_ENV_URL || '/emr-ui/';
export const BASE_URL =
    process.env.REACT_APP_GATEWAY_URL || 'https://rsh.lumenore.com/emr';
export const URLS = {
    questionType:
        '/core/question-bank-management/get-question-bank-management-question-type',
    answerType:
        '/core/question-bank-management/get-question-bank-management-answer-type',
    saveQuestion:
        '/core/question-bank-management/save-question-bank-management',
    questionById:
        'core/question-bank-management/get-question-bank-management-by-id',
    questionBankManagementGridApi:
        '/core/question-bank-management/get-paginated-question-bank-management',
    questionaBankManagementDelete:
        '/core/question-bank-management/delete-question-bank-management',
    wailistGridApi: '/core/wait-list/get-all-wait-list-data',
    clientIntakeDetailsById: '/core/organization/get-organization-intake-by-id',
    clientIntakeDetailsSave:
        '/core/organization/save-sent-for-information-form',
    saveFile: '/core/organization/save-sent-for-information-file',
    verifyProgramBook: '/core/program-book/verify-program-book-by-clientId',
    verifyIntervention:
        '/core/intervention-plan/verify-intervention-plan-by-clientId',
    saveAssignee: '/core/program-book/edit-program-book-assignee',
    saveGroup: '',
    test: '/test',
    getMine: '/core/program-book/get-all-paginated-program-book',
    getDomainByProgramBookId: '/core/domain/get-domain-by-programBookId',
    getDomainById: '/core/domain/get-domain-by-id',
    getProgramById: '/core/program/get-program-by-id',
    getProgramBookDataById: '/core/program-book/get-program-book-by-id',
    getProgramsByDomainId: '/core/program/get-program-by-domain-id',
    deleteProgramBookEntities: 'core/program-book/delete-program-book-entities',
    createDomain: '/core/domain/create-domain',
    checkDuplicateDomain: '/core/domain/check-duplicate-domain',
    checkDuplicateProgram: '/core/program/check-duplicate-programName',
    createProgram: '/core/program/create-program',
    getFiles: '/core/files/get-program-book-file-by-program-book-id',
    templateGridApiUrl: '/core/template/get-all-template',
    editDomain: '/core/domain/rename-domain',
    uploadDocument: '/core/files/save-program-book-file',
    createTemplate: '/core/template/create-template',
    renameProgram: '/core/program/rename-program',
    editTemplate: '/core/template/edit-template',
    saveDocument: '/core/document/save-program-book-document',
    getDocument: '/core/document/get-program-book-document-by-id',
    editProgram: '/core/program/edit-program',
    findByTemplate: '/core/template/find-by-id-template',
    checkDuplicateTemplate: '/core/template/check-duplicate-template-name',
    getTemplateName: '/core/template/get-all-template-name',
    programTypes: '/core/organization/get-program-data-types',
    getAllDocument:
        '/core/document/get-program-book-document-by-program-book-id',
    getClientInsurance: '/core/organization/get-all-insurance',
    getClientServices: '/core/organization/get-all-services',
    getClientLocations: '/core/organization/get-all-locations',
    getClientAvailabilityStatus: '/core/organization/get-all-status',
    checkDuplicateClientName:
        '/core/document/check-duplicate-program-book-document-name',
    // intake form
    SaveClientInquiryFrom: '/core/organization/save-organization-intake',
    ClientIntakeDetails: '/core/organization/get-all-intakes-by-org-id',
    organizationLocation: '/core/organization/get-organization-location',
    organizationLink: '/core/organization/generate-enquiry-link',
    renameProgramBook: '/core/program-book/rename-program-book',
    setTargetIndex: '/core/target/set-target-index-count',
    getABCData: '/core/abc-data/get-abc-data-by-program-book-id',
    getOrganizationIntakeById:
        '/core/organization/get-organization-intake-by-id',
    organizationName: '/core/organization/get-organization-name-by-code',
    sentForInformation: '/core/organization/send-for-more-info',
    availabilityDropdown: '/core/wait-list/get-all-availability-dropdown-data',
    organizationLocationByCode:
        '/core/organization/get-organization-location-by-code',
    insurancesByCode: '/core/organization/get-all-insurance-by-code',
    servicesByCode: '/core/organization/get-all-services-by-code',
    ///Library
    getProgramBookLibrary: '/core/library/get-all-program-book-library',
    saveProgramBookLibrary: '/core/library/save-program-book-library',
    deleteProgramBookLibrary: '/core/library/delete-program-book-library',
    copyProgramBookLibrary: '/core/library/copy-program-book-library',
    getDomainByProgramBookUUidLibrary: '/core/domain/get-domain-by-library-id',
    getProgramBookLibraryDataById:
        '/core/library/get-program-book-library-by-id',
    renameLibraryName: '/core/library/rename-program-book-library',
    renameDomainLib: '/core/library/rename-program-book-library-domain',
    renameProgramLib: '/core/library/rename-program-book-library-program',
    renameTargetLib: '/core/library/rename-program-book-library-target',
    deleteProgramBookLibraries:
        '/core/library/delete-program-book-library-entities',
    //Master Criteria Template
    saveCriteriaTemplate:
        '/core/mastery-criteria-template/save-criteria-template',
    getMasteryCriteriaTemplate:
        '/core/mastery-criteria-template/get-mastery-criteria-template-by-template-id',
    getMasteryCriteriaTemplateById:
        '/core/mastery-criteria-template/get-mastery-criteria-template-by-id',
    getTemplate: '/core/mastery-criteria-template/get-template-by-id',
    getProgressOrRegress:
        '/core/mastery-criteria-template/get-mastery-criteria-template-auto-progress-or-regress-by-phase',
    publishMasteryCriteria:
        '/core/mastery-criteria-template/publish-mastery-criteria-template',
    unPublishMasteryCriteria:
        '/core/mastery-criteria-template/unpublish-mastery-criteria-template',
    copyMasteryCriteria:
        '/core/mastery-criteria-template/copy-mastery-criteria-template',
    //Master Criteria Form
    getTimeFrame:
        '/core/mastery-criteria-template/get-mastery-criteria-template-timeframe-by-type',
    getAutoProgress:
        '/core/mastery-criteria-template/get-mastery-criteria-template-auto-progress-by-phase',
    getAutoRegress:
        '/core/mastery-criteria-template/get-mastery-criteria-template-auto-regress-by-phase',
    saveCriteriaTemplateForm:
        '/core/mastery-criteria-template/save-mastery-criteria-template',
    isMasteryCardsAvailable:
        'core/mastery-criteria-template/count-of-mastery-criteria-template',
    isToggleChange:
        'core/mastery-criteria-template/change-mastery-criteria-to-general',
    checkStatusActiveAndInactive:
        '/core/mastery-criteria-template/change-mastery-criteria-template-status',
    deleteMaintenance:
        '/core/mastery-criteria-template/delete-maintenance-criteria',
    ///target/create-target
    getTargetById: '/core/target/get-target-by-id',
    saveTarget: '/core/target/create-target',
    checkDuplicateTarget: '/core/target/check-duplicate-target-name',
    getUsers: '/core/organization/get-all-active-employees',
    createClientProgramBook: '/core/program-book/create-program-book',
    renameTarget: '/core/target/rename-target',
    getStatus: '/core/program-book/get-all-status',
    getPhase: '/core/program-book/get-all-phase',
    phaseChange: '/core/program-book/set-phase',
    statusChange: '/core/program-book/set-status',
    editTargets: '/core/target/edit-target',
    // session APIs
    checkDuplicateSessionName: '/core/session/check-duplicate-session-name',
    createSession: '/core/session/create-session',
    getProgramBooksForUser:
        '/core/program-book/get-program-book-by-user-child-id',
    getAllUsers: '/core/organization/get-all-user-child',
    getSessionTargets: '/core/target/get-all-target-by-session-id-and-type',
    getTrialsByTarget: '/core/session/get-all-trails-by-session-target-id',
    runSession: '/core/session/run-session',
    saveTrial: '/core/session/save-trail',
    getSessionById: '/core/session/get-session-by-id',
    endSession: '/core/session/end-session',
    getAllTargetsBySession:
        '/core/session/get-all-session-target-by-session-id',
    sessionHistory: '/core/session/get-session-run-history-data',
    getTargetRunSummary: '/core/session/get-target-run-summary-data',
    editSession: '/core/session/edit-session',
    deleteSession: '/core/session-note/delete-session-note-data-by-id',
    fetchSessionsByClientId: '/core/session/get-all-session-by-client-id',
    fetchSessionSummary:
        '/core/session/get-all-session-run-summary-by-client-id',
    addToSession: '/core/session/add-target-to-session',
    getProgrambookDocumentsByProgramBookId:
        '/core/document/get-program-book-documents-by-programbook-id',
    //add-target-from-program
    getMasteryCriteriaName:
        '/core/mastery-criteria-template/get-mastery-name-by-data-type',
    getPhaseForProgram: '/core/program/get-all-program-phase',
    //session
    getSessionGridData: '/core/session/get-all-session',
    getAllTarget: '/core/target/get-all-target-by-program',
    sessionNote: '/core/session-note/get-all-paginated-session-note-template',
    sessionExistingNote: '/core/session-note/get-all-existing-session-notes',
    //file
    downloadFileUrl: '/core/files/download-file',
    deleteFileURL: '/core/files/delete-program-book-file',
    //user landing
    userProfileData: '/core/user-profile/get-user-profile-by-user-id',
    clientAppointments:
        '/core/client-information/get-upcoming-appointments-data',
    employeeAppointment:
        '/core/client-information/get-technician-upcoming-appointments-data',
    notes: '/core/client-information/get-technician-dashboard-notes-data',
    currentGoal: '/core/client-information/get-current-goal-data',
    insurances:
        '/core/user-insurance/get-child-insurance-providers-by-client-id',
    clientSession: '/core/client-information/get-client-session-data',
    productivity:
        '/core/client-information/get-clinician-dashboard-productivity-data',
    referringProvider:
        '/core/organization/get-referring-providers-by-client-id',
    myDocument: '/core/client-information/get-document-data',
    inquiries:
        './core/client-information/get-intake-coordinator-dashboard-data',
    authorizations:
        '/core/client-information/get-intake-coordinator-authorization-dashboard-data',
    intakes:
        '/core/client-information/get-intake-coordinator-waitlist-dashboard-data',
    primaryRolePermission: '/core/authorization/get-primary-role-permissions',
    //login
    login: '/identity/auth/login',
    changePassword: '/core/auth/change-password',
    getUserPermission: '/core/authorization/get-user-permission',
    sendEmailForForgotPassword: '/identity/auth/forgot-password',
    savePassword: '/core/auth/save-forgot-password-user',
    logout: '/core/auth/logout',
    //comments
    saveComment: '/core/comment/save-comment',
    deleteComment: '/core/comment/delete-comment-by-id',
    getComments: '/core/comment/get-all-comment',
    markRead: '/core/session/mark-comments-as-read',
    saveCommentsByClinician: '/core/comment/save-comment-by-clinician',
    getAllProgramLibraries: '/core/library/get-program-book-libraries',
    addFromLibrary: '/core/program-book/add-from-library',
    //all roles
    getAllRoles: '/core/authorization/get-all-roles',
    //authorization code and billable code
    authorizationBillableCode:
        '/core/authorization-code/get-authorization-code-by-type',
    editAuthorizationCode:
        'core/authorization-code/get-authorization-code-by-id',
    changeBillingStatus: '/core/authorization-code/change-billing-code-status',
    //user onboarding
    getContactGrid: '/core/user-profile/get-all-user-profile',
    getHistoryById: '/core/auth/get-user-history-by-id',
    saveEmployee: '/core/user-profile/save-employee',
    getEmployeeById: '/core/user-profile/get-user-profile-by-id',
    editEmployee: '/core/user-profile/edit-employee',
    primaryDiagnosisCode: '/core/user-profile/get-all-diagnosis-code',
    insurancePlan: '/core/user-insurance/get-all-insurance-plans',
    userChild: '/core/organization/get-user-childs-by-user-id',
    saveClientInsurance: '/core/user-insurance/add-insurance-for-client',
    parentInfo: '/core/user-insurance/fetch-parent-information',
    deleteAuthorizationFile:
        '/core/user-insurance/delete-client-authorization-file-by-id',
    downloadClientInsurance: '/core/user-insurance/download-client-file',
    addOtherPayor: '/core//user-insurance/add-other-payor-for-client',
    getOtherPayor: '/core/user-insurance/get-client-other-payors',
    getOtherPayorById: '/core/user-insurance/get-other-payor-by-id',
    deleteOtherPayors: '/core/user-insurance/delete-other-payor-by-id',
    resetLink: '/core/auth/reset-user-password',
    allSecondaryRoles:
        '/core/authorization/get-pending-roles-after-primary-role-selection',
    //Scheduling
    getClinicianAndTech: '/core/organization/get-all-active-employees',
    getScheduleEvent: '/core/scheduler/get-schedule-event-by-provider-id',
    primaryProvider: 'core/organization/get-all-active-employees',
    placeService: '/core/scheduler/get-all-service-places',
    authorizationNonBillable:
        '/core/authorization-code/get-authorization-code-by-user-id',
    scheduleEvent: '/core/scheduler/schedule-event',
    getScheduleEventById: '/core/scheduler/get-schedule-event-by-id',
    getEventsByProviders: '/core/scheduler/get-schedule-events-by-provider-ids',
    cancelAppointment: '/core/scheduler/cancel-schedule-event',
    getAllUserAndGroupNames: '/core/organization/get-all-user-and-group',
    dragEvent: '/core/scheduler/drag-schedule-event',
    getAllEmployeesAndChild: '/core/organization/get-all-employees-and-child',
    getTechnicianAvailability: '/core/scheduler/get-technician-availability',
    //add new note
    getNoteByCode: '/core/session-note/get-session-note-template-by-id',
    getMultipleNoteByCode:
        '/core/session-note/get-multiple-session-note-template-by-authorization-code',
    saveAddNewNote: '/core/session-note/save-session-note',
    completeScheduleEvent: '/core/scheduler/complete-schedule-event',
    editScheduleEvent: '/core/scheduler/edit-schedule-event',
    checkSessionNoteExists:
        'core/session-note/check-session-note-for-billing-code-appointment',
    downloadSessionNote: 'core/pdf/generate-pdf',
    clientProviderDetails: '/core/organization/get-provider-client-data',
    //roles
    getAllPermission: '/core/authorization/get-all-permissions',
    CreateRole: '/core/authorization/create-role',
    editRole: '/core/authorization/get-permission-by-role-id',
    deleteRole: '/core/authorization/delete-role',
    // organizations
    organizationsGrid: '/core/organization/get-all-paginated-organizations',
    saveOrganizations: '/core/organization/save-organization',
    getOrganizationsById: '/core/organization/get-organization',
    editOrganizationById: '/core/organization/edit-organization',
    getServicePlaces: '/core/scheduler/get-all-master-service-places',
    //Note
    copySessionNote: '/core/session-note/copy-session-note-data',
    getNoteById: '/core/session-note/get-session-note-data-by-id',
    getNameOfNote:
        '/core/session-note/get-session-notes-data-by-appointment-and-authorization-code-id',
    getAllMasteredPrograms: '/core/program/get-all-mastered-programs',
    getAllMasteredTargets: '/core/target/get-all-mastered-targets',
    getTargetTrialData: '/core/session/get-target-trail-data-by-target-id',
    //Authorization Code
    authorizationCodeGrid:
        '/core/authorization-code/get-all-paginated-authorization-code',
    authorizationCodeMetaData:
        '/core/authorization-code/get-authorization-code-metadata',
    saveAuthorizationCode: 'core/authorization-code/save-authorization-code',
    //Groups
    groupsGrid: '/core/organization/get-all-paginated-organizations',
    saveGroupPage: '/core/group/save-group',
    getAllEmployee: '/core/organization/get-all-employees',
    getGroupById: '/core/group/get-group-by-id',
    deleteGroup: '/core/group/delete-group',
    //Guideline Template Grid
    publishGuidelineTemplate: '/core/template/publish-guideline-template',
    unpublishGuidelineTemplate: '/core/template/unpublish-guideline-template',
    copyGuidelineTemplate: '/core/template/copy-guideline-template',
    deleteGuidelineTemplate:
        '/core/template/delete-guideline-template-by-template-id',
    //SessionNote Template Grid
    publishSessionNote: '/core/session-note/publish-session-note-template',
    unpublishSessionNote: '/core/session-note/unpublish-session-note-template',
    copySessionNoteTemplate: '/core/session-note/copy-session-note-template',
    deleteSessionNoteTemplate:
        '/core/session-note/delete-session-note-template-by-template-id',
    groupsGridPage: '/core/group/get-all-group',
    // Intervention
    //Rate
    feeSchedule: '/core/rate/get-all-fee-schedule',
    saveCustomRate: '/core/rate/save-custom-rate',
    customRateGrid: '/core/rate/get-custom-rate-by-authorization-code',
    defaultRateGrid: '/core/rate/get-default-rate-by-authorization-code',
    saveDefaultRate: '/core/rate/save-default-rate',
    allClientForRate: '/core/organization/get-filter-user-child',
    allEmployeeForRate: '/core/organization/get-filter-employee',
    getDefaultRate: '/core//rate/get-default-rate',
    //billing
    billingRateGrid: '/core/billing/get-all-paginated-billing',
    deleteBillingGrid: '/core/billing/delete-billing',
    billingSideModalUrl: 'core/billing/get-billing-by-id',
    billingPrAmtSaveUrl: 'core/billing/save-billing',
    //Insurance
    getInsurancePlan: '/core/user-insurance/get-client-insurance-plans',
    //employee onBoarding Authorization
    getAuthorizations:
        'core/user-insurance/get-user-authorization-by-client-id',
    getAuthorizationById:
        'core/user-insurance/get-user-authorization-setting-data-by-id',
    deleteAuthorization:
        'core/user-insurance/delete-client-authorization-by-id',
    getAuthorizationPatientNames:
        'core/organization/get-user-childs-by-user-id',
    getPayors: '/core/user-insurance/get-all-user-insurance-dropdown-data',
    saveAuthorization: '/core/user-insurance/save-user-authorization-setting',
    editAuthorization: '/core/user-insurance/upload-user-authorization-file',
    getAllABCDropdownData: '/core/abc-data/get-all-abc-data-dropdown',
    saveABCSessionData: '/core/abc-data/save-abc-data',
    diagnosisCodeUrl: '/core/user-profile/get-all-diagnosis-code',
    PrimaryDiagnosisCode:
        'core/user-profile/get-primary-diagnosis-code-by-client-id',
    editInsurance: '/core/user-insurance/get-user-insurance-by-id',
    archiveInsurance: '/core/user-insurance/archive-insurance',
    unarchiveInsurance: '/core/user-insurance/unarchive-insurance',
    clientTherapy: '/core/organization/get-all-therapies-by-organization-id',
    clientTherapyById: '/core/user-insurance/get-desired-therapies-by-child-id',
    //intervention
    getShortTermGoalById:
        '/core/intervention-plan-short-term-goal/get-intervention-plan-short-term-goal-by-id',
    getDomainsByUserType:
        '/core/intervention-plan-domain/get-domains-by-user-type-and-client-of-appointment',
    getInProgressLongTerm:
        '/core/intervention-plan-long-term-goal/get-all-in-progress-long-term-goal',
    getInProgressShortTerm:
        '/core/intervention-plan-short-term-goal/get-all-in-progress-short-term-goal',
    saveAddShortTermGoalTree:
        '/core/intervention-plan-short-term-goal/change-short-term-goal-status-to-in-progress',
    saveAddLongTermGoalTree:
        '/core/intervention-plan-long-term-goal/change-long-term-goal-status-to-in-progress',
    getNotInprogressGoals:
        '/core/intervention-plan-short-term-goal/get-all-not-in-progress-short-term-goal',
    getLongTermGoalsByUserType:
        '/core/intervention-plan-long-term-goal/get-all-not-in-progress-long-term-goal',
    savePhaseOfIntervention: '/core/intervention-plan/set-phase',
    getClientAssignToIntervention:
        '/core/organization/get-all-clinicians-technicians-by-org-id-and-type',
    getClientServicesIntervention:
        '/core/organization/get-intervention-plan-services',
    serviceTypeByIntervention:
        '/core/organization/get-all-services-by-intervention-type',
    InterventionCreate: '/core/intervention-plan/create-intervention-plan',
    addDomainForIntervention:
        '/core/intervention-plan-domain/create-intervention-plan-domain',
    saveLongTermGoal:
        '/core/intervention-plan-long-term-goal/save-intervention-plan-long-term-goal',
    saveShortTermGoal:
        '/core/intervention-plan-short-term-goal/save-intervention-plan-short-term-goal',
    changeAssigneeIntervention:
        '/core/intervention-plan/edit-intervention-plan-assignee',
    InterventionGrid:
        '/core/intervention-plan/get-all-paginated-intervention-plan',
    saveSecondaryDiagnosisCode:
        '/core/intervention-plan/save-secondary-diagnosis-code',
    renameEntitiesUrl:
        '/core/intervention-plan/rename-intervention-plan-entities',
    getInterventionPlanDataByIdUrl:
        '/core/intervention-plan/get-intervention-plan-by-id',
    getInterventionPlanDataHistoryUrl:
        '/core//intervention-plan/get-intervention-plan-history',
    getDomainDataByIdUrl:
        '/core/intervention-plan-domain/get-intervention-plan-domain-by-id',
    getLongTermGoalDataByIdUrl:
        '/core/intervention-plan-long-term-goal/get-intervention-plan-long-term-goal-by-id',
    getShortTermGoalDataByIdUrl:
        '/core/intervention-plan-short-term-goal/get-intervention-plan-short-term-goal-by-id',
    getAllInterventionDomainsUrl:
        '/core/intervention-plan-domain/get-domain-by-intervention-plan-id',
    getAllInterventionDomainLongTermGoalUrl:
        '/core/intervention-plan-long-term-goal/get-long-term-goal-by-intervention-plan-domain-id',
    getAllInterventionDomainLongTermGoalShortTermUrl:
        '/core/intervention-plan-short-term-goal/get-short-term-goal-by-intervention-plan-long-term-goal-id',
    getPrimaryDiagnosisCodeUrl:
        'core/user-profile/get-primary-diagnosis-code-by-client-id',
    getAllDiagnosisCodesUrl: '/core/user-profile/get-all-diagnosis-code',
    getGoalScoreUrl:
        '/core/intervention-plan-short-term-goal/get-goal-score-data',
    getGoalTypeUrl:
        '/core/intervention-plan-short-term-goal/get-intervention-plan-short-term-goal-score-type',
    getAllPhaseForIntervention: '/core/intervention-plan/get-all-phase',
    saveInterventionSave:
        '/core/intervention-plan-file/save-intervention-plan-file',
    getInterventionPlanFileByInterventionId:
        '/core/intervention-plan-file/get-intervention-plan-file-by-intervention-id',
    saveInterventionPlanDocument:
        '/core/intervention-plan-document/save-intervention-plan-document',
    getInterventionDocument:
        '/core/intervention-plan-document/get-intervention-plan-document-by-id',
    getInterventionByInterventionId:
        '/core/intervention-plan-document/get-intervention-plan-documents-by-intervention-id',
    saveScore:
        '/core/intervention-plan-short-term-goal/save-short-term-goal-score',
    getScore:
        '/core/intervention-plan-short-term-goal/get-score-history-by-short-term-goal-id',
    getABCSessionData: '/core/abc-data/get-abc-data-by-session-id',
    allGroups: '/core/authorization-code/get-all-groups-dropdown',
    downloadDocIntervention:
        '/core/intervention-plan-file/download-intervention-file',
    deleteDocIntervention:
        '/core/intervention-plan-file/delete-intervention-file',
    deleteIntervention:
        '/core/intervention-plan/delete-intervention-plan-entities',
    //Pinned QuickLook
    getQuickLook: 'core/quick-look/get-quick-looks-by-program-book-uuid',
    getAllTargetsByQuickLook:
        'core/quick-look/get-all-targets-by-quick-look-id',
    renameQuickLook: 'core/quick-look/rename-quick-look',
    saveTargetsQuickLook: 'core/quick-look/save-targets-quick-look',
    getAllQuickLooksTargets:
        'core/quick-look/get-all-quick-look-targets-by-program-book-uuid',
    //goal library
    copyGoalLibrary: '/core/intervention-library/copy-intervention-library',
    goalLibraryDelete:
        '/core/intervention-library/delete-intervention-library-by-id',
    addGoalLibrary: '/core/intervention-library/save-intervention-library',
    getAllInterventionLibrary:
        'core/intervention-library/get-all-intervention-library',
    deleteInterventionibrary:
        '/core/intervention-library/delete-intervention-library-entities',
    // getAllPhaseForIntervention: '/core/intervention-plan/get-all-phase',
    // saveInterventionSave:
    //     '/core/intervention-plan-file/save-intervention-plan-file',
    // getInterventionPlanFileByInterventionId:
    //     '/core/intervention-plan-file/get-intervention-plan-file-by-intervention-id',
    //Steps Api
    saveStepOrder: '/core/step/set-steps-order',
    editStep: '/core/step/edit-step',
    deleteStep: '/core/step/delete-step-by-id',
    editStepsAddTToAllSteps: '/core/step/add-to-all-steps',
    getGoalLibraryDataByIdUrl:
        '/core/intervention-library/get-intervention-library-by-id',
    getAllGoalLibraryDomainsUrl:
        '/core/intervention-plan-domain/get-intervention-plan-domain-by-library-id',
    addFromGoalLibrary: '/core/intervention-library/add-from-library',
    saveTrialForTaskAnalysis: '/core/session/save-trail-task-analysis',
    // discharge Api
    dischargeProgramBook: '/core/program-book/discharge-program-book',
    dischargeIntervention:
        '/core/intervention-plan/discharge-intervention-plan',
    checkDuplicateInProgramBookLibrary:
        '/core/program-book/check-duplicate-entities',
    checkDuplicateInGoalLibrary:
        '/core/intervention-library/check-duplicate-entities',
    // meta data management
    diagnosisCodeGrid: '/core/diagnosis-code/get-all-paginated-diagnosis-code',
    saveDiagnosisCode: '/core/diagnosis-code/save-diagnosis-code',
    getDiagnosisCodeById: '/core/diagnosis-code/get-diagnosis-code-by-id',
    changeDiagnosisCodeStatus:
        '/core/diagnosis-code/change-diagnosis-code-status',
    insuranceGridUrl: '/core/organization/get-all-paginated-insurance-provider',
    insuranceProviderStatus:
        '/core/organization/change-insurance-activation-status',
    insuranceAddNew: '/core/organization/add-insurance-provider',
    servicesGrid: '/core/organization/get-all-paginated-services',
    emailFormatGrid: '/core/email/get-all-paginated-email-template',
    getEmailById: '/core/email/get-email-template-by-id',
    saveEmail: '/core/email/save-email-template',
    getMultipleUsersOrganizationInfo:
        '/identity/auth/get-multiple-org-user-info',
    changeServiceStatus: '/core/organization/save-service-status',
    programBookHistoryUrl:
        '/core/program-book/get-paginated-program-book-history-data',
    //OTP
    sendOTP: '/core/auth/send-otp',
    verifyOTP: '/identity/auth/verify-otp',
    getShortTermGraphData:
        '/core/intervention-plan-short-term-goal/get-intervention-short-term-goal-graph-data',
    //Availability
    getTechnicianAvailabilityDays:
        '/core/technician-availability-request/get-technician-availability-data',
    getUnapprovedAvailabilityRequest:
        '/core/technician-availability-request/get-unapproved-technician-availability-request',
    addAvailability:
        '/core/technician-availability-request/approve-technician-availability-request',
    saveTechnicianAvailability:
        '/core/technician-availability-request/save-technician-availability-request',
    //Dictionary
    saveOrganizationDictionary: '/core/dictionary/save-organization-dictionary',
    dictionaryGrid: '/core/dictionary/get-paginated-organization-dictionary',
    deleteDictionary: '/core/dictionary/delete-organization-dictionary',
    getOrganizationDictionaryById:
        'core/dictionary/get-organization-dictionary-by-id',
    //dictionary of session note
    getAllWords: '/core/dictionary/get-paginated-dictionary-by-type',
    saveAndEditWords: '/core/dictionary/save-personal-dictionary',
    deleteWords: '/core/dictionary/delete-organization-dictionary',
    //question bank in editor
    getQuestionsAndTherapy:
        'core/question-bank-management/get-organization-specific-questions-data',
    getSelectedQuestion:
        'core/question-bank-organization/get-organization-selected-questions-data',
    saveSelectedQuestion:
        'core/question-bank-organization/save-organization-selected-questions-data',
    addPayment: '/core/billing-amount/add-billing-payment',
    getClientPayors: 'core/billing-amount/get-client-all-payer',
    getPaymentTypes: '/core/billing-amount/get-all-payment-type',
    createFormBuilder: '/core/client-intake-form/save-client-intake-form',
    getClientIntakeForm:
        '/core/client-intake-form/get-paginated-client-intake-form',
    publish: '/core/client-intake-form/publish-client-intake-form',
    unpublish: '/core/client-intake-form/un-publish-client-intake-form',
    // register
    getOrganizationViaIntake:
        '/core/organization/get-organization-intake-by-uniqueId',
    registerUser: '/core/organization/register-user-via-intake',
    paymentGrid: '/core/billing-amount/get-paginated-billing-amount-data',
    voidPayment: '/core/billing-amount/make-payment-as-void',
    getOrganizationEmployee:
        '/core/billing-amount/get-organization-alongside-employee-data',
    //user Account
    userAccount: '/core/user-profile//get-user-details-by-user-id',
    getGrandTotal:
        '/core/billing-amount/get-grand-total-for-all-selected-billing-records',
    getBillingDataByClientIds:
        '/core/billing-amount/get-selected-billing-data-by-client-and-billing-id',
    getAllOwedAmountType: '/core/billing-amount/get-all-owed-amount-type',
    applyBulkPayment: '/core/billing-amount/apply-bulk-payment',
    //Claims
    inboxGridApi: '/core/claims/get-all-paginated-claims',
    deletedClaimGrid: '/core/claims/get-all-deleted-claims',
    deleteClaim: '/core/claims/delete-claim',
    getSelectedBillingData:
        '/core/billing-amount/get-selected-billing-data-for-claim-generation-by-billing-id',
    generateClaim: '/core/claims/save-organization-claim',
    getAllClaimByIdType: '/core/claims/get-all-claim-id-type',
    getClaimById: '/core/claims/get-claim-by-id',
    editClaimProviderSupplier: '/core/claims/edit-claim-provider-supplier',
};
