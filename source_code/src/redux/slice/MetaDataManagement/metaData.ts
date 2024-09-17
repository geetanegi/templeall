import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SaveDiagnosisCodeApi from '../../../api/services/MetaDataManagement/saveDiagnosisCode.service';
import servicesGridApi from '../../../api/services/MetaDataManagement/serivesGrid.service';

const initialState = {
    diagnosisCode: {},
    email: [],
};
interface Data {
    diagnosisCodeId: string;
}
interface Data1 {
    id: string;
}
export const getDiagnosisCodeById = createAsyncThunk(
    'getDiagnosisCodeById',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res =
                await SaveDiagnosisCodeApi?.getDiagnosisCodeById(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getEmailByIdApiId = createAsyncThunk(
    'getEmailByIdApiId',
    async (payload: Data1, { rejectWithValue }) => {
        try {
            const res = await servicesGridApi?.getEmailByIdApi(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const metaData = createSlice({
    name: 'getUsers',
    initialState,
    reducers: {
        clearDiagnosisData: (state) => {
            state.diagnosisCode = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDiagnosisCodeById.pending, () => {})
            .addCase(getDiagnosisCodeById.fulfilled, (state: any, action) => {
                state.diagnosisCode = action.payload;
            })
            .addCase(getEmailByIdApiId.fulfilled, (state: any, action) => {
                state.email = action.payload;
            })

            .addCase(getDiagnosisCodeById.rejected, () => {});
    },
});

export const { clearDiagnosisData } = metaData.actions;

export default metaData.reducer;
