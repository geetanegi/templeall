import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import sessionApis from '../../../api/services/session.service';

const initialState = {
    value: {
        targets: [],
        session: <any>{},
        trials: <any>{},
        sessionData: <any>{},
        sessionRunId: '',
    },
    error: false,
    loading: false,
};

interface GetSession {
    sessionId: any;
    type: string;
}

interface RunSession {
    sessionId: string;
    createdBy: number;
    modifiedBy: number;
    startTime: string;
}

interface GetSessionData {
    sessionId: string;
}

export const getSessionTargets = createAsyncThunk(
    'getSessionCall',
    async (payload: GetSession, { rejectWithValue }) => {
        try {
            const res = await sessionApis.getSessionTargets(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

export const runSession = createAsyncThunk(
    'runSessionCall',
    async (payload: RunSession, { rejectWithValue }) => {
        try {
            const res = await sessionApis.runSession(payload);
            return {
                ...res.data.data,
                started: true,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

export const getSession = createAsyncThunk(
    'getSessionDataCall',
    async (payload: GetSessionData, { rejectWithValue }) => {
        try {
            const res = await sessionApis.getSessionById(payload);
            return {
                ...res.data.data,
                started: true,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const runSessionSlice = createSlice({
    name: 'runSession',
    initialState,
    reducers: {
        setRunSessionData: (state, action) => {
            state.value = { ...action.payload };
        },
        removeAllSessionData: (state) => {
            state.value.targets = [];
            state.value.trials = {};
            state.value.session = {};
            state.value.sessionData = {};
            state.value.sessionRunId = '';
        },
        pauseSession: (state) => {
            state.value.session['started'] = false;
        },
        setTrialsForTarget: (state, action) => {
            state.value.trials = {
                ...state.value.trials,
                [action.payload.targetId]: {
                    ...state.value.trials[action.payload.targetId],
                    ...action.payload.data,
                },
            };
        },
        resumeSession: (state) => {
            state.value.session['started'] = true;
        },
        sessionRunId: (state, action) => {
            state.value.sessionRunId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSessionTargets.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSessionTargets.fulfilled, (state: any, action) => {
                state.value.targets = action.payload;
                state.loading = false;
            })
            .addCase(getSessionTargets.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(runSession.fulfilled, (state: any, action) => {
                state.value.session = action.payload;
            })
            .addCase(getSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSession.fulfilled, (state: any, action) => {
                state.value.sessionData = action.payload;
                // state.loading = false;
            })
            .addCase(getSession.rejected, (state) => {
                state.error = true;
            });
    },
});

export const {
    setRunSessionData,
    removeAllSessionData,
    pauseSession,
    setTrialsForTarget,
    resumeSession,
} = runSessionSlice.actions;

export default runSessionSlice.reducer;
