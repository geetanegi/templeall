import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import allEmployeeApi from '../../../api/services/Groups/getAllEmployee.service';
import groupApi from '../../../api/services/Groups/saveGroup.service';
import getGroupsApi from '../../../api/services/getAllGroups.service';
const initialState = {
    Employee: [],
    name: '',
    selectedMember: [],
    groupById: {},
    group: [],
};
interface MyData {
    groupId: any;
}
export const getAllEmployeeCall = createAsyncThunk(
    'getAllEmployeeCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await allEmployeeApi.getAllEmployee();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllGroupCall = createAsyncThunk(
    'getAllGroupCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getGroupsApi.getAllGroup();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getGroupByIdCall = createAsyncThunk(
    'getGroupByIdCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await groupApi?.getGroupByID(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const groupSlice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        savingAllEmployee: (state, action) => {
            state.Employee = { ...action.payload };
        },
        savingSelectedName: (state, action) => {
            state.name = action.payload;
        },
        savingGroupById: (state, action) => {
            state.groupById = action.payload;
        },
        savingSelectedMember: (state: any, action: any) => {
            // Ensure state.selectedMember and action.payload are defined
            const selectedMember = state.selectedMember || [];
            const payload = action.payload || {};
            // Check if the member with the same id exists
            const existingName = selectedMember.find(
                (item: any) => item.id === payload.id
            );
            if (!existingName) {
                // If the member does not exist, add it to the list
                state.selectedMember = [...selectedMember, payload];
            }
            // If the member exists, no need to update the state
            // The else block is not needed, so it is removed
        },
        deleteMember: (state: any, action: any) => {
            state.selectedMember = state.selectedMember.filter(
                (item: any) => item.id !== action.payload
            );
        },
        clearingData: (state: any) => {
            state.groupById = {};
            state.selectedMember = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployeeCall.pending, () => {})
            .addCase(getAllEmployeeCall.fulfilled, (state: any, action) => {
                state.Employee = action.payload;
            })
            .addCase(getAllGroupCall.fulfilled, (state: any, action) => {
                state.group = action.payload;
            })
            .addCase(getGroupByIdCall.fulfilled, (state: any, action) => {
                state.groupById = action.payload;
            })
            .addCase(getAllEmployeeCall.rejected, () => {});
    },
});
// Action creators are generated for each case reducer function
export const {
    savingAllEmployee,
    savingSelectedName,
    savingSelectedMember,
    deleteMember,
    clearingData,
    savingGroupById,
} = groupSlice.actions;
export default groupSlice.reducer;
