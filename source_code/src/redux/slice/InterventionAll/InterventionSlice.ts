/* eslint-disable max-lines */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import InterventionDataById from '../../../api/services/Intervention/Service/InterventionDataById.service';
interface InterventionState {
    interventionPlanHistory: any;
    interventionPlanById: any;
    interventionPlanDomainById: any;
    interventionPlanLongTermById: any;
    interventionPlanShortTermById: any;
    allInterventionPlanDomainByInterventionId: any[];
    allInterventionPlanLongTermByDomainId: any[];
    allInterventionPlanShortTermLongTermById: any[];
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
    shortTermScoreData: any;
    phaseType: any;
}
const initialState: InterventionState = {
    interventionPlanHistory: null,
    interventionPlanById: null,
    interventionPlanDomainById: null,
    interventionPlanLongTermById: null,
    interventionPlanShortTermById: null,
    allInterventionPlanDomainByInterventionId: [],
    allInterventionPlanLongTermByDomainId: [],
    allInterventionPlanShortTermLongTermById: [],
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
    shortTermScoreData: [],
    phaseType: 'CURRENT',
};
interface PayloadType {
    id: number | string | undefined | symbol | any;
    type: any;
}
export const getInterventionPlanHistory = createAsyncThunk(
    'intervention/getInterventionPlanHistory',
    async (payload: { id: string | undefined }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getInterventionPlanDataHistory(
                    payload
                );
            return res.data.data;
        } catch (err) {
            return rejectWithValue('Error in fetching intervention plan');
        }
    }
);
export const getInterventionPlanById = createAsyncThunk(
    'intervention/getInterventionPlanById',
    async (payload: { id: string | undefined }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getInterventionPlanDataById(payload);
            return res.data.data;
        } catch (err) {
            return rejectWithValue('Error in fetching intervention plan');
        }
    }
);
export const getInterventionPlanDomainById = createAsyncThunk(
    'intervention/getInterventionPlanDomainById',
    async (payload: { id: string | undefined | any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getInterventionDomainDataById(
                    payload
                );
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                'Error in fetching intervention plan domain'
            );
        }
    }
);
export const getInterventionPlanLongTermById = createAsyncThunk(
    'intervention/getInterventionPlanLongTermById',
    async (payload: { id: string | undefined | any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getLongTermGoalDataById(payload);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                'Error in fetching long-term intervention plan'
            );
        }
    }
);
export const getInterventionPlanShortTermById = createAsyncThunk(
    'intervention/getInterventionPlanShortTermById',
    async (payload: { id: string | undefined | any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getShortTermGoalDataById(payload);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                'Error in fetching short-term intervention plan'
            );
        }
    }
);
export const getAllInterventionPlanDomainByInterventionId = createAsyncThunk(
    'intervention/getAllInterventionPlanDomainByInterventionId',
    async (
        payload: { providerId?: string; id?: string; type?: any },
        { rejectWithValue }
    ) => {
        try {
            let res;
            if (payload.providerId) {
                res = await InterventionDataById.getDomainByType(payload);
            } else {
                res =
                    await InterventionDataById.getInterventionDomains(payload);
            }

            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                'Error in fetching all intervention plan domains by intervention ID'
            );
        }
    }
);

