import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import sessionApis from '../../../api/services/session.service';
const initialState: any = {
    value: {
        targets: <any>[],
        targetData: <any>[],
        programBookUUID: '',
        data: {
            id: '',
            name: '',
            clientId: {
                id: '',
            },
        },
    },
    allTargets: <any>{},
    selectedSummary: {},
    error: false,
    loading: false,
    selectedRow: 0,
    sessionHistory: [],
};
interface GetSessionData {
    sessionId: string;
}
interface GetSessionRunId {
    sessionRunId: string;
}
interface HistoryData {
    sessionId: any;
}
export const getSession = createAsyncThunk(
    'getSessionData',
    async (payload: GetSessionData, { rejectWithValue }) => {
        try {
            const res = await sessionApis.getSessionById(payload);
            return {
                ...res.data.data,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getTargetRunSummary = createAsyncThunk(
    'getTargetRunSummary',
    async (payload: GetSessionRunId, { rejectWithValue }) => {
        try {
            const res = await sessionApis.getTargetRunSummary(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllTargetBySessionId = createAsyncThunk(
    'getSessionTargetsData',
    async (payload: GetSessionData, { rejectWithValue }) => {
        try {
            const res = await sessionApis.getAllTargetsBySession(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getHistoryById = createAsyncThunk(
    'getHistoryById',
    async (payload: HistoryData, { rejectWithValue }) => {
        try {
            const res = await sessionApis.sessionHistory(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const sessionSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSessionData: (state, action) => {
            state.value = { ...action.payload };
        },
        removeTargetById: (state, action) => {
            state.value.targets = state.value.targets.filter(
                ({ id, targetId }: { id: any; targetId?: any }) =>
                    targetId
                        ? targetId?.id !== action.payload
                        : id !== action.payload
            );
        },
        removeAllTargets: (state) => {
            state.value.targets = [];
        },
        reInitSessionData: (state) => {
            state.value = {
                targets: [],
                programBookUUID: '',
                data: {},
                targetData: [],
            };
        },
        addTargetToSession: (state, action) => {
            state.value.programBookUUID = action.payload.programBookUUID;
            if (
                !state.value.targets.find(
                    (item: any) => item.id === action.payload.target.id
                )
            ) {
                const targets = [
                    ...state.value.targets,
                    {
                        ...action.payload.target,
                        orderCount: state.value.targets.length,
                    },
                ];
                state.value.targets = [...targets];
            }
        },
        selectedSessionSummary: (state, action) => {
            const payload: any = {};
            if (action.payload?.update) {
                state.selectedSummary = action?.payload?.updatedTargetBody;
            } else {
                for (const [key, value] of Object.entries(
                    action?.payload?.sendDataForTarget
                )) {
                    payload[key] = action?.payload?.allTargets[
                        action?.payload?.sendDataForTarget[key]
                    ]
                        ? action?.payload?.allTargets[
                              action?.payload?.sendDataForTarget[key]
                          ]
                        : [{ sessionRunId: value }];
                }
                state.selectedSummary = {
                    ...action?.payload?.selectedSummary,
                    [state.selectedRow]: {
                        ...action?.payload?.selectedSummary[state.selectedRow],
                        ...payload,
                    },
                };
            }
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload;
        },
        clearRowData: (state) => {
            state.selectedSummary = {};
            state.selectedRow = 0;
        },
        clearOnlyRow: (state) => {
            state.selectedRow = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSession.fulfilled, (state: any, action) => {
                state.value.data = action.payload;
                state.loading = false;
            })
            .addCase(getSession.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(getAllTargetBySessionId.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getAllTargetBySessionId.fulfilled,
                (state: any, action) => {
                    state.value.targets = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getTargetRunSummary.fulfilled, (state: any, action) => {
                if (action?.payload) {
                    state.value.targetData = action.payload;
                    state.allTargets = {
                        ...state?.allTargets,
                        [action?.payload?.[0]?.sessionRunId]: action.payload,
                    };
                    state.loading = false;
                }
            })
            .addCase(getHistoryById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHistoryById.fulfilled, (state: any, action) => {
                state.sessionHistory = action.payload;
                state.loading = false;
            })
            .addCase(getAllTargetBySessionId.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});
export const {
    setSessionData,
    addTargetToSession,
    removeTargetById,
    removeAllTargets,
    reInitSessionData,
    selectedSessionSummary,
    setSelectedRow,
    clearRowData,
    clearOnlyRow,
} = sessionSlice.actions;
export default sessionSlice.reducer;
