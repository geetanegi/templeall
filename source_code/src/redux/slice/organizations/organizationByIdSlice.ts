import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrganizationsByIdApi from '../../../api/services/OrganizationsApi/OrganizationByIdApi.service';
interface OrganizationData {
    organizationId: string;
}
interface OrganizationState {
    value: any;
    loading: any;
}
const initialState: OrganizationState = {
    value: [],
    loading: false,
};
export const organizationByIdSlice = createAsyncThunk(
    'organizationByIdSlice',
    async (payload: OrganizationData, { rejectWithValue }) => {
        try {
            const res =
                await OrganizationsByIdApi.SaveOrganizationDataById(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const organizationByIdSliceRedux = createSlice({
    name: 'organizationByIdSliceRedux',
    initialState,
    reducers: {
        savingData: (state, action: any) => {
            state.value = [...state.value, action.payload];
        },
        clearOrgById: (state) => {
            state.value = [];
        },
        deleteValueByLogoName: (state) => {
            delete state?.value?.data?.logoName;
            delete state?.value?.data?.orgLogo;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(organizationByIdSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(organizationByIdSlice.fulfilled, (state, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(organizationByIdSlice.rejected, (state) => {
                state.loading = true;
            });
    },
});
export const { savingData, clearOrgById, deleteValueByLogoName } =
    organizationByIdSliceRedux.actions;
export default organizationByIdSliceRedux.reducer;
