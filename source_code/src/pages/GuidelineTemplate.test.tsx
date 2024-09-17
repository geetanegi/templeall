import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useProviderMock } from '../__mocks__/providerMock';
import GuidelineTemplatesResponse from '../__mocks__/GuidelineTemplates/GuidelineTemplateGridApiResponse.json';
import guidelineTemplateGridApi from '../api/services/GuidelineTemplateGrid/guidelineTemplateGridApi';

import GuidelineTemplate from './GuidelineTemplate';
import ClientProviderDropdown from '../components/GuidelineTemplate/ClientProviderDropdown';

describe('GuidelineTemplateGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(
            guidelineTemplateGridApi,
            'getGuidelineTemplateGridData'
        );
        mock.mockImplementation(() =>
            Promise.resolve<any>(GuidelineTemplatesResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(<GuidelineTemplate />);
    test('should show GuidelineTemplate', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Guideline Templates');
        expect(pageEl[0]).toBeInTheDocument();
    });
});

interface Item {
    key: string;
    value: string;
    child: { key: string; value: string }[];
}

interface Props {
    item: {
        name: string;
        value: Item[];
    };
    addDynamicValue: (key: string, itemName: string, value: string) => void;
}

describe('ClientProviderDropdown Component', () => {
    const mockAddDynamicValue = jest.fn();
    const item = {
        name: 'Test Item',
        value: [
            {
                key: 'parent1',
                value: 'Parent 1',
                child: [
                    { key: 'child1', value: 'Child 1' },
                    { key: 'child2', value: 'Child 2' },
                ],
            },
            {
                key: 'parent2',
                value: 'Parent 2',
                child: [
                    { key: 'child3', value: 'Child 3' },
                    { key: 'child4', value: 'Child 4' },
                ],
            },
        ],
    };

    const setup = (
        propsOverrides: Partial<Props> = {}
    ): ReturnType<typeof render> => {
        const props = {
            item,
            addDynamicValue: mockAddDynamicValue,
            ...propsOverrides,
        };

        return render(<ClientProviderDropdown {...props} />);
    };

    beforeEach((): void => {
        mockAddDynamicValue.mockClear();
    });

    test('renders the component with the correct item name', (): void => {
        setup();
        expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    test('closes the dropdown when clicking outside', () => {
        setup();

        const button = screen.getByText('Test Item');
        fireEvent.click(button);

        expect(screen.getByText('Parent 1')).toBeInTheDocument();

        fireEvent.mouseDown(document);

        expect(screen.queryByText('Parent 1')).toBeNull();
    });
});
