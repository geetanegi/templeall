import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getClinicianAndTechAPI from '../../../api/services/Scheduling/getClinicianAndTech.service';
import getScheduleEventAPI from '../../../api/services/Scheduling/getScheduleEvent.service';
import getEventsByProvidersAPI from '../../../api/services/Scheduling/getEventsByProviders.service';
import getAllUserAndGroupNamesAPI from '../../../api/services/Scheduling/getAllUserAndGroupNames.service';
import getAllEmployeesAndChildAPI from '../../../api/services/Scheduling/getAllEmployeesAndChild.service';
import getTechnicianAvailabilityAPI from '../../../api/services/Scheduling/getTechnicianAvailability.service';
interface ScheduledEvent {
    searchUserId: string;
    // other properties
}
interface State {
    getClinicianAndTechNames: any[];
    getUserAndGroupNames: any[];
    scheduledEvents: ScheduledEvent[];
    name: string;
    multipleUsers: any[];
    scheduledEventsProviders: any[];
    clickedUser: Record<string, boolean>;
    colorMapMonth: Record<string, string>;
    colorMapWeek: Record<string, string>;
    searchedUsers: any[];
    colorUsers: Record<string, string>;
    heights: Record<string, any>;
    getAllEmployeesAndChild: any[];
    getTechnicianAvailability: Record<
        string,
        { dates: string[]; color: string }
    >;
    dateChange: boolean;
}
const initialState: State = {
    getClinicianAndTechNames: [],
    getUserAndGroupNames: [],
    scheduledEvents: [],
    name: '',
    multipleUsers: [],
    scheduledEventsProviders: [],
    clickedUser: {},
    colorMapMonth: {},
    colorMapWeek: {},
    searchedUsers: [],
    colorUsers: {},
    heights: {},
    getAllEmployeesAndChild: [],
    getTechnicianAvailability: {
        user9: {
            dates: [
                "new Date('2024-07-14T08:00:00').toString()",
                "new Date('2024-07-14T08:30:00').toString()",
                "new Date('2024-07-15T09:00:00').toString()",
            ],
            color: 'lightblue',
        },
        user1: {
            dates: [
                "new Date('2024-07-16T09:00:00').toString()",
                "new Date('2024-07-16T09:30:00').toString()",
            ],
            color: 'lightgreen',
        },
        user3: {
            dates: ["new Date('2024-07-17T09:00:00').toString()"],
            color: 'yellow',
        },
    },
    dateChange: false,
};
interface MyData {
    id: any;
}
interface MyDataEvents {
    providerId: any;
    groupId: any;
    childId: any;
}
interface MyDataMultipleUsersEvents {
    userIds: any;
}
interface MyDataUserAndGroupNames {
    organizationId: any;
}
interface MyDataTechnicianNames {
    technicianIds: any;
    from: any;
    to: any;
}
export const getClinicianAndTechNamesCall = createAsyncThunk(
    'getClinicianAndTechNamesCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getClinicianAndTechAPI.getClinicianAndTech(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getTechnicianAvailibityCall = createAsyncThunk(
    'getTechnicianAvailibityCall',
    async (payload: MyDataTechnicianNames, { rejectWithValue }) => {
        try {
            const res =
                await getTechnicianAvailabilityAPI.getTechnicianAvailability(
                    payload
                );
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllUserAndGroupNamesCall = createAsyncThunk(
    'getAllUserAndGroupNamesCall',
    async (payload: MyDataUserAndGroupNames, { rejectWithValue }) => {
        try {
            const res =
                await getAllUserAndGroupNamesAPI.getAllUserAndGroupNames(
                    payload
                );
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllEmployeesAndChildCall = createAsyncThunk(
    'getAllEmployeesAndChildCall',
    async (payload: MyDataUserAndGroupNames, { rejectWithValue }) => {
        try {
            const res =
                await getAllEmployeesAndChildAPI.getAllEmployeesAndChild(
                    payload
                );
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getScheduleEventCall = createAsyncThunk(
    'getScheduleEventCall',
    async (payload: MyDataEvents, { rejectWithValue }) => {
        try {
            const res = await getScheduleEventAPI.getScheduleEvent(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getScheduleEventProvidersCall = createAsyncThunk(
    'getScheduleEventProvidersCall',
    async (payload: MyDataMultipleUsersEvents, { rejectWithValue }) => {
        try {
            const res =
                await getEventsByProvidersAPI.getEventsByProviders(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const getServices = createSlice({
    name: 'getServices',
    initialState,
    reducers: {
        savingClinicianAndTechNames: (state, action) => {
            state.getClinicianAndTechNames = { ...action.payload };
        },
        savingUserAndGroupNames: (state, action) => {
            state.getUserAndGroupNames = { ...action.payload };
        },
        savingEmployeesAndChildNames: (state, action) => {
            state.getAllEmployeesAndChild = { ...action.payload };
        },
        setDateChange: (state, action) => {
            state.dateChange = action.payload;
        },
        savingScheduledEvents: (state, action) => {
            // Ensure action.payload is defined and is an object
            const newEvent = action.payload;
            if (!newEvent) return;

            // Check if the event already exists
            const existingEvent = state.scheduledEvents.find(
                (item: any) => item.searchUserId === newEvent.searchUserId
            );

            if (!existingEvent) {
                // If the event does not exist, add it to the scheduled events
                state.scheduledEvents = [...state.scheduledEvents, newEvent];
            }
            // If the event already exists, do nothing (no need to reassign)
        },

        savingSelectedName: (state, action) => {
            state.name = action.payload;
        },
        savingMultipleUsers: (state, action) => {
            // Define a new user object from the action payload
            const newUser = action.payload;

            // Check if the new user already exists in the state
            const existingUser = state.multipleUsers.find(
                (item) =>
                    item.id === newUser.id ||
                    item.groupId === newUser.groupId ||
                    item.childId === newUser.childId
            );

            // If the user does not exist, add it to the list
            if (!existingUser) {
                state.multipleUsers.push(newUser);
            }
        },

        savingSearchedUsers: (state: any, action: any) => {
            const existingName = state.searchedUsers.find(
                (item: any) =>
                    (item.id || item?.groupId || item?.childId) ===
                    (action?.payload?.id ||
                        action?.payload?.groupId ||
                        action?.payload?.childId)
            );
            if (!existingName) {
                state.searchedUsers = [
                    ...(state?.searchedUsers || []),
                    action?.payload,
                ];
            }
        },
        savingTechnicianAvailability: (state: any, action: any): any => {
            const existingName = state.scheduledEvents.find(
                (item: any) => item.id === action?.payload?.id
            );
            if (!existingName) {
                state.scheduledEvents = [
                    ...state.scheduledEvents,
                    action.payload,
                ];
            }
        },
        deleteSearchedUser: (state: any, action: any) => {
            state.searchedUsers = state.searchedUsers?.filter(
                (item: any) =>
                    (item.id || item?.groupId || item?.childId) !==
                    action.payload
            );
        },
        deleteUser: (state: any, action: any) => {
            state.multipleUsers = state.multipleUsers?.filter(
                (item: any) =>
                    (item.id || item?.groupId || item?.childId) !==
                    action.payload
            );
        },
        deleteUserEvent: (state: any, action: any) => {
            state.scheduledEvents = state.scheduledEvents?.filter(
                (item: any) => item.searchUserId !== action.payload
            );
        },
        deleteSingleEvent: (state: any, action: any) => {
            state.scheduledEvents = state.scheduledEvents?.filter(
                (item: any) => item.id !== action.payload
            );
        },
        savingClickedUser: (state: any, action: any) => {
            state.clickedUser = {
                ...state.clickedUser,
                [action.payload]: !state.clickedUser[action.payload],
            };
        },
        deleteClickedUser: (state: any, action: any) => {
            delete state.clickedUser[action.payload];
        },
        savingColorMapMonth: (state: any, action: any) => {
            state.colorMapMonth = {
                ...state.colorMapMonth,
                ...action.payload,
            };
        },
        deleteColorMapMonth: (state: any, action: any) => {
            delete state.colorMapMonth[action?.payload];
        },
        savingColorMapWeek: (state: any, action: any) => {
            state.colorMapWeek = {
                ...state.colorMapWeek,
                ...action.payload,
            };
        },
        deleteColorMapWeek: (state: any, action: any) => {
            delete state.colorMapWeek[action?.payload];
        },
        savingColorUsers: (state: any, action: any) => {
            state.colorUsers = {
                ...state.colorUsers,
                ...action.payload,
            };
        },
        deleteColorUsers: (state: any, action: any) => {
            delete state.colorUsers[action?.payload];
        },
        savingHeights: (state: any, action: any) => {
            state.heights = {
                ...state.heights,
                ...action.payload,
            };
        },
        deleteHeights: (state: any, action: any) => {
            delete state.heights[action?.payload];
        },
        clearUser: (state: any) => {
            state.multipleUsers = [];
            state.scheduledEvents = [];
            state.clickedUser = {};
            state.colorMapMonth = {};
            state.colorUsers = {};
            state.searchedUsers = [];
            state.colorMapWeek = {};
            state.heights = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClinicianAndTechNamesCall.pending, () => {})
            .addCase(
                getClinicianAndTechNamesCall.fulfilled,
                (state: any, action) => {
                    state.getClinicianAndTechNames = action.payload;
                }
            )
            .addCase(
                getTechnicianAvailibityCall.fulfilled,
                (state: any, action) => {
                    if (!Array.isArray(state.getTechnicianAvailability)) {
                        state.getTechnicianAvailability = [];
                    } else {
                        state.getTechnicianAvailability = [
                            ...state.getTechnicianAvailability,
                            ...action.payload,
                        ];
                    }
                }
            )
            .addCase(
                getAllUserAndGroupNamesCall.fulfilled,
                (state: any, action) => {
                    state.getUserAndGroupNames = action.payload;
                }
            )
            .addCase(
                getAllEmployeesAndChildCall.fulfilled,
                (state: any, action) => {
                    state.getAllEmployeesAndChild = action.payload;
                }
            )
            .addCase(getScheduleEventCall.fulfilled, (state: any, action) => {
                if (Array.isArray(action.payload)) {
                    const newEvents = action.payload;
                    const updatedScheduledEvents: any = [];
                    state.scheduledEvents.forEach((existingEvent: any) => {
                        const conflictingNewEvent = newEvents.find(
                            (newEvent) => newEvent.id === existingEvent.id
                        );
                        if (
                            !conflictingNewEvent ||
                            (conflictingNewEvent &&
                                conflictingNewEvent.searchUserId !==
                                    existingEvent.searchUserId)
                        ) {
                            updatedScheduledEvents.push(existingEvent);
                        }
                    });
                    newEvents.forEach((newEvent) => {
                        updatedScheduledEvents.push(newEvent);
                    });
                    const finalScheduledEvents = updatedScheduledEvents.filter(
                        (event: any, index: any, self: any) =>
                            index ===
                            self.findIndex(
                                (e: any) =>
                                    e.id === event.id &&
                                    e.searchUserId === event.searchUserId
                            )
                    );
                    state.scheduledEvents = finalScheduledEvents;
                }
            })
            .addCase(
                getScheduleEventProvidersCall.fulfilled,
                (state: any, action) => {
                    if (Array.isArray(action.payload)) {
                        const newEvents = action.payload;
                        const updatedScheduledEvents: any = [];
                        state.scheduledEvents.forEach((existingEvent: any) => {
                            const conflictingNewEvent = newEvents.find(
                                (newEvent) => newEvent.id === existingEvent.id
                            );
                            if (
                                !conflictingNewEvent ||
                                (conflictingNewEvent &&
                                    conflictingNewEvent.searchUserId !==
                                        existingEvent.searchUserId)
                            ) {
                                updatedScheduledEvents.push(existingEvent);
                            }
                        });
                        newEvents.forEach((newEvent) => {
                            updatedScheduledEvents.push(newEvent);
                        });
                        const finalScheduledEvents =
                            updatedScheduledEvents.filter(
                                (event: any, index: any, self: any) =>
                                    index ===
                                    self.findIndex(
                                        (e: any) =>
                                            e.id === event.id &&
                                            e.searchUserId ===
                                                event.searchUserId
                                    )
                            );
                        state.scheduledEvents = finalScheduledEvents;
                    }
                }
            )
            .addCase(getClinicianAndTechNamesCall.rejected, () => {});
    },
});
// Action creators are generated for each case reducer function
export const {
    savingClinicianAndTechNames,
    savingScheduledEvents,
    savingSelectedName,
    savingMultipleUsers,
    deleteUser,
    deleteUserEvent,
    savingClickedUser,
    savingColorMapMonth,
    clearUser,
    savingUserAndGroupNames,
    savingSearchedUsers,
    savingColorUsers,
    deleteColorUsers,
    deleteColorMapMonth,
    deleteSearchedUser,
    deleteClickedUser,
    savingEmployeesAndChildNames,
    savingTechnicianAvailability,
    setDateChange,
    savingColorMapWeek,
    deleteColorMapWeek,
    savingHeights,
    deleteHeights,
    deleteSingleEvent,
} = getServices.actions;
export default getServices.reducer;
