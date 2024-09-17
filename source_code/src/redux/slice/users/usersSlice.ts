import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import organizationApis from '../../../api/services/organization.service';
import diagnosisCode from '../../../api/services/Users/primaryDiagnosisCode.service';
import allClientTherapyApi from '../../../api/services/Users/clientTherapies.service';
import getContactGridApi from '../../../api/services/getContactGrid.service';

const initialState = {
    value: [],
    diagnosisCode: [],
    clientTherapies: [],
    clientTherapyById: [],
    profileData: '',
    isFormSubmitted: false,
    error: false,
    loading: false,
    history: [],
};
interface Data {
    childId: any;
}
interface payload {
    id: string;
    organizationSpecificId: string;
}
export const getAllUsers = createAsyncThunk(
    'getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await organizationApis.getAllUsers();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getPrimaryDiagnosisCodeCall = createAsyncThunk(
    'getPrimaryDiagnosisCodeCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await diagnosisCode.getPrimaryDiagnosisCode();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getClientTherapyCall = createAsyncThunk(
    'getClientTherapyCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await allClientTherapyApi.getAllClientTherapy();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getClientTherapyByIdCall = createAsyncThunk(
    'getClientTherapyByIdCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await allClientTherapyApi.getClientTherapyById(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getHistoryById = createAsyncThunk(
    'getHistoryById',
    async (payload: payload, { rejectWithValue }) => {
        try {
            const res = await getContactGridApi.getHistoryById(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersData: (state, action) => {
            state.value = { ...action.payload };
        },
        savingProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        savingValue: (state, action) => {
            state.isFormSubmitted = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(
                getClientTherapyByIdCall.fulfilled,
                (state: any, action) => {
                    state.clientTherapyById = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getPrimaryDiagnosisCodeCall.fulfilled,
                (state: any, action) => {
                    state.diagnosisCode = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getClientTherapyCall.fulfilled, (state: any, action) => {
                state.clientTherapies = action.payload;
                state.loading = false;
            })

            .addCase(getHistoryById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHistoryById.fulfilled, (state: any, action) => {
                state.history = action.payload;
                state.loading = false;
            })
            .addCase(getHistoryById.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const { setUsersData, savingProfileData, savingValue } =
    usersSlice.actions;

export default usersSlice.reducer;
