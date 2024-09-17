import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getAllData from '../../../api/services/SchedulingEvent/getAllDataForm.service';
const initialState = {
    getPrimaryProvider: [],
    getLocation: <any>[],
    getAuthAndNonBillable: [],
    value: [],
    error: false,
    loading: false,
    billableCodes: [],
    mins: <any>[],
    hours: <any>[],
    participants: [],
    authCodeButton: null,
    isValidDuration: false,
    fromTime: '',
    toTime: '',
    unitOfService: <any>'',
    timezone: <any>'',
    startTime: '',
    endTime: '',
    codeAfterEdit: '',
    setCodes: '',
    isAuthorizationCodesEdited: '',
    completeScheduleEvent: '',
    currentWeekStart: '',
    currentWeekEnd: '',
    plannerView: false,
    weekDays: [],
    provider: null,
    saveNoteId: '',
};
interface MyData {
    codeType: any;
    clientId: any;
    serviceProviderId: any;
}
export const getPrimaryProvider = createAsyncThunk(
    'primaryProvider/getPrimaryProvider',
    async (_, thunkAPI) => {
        try {
            const res = await getAllData.getTechnicianAndClinician();
            return res.data.data;
        } catch (err) {
            // Return the error to be handled by the rejection action
            return thunkAPI.rejectWithValue(err);
        }
    }
);
export const getLocation = createAsyncThunk(
    'getLocation',
    async (_, thunkAPI) => {
        try {
            const res = await getAllData.getPlaceAndService();
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);
export const getAuthorizationAndNonBillable = createAsyncThunk(
    'getAuthorizationAndNonBillable',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getAllData.getAuthorizationAndNonBillable(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const SchedulingSlice = createSlice({
    name: 'scheduling',
    initialState,
    reducers: {
        savingBillableCodes: (state: any, action: any) => {
            const index = state.billableCodes.findIndex(
                (item: any) => item.key === action?.payload?.key
            );
            if (index !== -1) {
                state.billableCodes[index] = action?.payload;
            } else {
                state.billableCodes = [
                    ...(state?.billableCodes || []),
                    action?.payload,
                ];
            }
        },
        savingAuthCodes: (state, action) => {
            state.authCodeButton = { ...action?.payload };
        },
        resetAuthCode: (state) => {
            state.authCodeButton = null;
        },
        setPlannerView: (state, action) => {
            state.plannerView = action.payload;
        },
        savingHours: (state: any, action: any) => {
            // Ensure state.hours is initialized as an array
            if (!Array.isArray(state.hours)) {
                state.hours = [];
            }
            const index = state.hours.findIndex(
                (item: any) => item.key === action.payload.key
            );
            if (index !== -1) {
                state.hours[index] = action.payload;
            } else {
                state.hours = [...state.hours, action.payload];
            }
        },
        savingMins: (state: any, action: any) => {
            // Ensure state.mins is initialized as an array
            if (!Array.isArray(state.mins)) {
                state.mins = [];
            }
            const index = state.mins.findIndex(
                (item: any) => item.key === action.payload.key
            );
            if (index !== -1) {
                state.mins[index] = action.payload;
            } else {
                state.mins = [...state.mins, action.payload];
            }
        },
        savingParticipants: (state: any, action: any) => {
            // Ensure state.participants is initialized as an array
            if (!Array.isArray(state.participants)) {
                state.participants = [];
            }
            // Safely update the state with the new payload
            state.participants = [
                ...state.participants, // No need for optional chaining here
                action.payload,
            ];
        },
        clearHours: (state) => {
            state.mins = [];
            state.hours = [];
            state.billableCodes = [];
            state.setCodes = '';
            state.saveNoteId = '';
        },
        setIsValidDuration: (state, action) => {
            state.isValidDuration = action.payload;
        },
        setFromTime: (state, action) => {
            state.fromTime = action.payload;
        },
        setToTime: (state, action) => {
            state.toTime = action.payload;
        },
        setCurrentWeekStart: (state, action) => {
            state.currentWeekStart = action.payload;
        },
        setCurrentWeekEnd: (state, action) => {
            state.currentWeekEnd = action.payload;
        },
        deleteHours: (state: any, action: any) => {
            state.mins = state.mins.filter(
                (item: any) => item.key !== action.payload
            );
            state.hours = state.hours.filter(
                (item: any) => item.key !== action.payload
            );
        },
        deleteAuthCodes: (state: any, action: any) => {
            state.billableCodes = state.billableCodes.filter(
                (item: any) => item.id !== action.payload
            );
        },
        setUnitOfService: (state: any, action: any) => {
            state.unitOfService = action.payload;
        },
        setStartTime: (state: any, action: any) => {
            state.startTime = action.payload;
        },
        setEndTime: (state: any, action: any) => {
            state.endTime = action.payload;
        },
        setTimezone: (state: any, action: any) => {
            state.timezone = action.payload;
        },
        codeAfterEdit: (state: any, action: any) => {
            state.codeAfterEdit = action.payload;
        },
        setCodes: (state: any, action: any) => {
            state.setCodes = action.payload;
        },
        isAuthorizationCodesEdited: (state: any, action: any) => {
            state.isAuthorizationCodesEdited = action.payload;
        },
        setCompleteScheduleEvent: (state: any, action: any) => {
            state.completeScheduleEvent = action.payload;
        },
        setCurrentWeekDays: (state: any, action: any) => {
            state.weekDays = action.payload;
        },
        setClickedProvider: (state: any, action: any) => {
            state.provider = action.payload;
        },
        saveNoteId: (state: any, action: any) => {
            state.saveNoteId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPrimaryProvider?.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPrimaryProvider?.fulfilled, (state: any, action) => {
                state.getPrimaryProvider = action?.payload;
                state.loading = false;
            })
            .addCase(getPrimaryProvider?.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(getLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLocation.fulfilled, (state: any, action) => {
                state.getLocation = action.payload;
                state.loading = false;
            })
            .addCase(getLocation.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(getAuthorizationAndNonBillable.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getAuthorizationAndNonBillable.fulfilled,
                (state: any, action) => {
                    state.getAuthAndNonBillable = action.payload;
                    state.loading = false;
                }
            );
    },
});
export const {
    savingBillableCodes,
    savingHours,
    savingMins,
    savingParticipants,
    savingAuthCodes,
    resetAuthCode,
    clearHours,
    deleteHours,
    setIsValidDuration,
    deleteAuthCodes,
    setFromTime,
    setToTime,
    setUnitOfService,
    setTimezone,
    setStartTime,
    setEndTime,
    codeAfterEdit,
    setCodes,
    isAuthorizationCodesEdited,
    setCompleteScheduleEvent,
    setCurrentWeekStart,
    setCurrentWeekEnd,
    setPlannerView,
    setCurrentWeekDays,
    setClickedProvider,
    saveNoteId,
} = SchedulingSlice.actions;
export default SchedulingSlice.reducer;
