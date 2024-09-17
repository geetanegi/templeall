import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ServiceTypeByIntervention from '../../../api/services/Intervention/getServiceTypeByIntervention.service';

const initialState = {
    value: [],
    error: false,
    loading: false,
};

export const serviceTypeByInterventionCall = createAsyncThunk(
    'serviceTypeByInterventionCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await ServiceTypeByIntervention.serviceType();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const serviceTypeByInterventionSlice = createSlice({
    name: 'serviceTypeByInterventionSlice',
    initialState,
    reducers: {
        saveServiceType: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(serviceTypeByInterventionCall.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                serviceTypeByInterventionCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                    state.loading = false;
                }
            )
            .addCase(serviceTypeByInterventionCall.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const { saveServiceType } = serviceTypeByInterventionSlice.actions;

export default serviceTypeByInterventionSlice.reducer;
