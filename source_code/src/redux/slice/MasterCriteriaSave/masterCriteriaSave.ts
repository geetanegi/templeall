/* eslint-disable max-lines */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import saveCriteriaTemplateAPI from '../../../api/services/MasterCriteriaTemplate/saveCriteriaTemplate.service';
import getTimeFrame from '../../../api/services/MasterCriteriaTemplate/getTimeFrame.service';
import saveMasteryCriteriaTemplateAPI from '../../../api/services/MasterCriteriaTemplate/saveMasteryCriteriaTemplate.service';
const initialState = {
    value: [],
    dataType: null,
    timeFrame: [],
    autoProgress: [],
    autoRegress: [],
    templateData: [],
    cardCountGeneral: 1,
    cardCount: 1,
    cardCountDuration: 1,
    cardCountFreq: 1,
    cardCountScore: 1,
    cardCountLat: 1,
    cardCountRating: 1,
    cardCountFirst: 1,
    cardCountRate: 1,
    cardCountTime: 1,
    cardCountTask: 1,
    onEditCriteria: false,
    onViewCriteria: false,
    isFromModal: false,
    phaseValue: '',
    name: '',
    isProgram: false,
    maintenanceCardGeneral: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardPer: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardDur: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardFre: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardScore: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardLat: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardRating: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardFirst: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardRate: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardTime: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    maintenanceCardTask: [
        { id: 1, label: 'No values here', value: 'Start Adding Criteria' },
        { id: 2, label: 'No values here', value: 'Start Adding Criteria' },
    ],
    count: 0,
    generalCriteriaToggle: <boolean>false,
    masteryCardsAvailable: null,
    isGeneralSave: '',
    generalCriteriaModal: '',
};
interface MyData {
    templateId: any;
    type: any;
    isSystemGenerated: any;
    name: any;
    description: any;
    createdBy: any;
    modifiedBy: any;
}
interface Data {
    templateId: any;
    createdBy: any;
    modifiedBy: any;
    phase: any;
    dataType: any;
    timePeriod: any;
    timeFrame: any;
    operationType: any;
    accuracy: any;
    autoProgressId: any;
    autoRegressId: any;
    autoProgressPhase: any;
    prompts: any;
    indexCount: any;
    durationSeconds: any;
    durationMinutes: any;
    latencyMinutes: any;
    latencySeconds: any;
    frequency: any;
    requireTwoProviders: any;
    masteryCriteriaTemplateId: any;
    isProgram: any;
    addNew: any;
    temporaryId: any;
    isTarget: any;
    programId: any;
    targetId: any;
    score: any;
    ratingScale: any;
    rateHour: any;
    rateMinutes: any;
    rateSeconds: any;
    timeSamplingInterval: any;
}
interface publishName {
    templateId: any;
}
interface type {
    type: any;
    dataType: any;
    id: any;
    temporaryId: any;
    isTarget: any;
}
interface autoProgress {
    templateId: any;
    dataType: any;
    phase: any;
    timeFrame: any;
    id: any;
    temporaryId: any;
    isProgram: any;
    addNew: any;
    isTarget: any;
    programId: any;
}
interface autoRegress {
    templateId: any;
    dataType: any;
    phase: any;
    id: any;
    temporaryId: any;
    isProgram: any;
    addNew: any;
    isTarget: any;
    programId: any;
}
interface autoProgressOrRegress {
    templateId: any;
    dataType: any;
    phase: any;
    id: any;
    timeFrame: any;
    indexCount: any;
    autoProgress: any;
    temporaryId: any;
    isProgram: any;
    addNew: any;
    isTarget: any;
    programId: any;
}
interface toggleData {
    templateId: any;
    isSynchronized: any;
}
export const saveMasterCriteriaCall = createAsyncThunk(
    'saveMasterCriteriaCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await saveCriteriaTemplateAPI.saveCriteriaTemplate(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const saveMasterCriteriaTemplateCall = createAsyncThunk(
    'saveMasterCriteriaTemplateCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res =
                await saveMasteryCriteriaTemplateAPI.saveMasterCriteriaTemplate(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const publishMasteryCriteriaNameCall = createAsyncThunk(
    'publishMasteryCriteriaNameCall',
    async (payload: publishName, { rejectWithValue }) => {
        try {
            const res =
                await saveMasteryCriteriaTemplateAPI.publishMasteryCriteriaNameCall(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const masteryCardsAvailable = createAsyncThunk(
    'masteryCardsAvailable',
    async (payload: publishName, { rejectWithValue }) => {
        try {
            const res =
                await saveMasteryCriteriaTemplateAPI.masteryCardsAvailable(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const isToggleChange = createAsyncThunk(
    'isToggleChange',
    async (payload: toggleData, { rejectWithValue }) => {
        try {
            const res =
                await saveMasteryCriteriaTemplateAPI.isToggleChange(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getTimeFrameCall = createAsyncThunk(
    'getTimeFrameCall',
    async (payload: type, { rejectWithValue }) => {
        try {
            const res = await getTimeFrame.getTimeFrame(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAutoProgress = createAsyncThunk(
    'getAutoProgress',
    async (payload: autoProgress, { rejectWithValue }) => {
        try {
            const res = await getTimeFrame.getAutoProgress(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAutoRegress = createAsyncThunk(
    'getAutoRegress',
    async (payload: autoRegress, { rejectWithValue }) => {
        try {
            const res = await getTimeFrame.getAutoRegress(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAutoProgressOrRegressByPhase_Progress = createAsyncThunk(
    'getAutoProgressOrRegressByPhase_Progress',
    async (payload: autoProgressOrRegress, { rejectWithValue }) => {
        try {
            const res =
                await getTimeFrame.getAutoProgressOrRegressByPhase(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAutoProgressOrRegressByPhase_Regress = createAsyncThunk(
    'getAutoProgressOrRegressByPhase_Regress',
    async (payload: autoProgressOrRegress, { rejectWithValue }) => {
        try {
            const res =
                await getTimeFrame.getAutoProgressOrRegressByPhase(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const saveMasterCriteria = createSlice({
    name: 'saveMasterCriteria',
    initialState,
    reducers: {
        savingMasterData: (state, action) => {
            state.value = { ...action.payload };
        },
        savingTemplateData: (state, action) => {
            state.templateData = { ...action.payload };
        },
        setTimeFrame: (state, action) => {
            state.timeFrame = { ...action.payload };
        },
        setAutoProgress: (state, action) => {
            state.autoProgress = { ...action.payload };
        },
        setAutoRegress: (state, action) => {
            state.autoRegress = { ...action.payload };
        },
        setDataType: (state, action) => {
            state.dataType = action.payload;
        },
        setCardCount: (state, action) => {
            state.cardCount = action.payload;
        },
        setCardCountFrequency: (state, action) => {
            state.cardCountFreq = action.payload;
        },
        setOnEdit: (state, action) => {
            state.onEditCriteria = action.payload;
        },
        setOnView: (state, action) => {
            state.onViewCriteria = action.payload;
        },
        setCardCountDuration: (state, action) => {
            state.cardCountDuration = action.payload;
        },
        setCardCountScore: (state, action) => {
            state.cardCountScore = action.payload;
        },
        setCardCountLat: (state, action) => {
            state.cardCountLat = action.payload;
        },
        setCardCountRating: (state, action) => {
            state.cardCountRating = action.payload;
        },
        setCardCountFirst: (state, action) => {
            state.cardCountFirst = action.payload;
        },
        setCardCountRate: (state, action) => {
            state.cardCountRate = action.payload;
        },
        setCardCountTime: (state, action) => {
            state.cardCountTime = action.payload;
        },
        setCardCountTask: (state, action) => {
            state.cardCountTask = action.payload;
        },
        setCardCountGeneral: (state, action) => {
            state.cardCountGeneral = action.payload;
        },
        setIsModalClick: (state, action) => {
            state.isFromModal = action.payload;
        },
        setIsProgram: (state, action) => {
            state.isProgram = action.payload;
        },
        setPhaseValue: (state, action) => {
            state.phaseValue = action.payload;
        },
        setMasteryCriteriaName: (state, action) => {
            state.name = action.payload;
        },
        setMaintenanceCardPer: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardPer = state.maintenanceCardPer || [];
            // Update the state by adding the new payload
            state.maintenanceCardPer = [...maintenanceCardPer, action.payload];
        },
        setMaintenanceCardFre: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardFre = state.maintenanceCardFre || [];
            // Update the state by adding the new payload
            state.maintenanceCardFre = [...maintenanceCardFre, action.payload];
        },
        setMaintenanceCardDur: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardDur = state.maintenanceCardDur || [];
            // Update the state by adding the new payload
            state.maintenanceCardDur = [...maintenanceCardDur, action.payload];
        },
        setMaintenanceCardScore: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardScore = state.maintenanceCardScore || [];
            // Update the state by adding the new payload
            state.maintenanceCardScore = [
                ...maintenanceCardScore,
                action.payload,
            ];
        },
        setMaintenanceCardLat: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardLat = state.maintenanceCardLat || [];
            // Update the state by adding the new payload
            state.maintenanceCardLat = [...maintenanceCardLat, action.payload];
        },
        setMaintenanceCardRating: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardRating = state.maintenanceCardRating || [];
            // Update the state by adding the new payload
            state.maintenanceCardRating = [
                ...maintenanceCardRating,
                action.payload,
            ];
        },
        setMaintenanceCardFirst: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardFirst = state.maintenanceCardFirst || [];
            // Update the state by adding the new payload
            state.maintenanceCardFirst = [
                ...maintenanceCardFirst,
                action.payload,
            ];
        },
        setMaintenanceCardRate: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardRate = state.maintenanceCardRate || [];
            // Update the state by adding the new payload
            state.maintenanceCardRate = [
                ...maintenanceCardRate,
                action.payload,
            ];
        },
        setMaintenanceCardTime: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardTime = state.maintenanceCardTime || [];
            // Update the state by adding the new payload
            state.maintenanceCardTime = [
                ...maintenanceCardTime,
                action.payload,
            ];
        },
        setMaintenanceCardTask: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardTask = state.maintenanceCardTask || [];
            // Update the state by adding the new payload
            state.maintenanceCardTask = [
                ...maintenanceCardTask,
                action.payload,
            ];
        },
        setMaintenanceCardGeneral: (state: any, action: any) => {
            // Ensure state.maintenanceCardPer is initialized as an array
            const maintenanceCardGeneral = state.maintenanceCardGeneral || [];
            // Update the state by adding the new payload
            state.maintenanceCardGeneral = [
                ...maintenanceCardGeneral,
                action.payload,
            ];
        },
        delMaintenanceCardGeneral: (state: any, action: any) => {
            state.maintenanceCardGeneral = state.maintenanceCardGeneral.filter(
                (item: any) => item.id !== action.payload
            );
        },
        overrideAll: (state: any, action: any) => {
            state.maintenanceCardPer = state.maintenanceCardPer.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardDur = state.maintenanceCardDur.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardFre = state.maintenanceCardFre.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardScore = state.maintenanceCardScore.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardLat = state.maintenanceCardLat.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardRating = state.maintenanceCardRating.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardFirst = state.maintenanceCardFirst.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardRate = state.maintenanceCardRate.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardTime = state.maintenanceCardTime.filter(
                (item: any) => item.id !== action.payload
            );
            state.maintenanceCardTask = state.maintenanceCardTask.filter(
                (item: any) => item.id !== action.payload
            );
        },
        delMaintenanceCardPer: (state: any, action: any) => {
            state.maintenanceCardPer = state?.maintenanceCardPer?.slice(
                action.payload
            );
        },
        delMaintenanceCardDur: (state: any, action: any) => {
            state.maintenanceCardDur = state?.maintenanceCardDur?.slice(
                action.payload
            );
        },
        delMaintenanceCardFre: (state: any, action: any) => {
            state.maintenanceCardFre = state?.maintenanceCardFre?.slice(
                action.payload
            );
        },
        delMaintenanceCardScore: (state: any, action: any) => {
            state.maintenanceCardScore = state?.maintenanceCardScore?.slice(
                action.payload
            );
        },
        delMaintenanceCardLat: (state: any, action: any) => {
            state.maintenanceCardLat = state?.maintenanceCardLat?.slice(
                action.payload
            );
        },
        delMaintenanceCardRating: (state: any, action: any) => {
            state.maintenanceCardRating = state?.maintenanceCardRating?.slice(
                action.payload
            );
        },
        delMaintenanceCardFirst: (state: any, action: any) => {
            state.maintenanceCardFirst = state?.maintenanceCardFirst?.slice(
                action.payload
            );
        },
        delMaintenanceCardRate: (state: any, action: any) => {
            state.maintenanceCardRate = state?.maintenanceCardRate?.slice(
                action.payload
            );
        },
        delMaintenanceCardTime: (state: any, action: any) => {
            state.maintenanceCardTime = state?.maintenanceCardTime?.slice(
                action.payload
            );
        },
        delmaintenanceCardTask: (state: any, action: any) => {
            state.maintenanceCardTask = state?.maintenanceCardTask?.slice(
                action.payload
            );
        },
        returnInitialStateCard: (state: any) => {
            state.maintenanceCardDur = initialState?.maintenanceCardDur;
            state.maintenanceCardFre = initialState?.maintenanceCardFre;
            state.maintenanceCardPer = initialState?.maintenanceCardPer;
            state.maintenanceCardScore = initialState?.maintenanceCardScore;
            state.maintenanceCardLat = initialState?.maintenanceCardLat;
            state.maintenanceCardRating = initialState?.maintenanceCardRating;
            state.maintenanceCardFirst = initialState?.maintenanceCardFirst;
            state.maintenanceCardRate = initialState?.maintenanceCardRate;
            state.maintenanceCardTime = initialState?.maintenanceCardTime;
            state.maintenanceCardTask = initialState?.maintenanceCardTask;
            state.maintenanceCardGeneral = initialState?.maintenanceCardGeneral;
        },
        clearName: (state: any) => {
            state.name = '';
        },
        setGeneralCriteriaToggle: (state: any, action: any) => {
            state.generalCriteriaToggle = action?.payload;
        },
        clearNotification: (state: any) => {
            state.isGeneralSave = false;
        },
        clearNotificationForCriteriaModal: (state: any) => {
            state.generalCriteriaModal = false;
        },
        setCopyModal: (state: any) => {
            state.generalCriteriaModal = true;
        },
        setStatusNotification: (state: any) => {
            state.isGeneralSave = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveMasterCriteriaCall.pending, () => {})
            .addCase(saveMasterCriteriaCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(
                saveMasterCriteriaTemplateCall.fulfilled,
                (state: any, action) => {
                    state.templateData = action.payload;
                    state.temporaryId = action.payload.data.temporaryId;
                }
            )
            .addCase(getTimeFrameCall.fulfilled, (state: any, action) => {
                state.timeFrame = action.payload;
            })
            .addCase(getAutoProgress.fulfilled, (state: any, action) => {
                state.autoProgress = action.payload;
            })
            .addCase(
                getAutoProgressOrRegressByPhase_Progress.fulfilled,
                (state: any, action) => {
                    state.autoProgress = action.payload;
                }
            )
            .addCase(
                getAutoProgressOrRegressByPhase_Regress.fulfilled,
                (state: any, action) => {
                    state.autoRegress = action.payload;
                }
            )
            .addCase(saveMasterCriteriaCall.rejected, () => {})
            .addCase(masteryCardsAvailable.fulfilled, (state: any, action) => {
                state.masteryCardsAvailable = action.payload;
            });
    },
});
// Action creators are generated for each case reducer function
export const {
    savingMasterData,
    setTimeFrame,
    savingTemplateData,
    setAutoProgress,
    setAutoRegress,
    setDataType,
    setCardCount,
    setOnEdit,
    setOnView,
    setCardCountDuration,
    setIsModalClick,
    setPhaseValue,
    setCardCountFrequency,
    setCardCountScore,
    setCardCountLat,
    setCardCountRating,
    setCardCountFirst,
    setCardCountRate,
    setCardCountTime,
    setCardCountTask,
    setCardCountGeneral,
    setMasteryCriteriaName,
    setIsProgram,
    setMaintenanceCardPer,
    setMaintenanceCardDur,
    setMaintenanceCardFre,
    setMaintenanceCardScore,
    setMaintenanceCardLat,
    setMaintenanceCardRating,
    setMaintenanceCardFirst,
    setMaintenanceCardRate,
    setMaintenanceCardTime,
    setMaintenanceCardTask,
    setMaintenanceCardGeneral,
    delMaintenanceCardPer,
    delMaintenanceCardDur,
    delMaintenanceCardFre,
    delMaintenanceCardScore,
    delMaintenanceCardLat,
    delMaintenanceCardRating,
    delMaintenanceCardFirst,
    delMaintenanceCardRate,
    delMaintenanceCardTime,
    delmaintenanceCardTask,
    delMaintenanceCardGeneral,
    returnInitialStateCard,
    clearName,
    setGeneralCriteriaToggle,
    setStatusNotification,
    clearNotification,
    setCopyModal,
    clearNotificationForCriteriaModal,
    overrideAll,
} = saveMasterCriteria.actions;
export default saveMasterCriteria.reducer;
