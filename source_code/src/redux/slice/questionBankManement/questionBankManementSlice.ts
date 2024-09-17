import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import QuestionBankManagementApi from '../../../api/services/QuestionBankManagement/QuestionBankManagementApi.service';

// Define initial state for the slice
const initialState = {
    questionById: [],
    questionType: [],
    status: 'idle',
    error: null,
    answerType: [],
};

// Define the types for the payload
interface FetchQuestionPayload {
    id?: any; // Use an optional id for fetching a single question
}

export const fetchQuestionById = createAsyncThunk(
    'questions/fetchQuestionById',
    async (payload: FetchQuestionPayload, { rejectWithValue }) => {
        try {
            if (payload.id === undefined) {
                throw new Error('ID is required to fetch question by ID');
            }
            const res =
                await QuestionBankManagementApi.questionBankManagementById(
                    payload?.id
                );
            return res.data;
        } catch (err) {
            return rejectWithValue('Error fetching question by ID');
        }
    }
);

export const fetchQuestionQuestionType = createAsyncThunk(
    'questions/fetchQuestionQuestionType',
    async () => {
        try {
            const res = await QuestionBankManagementApi.questionType();
            return res.data;
        } catch (err) {
            return '';
        }
    }
);
export const fetchQuestionAnswerType = createAsyncThunk(
    'questions/fetchQuestionAnswerType',
    async () => {
        try {
            const res = await QuestionBankManagementApi.answerType();
            return res.data;
        } catch (err) {
            return '';
        }
    }
);
const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        // Optional reducers for other actions
        // Example: clearErrors
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Question Grid
        // Fetch Question by ID
        builder
            .addCase(fetchQuestionById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestionById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questionById = action.payload;
            })
            .addCase(fetchQuestionById.rejected, () => {});
        builder
            .addCase(fetchQuestionQuestionType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestionQuestionType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questionType = action.payload;
            })
            .addCase(fetchQuestionQuestionType.rejected, () => {});
        builder
            .addCase(fetchQuestionAnswerType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestionAnswerType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.answerType = action.payload;
            })
            .addCase(fetchQuestionAnswerType.rejected, () => {});
    },
});

// Export actions
export const { clearErrors } = questionsSlice.actions;

// Export reducer
export default questionsSlice.reducer;
