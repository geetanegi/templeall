/* eslint-disable max-lines */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import GoalLibraryDataApi from '../../../api/services/GoalLibrary/GoalLibraryDataApi.service';

interface GoalLibraryState {
    goalLibraryById: any[];
    goalLibraryDomainById: any[];
    goalLibraryLongTermById: any[];
    goalLibraryShortTermById: any[];
    allGoalLibraryDomainByGoalLibraryId: any[];
    allGoalLibraryLongTermByDomainId: any[];
    allGoalLibraryShortTermLongTermById: any[];
    primaryDiagnosisCode: any;
    secondaryDiagnosisCodes: any[];
    GoalsValue: any[];
    TypesValue: any[];
    allPhase: any[];
    loading: boolean;
    error: string | null;
    activeDomainId: string | number | null;
    activeLongTermId: string | number | null;
    activeShortTermId: string | number | null;
    expandedDomains: (string | number)[];
    expandedLongTerms: (string | number)[];
    fileData: (string | number)[];
    getDocument: (string | number)[];
    getAllDocument: (string | number)[];
}

const initialState: GoalLibraryState = {
    goalLibraryById: [],
    goalLibraryDomainById: [],
    goalLibraryLongTermById: [],
    goalLibraryShortTermById: [],
    allGoalLibraryDomainByGoalLibraryId: [],
    allGoalLibraryLongTermByDomainId: [],
    allGoalLibraryShortTermLongTermById: [],
    primaryDiagnosisCode: null,
    secondaryDiagnosisCodes: [],
    GoalsValue: [],
    TypesValue: [],
    allPhase: [],
    loading: false,
    error: null,
    activeDomainId: null,
    activeLongTermId: null,
    activeShortTermId: null,
    expandedDomains: [],
    expandedLongTerms: [],
    fileData: [],
    getDocument: [],
    getAllDocument: [],
};
interface PayloadType {
    id: number | string | undefined | symbol | any;
}

export const getGoalLibraryById = createAsyncThunk(
    'goalLibrary/getGoalLibraryById',
    async (payload: { id: string | undefined }, { rejectWithValue }) => {
        try {
            if (payload.id) {
                const res =
                    await GoalLibraryDataApi.getGoalLibraryDataById(payload);
                return { [payload.id]: res.data.data };
            }
        } catch (err) {
            return rejectWithValue('Error in fetching goalLibrary plan');
        }
    }
);

export const getGoalLibraryDomainById = createAsyncThunk(
    'goalLibrary/getGoalLibraryDomainById',
    async (payload: { id: string | undefined | any }, { rejectWithValue }) => {
        try {
            const res =
                await GoalLibraryDataApi.getInterventionDomainDataById(payload);
            return { [payload.id]: res.data.data };
        } catch (err) {
            return rejectWithValue('Error in fetching goalLibrary plan domain');
        }
    }
);

export const getGoalLibraryLongTermById = createAsyncThunk(
    'goalLibrary/getGoalLibraryLongTermById',
    async (payload: { id: string | undefined | any }, { rejectWithValue }) => {
        try {
            const res =
                await GoalLibraryDataApi.getLongTermGoalDataById(payload);
            return { [payload.id]: res.data.data };
        } catch (err) {
            return rejectWithValue(
                'Error in fetching long-term goalLibrary plan'
            );
        }
    }
);

export const getGoalLibraryShortTermById = createAsyncThunk(
    'goalLibrary/getGoalLibraryShortTermById',
    async (
        payload: { id: string | number | undefined | any },
        { rejectWithValue }
    ) => {
        try {
            const res =
                await GoalLibraryDataApi.getShortTermGoalDataById(payload);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                'Error in fetching short-term goalLibrary plan'
            );
        }
    }
);

export const getAllGoalLibraryDomainByGoalLibraryId = createAsyncThunk(
    'goalLibrary/getAllGoalLibraryDomainByGoalLibraryId',
    async (payload: PayloadType, { rejectWithValue }) => {
        try {
            const res = await GoalLibraryDataApi.getGoalLibraryDomains(payload);
            // return res.data.data;
            return {
                [payload?.id]: res.data.data,
            };
        } catch (err) {
            return rejectWithValue(
                'Error in fetching all goalLibrary plan domains by goalLibrary ID'
            );
        }
    }
);

