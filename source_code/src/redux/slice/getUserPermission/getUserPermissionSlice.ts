import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import login from '../../../api/services/login.service';
import getUserPermissions from '../../../api/services/getUserPermission.service';
import getAllPermissionApi from '../../../api/services/getAllPermission.service';

const initialState = {
    value: <any>{},
    userRoles: {},
    permissions: {},
    loading: false,
    user: {},
    userId: '',
    orgId: '',
    orgName: '',
    primaryPermission: {},
};
interface LoginData {
    username: any;
    password: any;
}
interface Data {
    primaryRoleId: string;
}
export const getUserLoginCall = createAsyncThunk(
    'getUserLoginCall',
    async (payload: LoginData, { rejectWithValue }) => {
        try {
            const res = await login.userLogin(payload);
            if (res.data?.data?.token) {
                localStorage.setItem(
                    'access_token',
                    JSON.stringify(res.data?.data)
                );
            }
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getUserPermissionCall = createAsyncThunk(
    'getUserPermissionCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getUserPermissions.userPermission();
            return {
                userRoles: res.data,
                loginData: {},
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllPermissionCall = createAsyncThunk(
    'getAllPermissionCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllPermissionApi.getAllPermission();
            return res?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getPrimaryRolePermissionCall = createAsyncThunk(
    'getPrimaryRolePermissionCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res =
                await getAllPermissionApi.getPrimaryRolePermission(payload);
            return res?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getUserPermission = createSlice({
    name: 'getUserPermission',
    initialState,
    reducers: {
        setFirstTimeUserValue: (state, action) => {
            state.value.data = {
                ...state.value.data,
                isResetPassword: action.payload,
            };
        },
        savingUserRoles: (state, action) => {
            state.userRoles = { ...action.payload };
        },
        savingLoggedUserDetails: (state, action) => {
            state.user = { ...action.payload };
        },
        SavingLoginData: (state, action) => {
            state.value = { ...action.payload };
        },
        SavingPermission: (state, action) => {
            state.userRoles = { ...action.payload };
        },
        savingUserId: (state, action) => {
            state.userId = action.payload;
        },
        savingOrgId: (state, action) => {
            state.orgId = action.payload;
        },
        savingOrgName: (state, action) => {
            state.orgName = action.payload;
        },
        clearingPermissionData: (state: any) => {
            state.value = {};
            state.userRoles = {};
            state.user = {};
            state.permissions = {};
            state.userId = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserPermissionCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(
                getUserPermissionCall.fulfilled,
                (state: any, action: any) => {
                    state.userRoles = { ...action?.payload?.userRoles };
                    state.value = { ...action?.payload?.loginData };
                    state.loading = false;
                }
            )
            .addCase(getUserPermissionCall.rejected, (state) => {
                state.loading = false;
            })
            // set permission completed
            .addCase(getUserLoginCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(
                getPrimaryRolePermissionCall.fulfilled,
                (state: any, action) => {
                    state.primaryPermission = action.payload;
                }
            )
            .addCase(getAllPermissionCall.fulfilled, (state: any, action) => {
                state.permissions = action.payload;
            });
    },
});
export const {
    savingUserRoles,
    savingLoggedUserDetails,
    clearingPermissionData,
    setFirstTimeUserValue,
    SavingLoginData,
    SavingPermission,
    savingUserId,
    savingOrgId,
    savingOrgName,
} = getUserPermission.actions;

export default getUserPermission.reducer;
