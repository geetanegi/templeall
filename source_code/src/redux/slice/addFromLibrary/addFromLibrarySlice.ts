/* eslint-disable max-lines */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        configuration: <any>[],
        domains: <any>[],
        programs: <any>[],
        targets: <any>[],
    },
    error: false,
    loading: false,
};

const librarySlice = createSlice({
    name: 'librarySlice',
    initialState,
    reducers: {
        setLibraryData: (state, action) => {
            state.value = { ...action.payload };
        },
        addToArrayItem: (state, action) => {
            const { data, type } = action.payload;
            if (type === 'domain') {
                state.value.domains.push({
                    id: data.id,
                    name: data.name,
                    sourceId: data.programBookId,
                    newName: data.newName,
                });
                state.value.programs = state.value.programs.filter(
                    (item: any) => item.domainId !== data.id
                );
                state.value.targets = state.value.targets.filter(
                    (item: any) => item.domainId !== data.id
                );
            } else if (type === 'program') {
                state.value.domains = state.value.domains.filter(
                    (item: any) => item.id !== data.domainId
                );
                state.value.targets = state.value.targets.filter(
                    (item: any) => item.programId !== data.id
                );
                state.value.programs.push({
                    id: data.id,
                    name: data.name,
                    domainId: data.domainId,
                    sourceId: data.programBookId,
                    newName: data.newName,
                });
            } else if (type === 'target') {
                state.value.domains = state.value.domains.filter(
                    (item: any) => item.id !== data.domainId
                );
                state.value.programs = state.value.programs.filter(
                    (item: any) => item.id !== data.programId
                );
                state.value.targets.push({
                    id: data.id,
                    name: data.name,
                    domainId: data.domainId,
                    programId: data.programId,
                    sourceId: data.programBookId,
                    newName: data.newName,
                });
            }
        },
        removeFromArrayItem: (state, action) => {
            const { data, type } = action.payload;
            if (type === 'domain') {
                state.value.domains = state.value.domains.filter(
                    (item: any) => item.id !== data.id
                );
                state.value.programs = state.value.programs.filter(
                    (item: any) => item.domainId !== data.id
                );
                state.value.targets = state.value.targets.filter(
                    (item: any) => item.domainId !== data.id
                );
            } else if (type === 'program') {
                state.value.programs = state.value.programs.filter(
                    (item: any) => item.id !== data.id
                );
                state.value.targets = state.value.targets.filter(
                    (item: any) => item.programId !== data.id
                );
            } else if (type === 'target') {
                state.value.targets = state.value.targets.filter(
                    (item: any) => item.id !== data.id
                );
            }
        },
        addItem: (state, action) => {
            const { data, type } = action.payload;
            if (type === 'domain') {
                const sourceIdIndex = state.value.configuration.findIndex(
                    (el: any) => el.sourceId === data.programBookId
                );
                if (sourceIdIndex !== -1) {
                    state.value.configuration[sourceIdIndex]['domains'] = [
                        ...(state?.value?.configuration?.[sourceIdIndex]
                            ?.domains || []),
                        {
                            getAllData: true,
                            id: data.id,
                            override: data.override,
                            newName: data.newName,
                        },
                    ];
                } else {
                    state.value.configuration[
                        state.value.configuration.length
                    ] = {
                        sourceId: data.programBookId,
                        domains: [
                            {
                                id: data.id,
                                override: data.override,
                                newName: data.newName,
                                getAllData: true,
                            },
                        ],
                    };
                }
            } else if (type === 'program') {
                const { domainId } = data;
                const sourceIdIndex = state.value.configuration.findIndex(
                    (el: any) => el.sourceId === data.programBookId
                );
                if (sourceIdIndex !== -1) {
                    if (
                        state.value.configuration[sourceIdIndex].domains.find(
                            (item: any) => item.id === domainId
                        )
                    ) {
                        state.value.configuration[sourceIdIndex].domains =
                            state.value.configuration[
                                sourceIdIndex
                            ].domains.map((item: any) => {
                                if (item.id === domainId) {
                                    return {
                                        ...item,
                                        getAllData: false,
                                        programs: [
                                            ...(item?.programs || []),
                                            {
                                                id: data.id,
                                                override: data.override,
                                                newName: data.newName,
                                                getAllData: true,
                                            },
                                        ],
                                    };
                                } else return item;
                            });
                    } else {
                        state.value.configuration[sourceIdIndex].domains = [
                            ...(state?.value?.configuration?.[sourceIdIndex]
                                ?.domains || []),
                            {
                                id: domainId,
                                getAllData: false,
                                programs: [
                                    {
                                        id: data.id,
                                        override: data.override,
                                        newName: data.newName,
                                        getAllData: true,
                                    },
                                ],
                            },
                        ];
                    }
                } else {
                    state.value.configuration[
                        state.value.configuration.length
                    ] = {
                        sourceId: data.programBookId,
                        domains: [
                            {
                                id: domainId,
                                getAllData: false,
                                programs: [
                                    {
                                        id: data.id,
                                        override: data.override,
                                        newName: data.newName,
                                        getAllData: true,
                                    },
                                ],
                            },
                        ],
                    };
                }
            } else if (type === 'target') {
                const { domainId, programId } = data;
                const sourceIdIndex = state.value.configuration.findIndex(
                    (el: any) => el.sourceId === data.programBookId
                );
                if (sourceIdIndex !== -1) {
                    if (
                        state.value.configuration[sourceIdIndex].domains.find(
                            (item: any) => item.id === domainId
                        )
                    ) {
                        state.value.configuration[sourceIdIndex].domains =
                            state.value.configuration[
                                sourceIdIndex
                            ].domains.map((item: any) => {
                                if (item.id === domainId) {
                                    if (
                                        item.programs.length &&
                                        item.programs.find(
                                            (program: any) =>
                                                program.id === programId
                                        )
                                    ) {
                                        const programData = [
                                            ...item.programs,
                                        ].map((program: any) => {
                                            if (program.id === programId) {
                                                return {
                                                    ...program,
                                                    getAllData: false,
                                                    targets: [
                                                        ...(program.targets ||
                                                            []),
                                                        {
                                                            id: data.id,
                                                            override:
                                                                data.override,
                                                            newName:
                                                                data.newName,
                                                        },
                                                    ],
                                                };
                                            } else return program;
                                        });
                                        return {
                                            ...item,
                                            programs: [...programData],
                                        };
                                    } else {
                                        let programData = [...item.programs];
                                        programData = [
                                            ...programData,
                                            {
                                                id: programId,
                                                getAllData: false,
                                                targets: [
                                                    {
                                                        id: data.id,
                                                        override: data.override,
                                                        newName: data.newName,
                                                    },
                                                ],
                                            },
                                        ];
                                        return {
                                            ...item,
                                            getAllData: false,
                                            programs: [...programData],
                                        };
                                    }
                                } else return item;
                            });
                    } else {
                        state.value.configuration[sourceIdIndex].domains = [
                            ...(state?.value?.configuration?.[sourceIdIndex]
                                ?.domains || []),
                            {
                                id: domainId,
                                getAllData: false,
                                programs: [
                                    {
                                        id: programId,
                                        getAllData: false,
                                        targets: [
                                            {
                                                id: data.id,
                                                override: data.override,
                                                newName: data.newName,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ];
                    }
                } else {
                    state.value.configuration[
                        state.value.configuration.length
                    ] = {
                        sourceId: data.programBookId,
                        domains: [
                            {
                                id: domainId,
                                getAllData: false,
                                programs: [
                                    {
                                        id: programId,
                                        getAllData: false,
                                        targets: [
                                            {
                                                id: data.id,
                                                override: data.override,
                                                newName: data.newName,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    };
                }
            }
        },
        removeItem: (state, action) => {
            const { data, type } = action.payload;
            const sourceIdIndex = state.value.configuration.findIndex(
                (el: any) => el.sourceId === data.programBookId
            );
            if (type === 'domain') {
                state.value.configuration[sourceIdIndex].domains =
                    state.value.configuration[sourceIdIndex].domains.filter(
                        (domain: any) => domain.id !== data.id
                    );
            } else if (type == 'program') {
                const { domainId } = data;
                state.value.configuration[sourceIdIndex].domains =
                    state.value.configuration[sourceIdIndex].domains.map(
                        (domain: any) => {
                            if (domain.id === domainId) {
                                const programsData = domain.programs.filter(
                                    (item: any) => item.id !== data.id
                                );
                                return {
                                    ...domain,
                                    getAllData: programsData.length
                                        ? false
                                        : true,
                                    programs: programsData.length
                                        ? programsData
                                        : [],
                                };
                            } else return domain;
                        }
                    );
            } else if (type == 'target') {
                const { domainId, programId } = data;
                state.value.configuration[sourceIdIndex].domains =
                    state.value.configuration[sourceIdIndex].domains.map(
                        (domain: any) => {
                            if (domain.id === domainId) {
                                return {
                                    ...domain,
                                    programs: domain.programs.map(
                                        (program: any) => {
                                            if (program.id === programId) {
                                                const targetsData =
                                                    program.targets.filter(
                                                        (item: any) =>
                                                            item.id !== data.id
                                                    );
                                                return {
                                                    ...program,
                                                    getAllData:
                                                        targetsData.length
                                                            ? false
                                                            : true,
                                                    targets: targetsData.length
                                                        ? targetsData
                                                        : [],
                                                };
                                            } else {
                                                return program;
                                            }
                                        }
                                    ),
                                };
                            } else return domain;
                        }
                    );
            }
        },
        resetStateLibrary: () => initialState,
    },
});

export const {
    setLibraryData,
    addItem,
    removeItem,
    addToArrayItem,
    removeFromArrayItem,
    resetStateLibrary,
} = librarySlice.actions;

export default librarySlice.reducer;
