import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DomainsByUserTypeApi } from '../../../api/services/Intervention/getDomainById.service';

const initialState = {
    domain: [],
    loading: false,
};
interface Data {
    providerId: string;
    clientId: string;
}
export const getDomainByUserTypeCall = createAsyncThunk(
    'getDomainByUserTypeCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await DomainsByUserTypeApi.getDomainByType(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const getDomainsByType = createSlice({
    name: 'getDomains',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDomainByUserTypeCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(
                getDomainByUserTypeCall.fulfilled,
                (state: any, action) => {
                    state.domain = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getDomainByUserTypeCall.rejected, (state: any) => {
                state.loading = true;
            });
    },
});

export default getDomainsByType.reducer;
