import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getAllData from '../../../api/services/SchedulingEvent/getAllDataForm.service';

const initialState = {
    location: [],
    error: false,
    loading: false,
};

export const getAllServicePlacesCall = createAsyncThunk(
    'getAllServicePlacesCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllData.servicePlaces();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const servicePlacesSlice = createSlice({
    name: 'servicePlacesSlice',
    initialState,
    reducers: {
        savingServicePlaces: (state, action) => {
            state.location = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllServicePlacesCall.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getAllServicePlacesCall.fulfilled,
                (state: any, action) => {
                    state.location = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getAllServicePlacesCall.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const { savingServicePlaces } = servicePlacesSlice.actions;

export default servicePlacesSlice.reducer;
