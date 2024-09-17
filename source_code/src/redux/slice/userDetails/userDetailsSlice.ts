import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GetUserProfile from '../../../api/services/getUserProfile.service';
import getUserPermissions from '../../../api/services/getUserPermission.service';

const initialState = {
    value: {},
    permissions: {},
    userRoles: {},
    loading: false,
    error: false,
};

type GetUserDetailsPayload = {
    profileUserId: any;
    profileOrgId: any;
};

export const getUserDetailsCall = createAsyncThunk(
    'getUserDetailsCall',
    async (payload: GetUserDetailsPayload, { rejectWithValue }) => {
        try {
            const res = await GetUserProfile.userProfileData(
                payload.profileUserId,
                payload.profileOrgId
            );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

export const getUserDetailsPermissionCall = createAsyncThunk(
    'getUserDetailsPermissionCall',
    async (payload: GetUserDetailsPayload, { rejectWithValue }) => {
        try {
            const res = await getUserPermissions.userPermission(
                payload.profileUserId,
                payload.profileOrgId
            );
            return {
                userRoles: res.data,
                loginData: {},
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        savingUserDetails: (state, action) => {
            state.value = { ...action.payload };
        },
        clearUserDetails: (state) => {
            state.value = {};
            state.permissions = {};
            state.userRoles = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetailsCall.pending, () => {})
            .addCase(getUserDetailsCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(getUserDetailsCall.rejected, (state: any) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(getUserDetailsPermissionCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(
                getUserDetailsPermissionCall.fulfilled,
                (state: any, action: any) => {
                    state.userRoles = { ...action?.payload?.userRoles };
                    state.permissions = { ...action?.payload?.loginData };
                    state.loading = false;
                }
            )
            .addCase(getUserDetailsPermissionCall.rejected, (state) => {
                state.loading = false;
            });
    },
});
export const { savingUserDetails, clearUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
