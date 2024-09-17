import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useProviderMock } from './__mocks__/providerMock';

describe('App', () => {
    const ComponentWithProvider = useProviderMock(<App />);
    test('should show loader', async () => {
        await render(ComponentWithProvider);
        const loaderComponent = screen.getByTestId('loader-component');
        expect(loaderComponent).toBeInTheDocument();
    });
    test('should show login page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const brandingLogo = await findByTestId('branding-logo');
        expect(brandingLogo).toBeInTheDocument();
    });
    test('should click login button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const loginButton = await findByTestId('login-button');
        fireEvent.click(loginButton);
        expect(loginButton).toBeInTheDocument();
    });
});
