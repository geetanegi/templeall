import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import addFromLibraryApis from '../../../api/services/addFromLibrary.service';

const initialState = {
    value: {
        domains: <any>[],
        longTermGoal: <any>[],
        shortTermGoal: <any>[],
    },
    libraries: [],
    error: false,
    loading: false,
};

export const getAllGoalLibraries = createAsyncThunk(
    'getAllGoalLibrariesCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await addFromLibraryApis.getAllGoalLibraries();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const addFromGoalLibrarySlice = createSlice({
    name: 'addFromGoalLibraries',
    initialState,
    reducers: {
        setAddFromGoalLibraryData: (state, action) => {
            state.value = { ...action.payload };
        },
        addItemToConfiguration: (state, action) => {
            const configuration = state.value;
            const { data, type } = action.payload;
            if (type === 'domain') {
                configuration.domains = [...configuration.domains, { ...data }];
            }
            if (type === 'longTermGoal') {
                configuration.longTermGoal = [
                    ...configuration.longTermGoal,
                    { ...data },
                ];
            }
            if (type === 'shortTermGoal') {
                configuration.shortTermGoal = [
                    ...configuration.shortTermGoal,
                    { ...data },
                ];
            }
            state.value = configuration;
        },
        removeItemFromConfiguration: (state, action) => {
            const configuration = state.value;
            const { data, type } = action.payload;
            if (type === 'domain') {
                configuration.domains = configuration.domains.filter(
                    (item: any) => item.domainId !== data.domainId
                );
            }
            if (type === 'longTermGoal') {
                configuration.longTermGoal = configuration.longTermGoal.filter(
                    (item: any) => item.longTermGoalId !== data.longTermGoalId
                );
                configuration.domains = configuration.domains.filter(
                    (item: any) => item.domainId !== data.domainId
                );
            }
            if (type === 'shortTermGoal') {
                configuration.shortTermGoal =
                    configuration.shortTermGoal.filter(
                        (item: any) =>
                            item.shortTermGoalId !== data.shortTermGoalId
                    );
                configuration.domains = configuration.domains.filter(
                    (item: any) => item.domainId !== data.domainId
                );
                configuration.longTermGoal = configuration.domains.filter(
                    (item: any) => item.longTermGoal !== data.longTermGoal
                );
            }
            state.value = configuration;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllGoalLibraries.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllGoalLibraries.fulfilled, (state: any, action) => {
                state.libraries = action.payload;
                state.loading = false;
            })
            .addCase(getAllGoalLibraries.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const {
    setAddFromGoalLibraryData,
    addItemToConfiguration,
    removeItemFromConfiguration,
} = addFromGoalLibrarySlice.actions;

export default addFromGoalLibrarySlice.reducer;
