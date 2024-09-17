/* eslint-disable max-lines */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import templateAPIs from '../../../api/services/template.service';
import schedulingApis from '../../../api/services/scheduling.service';
const initialState = {
    value: [],
    loading: false,
    error: false,
    isEditing: false,
    templateId: '',
    fullData: [],
    authorizationCode: [],
    newNote: [],
    savingNote: '',
    clientProviderDetails: [],
    copiedData: [],
    name: [],
    saveNoteByCodeData: false,
    listOfSessionNote: '',
    selectSummaryTargetData: [],
    showSelected: {},
    isGridEdit: false,
    checkStatus: '',
    pullSessionNotefullData: '',
};
interface Data {
    templateId: any;
    organizationId: string;
    type: string;
}
interface authoCode {
    codeType: string;
}
interface code {
    authorizationCode: string;
    appointmentId: string;
    sessionNotesDataId: string;
}
interface GetNewNoteData {
    sessionNoteTemplateId: any;
}
interface GetMultipleNoteByCode {
    authorizationCode: any;
}
interface CheckSessionNoteExists {
    appointmentId: any;
    sessionNoteDataId: string;
    billingCode: string;
}
interface saveNewNoteData {
    appointmentId: any;
    authorizationCode: any;
    sessionTemplateId: any;
    sessionNoteData: any;
    createdBy: any;
    modifiedBy: any;
    sessionNotesDataId: any;
    appointmentWith: any;
    organizationLogo: string;
    authorizationCodes: any;
}
interface GetClientProvider {
    providerId: any;
    clientId: any;
    appointmentId: any;
}
interface copySessionNote {
    sessionNoteDataId: any;
    appointmentWith: any;
}
interface getNoteData {
    sessionNoteDataId: any;
}
export const getById = createAsyncThunk(
    'getById',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await templateAPIs.findById(payload);
            const datReturn = res.data.data?.instructionTemplate?.data
                ? JSON.parse(res.data.data.instructionTemplate.data).template
                : {};
            const fullData = res.data.data;
            if (Object.keys(datReturn).length) {
                return {
                    datReturn,
                    otherData: res.data.data.template,
                    fullData,
                };
            } else {
                return {
                    fullData,
                };
            }
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getNewNoteCode = createAsyncThunk(
    'getNewNoteCode',
    async (payload: GetNewNoteData, { rejectWithValue }) => {
        try {
            const res = await schedulingApis.getNewNoteByCode(payload);
            const datReturn = JSON.parse(res.data.data.data).template;
            return {
                datReturn,
                otherData: res.data.data.data,
                fullData: res.data.data,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getMultipleNoteByCode = createAsyncThunk(
    'getMultipleNoteByCode',
    async (payload: GetMultipleNoteByCode, { rejectWithValue }) => {
        try {
            const res = await schedulingApis.getMultipleNoteByCode(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const checkSessionNoteExists = createAsyncThunk(
    'checkSessionNoteExists',
    async (payload: CheckSessionNoteExists, { rejectWithValue }) => {
        try {
            const res = await schedulingApis.checkSessionNoteExists(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getNoteById = createAsyncThunk(
    'getNoteById',
    async (payload: getNoteData, { rejectWithValue }) => {
        try {
            const res = await schedulingApis.getNoteById(payload);
            const datReturn = JSON.parse(res.data.data.sessionNoteData);
            return {
                datReturn,
                otherData: res.data.data.data,
                fullData: res.data.data,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getClientProviderDetails = createAsyncThunk(
    'getClientProviderDetails',
    async (payload: GetClientProvider, { rejectWithValue }) => {
        try {
            const res = await schedulingApis.getClientProviderDetails(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const copySessionNoteById = createAsyncThunk(
    'copySessionNoteById',
    async (payload: copySessionNote, { rejectWithValue }) => {
        try {
            const res = await schedulingApis.copySessionNoteById(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const saveNoteByCode = createAsyncThunk(
    'saveNoteByCode',
    async (payload: saveNewNoteData, { rejectWithValue }) => {
        try {
            const res = await schedulingApis.saveNoteByCode(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAuthorizationCode = createAsyncThunk(
    'getAuthorizationCode',
    async (payload: authoCode, { rejectWithValue }) => {
        try {
            const res = await templateAPIs.getAuthorizationCode(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getNameOfNote = createAsyncThunk(
    'getNameOfNote',
    async (payload: code, { rejectWithValue }) => {
        try {
            const res = await templateAPIs.getNameOfNote(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setElements: (state: any, action: any) => {
            state.value = [...action.payload];
        },
        deleteElement: (state: any, action: { payload: any }) => {
            state.value = state.value.filter(
                (item: any) => item.id !== action.payload
            );
        },
        addElement: (state: any, action: any) => {
            // Ensure state.value is initialized as an array
            if (!Array.isArray(state.value)) {
                state.value = [];
            }
            // Generate a new ID and add the new element with the provided payload
            const id = uuidv4();
            state.value = [
                ...state.value,
                { ...action.payload, id, index: state.value.length },
            ];
        },
        updateElement: (state: any, action: { payload: any }) => {
            const { id, data } = action.payload;
            state.value = state.value.map((item: any) => {
                if (item.id === id) {
                    return {
                        ...item,
                        ...data,
                    };
                } else return item;
            });
        },
        updateOption: (state: any, action: { payload: any }) => {
            const { id } = action.payload;
            state.value = state.value.map((item: any) => {
                if (item.id === id) {
                    return {
                        ...item,
                        options: [...action.payload.optionData],
                    };
                } else return item;
            });
        },
        deleteOption: (state: any, action: { payload: any }) => {
            const stateData = state.value.map((data: any) => {
                if (data.id == action.payload.activeEl) {
                    return {
                        ...data,
                        options: action.payload.updatedOptionsValue,
                    };
                }
                return data;
            });
            state.value = stateData;
        },
        moveElements: (state: any, action: { payload: any }) => {
            const { dragIndex, hoverIndex } = action.payload;
            const elements = [...state.value];
            const dragItem = [...elements]?.splice(dragIndex, 1);
            elements?.splice(dragIndex, 1);
            const afterArr = [...elements]?.slice(hoverIndex, elements.length);
            const beforeArr = [...elements]?.slice(0, hoverIndex);
            let resultArr = [...beforeArr, ...dragItem, ...afterArr];
            resultArr = [...resultArr]?.map((item, index) => ({
                ...item,
                index,
            }));
            state.value = [...resultArr];
        },
        clearingData: (state: any) => {
            state.value = [];
            state.name = '';
            state.description = '';
            state.fullData = [];
            state.savingNote = '';
        },
        clearNote: (state: any) => {
            state.newNote = [];
            state.saveNoteByCodeData = false;
        },
        savingOnEdit: (state, action) => {
            state.isEditing = action.payload;
        },
        savingTemplateId: (state, action) => {
            state.templateId = action.payload;
        },
        savingNote: (state, action) => {
            state.savingNote = action.payload;
        },
        setSaveNoteByCodeData: (state, action) => {
            state.saveNoteByCodeData = action.payload;
        },
        setMultipleCodes: (state: any, action: any) => {
            state.listOfSessionNote = action.payload;
        },
        setSummaryData: (state: any, action: any) => {
            state.selectSummaryTargetData = action.payload;
        },
        showSelectedData: (state, action) => {
            state.showSelected = action.payload;
        },
        clearSummary: (state) => {
            state.selectSummaryTargetData = [];
            state.showSelected = {};
        },
        setIsEditingGrid: (state, action) => {
            state.isGridEdit = action.payload;
        },
        setFullData: (state, action) => {
            state.pullSessionNotefullData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getById.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getById.fulfilled, (state: any, action) => {
                state.value = action.payload?.datReturn || [];
                state.name = action.payload?.otherData?.name;
                state.fullData = action.payload?.fullData;
                state.description = action.payload?.otherData?.description;
                state.isEditing = true;
            })
            .addCase(getById.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(getAuthorizationCode.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAuthorizationCode.fulfilled, (state: any, action) => {
                state.authorizationCode = action.payload;
            })
            .addCase(getAuthorizationCode.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(getNewNoteCode.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getNewNoteCode.fulfilled, (state: any, action) => {
                state.newNote = action.payload?.datReturn;
                state.fullData = action.payload?.fullData;
            })
            .addCase(getNewNoteCode.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(getMultipleNoteByCode.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getMultipleNoteByCode.fulfilled, (state: any, action) => {
                state.listOfSessionNote = action.payload;
            })
            .addCase(checkSessionNoteExists.fulfilled, (state: any, action) => {
                state.checkStatus = action.payload;
            })
            .addCase(getMultipleNoteByCode.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(getClientProviderDetails.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(saveNoteByCode.fulfilled, (state: any, action) => {
                state.saveNoteByCodeData = action.payload;
            })
            .addCase(
                getClientProviderDetails.fulfilled,
                (state: any, action) => {
                    state.clientProviderDetails = action.payload;
                }
            )
            .addCase(getClientProviderDetails.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(copySessionNoteById.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(copySessionNoteById.fulfilled, (state: any, action) => {
                state.copiedData = action.payload;
            })
            .addCase(copySessionNoteById.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(getNoteById.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getNoteById.fulfilled, (state: any, action) => {
                state.newNote = action.payload?.datReturn;
                state.fullData = action.payload?.fullData;
            })
            .addCase(getNoteById.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(getNameOfNote.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getNameOfNote.fulfilled, (state: any, action) => {
                state.name = action.payload;
            })
            .addCase(getNameOfNote.rejected, (state: any) => {
                state.loading = true;
            });
    },
});
export const {
    setElements,
    addElement,
    moveElements,
    deleteElement,
    updateElement,
    updateOption,
    clearingData,
    deleteOption,
    savingOnEdit,
    savingTemplateId,
    savingNote,
    clearNote,
    setSaveNoteByCodeData,
    setMultipleCodes,
    setSummaryData,
    showSelectedData,
    clearSummary,
    setIsEditingGrid,
    setFullData,
} = templateSlice.actions;
export default templateSlice.reducer;
