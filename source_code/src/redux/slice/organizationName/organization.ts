import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import organizationLinkApi from '../../../api/services/organizationLink.service';

const initialState = {
    organization: {},
    location: [],
    insurances: [],
    services: [],
};
interface Data {
    code: string | undefined;
}

export const getOrganizationCall = createAsyncThunk(
    'getOrganizationCall',
    async (payLoad: Data, { rejectWithValue }) => {
        try {
            const res = await organizationLinkApi.organizationName(payLoad);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const organizationLocationByCodeCall = createAsyncThunk(
    'organizationLocationByCodeCall',
    async (payLoad: Data, { rejectWithValue }) => {
        try {
            const res =
                await organizationLinkApi.organizationLocationByCode(payLoad);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const organizationInsurancesByCodeCall = createAsyncThunk(
    'organizationInsurancesByCodeCall',
    async (payLoad: Data, { rejectWithValue }) => {
        try {
            const res = await organizationLinkApi.insurancesByCode(payLoad);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const organizationServicesByCodeCall = createAsyncThunk(
    'organizationServicesByCodeCall',
    async (payLoad: Data, { rejectWithValue }) => {
        try {
            const res = await organizationLinkApi.servicesByCode(payLoad);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const organization = createSlice({
    name: 'organization',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrganizationCall.pending, () => {})
            .addCase(getOrganizationCall.fulfilled, (state: any, action) => {
                state.organization = action.payload;
            })
            .addCase(
                organizationLocationByCodeCall.fulfilled,
                (state: any, action) => {
                    state.location = action.payload;
                }
            )
            .addCase(
                organizationInsurancesByCodeCall.fulfilled,
                (state: any, action) => {
                    state.insurances = action.payload;
                }
            )
            .addCase(
                organizationServicesByCodeCall.fulfilled,
                (state: any, action) => {
                    state.services = action.payload;
                }
            )
            .addCase(getOrganizationCall.rejected, () => {});
    },
});
export const {} = organization.actions;

export default organization.reducer;
