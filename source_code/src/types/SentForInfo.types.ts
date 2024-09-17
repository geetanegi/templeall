// types.ts
export interface FileState {
    file?: File | null; // Allow file to be null
}

export interface FormValues {
    documents: FileState[];
}

export interface FileInputProps {
    fileState: FileState | null | { file: any }; //
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorState: boolean;
    uploadText: string;
    documentIcon: string;
    uploadIcon: string;
    redIcon: string;
}
export interface InsuranceDetail {
    id: string; // or number, depending on your data
    name: string;
}

// Define the shape of the permissions object

// Interface for the `permission` object
export interface Permission {
    create_program_book: boolean;
    view_program_book: boolean;
    create_program_book_library: boolean;
    view_program_book_library: boolean;
    delete_program_book_library: boolean;
    copy_program_book_library: boolean;
    create_guideline_template: boolean;
    view_guideline_template: boolean;
    copy_guideline_template: boolean;
    delete_guideline_template: boolean;
    publish_guideline_template: boolean;
    create_mastery_criteria_template: boolean;
    view_mastery_criteria_template: boolean;
    copy_mastery_criteria_template: boolean;
    delete_mastery_criteria_template: boolean;
    publish_mastery_criteria_template: boolean;
    create_session: boolean;
    run_session: boolean;
    view_session: boolean;
    delete_session: boolean;
    create_session_note_template: boolean;
    view_session_note_template: boolean;
    copy_session_note_template: boolean;
    delete_session_note_template: boolean;
    create_user: boolean;
    view_user: boolean;
    view_others_calendar: boolean;
    create_appointment: boolean;
    edit_self_created_appointment_details: boolean;
    view_dashboard: boolean;
    create_role_and_permission: boolean;
    create_billing_code: boolean;
    view_billing_code: boolean;
    delete_billing_code: boolean;
    delete_group: boolean;
    create_group: boolean;
    view_group: boolean;
    create_organization: boolean;
    view_organization: boolean;
    delete_organization: boolean;
    view_all_session: boolean;
    edit_all_program_book: boolean;
    edit_self_assgined_program_book: boolean;
    change_assignee_program_book: boolean;
    discharge_program_book: boolean;
    deactivate_billing_code: boolean;
    create_default_rate: boolean;
    view_role_and_permission: boolean;
    delete_role_and_permission: boolean;
    unpublish_mastery_criteria_template: boolean;
    unpublish_guideline_template: boolean;
    unpublish_session_note_template: boolean;
    publish_session_note_template: boolean;
    create_intervention_plan: boolean;
    view_intervention_plan: boolean;
    change_assignee_intervention_plan: boolean;
    discharge_intervention_plan: boolean;
    edit_all_intervention_plan: boolean;
    edit_self_assgined_intervention_plan: boolean;
    delete_billing: boolean;
    preview_billing: boolean;
    pull_session_note: boolean;
    create_goal_library: boolean;
    submit_session_note: boolean;
    add_provider_signature: boolean;
    delete_provider_signature: boolean;
    edit_session_note: boolean;
    delete_session_note: boolean;
    cancel_appointment: boolean;
    delete_goal_library: boolean;
    copy_goal_library: boolean;
    client_upcoming_appointment_card: boolean;
    employee_upcoming_appointment_card: boolean;
    invoice_card: boolean;
    current_goal: boolean;
    my_documents_card: boolean;
    insurances_card: boolean;
    referring_provider_card: boolean;
    client_session_card: boolean;
    notes_card: boolean;
    technician_availablity_card: boolean;
    productivity_card: boolean;
    to_do_list_card: boolean;
    view_other_users_dashboard: boolean;
    authorization_card: boolean;
    inquiries_card: boolean;
    intake_card: boolean;
    create_client_intake: boolean;
    view_client_intake: boolean;
}

// Interface for the `menu` object
export interface Menu {
    program_book: boolean;
    program_book_library: boolean;
    guideline_template: boolean;
    mastery_criteria_template: boolean;
    session: boolean;
    session_note: boolean;
    calendar: boolean;
    billing_codes: boolean;
    groups: boolean;
    roles_and_permissions: boolean;
    users: boolean;
    organizations: boolean;
    intervention_plan: boolean;
    billing: boolean;
    goal_library: boolean;
    client_intake: boolean;
}

// Interface for the `megaMenu` object
export interface MegaMenu {
    CLINICAL: boolean;
    CALENDAR: boolean;
    MENU: boolean;
}

// Interface for the `userRoles` data object
export interface UserRolesData {
    permission: Permission;
    menu: Menu;
    megaMenu: MegaMenu;
    roleId: number;
    roleName: string;
    landingPage: string | null;
}

// Interface for the `userRoles` object
export interface UserRoles {
    description: string | null;
    display: boolean;
    error: boolean;
    data: UserRolesData;
}

// Interface for the `orgName` object
export interface OrgName {
    name: string;
    id: number;
}

// Interface for the main object
export interface MainData {
    value: Record<string, unknown> | { data: { userId: string } }; // Empty object, use Record for dynamic keys
    userRoles: UserRoles;
    permissions: Record<string, unknown>; // Empty object, use Record for dynamic keys
    loading: boolean;
    user: Record<string, unknown>; // Empty object, use Record for dynamic keys
    userId: string;
    orgId: string;
    orgName: OrgName[];
}

// Define the interface for a child

// Define the interface for parent information

// Define the overall data structure
