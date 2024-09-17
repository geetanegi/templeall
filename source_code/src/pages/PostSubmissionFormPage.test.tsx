import React from 'react';
import { render } from '@testing-library/react';
import PostSubmissionFormPage from './PostSubmissionFormPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('PostSubmissionFormPage', () => {
    const ComponentWithProvider = useProviderMock(<PostSubmissionFormPage />);
    test('should show PostSubmissionFormPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('post-submission-form');
        expect(pageEl).toBeInTheDocument();
    });
});
