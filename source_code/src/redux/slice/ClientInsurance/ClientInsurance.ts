import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import insurancePlanApi from '../../../api/services/Users/insurancePlan.service';
import UserChildByUserIdApi from '../../../api/services/Users/userChilds.service';
import parentInfoApi from '../../../api/services/Users/fetchParentInfo.service';

const initialState = {
    plan: [],
    child: [],
    childInfo: {},
    parent: {},
    roleName: {},
    isDisabled: false,
    error: false,
    loading: false,
};
interface Data {
    parentUserId: any;
}
interface MyData {
    parentId: any;
}

export const insurancePlanCall = createAsyncThunk(
    'insurancePlanCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await insurancePlanApi.insurancePlan();
            return res.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const fetchParentInfoCall = createAsyncThunk(
    'fetchParentInfoCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await parentInfoApi.getParentInfo(payload);
            return res.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getChildCall = createAsyncThunk(
    'getChildCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await UserChildByUserIdApi.getUserChild(payload);
            return res.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const clientInsuranceSlice = createSlice({
    name: 'clientInsuranceSlice',
    initialState,
    reducers: {
        savingChildInfo: (state, action) => {
            state.childInfo = action.payload;
        },
        savingRoleName: (state, action) => {
            state.roleName = action.payload;
        },
        clearData: (state) => {
            state.parent = {};
        },
        clearChildInfo: (state) => {
            state.childInfo = {};
        },
        setValue: (state, action) => {
            state.isDisabled = action.payload;
        },
        clearValue: (state) => {
            state.roleName = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(insurancePlanCall.pending, (state) => {
                state.loading = true;
            })
            .addCase(insurancePlanCall.fulfilled, (state: any, action) => {
                state.plan = action.payload;
                state.loading = false;
            })
            .addCase(getChildCall.fulfilled, (state: any, action) => {
                state.child = action.payload;
                state.loading = false;
            })
            .addCase(fetchParentInfoCall.fulfilled, (state: any, action) => {
                state.parent = action.payload;
                state.loading = false;
            })
            .addCase(insurancePlanCall.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const {
    clearData,
    savingChildInfo,
    clearChildInfo,
    savingRoleName,
    setValue,
    clearValue,
} = clientInsuranceSlice.actions;

export default clientInsuranceSlice.reducer;
