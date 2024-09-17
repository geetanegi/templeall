import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import editInsuranceApi from '../../../api/services/Users/editInsurance.service';
import getInsurancePlanAPI from '../../../api/services/Insurance/getInsurancePlans.service';
import getOtherPayorByIdAPI from '../../../api/services/Users/getOtherPayorById.service';
import getOtherPayorAPI from '../../../api/services/Users/getOtherPayors.service';
const initialState = {
    value: [],
    otherPayors: [],
    clientId: '',
    userId: '',
    insuranceById: {},
    otherPayorsById: {},
    copyInsurance: false,
};
interface MyData {
    clientId: any;
}
interface Data {
    id: any;
}
export const getInsurancePlanCall = createAsyncThunk(
    'getInsurancePlanCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getInsurancePlanAPI.getInsurancePlan(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getOtherPayorCall = createAsyncThunk(
    'getOtherPayorCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getOtherPayorAPI.getOtherPayor(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getOtherPayorByIdCall = createAsyncThunk(
    'getOtherPayorByIdCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await getOtherPayorByIdAPI.getOtherPayorById(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getInsuranceByIdCall = createAsyncThunk(
    'getInsuranceByIdCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await editInsuranceApi.getInsuranceById(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const insurance = createSlice({
    name: 'insurance',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
        savingClientId: (state, action) => {
            state.clientId = action.payload;
        },
        savingUserId: (state, action) => {
            state.userId = action.payload;
        },
        clearInsuranceData: (state) => {
            state.insuranceById = {};
        },
        clearOtherPayorsById: (state) => {
            state.otherPayorsById = {};
        },
        isInsuranceCopied: (state, action) => {
            state.copyInsurance = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInsurancePlanCall.pending, () => {})
            .addCase(getInsurancePlanCall.fulfilled, (state: any, action) => {
                state.value = {
                    ...state.value,
                    ...action.payload,
                };
            })
            .addCase(getOtherPayorCall.fulfilled, (state: any, action) => {
                state.otherPayors = action.payload;
            })
            .addCase(getInsuranceByIdCall.fulfilled, (state: any, action) => {
                state.insuranceById = { ...action.payload };
            })
            .addCase(getOtherPayorByIdCall.fulfilled, (state: any, action) => {
                state.otherPayorsById = { ...action.payload };
            })
            .addCase(getInsurancePlanCall.rejected, () => {});
    },
});
// Action creators are generated for each case reducer function
export const {
    savingData,
    savingClientId,
    savingUserId,
    clearInsuranceData,
    isInsuranceCopied,
    clearOtherPayorsById,
} = insurance.actions;
export default insurance.reducer;
