import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAuthorizationAPI from '../../../api/services/Authorizations/getAuthorization.service';
const initialState = {
    value: [],
    clientId: '',
    authorizationPatientNames: [],
    authorizationPayors: [],
    authorizationData: [],
    view: false,
    edit: false,
};
interface MyData {
    clientId: any;
}
interface MyData1 {
    id: any;
}
interface MyDataPatientNames {
    parentUserId: any;
}
export const getAuthorizationCall = createAsyncThunk(
    'getAuthorizationCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getAuthorizationAPI.getAuthorization(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAuthorizationByIdCall = createAsyncThunk(
    'getAuthorizationByIdCall',
    async (payload: MyData1, { rejectWithValue }) => {
        try {
            const res = await getAuthorizationAPI.getAuthorizationById(payload);
            return res.data.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAuthorizationPatientNamesCall = createAsyncThunk(
    'getAuthorizationPatientNamesCall',
    async (payload: MyDataPatientNames, { rejectWithValue }) => {
        try {
            const res =
                await getAuthorizationAPI.getAuthorizationPatientNames(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAuthorizationPayorsCall = createAsyncThunk(
    'getAuthorizationPayorsCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getAuthorizationAPI.getAuthorizationPayors(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const authorization = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
        savingAuthorizationData: (state, action) => {
            state.authorizationData = { ...action.payload };
        },
        savingPatientNames: (state, action) => {
            state.authorizationPatientNames = { ...action.payload };
        },
        savingPayors: (state, action) => {
            state.authorizationPayors = { ...action.payload };
        },
        savingClientId: (state, action) => {
            state.clientId = action.payload;
        },
        setOnView: (state, action) => {
            state.view = action.payload;
        },
        setOnEdit: (state, action) => {
            state.edit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthorizationCall.pending, () => {})
            .addCase(getAuthorizationCall.fulfilled, (state: any, action) => {
                state.value = {
                    ...state.value,
                    ...action.payload,
                };
            })
            .addCase(
                getAuthorizationByIdCall.fulfilled,
                (state: any, action) => {
                    state.authorizationData = {
                        ...state.authorizationData,
                        ...action.payload,
                    };
                }
            )
            .addCase(
                getAuthorizationPatientNamesCall.fulfilled,
                (state: any, action) => {
                    state.authorizationPatientNames = {
                        ...state.authorizationPatientNames,
                        ...action.payload,
                    };
                }
            )
            .addCase(
                getAuthorizationPayorsCall.fulfilled,
                (state: any, action) => {
                    state.authorizationPayors = {
                        ...state.authorizationPayors,
                        ...action.payload,
                    };
                }
            )
            .addCase(getAuthorizationCall.rejected, () => {});
    },
});
// Action creators are generated for each case reducer function
export const {
    savingData,
    savingClientId,
    savingPatientNames,
    savingPayors,
    savingAuthorizationData,
    setOnView,
    setOnEdit,
} = authorization.actions;
export default authorization.reducer;
