import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EditRoleApi from '../../../api/services/RoleAndPermissions/editRoleAndPermission.service';

const initialState = {
    value: [],
    viewOnly: false,
    loading: false,
};

interface MyData {
    roleId: string | undefined;
}
export const EditRoleCall = createAsyncThunk(
    'EditRoleCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await EditRoleApi.EditRole(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const EditRole = createSlice({
    name: 'EditRole',
    initialState,
    reducers: {
        savingAllRoles: (state, action) => {
            state.value = { ...action.payload };
        },
        clearRoleById: (state) => {
            state.value = [];
        },
        viewOnlyData: (state, action) => {
            state.viewOnly = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(EditRoleCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(EditRoleCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(EditRoleCall.rejected, (state: any) => {
                state.loading = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingAllRoles, clearRoleById, viewOnlyData } = EditRole.actions;

export default EditRole.reducer;