export const getAllInterventionPlanLongTermByDomainId = createAsyncThunk(
    'intervention/getAllInterventionPlanLongTermByDomainId',
    async (payload: PayloadType, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getInterventionDomainLongTerms(
                    payload
                );
            return {
                [payload?.id]: res.data.data,
            };
        } catch (err) {
            return rejectWithValue(
                'Error in fetching all long-term intervention plans by domain ID'
            );
        }
    }
);
export const getAllInterventionPlanShortTermLongTermById = createAsyncThunk(
    'intervention/getAllInterventionPlanShortTermLongTermById',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getInterventionDomainLongTermsShortTerms(
                    payload
                );
            return {
                [payload?.id]: res.data.data,
            };
        } catch (err) {
            return rejectWithValue(
                'Error in fetching all short-term intervention plans by long-term ID'
            );
        }
    }
);
export const getPrimaryDiagnosisCode = createAsyncThunk(
    'intervention/getPrimaryDiagnosisCode',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getPrimaryDiagnosisCodes(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getSecondaryDiagnosisCodes = createAsyncThunk(
    'intervention/getSecondaryDiagnosisCodes',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res = await InterventionDataById.getDiagnosisCodes(payload);
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
            const res = await InterventionDataById.getGoalScore(payload);
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
            const res = await InterventionDataById.getGoalType(payload);
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
            const res = await InterventionDataById?.getGetAllPhase(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getInterventionPlanFileByInterventionId = createAsyncThunk(
    'intervention/getInterventionPlanFileByInterventionId',
    async (payload: { interventionPlanId: any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getInterventionPlanFileByInterventionBy(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const saveClientInterventionDoc = createAsyncThunk(
    'intervention/saveClientInterventionDoc',
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
                await InterventionDataById.saveClientInterventionDoc(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getInterventionDocumentCall = createAsyncThunk(
    'intervention/getInterventionDocumentCall',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getInterventionDocumentCall(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getInterventionByInterventionId = createAsyncThunk(
    'intervention/getInterventionByInterventionId',
    async (payload: { interventionPlanId: any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.getInterventionByInterventionId(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const deleteInterventionDoc = createAsyncThunk(
    'intervention/deleteInterventionFile',
    async (payload: { id: any }, { rejectWithValue }) => {
        try {
            const res =
                await InterventionDataById.deleteInterventionFile(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const interventionSlice = createSlice({
    name: 'intervention',
    initialState,
    reducers: {
        savingGetUserData: (state, action) => {
            state.allPhase = { ...action.payload };
        },
        setActiveDomainIdIntervention: (
            state,
            action: PayloadAction<string | number | null>
        ) => {
            state.activeDomainId = action.payload;
        },
        setActiveLongTermId: (
            state,
            action: PayloadAction<string | number | null>
        ) => {
            state.activeLongTermId = action.payload;
        },
        setActiveShortTermId: (
            state,
            action: PayloadAction<string | number | null>
        ) => {
            state.activeShortTermId = action.payload;
        },
        toggleExpandedDomain: (
            state,
            action: PayloadAction<string | number>
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
            action: PayloadAction<string | number>
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
        clearInterventionData: (state) => {
            state.interventionPlanHistory = null;
            state.interventionPlanById = null;
            state.interventionPlanDomainById = null;
            state.interventionPlanLongTermById = null;
            state.interventionPlanShortTermById = null;
            state.allInterventionPlanDomainByInterventionId = [];
            state.allInterventionPlanLongTermByDomainId = [];
            state.allInterventionPlanShortTermLongTermById = [];
            state.expandedDomains = [];
            state.expandedLongTerms = [];
            state.activeDomainId = '';
            state.activeLongTermId = '';
            state.activeShortTermId = '';
        },
        clearLongTermGoal: (state: any) => {
            state.longTermGoal = '';
        },
        setShortTermGoalData: (state, action) => {
            state.shortTermScoreData = action.payload;
        },
        clearExpandDomainIntervention: (state: any) => {
            state.expandedDomains = [];
        },
        clearExpandLongTermIntervention: (state: any) => {
            state.expandedLongTerms = [];
        },
        setPhaseType: (state, action) => {
            state.phaseType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInterventionPlanHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getInterventionPlanHistory.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.interventionPlanHistory = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getInterventionPlanHistory.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getInterventionPlanById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPhases.fulfilled, (state: any, action) => {
                state.allPhase = action.payload;
            })
            .addCase(
                getInterventionPlanById.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.interventionPlanById = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getGoalScore.fulfilled, (state: any, action) => {
                state.GoalsValue = action.payload;
                state.loading = false;
            })
            .addCase(getGoalType.fulfilled, (state: any, action) => {
                state.TypesValue = action.payload;
                state.loading = false;
            })
            .addCase(
                getInterventionPlanById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getInterventionPlanDomainById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getInterventionPlanDomainById.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.interventionPlanDomainById = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getInterventionPlanDomainById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getInterventionPlanLongTermById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getInterventionPlanLongTermById.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.interventionPlanLongTermById = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getInterventionPlanLongTermById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(getInterventionPlanShortTermById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getInterventionPlanShortTermById.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.interventionPlanShortTermById = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getInterventionPlanShortTermById.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(
                getAllInterventionPlanDomainByInterventionId.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                getAllInterventionPlanDomainByInterventionId.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.allInterventionPlanDomainByInterventionId =
                        action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getAllInterventionPlanDomainByInterventionId.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(
                getAllInterventionPlanLongTermByDomainId.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                getAllInterventionPlanLongTermByDomainId.fulfilled,
                (state: any, action) => {
                    state.allInterventionPlanLongTermByDomainId = {
                        ...state.allInterventionPlanLongTermByDomainId,
                        ...action.payload,
                    };
                    state.loading = false;
                }
            )
            .addCase(
                getAllInterventionPlanLongTermByDomainId.rejected,
                (state, action: PayloadAction<unknown>) => {
                    state.error = action.payload as string;
                    state.loading = false;
                }
            )
            .addCase(
                getAllInterventionPlanShortTermLongTermById.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                getAllInterventionPlanShortTermLongTermById.fulfilled,
                (state: any, action) => {
                    state.allInterventionPlanShortTermLongTermById = {
                        ...state.allInterventionPlanShortTermLongTermById,
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
                getAllInterventionPlanShortTermLongTermById.rejected,
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
    setActiveDomainIdIntervention,
    setActiveLongTermId,
    setActiveShortTermId,
    toggleExpandedDomain,
    toggleExpandedLongTerm,
    clearInterventionData,
    clearLongTermGoal,
    clearExpandDomainIntervention,
    clearExpandLongTermIntervention,
    setShortTermGoalData,
    setPhaseType,
} = interventionSlice.actions;
export default interventionSlice.reducer;
