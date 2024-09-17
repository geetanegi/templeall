import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAllTarget from '../../../api/services/getAllTarget.service';
import getTargetById from '../../../api/services/Session/getTargetById.service';

const initialState = {
    value: [],
    targetData: '',
    isFromTarget: false,
    SelectedTarget: [],
    clickedTarget: [],
    data: false,
    hideAddToAll: false,
};

interface MyData {
    programId: any;
    hasCriteria?: boolean;
    isTargetPinned: any;
    quickLookId: any;
}
interface targetData {
    targetId: any;
}
export const getTargetCall = createAsyncThunk(
    'getTargetCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getAllTarget?.getTarget(payload);
            return {
                [payload.programId]: res?.data,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getTargetByIdCall = createAsyncThunk(
    'getTargetByIdCall',
    async (payload: targetData, { rejectWithValue }) => {
        try {
            const res = await getTargetById?.getTarget(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const getTarget = createSlice({
    name: 'getTarget',
    initialState,
    reducers: {
        savingGetTargetData: (state, action) => {
            state.value = { ...action.payload };
        },

        getTargetData: (state, action) => {
            state.targetData = { ...action.payload };
        },
        setIsFromTarget: (state, action) => {
            state.isFromTarget = action.payload;
        },
        setHideAddToAll: (state, action) => {
            state.hideAddToAll = action.payload;
        },
        savingSelectedTargetData: (state, action) => {
            state.SelectedTarget = { ...action.payload };
        },
        savingClickedTargetData: (state, action) => {
            state.clickedTarget = { ...action.payload };
        },
        setDataState: (state, action) => {
            state.data = action.payload;
        },
        clearingTargetData: (state: any) => {
            state.value = [];
            state.targetData = '';
            // state.isFromTarget = false;
            state.SelectedTarget = [];
            state.clickedTarget = [];
            state.data = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTargetCall.pending, () => {})
            .addCase(getTargetCall.fulfilled, (state: any, action) => {
                state.value = {
                    ...state.value,
                    ...action.payload,
                };
            })
            .addCase(getTargetByIdCall.fulfilled, (state: any, action) => {
                state.clickedTarget = action.payload;
            })
            .addCase(getTargetCall.rejected, () => {});
    },
});

export const {
    savingGetTargetData,
    getTargetData,
    setIsFromTarget,
    savingSelectedTargetData,
    savingClickedTargetData,
    setDataState,
    clearingTargetData,
    setHideAddToAll,
} = getTarget.actions;

export default getTarget.reducer;
