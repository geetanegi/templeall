import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAllRolesApi from '../../../api/services/getAllRoles.service';

const initialState = {
    value: [],
    secondaryRoles: [],
};

interface MyData {
    heading: string;
    type: string;
    assignedTo: string;
    pagination: any;
    order: any;
    name: any;
    filterValue: any;
    isNotPaginated: any;
}
interface Data {
    roleId: string;
}
export const getAllRolesCall = createAsyncThunk(
    'getAllRolesCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getAllRolesApi.getAllRoles(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getSecondaryRolesCall = createAsyncThunk(
    'getSecondaryRolesCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await getAllRolesApi.getSecondaryRoles(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getAllRoles = createSlice({
    name: 'getAllRoles',
    initialState,
    reducers: {
        savingAllRoles: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRolesCall.pending, () => {})
            .addCase(getAllRolesCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getSecondaryRolesCall.fulfilled, (state: any, action) => {
                state.secondaryRoles = action.payload;
            })
            .addCase(getAllRolesCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingAllRoles } = getAllRoles.actions;

export default getAllRoles.reducer;
