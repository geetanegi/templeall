import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getSelectedBillingDataAPI from '../../../api/services/MergeClaims/getSelectedBillingData.service';
import getAllClaimByIdTypeAPI from '../../../api/services/MergeClaims/getAllClaimByIdType.service';
import getClaimByIdAPI from '../../../api/services/MergeClaims/getClaimById.service';
const initialState = {
    gridData: [],
    selectedBilling: [],
    organizationEmployee: [],
    ClaimByIdType: [],
    claimById: [],
};
interface MyData1 {
    billingIds: any;
}
interface MyData2 {
    id: any;
}
export const getSelectedBillingDataCall = createAsyncThunk(
    'getSelectedBillingDataCall',
    async (payload: MyData1, { rejectWithValue }) => {
        try {
            const res =
                await getSelectedBillingDataAPI.getSelectedBillingData(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getClaimByIdCall = createAsyncThunk(
    'getClaimByIdCall',
    async (payload: MyData2, { rejectWithValue }) => {
        try {
            const res = await getClaimByIdAPI.getClaimById(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getOrganizationEmployeeCall = createAsyncThunk(
    'getOrganizationEmployeeCall',
    async (_, thunkAPI) => {
        try {
            const res =
                await getSelectedBillingDataAPI.getOrganizationEmployee();
            return res.data.data;
        } catch (err) {
            // Return the error to be handled by the rejection action
            return thunkAPI.rejectWithValue(err);
        }
    }
);
export const getAllClaimByIdTypeCall = createAsyncThunk(
    'getAllClaimByIdTypeCall',
    async (_, thunkAPI) => {
        try {
            const res = await getAllClaimByIdTypeAPI.getAllClaimByIdType();
            return res.data.data;
        } catch (err) {
            // Return the error to be handled by the rejection action
            return thunkAPI.rejectWithValue(err);
        }
    }
);
const mergeClaims = createSlice({
    name: 'mergeClaims',
    initialState,
    reducers: {
        setMultipleGridData: (state, action) => {
            state.gridData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSelectedBillingDataCall.pending, () => {})
            .addCase(
                getSelectedBillingDataCall.fulfilled,
                (state: any, action) => {
                    state.selectedBilling = action.payload;
                }
            )
            .addCase(
                getAllClaimByIdTypeCall.fulfilled,
                (state: any, action) => {
                    state.ClaimByIdType = action.payload;
                }
            )
            .addCase(
                getOrganizationEmployeeCall.fulfilled,
                (state: any, action) => {
                    state.organizationEmployee = action.payload;
                }
            )
            .addCase(getClaimByIdCall.fulfilled, (state: any, action) => {
                state.claimById = action.payload;
            })
            .addCase(getSelectedBillingDataCall.rejected, () => {});
    },
});
export const { setMultipleGridData } = mergeClaims.actions;
export default mergeClaims.reducer;
