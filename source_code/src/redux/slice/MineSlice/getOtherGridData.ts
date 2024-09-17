/* eslint-disable max-lines */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import InterventionDataById from '../../../api/services/Intervention/Service/InterventionDataById.service';
import ProgramBookHistoryAPI from '../../../api/services/ProgramBook/ProgramBookHistoryAPI.service';
import getSessionExistingNote from '../../../api/services/Session/getSessionExistingNote.service';
import paymentGridAPI from '../../../api/services/PaymentGrid/paymentGrid.service';
const initialState = {
    value: [],
    valueHistory: [],
    loading: false,
    heading: '',
    tab: '',
    sortingData: {},
    searchValue1: '',
    ID: '',
};

interface MyData {
    id?: any;
    heading: string;
    roleId: any;
    type: any;
    appointmentId?: any;
    ID?: any;
    assignedTo: string;
    pagination: {
        startIndex: number;
        noOfRecords: number;
    };
    order: string;
    name: string;
    filterValue: string;
    appointmentWith: string;
    publishStatus: string;
    isNotPaginated?: any;
    clientId?: string;
    date?: any;
    providerId?: any;
    authorizationCode?: any;
}
export const getActiveAsyncHistory = createAsyncThunk(
    'getActiveAsyncHistory',
    async (payload: MyData, { rejectWithValue }) => {
        switch (payload?.type) {
            case 'INTERVENTION_HISTORY':
                try {
                    const res =
                        await InterventionDataById.getInterventionPlanDataHistoryGrid(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'PROGRAMBOOK_HISTORY':
                try {
                    const res =
                        await ProgramBookHistoryAPI.getProgramBookDataHistoryGrid(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'SESSION_EXISTING_NOTE':
                try {
                    const res =
                        await getSessionExistingNote.getSessionExistingNoteApi(
                            payload
                        );
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            case 'Billing Amount':
                try {
                    const res = await paymentGridAPI.paymentGrid(payload);
                    return res.data;
                } catch (err) {
                    rejectWithValue('Error in Response');
                }
                break;
            default:
                break;
        }
    }
);

const getHistory = createSlice({
    name: 'getHistory',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
        savingHeading: (state, action) => {
            state.heading = { ...action.payload };
        },
        savingTabData1: (state, action) => {
            state.tab = action.payload.tab;
        },
        savingSearchData: (state, action) => {
            state.searchValue1 = action.payload.searchValue1;
        },
        savingInterventionId: (state, action) => {
            state.ID = action.payload.ID;
        },
        savingSortingData: (state, action) => {
            state.sortingData = action.payload.sortingData;
        },
        resetData: (state) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getActiveAsyncHistory.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getActiveAsyncHistory.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(getActiveAsyncHistory.rejected, (state: any) => {
                state.loading = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    savingInterventionId,
    savingData,
    savingTabData1,
    savingSortingData,
    savingHeading,
    savingSearchData,
    resetData,
} = getHistory.actions;

export default getHistory.reducer;