export const getAllGoalLibraryLongTermByDomainId = createAsyncThunk(
    'goalLibrary/getAllGoalLibraryLongTermByDomainId',
    async (payload: PayloadType, { rejectWithValue }) => {
        try {
            const res =
                await GoalLibraryDataApi.getInterventionDomainLongTerms(
                    payload
                );

            return {
                [payload?.id]: res.data.data,
            };
        } catch (err) {
            return rejectWithValue(
                'Error in fetching all long-term goalLibrary plans by domain ID'
            );
        }
    }
);

export const getAllGoalLibraryShortTermLongTermById = createAsyncThunk(
    'goalLibrary/getAllGoalLibraryShortTermLongTermById',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res =
                await GoalLibraryDataApi.getInterventionDomainLongTermsShortTerms(
                    payload
                );
            return {
                [payload?.id]: res.data.data,
            };
        } catch (err) {
            return rejectWithValue(
                'Error in fetching all short-term goalLibrary plans by long-term ID'
            );
        }
    }
);
export const getPrimaryDiagnosisCode = createAsyncThunk(
    'goalLibrary/getPrimaryDiagnosisCode',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res =
                await GoalLibraryDataApi.getPrimaryDiagnosisCodes(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getSecondaryDiagnosisCodes = createAsyncThunk(
    'goalLibrary/getSecondaryDiagnosisCodes',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res = await GoalLibraryDataApi.getDiagnosisCodes(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getGoalScore = createAsyncThunk(
    'getGoalScoreCall',
    async (payload: { data: any }, { rejectWithValue }) => {
        try {
            const res = await GoalLibraryDataApi.getGoalScore(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getGoalType = createAsyncThunk(
    'getGoalTypeCall',
    async (payload: { data: any }, { rejectWithValue }) => {
        try {
            const res = await GoalLibraryDataApi.getGoalType(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllPhases = createAsyncThunk(
    'getAllPhase',
    async (payload: { type: any }, { rejectWithValue }) => {
        try {
            const res = await GoalLibraryDataApi?.getGetAllPhase(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getInterventionPlanFileByInterventionId = createAsyncThunk(
    'goalLibrary/getInterventionPlanFileByInterventionId',
    async (payload: { interventionPlanId: any }, { rejectWithValue }) => {
        try {
            const res =
                await GoalLibraryDataApi.getInterventionPlanFileByInterventionBy(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const saveClientInterventionDoc = createAsyncThunk(
    'goalLibrary/saveClientInterventionDoc',
    async (
        payload: {
            id: any;
            interventionPlanId: any;
            documentDate: any;
            type: any;
            name: any;
            intakeLocation: any;
            isUserCreated: any;
            description: any;
        },
        { rejectWithValue }
    ) => {
        try {
            const res =
                await GoalLibraryDataApi.saveClientInterventionDoc(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getInterventionDocumentCall = createAsyncThunk(
    'goalLibrary/getInterventionDocumentCall',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res =
                await GoalLibraryDataApi.getInterventionDocumentCall(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getInterventionByInterventionId = createAsyncThunk(
    'goalLibrary/getInterventionByInterventionId',
    async (payload: { interventionPlanId: any }, { rejectWithValue }) => {
        try {
            const res =
                await GoalLibraryDataApi.getInterventionByInterventionId(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const goalLibrarySlice = createSlice({
    name: 'goalLibrary',
    initialState,
    reducers: {
        savingGetUserData: (state, action) => {
            state.allPhase = { ...action.payload };
        },
        setActiveDomainId: (
            state,
            action: PayloadAction<string | number | null | any>
        ) => {
            state.activeDomainId = action.payload;
        },
        setActiveLongTermId: (
            state,
            action: PayloadAction<string | number | null | any>
        ) => {
            state.activeLongTermId = action.payload;
        },
        setActiveShortTermId: (
            state,
            action: PayloadAction<string | number | null | any>
        ) => {
            state.activeShortTermId = action.payload;
        },
        toggleExpandedDomain: (
            state,
            action: PayloadAction<string | number | any>
        ) => {
            const domainId = action.payload;
            if (state.expandedDomains.includes(domainId)) {
                state.expandedDomains = state.expandedDomains.filter(
                    (id) => id !== domainId
                );
            } else {
                state.expandedDomains.push(domainId);
            }
        },
        toggleExpandedLongTerm: (
            state,
            action: PayloadAction<string | number | any>
        ) => {
            const longTermId = action.payload;
            if (state.expandedLongTerms.includes(longTermId)) {
                state.expandedLongTerms = state.expandedLongTerms.filter(
                    (id) => id !== longTermId
                );
            } else {
                state.expandedLongTerms.push(longTermId);
            }
        },
        clearGoalLibraryData: (state) => {
            state.goalLibraryById = [];
            state.goalLibraryDomainById = [];
            state.goalLibraryLongTermById = [];
            state.goalLibraryShortTermById = [];
            state.allGoalLibraryDomainByGoalLibraryId = [];
            state.allGoalLibraryLongTermByDomainId = [];
            state.allGoalLibraryShortTermLongTermById = [];
        },
        clearLongTermGoal: (state: any) => {
            state.goalLibraryLongTermById = '';
        },
        clearDomain: (state: any) => {
            state.goalLibraryDomainById = '';
        },
        clearExpandDomain: (state: any) => {
            state.expandedDomains = [];
        },
        clearGoalLibraryShortTermById: (state: any) => {
            state.goalLibraryShortTermById = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGoalLibraryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                getGoalLibraryById.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.goalLibraryById = {
                        ...state.goalLibraryById,
                        ...action.payload,
                    };
                    state.loading = false;
                }
            )
            .addCase(
                getGoalLibraryById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getAllPhases.fulfilled, (state: any, action) => {
                state.allPhase = action.payload;
            })
            .addCase(getGoalScore.fulfilled, (state: any, action) => {
                state.GoalsValue = action.payload;
                state.loading = false;
            })
            .addCase(getGoalType.fulfilled, (state: any, action) => {
                state.TypesValue = action.payload;
                state.loading = false;
            })

            .addCase(getGoalLibraryDomainById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getGoalLibraryDomainById.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.goalLibraryDomainById = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getGoalLibraryDomainById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getGoalLibraryLongTermById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getGoalLibraryLongTermById.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.goalLibraryLongTermById = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getGoalLibraryLongTermById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getGoalLibraryShortTermById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getGoalLibraryShortTermById.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.goalLibraryShortTermById = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getGoalLibraryShortTermById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getAllGoalLibraryLongTermByDomainId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                getAllGoalLibraryLongTermByDomainId.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(
                getAllGoalLibraryLongTermByDomainId.fulfilled,
                (state: any, action) => {
                    state.allGoalLibraryLongTermByDomainId = {
                        ...state.allGoalLibraryLongTermByDomainId,
                        ...action.payload,
                    };
                    state.loading = false;
                }
            )
            .addCase(
                getAllGoalLibraryDomainByGoalLibraryId.fulfilled,
                (state: any, action) => {
                    state.allGoalLibraryDomainByGoalLibraryId = {
                        ...state.allGoalLibraryDomainByGoalLibraryId,
                        ...action.payload,
                    };
                }
            )
            .addCase(
                getAllGoalLibraryDomainByGoalLibraryId.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                getAllGoalLibraryDomainByGoalLibraryId.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )

            .addCase(
                getAllGoalLibraryShortTermLongTermById.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                getAllGoalLibraryShortTermLongTermById.fulfilled,
                (state: any, action) => {
                    state.allGoalLibraryShortTermLongTermById = {
                        ...state.allGoalLibraryShortTermLongTermById,
                        ...action.payload,
                    };
                    state.loading = false;
                }
            )
            .addCase(
                getPrimaryDiagnosisCode.fulfilled,
                (state: any, action) => {
                    state.primaryDiagnosisCode = {
                        ...state.value,
                        ...action.payload,
                    };
                    state.loading = false;
                }
            )
            .addCase(
                getSecondaryDiagnosisCodes.fulfilled,
                (state: any, action) => {
                    state.secondaryDiagnosisCodes = {
                        ...state.value,
                        ...action.payload,
                    };
                    state.loading = false;
                }
            )
            .addCase(
                getAllGoalLibraryShortTermLongTermById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(
                getInterventionPlanFileByInterventionId.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                getInterventionPlanFileByInterventionId.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.fileData = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getInterventionPlanFileByInterventionId.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getInterventionDocumentCall.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getInterventionDocumentCall.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.getDocument = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getInterventionDocumentCall.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getInterventionByInterventionId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getInterventionByInterventionId.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.getAllDocument = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getInterventionByInterventionId.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            );
    },
});

export const {
    setActiveDomainId,
    setActiveLongTermId,
    setActiveShortTermId,
    toggleExpandedDomain,
    toggleExpandedLongTerm,
    clearGoalLibraryData,
    clearLongTermGoal,
    clearExpandDomain,
    clearDomain,
    clearGoalLibraryShortTermById,
} = goalLibrarySlice.actions;

export default goalLibrarySlice.reducer;
