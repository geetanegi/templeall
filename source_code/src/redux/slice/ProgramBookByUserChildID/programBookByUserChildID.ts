import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import programBookApis from '../../../api/services/programbook.service';

const initialState = {
    value: [],
    error: false,
    loading: false,
};
interface data {
    userChildId: any;
    programBookByUserId: any;
}

export const getProgramBookForUserCall = createAsyncThunk(
    'getProgramBookForUserCall',
    async (payload: data, { rejectWithValue }) => {
        try {
            const res = await programBookApis.getProgramBooksForUser(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const programBookForUserSlice = createSlice({
    name: 'programBookForUserSlice',
    initialState,
    reducers: {
        savingProgrambookForUser: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProgramBookForUserCall.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getProgramBookForUserCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getProgramBookForUserCall.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const { savingProgrambookForUser } = programBookForUserSlice.actions;

export default programBookForUserSlice.reducer;
