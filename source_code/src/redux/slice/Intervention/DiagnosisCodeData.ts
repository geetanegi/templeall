import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DiagnosisCodeApi } from '../../../api/services/Intervention/DiagnosisCodes.Service';
import { PrimaryDiagnosisCodeApi } from '../../../api/services/Intervention/PrimaryDiagnosisCode.service';

const initialState = {
    value: [],
    PrimaryDiagnosisCode: '',
    error: false,
    loading: false,
};

interface Payload {
    interventionId: any;
}
interface Payload1 {
    clientId: any;
}
export const getAllDiagnosisCodes = createAsyncThunk(
    'InterventionDiagnosisCodesData',
    async (payload: Payload, { rejectWithValue }) => {
        try {
            const res = await DiagnosisCodeApi.DiagnosisCodes(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getPrimaryDiagnosisCode = createAsyncThunk(
    'InterventionPrimaryDiagnosisCodeData',
    async (payload: Payload1, { rejectWithValue }) => {
        try {
            const res =
                await PrimaryDiagnosisCodeApi.PrimaryDiagnosisCodes(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const allDiagnosisCodeSlice = createSlice({
    name: 'InterventionDiagnosisCodes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDiagnosisCodes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllDiagnosisCodes.fulfilled, (state: any, action) => {
                state.value = { ...state.value, ...action.payload };
                state.loading = false;
            })
            .addCase(
                getPrimaryDiagnosisCode.fulfilled,
                (state: any, action) => {
                    state.PrimaryDiagnosisCode = {
                        ...state.value,
                        ...action.payload,
                    };
                    state.loading = false;
                }
            )
            .addCase(getAllDiagnosisCodes.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export default allDiagnosisCodeSlice.reducer;
