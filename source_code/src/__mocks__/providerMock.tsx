import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const useProviderMock = (
    component: React.JSX.Element,
    props?: any
): React.JSX.Element => {
    return (
        <MemoryRouter {...props}>
            <DndProvider backend={HTML5Backend}>
                <Provider store={store}>{component}</Provider>
            </DndProvider>
        </MemoryRouter>
    );
};
