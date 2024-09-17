/* eslint-disable max-lines */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import IntakeEditorApi from '../../../api/services/IntakeEditor/IntakeEditorApi';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    value: [],
    questionAndTheraphy: [],
    questions: [],
    loading: false,
    saveData: [],
    error: false,
};
interface Payload {
    questionsData: any;
}

interface Getselect {
    clientIntakeFormId: string;
}

export const getQuestionsAndTherapy = createAsyncThunk(
    'getQuestionsAndTherapy',
    async () => {
        try {
            const res = await IntakeEditorApi.getQuestionsAndTherapy();
            return res.data;
        } catch (err) {
            return '';
        }
    }
);
export const getSelectedQuestion = createAsyncThunk(
    'getSelectedQuestion',
    async (payload: Getselect) => {
        try {
            const res = await IntakeEditorApi.getSelectedQuestion(payload);
            return res.data;
        } catch (err) {
            return '';
        }
    }
);
export const saveSelectedQuestion = createAsyncThunk(
    'saveSelectedQuestion',
    async (payload: Payload, { rejectWithValue }) => {
        try {
            const res = await IntakeEditorApi.saveSelectedQuestion(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const intakeEditor = createSlice({
    name: 'intake',
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
        clearIntakeValues: (state: any) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getQuestionsAndTherapy.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getQuestionsAndTherapy.fulfilled, (state: any, action) => {
                state.questionAndTheraphy = action.payload;
            })
            .addCase(getQuestionsAndTherapy.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(getSelectedQuestion.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getSelectedQuestion.fulfilled, (state: any, action) => {
                state.questions = action.payload;
            })
            .addCase(getSelectedQuestion.rejected, (state: any) => {
                state.loading = true;
            })
            .addCase(saveSelectedQuestion.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(saveSelectedQuestion.fulfilled, (state: any, action) => {
                state.saveData = action.payload;
            })
            .addCase(saveSelectedQuestion.rejected, (state: any) => {
                state.loading = true;
            });
    },
});
export const {
    setElements,
    deleteElement,
    addElement,
    updateElement,
    updateOption,
    deleteOption,
    moveElements,
    clearIntakeValues,
} = intakeEditor.actions;
export default intakeEditor.reducer;
