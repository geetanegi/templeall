import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProgramsByDomainIdAPI from '../../../api/services/getProgramsByDomainId.service';

const initialState = {
    value: {},
    domainData: [],
    name: '',
};

interface MyData1 {
    domainId: any;
    phase: any;
    isTargetPinned: any;
    quickLookId: any;
}
interface MyData2 {
    domainId: any;
}
export const getProgramsByDomainIdCall = createAsyncThunk(
    'getProgramsByDomainIdCall',
    async (payload: MyData1, { rejectWithValue }) => {
        try {
            const res =
                await getProgramsByDomainIdAPI.getProgramsByDomainId(payload);
            return {
                [payload.domainId]: res.data.data,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

export const getDomainDataByDomainId = createAsyncThunk(
    'getDomainDataByDomainId',
    async (payload: MyData2, { rejectWithValue }) => {
        try {
            const res = await getProgramsByDomainIdAPI.getDomainById(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getProgramsByDomainId = createSlice({
    name: 'getProgramsByDomainId',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...state.value, ...action.payload };
        },
        savingDomainData: (state, action) => {
            state.domainData = { ...action.payload };
        },
        savingDomainName: (state, action) => {
            state.name = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProgramsByDomainIdCall.pending, () => {})
            .addCase(
                getProgramsByDomainIdCall.fulfilled,
                (state: any, action) => {
                    state.value = {
                        ...state.value,
                        ...action.payload,
                    };
                }
            )
            .addCase(
                getDomainDataByDomainId.fulfilled,
                (state: any, action) => {
                    state.domainData = action.payload;
                }
            )
            .addCase(getProgramsByDomainIdCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingData, savingDomainData, savingDomainName } =
    getProgramsByDomainId.actions;

export default getProgramsByDomainId.reducer;
