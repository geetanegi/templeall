import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getQuickLookAPI from '../../../api/services/QuickLook/getQuickLook.service';
import getAllTargetsByQuickLookAPI from '../../../api/services/QuickLook/getAllTargetsByQuickLook.service';

const initialState = {
    value: [],
    addQuickLook: false,
    targetData: [],
    clickedQuickLook: '',
};

interface MyData1 {
    programBookUUID: any;
}
interface MyData2 {
    quickLookId: any;
}

export const getQuickLookCall = createAsyncThunk(
    'getQuickLookCall',
    async (payload: MyData1, { rejectWithValue }) => {
        try {
            const res = await getQuickLookAPI.getQuickLook(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllTargetsByQuickLookCall = createAsyncThunk(
    'getAllTargetsByQuickLookCall',
    async (payload: MyData2, { rejectWithValue }) => {
        try {
            const res =
                await getAllTargetsByQuickLookAPI.getAllTargetsByQuickLook(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const quickLook = createSlice({
    name: 'quickLook',
    initialState,
    reducers: {
        savingValue: (state, action) => {
            state.value = { ...action.payload };
        },
        savingOnClickQuickLook: (state, action) => {
            state.addQuickLook = action.payload;
        },
        savingTargets: (state, action) => {
            state.targetData = { ...action.payload };
        },
        savingQuickLookId: (state, action) => {
            state.clickedQuickLook = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuickLookCall.pending, () => {})
            .addCase(getQuickLookCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(
                getAllTargetsByQuickLookCall.fulfilled,
                (state: any, action) => {
                    state.targetData = action.payload;
                }
            )
            .addCase(getQuickLookCall.rejected, () => {});
    },
});

export const { savingValue, savingOnClickQuickLook, savingQuickLookId } =
    quickLook.actions;

export default quickLook.reducer;
