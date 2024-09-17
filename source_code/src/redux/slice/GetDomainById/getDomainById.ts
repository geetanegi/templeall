import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getDomainById from '../../../api/services/getDomainById.service';

const initialState = {
    value: [],
    domainIndex: '',
    programIndex: '',
    targetIndex: '',
    programBookTree: {},
    currentTab: 'Current',
};

interface MyData {
    programBookUUID: any;
    phase: any;
    isTargetPinned: any;
    quickLookId: any;
}
export const getDomainByIdCall = createAsyncThunk(
    'getDomainByIdCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getDomainById.getDomainById(payload);
            return {
                [payload.programBookUUID]: res.data,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

interface GetDomainByLibraryId {
    programBookLibraryUUID: any;
}

export const getDomainByLibraryIdCall = createAsyncThunk(
    'getDomainByLibraryIdCall',
    async (payload: GetDomainByLibraryId, { rejectWithValue }) => {
        try {
            const res = await getDomainById.getDomainByLibraryId(payload);
            return {
                [payload.programBookLibraryUUID]: {
                    data: res.data.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        domainStatus: item.domainStatus.name,
                    })),
                },
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getDomain = createSlice({
    name: 'getDomain',
    initialState,
    reducers: {
        savingData: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = { ...action.payload };
        },
        savingDomainIndex: (state, action) => {
            state.domainIndex =
                action.payload.domainIndex === undefined
                    ? state.domainIndex
                    : action.payload.domainIndex;
            state.programIndex =
                action.payload.programIndex === undefined
                    ? state.programIndex
                    : action.payload.programIndex;
            state.targetIndex =
                action.payload.targetIndex === undefined
                    ? state.targetIndex
                    : action.payload.targetIndex;
        },
        savingProgramBookTree: (state: any, action) => {
            state.programBookTree = {
                ...state.programBookTree,
                [action.payload]: !state.programBookTree[action.payload],
            };
        },
        clearProgramBookTree: (state: any, action) => {
            state.programBookTree = action.payload;
        },
        savingCurrentTab: (state: any, action) => {
            state.currentTab = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDomainByIdCall.pending, () => {})
            .addCase(getDomainByIdCall.fulfilled, (state: any, action) => {
                state.value = {
                    ...state.value,
                    ...action.payload,
                };
            })
            .addCase(getDomainByIdCall.rejected, () => {})
            .addCase(getDomainByLibraryIdCall.pending, () => {})
            .addCase(
                getDomainByLibraryIdCall.fulfilled,
                (state: any, action) => {
                    state.value = {
                        ...state.value,
                        ...action.payload,
                    };
                }
            )
            .addCase(getDomainByLibraryIdCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const {
    savingData,
    savingDomainIndex,
    savingProgramBookTree,
    clearProgramBookTree,
    savingCurrentTab,
} = getDomain.actions;

export default getDomain.reducer;
