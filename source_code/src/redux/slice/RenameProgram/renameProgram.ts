import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import renameProgramAPI from '../../../api/services/renameProgram.service';
import getProgramByIdAPI from '../../../api/services/getProgramById.service';

const initialState = {
    value: [],
    programData: [],
    onRename: false,
    programName: '',
    isEdit: false,
};

interface MyData {
    domainId: any;
    programId: any;
    modifiedProgramName: any;
}
interface ProgramData {
    id: any;
    isTarget: any;
}
export const renameProgramCall = createAsyncThunk(
    'renameProgramCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await renameProgramAPI.renameProgram(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getProgramById = createAsyncThunk(
    'getProgramById',
    async (payload: ProgramData, { rejectWithValue }) => {
        try {
            const res = await getProgramByIdAPI.getProgramById(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const renameProgram = createSlice({
    name: 'renameProgram',
    initialState,
    reducers: {
        savingDataRenameProgram: (state, action) => {
            state.value = { ...action.payload };
        },
        savingProgramData: (state, action) => {
            state.programData = {
                ...state.programData,
                ...action.payload,
            };
        },
        resetState: (state) => {
            state.programData = [];
        },
        savingOnRename: (state, action) => {
            state.onRename = action.payload;
        },
        setProgramName: (state, action) => {
            state.programName = action.payload;
        },
        setIsTargetEdit: (state, action) => {
            state.isEdit = action.payload;
        },
        clearProgramData: (state) => {
            state.value = [];
            state.programData = [];
            state.onRename = false;
            state.programName = '';
        },
        clearValue: (state) => {
            state.programData = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(renameProgramCall.pending, () => {})
            .addCase(renameProgramCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(renameProgramCall.rejected, () => {})
            .addCase(getProgramById.pending, () => {})
            .addCase(getProgramById.fulfilled, (state: any, action) => {
                state.programData = action.payload;
            })
            .addCase(getProgramById.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const {
    savingDataRenameProgram,
    resetState,
    savingProgramData,
    savingOnRename,
    setProgramName,
    clearProgramData,
    setIsTargetEdit,
    clearValue,
} = renameProgram.actions;

export default renameProgram.reducer;
