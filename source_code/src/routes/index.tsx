/* eslint-disable max-lines */
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants';
import LoaderComponent from '../components/LoaderComponent';
import PrivateRoute from './PrivateRoute';
import { lazy } from '@loadable/component';
import ErrorBoundary from './ErrorBoundary';
const Home = lazy(() => import('../pages/Home'));
const ProgramBook = lazy(() => import('../pages/ProgramBook'));
const ClientDocuments = lazy(() => import('../pages/ClientDocuments'));
const GuidelineTemplate = lazy(() => import('../pages/GuidelineTemplate'));
const DomainsPage = lazy(() => import('../pages/DomainsPage'));
const ProgramsPage = lazy(() => import('../pages/ProgramsPage'));
const GuidelineTemplateGridPage = lazy(
    () => import('../pages/GuidelineTemplateGridPage')
);
const IntakeFormBuilder = lazy(() => import('../pages/IntakeFormBuilder'));
const MasteryCriteriaTemplateGridPage = lazy(
    () => import('../pages/MasteryCriteriaTemplatePage')
);
const MasteryCriteriaLandingPage = lazy(
    () => import('../pages/MasterCriteriaLandingPage')
);
const ProgramBookPageMastered = lazy(
    () => import('../pages/ProgramBookPageMastered')
);
const ProgramBookPageDiscontinued = lazy(
    () => import('../pages/ProgramBookPageDiscontinued')
);
const MasterCriteriaPhase = lazy(() => import('../pages/MasterCriteriaPhase'));
const ProgramBookLibraryGridPage = lazy(
    () => import('../pages/ProgramBookLibraryGridPage')
);
const ClientIntakeDetailsPage = lazy(
    () => import('../pages/ClientIntakeDetailsPage')
);
const DictionaryPage = lazy(() => import('../pages/DictionaryPage'));
const CreateSession = lazy(() => import('../pages/CreateSession'));
const PostSubmissionIntakeFormPage = lazy(
    () => import('../pages/PostSubmissionFormPage')
);
const SessionGridPage = lazy(() => import('../pages/SessionGridPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const OrganizationPage = lazy(
    () => import('../pages/Organization/OrganizationPage')
);
const ChangePasswordPage = lazy(() => import('../pages/ChangePasswordPage'));
const ChangePasswordPageWithLayout = lazy(
    () => import('../pages/changePasswordPageWithLayout')
);
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const SignUpPage = lazy(() => import('../pages/SignupPage'));
const TargetPage = lazy(() => import('../pages/TargetPage'));
const ClientDashboardPage = lazy(() => import('../pages/ClientDashboardPage'));
const RunSession = lazy(() => import('../pages/RunSession'));
const SessionNoteGridPage = lazy(() => import('../pages/SessionNoteGridPage'));
const ContactGridPage = lazy(() => import('../pages/ContactGridPage'));
const ClientIntakeGridPage = lazy(
    () => import('../pages/ClientIntakeGridPage')
);
const EditClaimPage = lazy(() => import('../pages/EditClaimPage'));
const SchedullingPage = lazy(() => import('../pages/SchedullingPage'));
const SchedulingCal = lazy(() => import('../pages/SchedulingCal'));
const EmployeeOnBoardingFormPage = lazy(
    () => import('../pages/EmployeeOnBoardingFormPage')
);
const PayorPage = lazy(() => import('../pages/PayorPage'));
const AuthorizationCodePage = lazy(
    () => import('../pages/AuthorizationCodePage')
);
const AppointmentDetails = lazy(() => import('../pages/AppointmentDetails'));
const RolesGridPage = lazy(() => import('../pages/RolesGridPage'));
const AddRolesPage = lazy(() => import('../pages/AddRolesPage'));
const OrganizationsGridPage = lazy(
    () => import('../pages/Organization/OrganizationsGridPage')
);
const OrganizationsFormPage = lazy(
    () => import('../pages/Organization/OrganizationsFormPage')
);
const ProgramBookGridPage = lazy(() => import('../pages/ProgramBookGridPage'));
const OrgViewPage = lazy(() => import('../pages/OrgViewPage'));
const withPrivateRoute = (element: any): React.JSX.Element => {
    return <PrivateRoute>{element}</PrivateRoute>;
};
const InterventionLandingPage = lazy(
    () => import('../pages/Intervention/InterventionPage')
);
const InterventionPageMastered = lazy(
    () => import('../pages/Intervention/InterventionPageMastered')
);
const InterventionPageDiscontinued = lazy(
    () => import('../pages/Intervention/InterventionPageDiscontinued')
);
const InterventionDomainScreen = lazy(
    () => import('../pages/Intervention/InterventionDomainScreen')
);
const InterventionLongTermGoalScreen = lazy(
    () => import('../pages/Intervention/LongTermGoalScreen')
);
const InterventionShortTermGoalScreen = lazy(
    () => import('../pages/Intervention/ShortTermGoalScreen')
);
const RateGridPage = lazy(() => import('../pages/RateGridPage'));
const AddInsurancePage = lazy(
    () => import('../pages/AddInsuranceUserOnboardingPage')
);
//goal library
const GoalLibraryLandingPage = lazy(
    () => import('../pages/GoalLibrary/GoalLibraryLandingPage')
);
const DomainScreen = lazy(
    () => import('../pages/GoalLibrary/GoalLibraryDomainScreen')
);
const LongTermScreen = lazy(
    () => import('../pages/GoalLibrary/GoalLibraryLongTermScreen')
);
const ShortTermScreen = lazy(
    () => import('../pages/GoalLibrary/GoalLibraryShortTermScreen')
);
const GoalLibraryGridPage = lazy(
    () => import('../pages/GoalLibrary/GoalLibraryGridPage')
);
// meta data management
const DiagnosisCodeGridPage = lazy(
    () => import('../pages/MetaDataManagementPages/diagnosisCodeGridPage')
);
const EmailFormatPage = lazy(
    () => import('../pages/MetaDataManagementPages/EmailFormattingGrid')
);
const GroupsGridPage = lazy(() => import('../pages/GroupsGridPage'));
const AddNewGroupPage = lazy(() => import('../pages/AddNewGroupPage'));
const AuthorizationCodeGridPage = lazy(
    () => import('../pages/AuthorizationCodeGridPage')
);
const InterventionGridPage = lazy(
    () => import('../pages/Intervention/InterventionGridPage')
);
const SendEmailPage = lazy(
    () => import('../pages/SendEmailForForgotPasswordPage')
);
const BillingGridPage = lazy(() => import('../pages/BillingGridPage'));
const BulkMergeClaims = lazy(() => import('../pages/BulkMergeClaims'));
const EmployeeAuthorizationPage = lazy(
    () => import('../pages/EmployeeAuthorizationPage')
);
const ClientDocForIntervention = lazy(
    () => import('../pages/Intervention/ClientDocForIntervention')
);
const ClientIntakePage = lazy(() => import('../pages/ClientIntakePage'));
const SentForInformationPage = lazy(
    () => import('../pages/ClientIntakeDetails/SentForInformationPage')
);
const ClientInquiryFormPage = lazy(
    () => import('../pages/ClientInquiryFormPage')
);
const Error404Page = lazy(() => import('../pages/Error404Page'));
const QuestionBankAvailablePage = lazy(
    () => import('../pages/QuestionBankAvailablePage/QuestionBankAvailablePage')
);
const InboxGridPage = lazy(() => import('../pages/InboxGridPage'));
const BulkPaymentPage = lazy(() => import('../pages/BulkPayment'));
export default function RoutesComponent(): React.JSX.Element {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoaderComponent />}>
                <Routes>
                    <Route
                        path={ROUTES.questionBankAvailablePage}
                        element={<QuestionBankAvailablePage />}
                    />
                    <Route
                        path={`client-intake-details-sentInfo/:id/view`}
                        element={<SentForInformationPage />}
                    />
                    <Route
                        path={ROUTES.clientIntakeSentForInfo}
                        element={<SentForInformationPage />}
                    />
                    {/* session pages */}
                    <Route
                        path={ROUTES.sessionGrid}
                        element={withPrivateRoute(<SessionGridPage />)}
                    />
                    <Route
                        path={ROUTES.programBookDetails}
                        element={withPrivateRoute(<ProgramBookGridPage />)}
                    />
                    <Route
                        path={ROUTES.sessionNoteGrid}
                        element={withPrivateRoute(<SessionNoteGridPage />)}
                    />
                    <Route
                        path={ROUTES.createSession}
                        element={withPrivateRoute(<CreateSession />)}
                    />
                    <Route
                        path={`${ROUTES.editSession}/:id`}
                        element={withPrivateRoute(<CreateSession />)}
                    />
                    <Route
                        path={`${ROUTES.runSession}/:id`}
                        element={withPrivateRoute(<RunSession />)}
                    />
                    <Route
                        path={`${ROUTES.viewSession}/:id`}
                        element={withPrivateRoute(<RunSession />)}
                    />
                    {/* session pages end  */}
                    {/* Templates */}
                    <Route
                        path={ROUTES.guidelineGrid}
                        element={withPrivateRoute(
                            <GuidelineTemplateGridPage />
                        )}
                    />
                    <Route
                        path={ROUTES.guidelineTemplate}
                        element={withPrivateRoute(<GuidelineTemplate />)}
                    />
                    <Route
                        path={ROUTES.intakeForm}
                        element={withPrivateRoute(<IntakeFormBuilder />)}
                    />
                    <Route
                        path={ROUTES.guidelineTemplateEdit}
                        element={withPrivateRoute(<GuidelineTemplate />)}
                    />
                    <Route
                        path={ROUTES.guidelineTemplateView}
                        element={withPrivateRoute(<GuidelineTemplate />)}
                    />
                    <Route
                        path={ROUTES.masterCriteriaTemplate}
                        element={withPrivateRoute(
                            <MasteryCriteriaTemplateGridPage />
                        )}
                    />
                    <Route
                        path={ROUTES.MasteryCriteriaLandingPageUrl}
                        element={withPrivateRoute(
                            <MasteryCriteriaLandingPage />
                        )}
                    />
                    <Route
                        path={ROUTES.masterCriteriaEdit}
                        element={withPrivateRoute(
                            <MasteryCriteriaLandingPage />
                        )}
                    />
                    <Route
                        path={ROUTES.masterCriteriaView}
                        element={withPrivateRoute(
                            <MasteryCriteriaLandingPage />
                        )}
                    />
                    {/* Template page end */}
                    {/* Library */}
                    <Route
                        path={ROUTES.programBookLibrary}
                        element={withPrivateRoute(
                            <ProgramBookLibraryGridPage />
                        )}
                    />
                    {/* Library page end */}
                    <Route
                        path={ROUTES.programBook}
                        element={withPrivateRoute(<ProgramBook />)}
                    />
                    <Route
                        path={ROUTES.programBookView}
                        element={withPrivateRoute(<ProgramBook />)}
                    />
                    <Route
                        path={ROUTES.programs}
                        element={withPrivateRoute(<ProgramsPage />)}
                    />
                    <Route
                        path={ROUTES.domains}
                        element={withPrivateRoute(<DomainsPage />)}
                    />
                    <Route
                        path={ROUTES.programBookMastered}
                        element={withPrivateRoute(<ProgramBookPageMastered />)}
                    />
                    <Route
                        path={ROUTES.programBookDiscontinued}
                        element={withPrivateRoute(
                            <ProgramBookPageDiscontinued />
                        )}
                    />
                    <Route
                        path={ROUTES.target}
                        element={withPrivateRoute(<TargetPage />)}
                    />
                    <Route
                        path={ROUTES.clientDocument}
                        element={withPrivateRoute(<ClientDocuments />)}
                    />
                    <Route
                        path={ROUTES.phase}
                        element={withPrivateRoute(<MasterCriteriaPhase />)}
                    />
                    {/* Client Intake page */}
                    <Route
                        path={`${ROUTES.ClientInquiryFormPage}/:id`}
                        element={<ClientInquiryFormPage />}
                    />
                    <Route
                        path={ROUTES.ClientIntakeDetailsPage}
                        element={withPrivateRoute(<ClientIntakeDetailsPage />)}
                    />
                    <Route
                        path={ROUTES.DictionaryPage}
                        element={withPrivateRoute(<DictionaryPage />)}
                    />
                    <Route
                        path={ROUTES.postSubmissionIntakeFormPage}
                        element={withPrivateRoute(
                            <PostSubmissionIntakeFormPage />
                        )}
                    />
                    {/* Client Intake page end */}
                    {/* Login n Dashboard */}
                    <Route path={ROUTES.LoginPage} element={<LoginPage />} />
                    <Route
                        path={ROUTES.RegisterPage}
                        element={<RegisterPage />}
                    />
                    <Route
                        path={ROUTES.OrganizationPage}
                        element={<OrganizationPage />}
                    />
                    <Route
                        path={ROUTES.changePassword}
                        element={withPrivateRoute(<ChangePasswordPage />)}
                    />
                    <Route
                        path={ROUTES.changePasswordWithLayout}
                        element={<ChangePasswordPageWithLayout />}
                    />
                    <Route
                        path={ROUTES.ForgotPassword}
                        element={<ForgotPasswordPage />}
                    />
                    <Route path={ROUTES.SignUp} element={<SignUpPage />} />
                    <Route
                        path={ROUTES.sendEmail}
                        element={<SendEmailPage />}
                    />
                    <Route
                        path={`${ROUTES.user}/:userId/:orgId`}
                        element={withPrivateRoute(<ClientDashboardPage />)}
                    />
                    <Route
                        path={ROUTES.LandingPage}
                        element={withPrivateRoute(<ClientDashboardPage />)}
                    />
                    {/* Login n Dashboard end*/}
                    {/* session note */}
                    <Route
                        path={ROUTES.sessionNote}
                        element={withPrivateRoute(<GuidelineTemplate />)}
                    />
                    <Route
                        path={ROUTES.editSessionNote}
                        element={withPrivateRoute(<GuidelineTemplate />)}
                    />
                    {/*user onBoarding form */}
                    <Route
                        path={ROUTES.addUser}
                        element={withPrivateRoute(
                            <EmployeeOnBoardingFormPage />
                        )}
                    />
                    <Route
                        path={`${ROUTES.addUser}/:id`}
                        element={withPrivateRoute(
                            <EmployeeOnBoardingFormPage />
                        )}
                    />
                    <Route
                        path={`${ROUTES.viewUser}/:id`}
                        element={withPrivateRoute(
                            <EmployeeOnBoardingFormPage />
                        )}
                    />
                    <Route
                        path={ROUTES.authorization}
                        element={withPrivateRoute(
                            <EmployeeAuthorizationPage />
                        )}
                    />
                    <Route
                        path={ROUTES.payor}
                        element={withPrivateRoute(<PayorPage />)}
                    />
                    <Route
                        path={ROUTES.contactGrid}
                        element={withPrivateRoute(<ContactGridPage />)}
                    />
                    <Route
                        path={ROUTES.clientIntakeForm}
                        element={withPrivateRoute(<ClientIntakeGridPage />)}
                    />
                    <Route
                        path={ROUTES.addNewEvent}
                        element={withPrivateRoute(<SchedullingPage />)}
                    />
                    <Route
                        path={ROUTES.scheduling}
                        element={withPrivateRoute(<SchedulingCal />)}
                    />
                    <Route
                        path={`${ROUTES.appointmentDetails}/:id`}
                        element={withPrivateRoute(<AppointmentDetails />)}
                    />
                    <Route
                        path={ROUTES.addInsurance}
                        element={withPrivateRoute(<AddInsurancePage />)}
                    />
                    <Route
                        path={ROUTES.viewInsurance}
                        element={withPrivateRoute(<AddInsurancePage />)}
                    />
                    {/* roles */}
                    <Route
                        path={ROUTES.RolesGrid}
                        element={withPrivateRoute(<RolesGridPage />)}
                    />
                    <Route
                        path={ROUTES.AddNewRoles}
                        element={withPrivateRoute(<AddRolesPage />)}
                    />
                    <Route
                        path={`${ROUTES.editRole}/:id`}
                        element={withPrivateRoute(<AddRolesPage />)}
                    />
                    <Route
                        path={`${ROUTES.AuthorizationCodePage}/:id`}
                        element={withPrivateRoute(<AuthorizationCodePage />)}
                    />
                    <Route
                        path={ROUTES.AuthorizationCodePage}
                        element={withPrivateRoute(<AuthorizationCodePage />)}
                    />
                    {/*organizationsGrid*/}
                    <Route
                        path={ROUTES.organizationsGrid}
                        element={withPrivateRoute(<OrganizationsGridPage />)}
                    />
                    <Route
                        path={ROUTES.organizationsForm}
                        element={withPrivateRoute(<OrganizationsFormPage />)}
                    />
                    <Route
                        path={ROUTES.organizationsView}
                        element={withPrivateRoute(<OrgViewPage />)}
                    />
                    <Route
                        path={ROUTES.authorizationCodeGrid}
                        element={withPrivateRoute(
                            <AuthorizationCodeGridPage />
                        )}
                    />
                    {/* group */}
                    <Route
                        path={ROUTES.groupsGrid}
                        element={withPrivateRoute(<GroupsGridPage />)}
                    />
                    <Route
                        path={ROUTES.addNewGroup}
                        element={withPrivateRoute(<AddNewGroupPage />)}
                    />
                    <Route
                        path={`${ROUTES.addNewGroup}/:id`}
                        element={withPrivateRoute(<AddNewGroupPage />)}
                    />
                    <Route
                        path={`${ROUTES.viewGroup}/:id`}
                        element={withPrivateRoute(<AddNewGroupPage />)}
                    />{' '}
                    <Route
                        path={`${ROUTES.clinetIntakeDetails}/:id`}
                        element={withPrivateRoute(<ClientIntakePage />)}
                    />
                    <Route
                        path={ROUTES.home}
                        element={withPrivateRoute(<Home />)}
                    />
                    <Route
                        path={ROUTES.interventionGrid}
                        element={withPrivateRoute(<InterventionGridPage />)}
                    />
                    <Route
                        path={ROUTES.BillingGrid}
                        element={withPrivateRoute(<BillingGridPage />)}
                    />
                    <Route
                        path={ROUTES.bulkPayment}
                        element={withPrivateRoute(<BulkPaymentPage />)}
                    />
                    <Route
                        path={ROUTES.bulkClaims}
                        element={withPrivateRoute(<BulkMergeClaims />)}
                    />
                    {/* Rate */}
                    <Route
                        path={ROUTES.RateGrid}
                        element={withPrivateRoute(<RateGridPage />)}
                    />
                    {/* intervention */}
                    <Route
                        path={`${ROUTES.interventionLanding}/:id`}
                        element={withPrivateRoute(<InterventionLandingPage />)}
                    />
                    <Route
                        path={`${ROUTES.interventionLanding}/:id/MASTERED`}
                        element={withPrivateRoute(<InterventionPageMastered />)}
                    />
                    <Route
                        path={`${ROUTES.interventionLanding}/:id/DISCONTINUED`}
                        element={withPrivateRoute(
                            <InterventionPageDiscontinued />
                        )}
                    />
                    <Route
                        path={`${ROUTES.interventionLanding}/:id/view`}
                        element={withPrivateRoute(<InterventionLandingPage />)}
                    />
                    <Route
                        path={ROUTES.interventionLandingClientDoc}
                        element={withPrivateRoute(<ClientDocForIntervention />)}
                    />
                    <Route
                        path={ROUTES.interventionLandingClientDocView}
                        element={withPrivateRoute(<ClientDocForIntervention />)}
                    />
                    <Route
                        path={`${ROUTES.interventionDomainScreen}`}
                        element={withPrivateRoute(<InterventionDomainScreen />)}
                    />
                    <Route
                        path={`${ROUTES.interventionDomainScreenView}`}
                        element={withPrivateRoute(<InterventionDomainScreen />)}
                    />
                    <Route
                        path={ROUTES.longTermGoal}
                        element={withPrivateRoute(
                            <InterventionLongTermGoalScreen />
                        )}
                    />
                    <Route
                        path={ROUTES.longTermGoalScreenView}
                        element={withPrivateRoute(
                            <InterventionLongTermGoalScreen />
                        )}
                    />
                    <Route
                        path={ROUTES.shortTermGoal}
                        element={withPrivateRoute(
                            <InterventionShortTermGoalScreen />
                        )}
                    />
                    <Route
                        path={ROUTES.shortTermGoalScreenView}
                        element={withPrivateRoute(
                            <InterventionShortTermGoalScreen />
                        )}
                    />
                    {/* goal Library */}
                    <Route
                        path={ROUTES.goalLibraryPageGrid}
                        element={withPrivateRoute(<GoalLibraryGridPage />)}
                    />
                    <Route
                        path={`${ROUTES.goalLibraryLandingPage}/:id`}
                        element={withPrivateRoute(<GoalLibraryLandingPage />)}
                    />
                    <Route
                        path={ROUTES.goalLibraryShortTermGoalScreen}
                        element={withPrivateRoute(<ShortTermScreen />)}
                    />
                    <Route
                        path={`${ROUTES.goalLibraryDomainScreen}`}
                        element={withPrivateRoute(<DomainScreen />)}
                    />
                    <Route
                        path={ROUTES.goalLibraryLongTermGoalScreen}
                        element={withPrivateRoute(<LongTermScreen />)}
                    />
                    {/* meta data management */}
                    <Route
                        path={ROUTES.diagnosisCodeGrid}
                        element={withPrivateRoute(<DiagnosisCodeGridPage />)}
                    />
                    <Route
                        path={ROUTES.emailFormattingById}
                        element={withPrivateRoute(<EmailFormatPage />)}
                    />
                    {/* Error */}
                    <Route path={ROUTES.error404} element={<Error404Page />} />
                    <Route path={'*'} element={<Error404Page />} />
                    {/* claim-inbox */}
                    <Route
                        path={ROUTES.inboxGrid}
                        element={withPrivateRoute(<InboxGridPage />)}
                    />
                    <Route
                        path={`${ROUTES.inboxGrid}/:id`}
                        element={withPrivateRoute(<EditClaimPage />)}
                    />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
}
