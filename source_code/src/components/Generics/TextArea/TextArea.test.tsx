import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextArea from '.';
import { useProviderMock } from '../../../__mocks__/providerMock';
describe('Switch Toggle', () => {
    const ComponentWithProvider = useProviderMock(
        <TextArea
            field={{}}
            name={'Instructions'}
            id={'Instructions'}
            className={'w-[16rem]'}
            placeholder={'Instructions'}
            isRequired={true}
            form={{
                touched: {},
                errors: {},
            }}
            props={{}}
            value={'test'}
            handleChange={() => {}}
            hideLabel={false}
            label={true}
            rows={2}
        />
    );
    test('should show switch toggle', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('text-area');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show switch toggle', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('textarea-onchange');
        fireEvent.change(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
});
