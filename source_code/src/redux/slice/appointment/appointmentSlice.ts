import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import schedulingApis from '../../../api/services/scheduling.service';
const initialState = {
    value: {},
    error: false,
    loading: false,
};
interface GetAppointmentData {
    id: string;
}
export const getAppointment = createAsyncThunk(
    'getSessionData',
    async (payload: GetAppointmentData, { rejectWithValue }) => {
        try {
            const res = await schedulingApis.getScheduleEventById(payload);
            return {
                ...res.data.data,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setAppointmentData: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAppointment.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAppointment.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(getAppointment.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});
export const { setAppointmentData } = appointmentSlice.actions;
export default appointmentSlice.reducer;
