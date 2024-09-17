import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getClientIntakeDetailsApi from '../../../api/services/ClientDetails/getClientIntakeDetails.service';
import getOrganizationIntakeByIdAPI from '../../../api/services/ClientIntake/getOrganizationIntakeById.service';
const initialState = {
    value: [],
    clientIntakeDetailsById: null,
    clientIntakeDetails: [],
    availabilityDropdown: [],
};
interface MyData {
    heading: string;
    type: string;
    assignedTo: string;
    pagination: any;
    name: any;
    order: any;
    filterValue: string;
}
interface MyDataGetOrganization {
    id: string | undefined;
}
export const availabilityDropdown = createAsyncThunk(
    'availabilityDropdown',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getClientIntakeDetailsApi.availabilityDropdown();
            return res.data;
        } catch (err) {
            return rejectWithValue('Error in Response');
        }
    }
);
export const clientIntakeDetailsCall = createAsyncThunk(
    'clientIntakeDetailsCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getClientIntakeDetailsApi.getClientIntakeDetails(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const clientIntakeDetailsById = createAsyncThunk(
    'clientIntakeDetailById',
    async (payload: { id: string | number }, { rejectWithValue }) => {
        try {
            const res =
                await getClientIntakeDetailsApi.getClientIntakeDetailById(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getOrganizationIntakeByIdCall = createAsyncThunk(
    'getOrganizationIntakeByIdCall',
    async (payload: MyDataGetOrganization, { rejectWithValue }) => {
        try {
            const res =
                await getOrganizationIntakeByIdAPI.getOrganizationIntakeById(
                    payload
                );
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const clientIntakeDetails = createSlice({
    name: 'clientIntakeDetails',
    initialState,
    reducers: {
        savingClientIntakeDetails: (state, action) => {
            state.value = { ...action.payload };
        },
        savingClientIntakeDetailsById: (state, action) => {
            state.clientIntakeDetailsById = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clientIntakeDetailsCall.pending, () => {})
            .addCase(
                getOrganizationIntakeByIdCall.fulfilled,
                (state: any, action) => {
                    state.clientIntakeDetails = { ...action.payload };
                }
            )
            .addCase(
                clientIntakeDetailsCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                }
            )
            .addCase(clientIntakeDetailsCall.rejected, () => {})
            .addCase(
                clientIntakeDetailsById.fulfilled,
                (state: any, action) => {
                    state.clientIntakeDetailsById = action?.payload?.data;
                }
            )
            .addCase(availabilityDropdown.fulfilled, (state: any, action) => {
                state.availabilityDropdown = { ...action.payload };
            });
    },
});
export const { savingClientIntakeDetails } = clientIntakeDetails.actions;
export default clientIntakeDetails.reducer;
