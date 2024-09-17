import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientAppointmentsApi from '../../../api/services/UserDashboard/clientAppointment.service';
import EmployeeAppointmentsApi from '../../../api/services/UserDashboard/employeeAppointments.service';
import notesApi from '../../../api/services/UserDashboard/notes.service';
import currentGoalApi from '../../../api/services/UserDashboard/currentGoal.service';
import insurancesApi from '../../../api/services/UserDashboard/insurances.service';
import clientSessionApi from '../../../api/services/UserDashboard/clientSession.service';
import getTechnicianAvailabilityDaysAPI from '../../../api/services/UserDashboard/getTechnicianAvailabilityDays.service';
import productivityApi from '../../../api/services/UserDashboard/productivity.service';
import referringProviderApi from '../../../api/services/UserDashboard/referringProvider.service';
import myDocumentsApi from '../../../api/services/UserDashboard/myDocuments.service';
import InquiriesApi from '../../../api/services/UserDashboard/inquiries.services';
import authorizationsCardApi from '../../../api/services/UserDashboard/authorizations.service';
import IntakesApi from '../../../api/services/UserDashboard/intakes.service';
const initialState = {
    ClientAppointment: [],
    employeeAppointment: [],
    notes: [],
    currentGoal: [],
    insurances: [],
    clientSession: [],
    productivity: {},
    referringProvider: [],
    technicianAvailability: [],
    UnapprovedAvailabilityRequest: [],
    myDocuments: [],
    inquiries: [],
    authorizations: [],
    intakes: [],
    loading: false,
};
interface MyData {
    profileUserId: string;
    profileOrgId: string;
}
interface Data {
    profileUserId: string;
    profileOrgId: string;
    name: string;
}
interface Payload {
    profileUserId: string;
    profileOrgId: string;
    currentDate: string;
}
export const ClientAppointmentCall = createAsyncThunk(
    'ClientAppointmentCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await clientAppointmentsApi.clientAppointment(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const employeeAppointmentCall = createAsyncThunk(
    'employeeAppointmentCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await EmployeeAppointmentsApi.employeeAppointment(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const userNotesCall = createAsyncThunk(
    'userNotesCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await notesApi.note(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const currentGoalCall = createAsyncThunk(
    'currentGoalCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await currentGoalApi.currentGoal(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const insuranceCall = createAsyncThunk(
    'insuranceCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await insurancesApi.insurances(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const referringProviderCall = createAsyncThunk(
    'referringProviderCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await referringProviderApi.referringProvider(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const clientSessionCall = createAsyncThunk(
    'clientSessionCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await clientSessionApi.clientSession(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const technicianAvailabilityDaysCall = createAsyncThunk(
    'technicianAvailabilityDaysCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getTechnicianAvailabilityDaysAPI.getTechnicianAvailabilityDays(
                    payload
                );
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getUnapprovedAvailabilityRequestCall = createAsyncThunk(
    'getUnapprovedAvailabilityRequestCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getTechnicianAvailabilityDaysAPI.getUnapprovedAvailabilityRequest(
                    payload
                );
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const productivityCall = createAsyncThunk(
    'productivityCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await productivityApi.productivity(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const myDocumentsCall = createAsyncThunk(
    'myDocumentsCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await myDocumentsApi.myDocument(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const inquiriesCall = createAsyncThunk(
    'inquiriesCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await InquiriesApi.inquiries(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const authorizationsCall = createAsyncThunk(
    'authorizationsCall',
    async (payload: Payload, { rejectWithValue }) => {
        try {
            const res = await authorizationsCardApi.authorizations(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const intakesCall = createAsyncThunk(
    'intakesCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await IntakesApi.Intakes(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const userDashboard = createSlice({
    name: 'userDashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ClientAppointmentCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(ClientAppointmentCall.fulfilled, (state: any, action) => {
                state.ClientAppointment = action.payload;
                state.loading = false;
            })
            .addCase(
                employeeAppointmentCall.fulfilled,
                (state: any, action) => {
                    state.employeeAppointment = action.payload;
                    state.loading = false;
                }
            )
            .addCase(userNotesCall.fulfilled, (state: any, action) => {
                state.notes = action.payload;
                state.loading = false;
            })
            .addCase(currentGoalCall.fulfilled, (state: any, action) => {
                state.currentGoal = action.payload;
                state.loading = false;
            })
            .addCase(insuranceCall.fulfilled, (state: any, action) => {
                state.insurances = action.payload;
                state.loading = false;
            })
            .addCase(clientSessionCall.fulfilled, (state: any, action) => {
                state.clientSession = action.payload;
                state.loading = false;
            })
            .addCase(
                technicianAvailabilityDaysCall.fulfilled,
                (state: any, action) => {
                    state.technicianAvailability = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getUnapprovedAvailabilityRequestCall.fulfilled,
                (state: any, action) => {
                    state.UnapprovedAvailabilityRequest = action.payload;
                    state.loading = false;
                }
            )
            .addCase(productivityCall.fulfilled, (state: any, action) => {
                state.productivity = action.payload;
                state.loading = false;
            })
            .addCase(referringProviderCall.fulfilled, (state: any, action) => {
                state.referringProvider = action.payload;
                state.loading = false;
            })
            .addCase(myDocumentsCall.fulfilled, (state: any, action) => {
                state.myDocuments = action.payload;
                state.loading = false;
            })
            .addCase(inquiriesCall.fulfilled, (state: any, action) => {
                state.inquiries = action.payload;
                state.loading = false;
            })
            .addCase(authorizationsCall.fulfilled, (state: any, action) => {
                state.authorizations = action.payload;
                state.loading = false;
            })
            .addCase(intakesCall.fulfilled, (state: any, action) => {
                state.intakes = action.payload;
                state.loading = false;
            })
            .addCase(ClientAppointmentCall.rejected, (state: any) => {
                state.loading = true;
            });
    },
});
export default userDashboard.reducer;
