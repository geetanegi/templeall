import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ShortTermGoalByIdApi from '../../../api/services/Intervention/getShortTermGoal.service';
import saveScoreAndComment from '../../../api/services/Scheduling/saveScoreAndComment.service';

const initialState = {
    ShortTermGoal: {},
    loading: false,
    shortStatus: '',
    longStatus: '',
    checkShortStatus: '',
    checkLongGoalStatus: '',
    score: [],
};
interface Data {
    interventionPlanShortTermGoalId: any;
}
interface MyData {
    shortTermGoalId: any;
}
export const getShortTermGoalByIdCall = createAsyncThunk(
    'getShortTermGoalByIdCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res =
                await ShortTermGoalByIdApi.getShortTermGoalById(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getShortTermScoreCall = createAsyncThunk(
    'getShortTermScoreCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await saveScoreAndComment.getScore(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const getShortTermGoalSlice = createSlice({
    name: 'getShortTermGoalSlice',
    initialState,
    reducers: {
        clearShortTermGoal: (state: any) => {
            state.ShortTermGoal = '';
            state.shortStatus = false;
            state.longStatus = false;
            state.checkShortStatus = false;
            state.checkLongGoalStatus = false;
        },
        setStatusShortTermGoal: (state: any) => {
            state.shortStatus = true;
        },
        setStatusLongTermGoal: (state: any) => {
            state.longStatus = true;
        },
        setStatusShortTermGoalFromCheck: (state: any) => {
            state.checkShortStatus = true;
        },
        setStatusLongTermGoalFromCheck: (state: any) => {
            state.checkLongGoalStatus = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShortTermGoalByIdCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(
                getShortTermGoalByIdCall.fulfilled,
                (state: any, action) => {
                    state.ShortTermGoal = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getShortTermScoreCall.fulfilled, (state: any, action) => {
                state.score = action.payload;
                state.loading = false;
            })
            .addCase(getShortTermGoalByIdCall.rejected, (state: any) => {
                state.loading = true;
            });
    },
});

export const {
    clearShortTermGoal,
    setStatusShortTermGoal,
    setStatusLongTermGoal,
    setStatusShortTermGoalFromCheck,
    setStatusLongTermGoalFromCheck,
} = getShortTermGoalSlice.actions;

export default getShortTermGoalSlice.reducer;
