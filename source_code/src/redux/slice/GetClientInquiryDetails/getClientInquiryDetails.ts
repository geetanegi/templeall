import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAllClientInquiryDetailsApi from '../../../api/services/getAllClientInquiryDetails.service';
import organizationLinkApi from '../../../api/services/organizationLink.service';

const initialState = {
    value: [],
    location: [],
    services: [],
    status: [],
    organizationLocation: [],
    link: {},
};

interface Data {
    type: any;
}

export const getClientInsuranceCall = createAsyncThunk(
    'getClientInsuranceCall',
    async (payLoad: Data, { rejectWithValue }) => {
        try {
            const res =
                await getAllClientInquiryDetailsApi.getClientInsurance(payLoad);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getClientLocationCall = createAsyncThunk(
    'getClientLocationCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllClientInquiryDetailsApi.getClientLocation();
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getClientServicesCall = createAsyncThunk(
    'getClientServicesCall',
    async (payLoad: Data, { rejectWithValue }) => {
        try {
            const res =
                await getAllClientInquiryDetailsApi.getClientServices(payLoad);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getClientServicesCallIntervention = createAsyncThunk(
    'getClientServicesCallIntervention',
    async (_, { rejectWithValue }) => {
        try {
            const res =
                await getAllClientInquiryDetailsApi.getClientServicesIntervention();
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getClientStatus = createAsyncThunk(
    'getClientStatus',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res =
                await getAllClientInquiryDetailsApi.getClientAvailabilityStatus(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

export const getOrganizationLocationCall = createAsyncThunk(
    'getOrganizationLocationCall',
    async (_, { rejectWithValue }) => {
        try {
            const res =
                await getAllClientInquiryDetailsApi.getOrganizationLocations();
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getOrganizationLinkCall = createAsyncThunk(
    'getOrganizationLinkCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await organizationLinkApi.organizationLink();
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const getClientInsuranceDetails = createSlice({
    name: 'getClientInsuranceDetails',
    initialState,
    reducers: {
        savingClientInquiryDetails: (state, action) => {
            state.value = { ...action.payload };
        },
        savingClientLocation: (state, action) => {
            state.location = { ...action.payload };
        },
        savingClientServices: (state, action) => {
            state.services = { ...action.payload };
        },
        savingClientStatus: (state, action) => {
            state.status = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClientInsuranceCall.pending, () => {})
            .addCase(getClientInsuranceCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getClientLocationCall.fulfilled, (state: any, action) => {
                state.location = action.payload;
            })
            .addCase(
                getOrganizationLocationCall.fulfilled,
                (state: any, action) => {
                    state.organizationLocation = action.payload;
                }
            )
            .addCase(
                getClientServicesCallIntervention.fulfilled,
                (state: any, action) => {
                    state.services = action.payload;
                }
            )
            .addCase(getClientServicesCall.fulfilled, (state: any, action) => {
                state.services = action.payload;
            })
            .addCase(
                getOrganizationLinkCall.fulfilled,
                (state: any, action) => {
                    state.link = action.payload;
                }
            )

            .addCase(getClientStatus.fulfilled, (state: any, action) => {
                state.status = action.payload;
            })
            .addCase(getClientInsuranceCall.rejected, () => {});
    },
});
export const {
    savingClientInquiryDetails,
    savingClientLocation,
    savingClientServices,
    savingClientStatus,
} = getClientInsuranceDetails.actions;

export default getClientInsuranceDetails.reducer;
